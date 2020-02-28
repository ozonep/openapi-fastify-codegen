import mergeAllOf from 'json-schema-merge-allof';
import $RefParser from 'json-schema-ref-parser';
import toJsonSchema from '@openapi-contrib/openapi-schema-to-json-schema';


export function openapi2schema(spec, options, callback) {
    let schemaOptions = {};
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = {
        includeBodies: true,
        includeResponses: true,
        includeParameters: true,
        clean: true
    };

    if (typeof callback !== 'function') throw new Error('callback function required as third argument');

    schemaOptions.dateToDateTime = false;
    schemaOptions.supportPatternProperties = false;

    $RefParser.dereference(spec)
        .then(function (dereferenced) {
            let result;
            if (!dereferenced.paths) throw new Error('no paths defined in the specification file');
            result = buildPaths(dereferenced.paths, options, schemaOptions);
            callback(null, result);
        })
        .catch(function (err) {
            callback(err, null);
        });
}

function buildPaths(paths, options, schemaOptions) {
    let pathName
        , pathStruct
        , methodName
        , methodStruct
        , resultMethod
        , result = {}
    ;

    for (pathName in paths) {
        result[pathName] = {};
        pathStruct = paths[pathName];
        let rootParams = {};
        if (pathStruct.parameters) {
            for (let parameter of pathStruct.parameters) {
                if (parameter.in === 'path') {
                    rootParams.pathParameters = {
                        type: 'object',
                        additionalProperties: false
                    };
                    if (parameter.required === true) {
                        rootParams.pathParameters.required = [];
                        rootParams.pathParameters.required.push(parameter.name);
                    }
                    rootParams.pathParameters.properties = {};
                    rootParams.pathParameters.properties[parameter.name] = getConvertedSchema('parameters', parameter, schemaOptions);
                    rootParams.pathParameters['$schema'] = 'http://json-schema.org/draft-04/schema#';
                }
                if (parameter.in === 'query') {
                    rootParams.queryParameters = {
                            type: 'object',
                            additionalProperties: false
                        };
                    if (parameter.required === true) {
                        rootParams.queryParameters.required = [];
                        rootParams.queryParameters.required.push(parameter.name);
                    }
                    rootParams.queryParameters.properties = {};
                    rootParams.queryParameters.properties[parameter.name] = getConvertedSchema('parameters', parameter, schemaOptions);
                    rootParams.queryParameters['$schema'] = 'http://json-schema.org/draft-04/schema#';
                }
            }
        }
        for (methodName in pathStruct) {
            if (methodName === 'parameters' && options.includeParameters) {
                    continue;
            }

            resultMethod = {};
            methodStruct = pathStruct[methodName];
            try {
                if (options.includeBodies && methodStruct.requestBody) {
                    resultMethod.body = getConvertedSchema('request', methodStruct.requestBody, schemaOptions);
                }

                if (options.includeResponses && methodStruct.responses) {
                    resultMethod.responses = buildResponses(methodStruct.responses, schemaOptions);
                }
                if (Object.entries(rootParams).length > 0) {
                    resultMethod = {
                        ...resultMethod,
                        ...rootParams
                    }
                }
                if (options.includeParameters && methodStruct.parameters) {
                    for (let parameter of methodStruct.parameters) {
                        console.log(parameter);
                        if (parameter.in === 'path') {
                            if (!resultMethod.pathParameters) {
                                resultMethod.pathParameters = {
                                    type: 'object',
                                    additionalProperties: false
                                };
                            }
                            if (parameter.required === true) {
                                if (!resultMethod.pathParameters.required) resultMethod.pathParameters.required = [];
                                resultMethod.pathParameters.required.push(parameter.name);
                            }
                            if (!resultMethod.pathParameters.properties) resultMethod.pathParameters.properties = {};
                            resultMethod.pathParameters.properties[parameter.name] = getConvertedSchema('parameters', parameter, schemaOptions);
                            resultMethod.pathParameters['$schema'] = 'http://json-schema.org/draft-04/schema#';
                        }
                        if (parameter.in === 'query') {
                            if (!resultMethod.queryParameters) {
                                resultMethod.queryParameters = {
                                    type: 'object',
                                    additionalProperties: false
                                };
                            }
                            if (parameter.required === true) {
                                if (!resultMethod.queryParameters.required) resultMethod.queryParameters.required = [];
                                resultMethod.queryParameters.required.push(parameter.name);
                            }
                            if (!resultMethod.queryParameters.properties) resultMethod.queryParameters.properties = {};
                            resultMethod.queryParameters.properties[parameter.name] = getConvertedSchema('parameters', parameter, schemaOptions);
                            resultMethod.queryParameters['$schema'] = 'http://json-schema.org/draft-04/schema#';
                        }
                    }
                }
            } catch (e) {
                if (e.name == 'InvalidTypeError') {
                    throw new Error(e.message + ' in ' + pathName);
                }
            }

            if (options.clean && isEmptyObj(resultMethod)) {
                continue;
            }
            result[pathName][methodName] = resultMethod;
        }

        if (options.clean && isEmptyObj(result[pathName])) {
            delete result[pathName];
        }
    }

    return result;
}

function buildResponses(responses, schemaOptions) {
    let statusCode
        , responseData
        , resultResponses = {}
    ;

    for (statusCode in responses) {
        responseData = responses[statusCode];
        resultResponses[statusCode] =
            getConvertedSchema('response', responseData, schemaOptions);
    }

    return resultResponses;
}

function getConvertedSchema(type, struct, options) {
    let schema;

    if (!(struct.content && struct.content['application/json'])) {
        if (type === 'parameters' && struct.schema) {
            schema = struct.schema;
        } else {
            return {};
        }
    } else {
        schema = struct.content['application/json'].schema;
    }

    schema = mergeAllOf(JSON.parse(JSON.stringify(schema)));

    if (type === 'response') {
        options.removeWriteOnly = true;
        options.removeReadOnly = false;
    } else if (type === 'request') {
        options.removeWriteOnly = false;
        options.removeReadOnly = true;
    }

    schema = toJsonSchema(schema, options);
    if (type === 'parameters') delete schema['$schema'];
    return schema;
}

function isEmptyObj(obj) {
    return Object.keys(obj).length <= 0;
}