/**
 * This module registers different convenient Handlebars helpers.
 * @module HandlebarsHelper
 */

import _ from 'lodash';
import Handlebars from 'handlebars';

/**
 * Compares two values.
 */
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper equal needs 2 parameters');
  if (lvalue != rvalue) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a string ends with a provided value.
 */
Handlebars.registerHelper('endsWith', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper equal needs 2 parameters');
  if (lvalue.lastIndexOf(rvalue) !== lvalue.length-1 || lvalue.length-1 < 0) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a method is a valid HTTP method.
 */
Handlebars.registerHelper('validMethod', function(method, options) {
  const authorized_methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
  if (arguments.length < 2) throw new Error('Handlebars Helper validMethod needs 1 parameter');
  if (authorized_methods.indexOf(method.toUpperCase()) === -1) return options.inverse(this);
  return options.fn(this);
});

/**
 * Checks if a collection of responses contains no error responses.
 */
Handlebars.registerHelper('ifNoErrorResponses', function(responses, options) {
  const codes = responses ? Object.keys(responses) : [];
  if (codes.find(code => Number(code) >= 400)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a collection of responses contains no success responses.
 */
Handlebars.registerHelper('ifNoSuccessResponses', function(responses, options) {
  const codes = responses ? Object.keys(responses) : [];
  if (codes.find(code => Number(code) >= 200 && Number(code) < 300)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a string matches a RegExp.
 */
Handlebars.registerHelper('match', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper match needs 2 parameters');
  if (!lvalue.match(rvalue)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Provides different ways to compare two values (i.e. equal, greater than, different, etc.)
 */
Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper "compare" needs 2 parameters');

  const operator = options.hash.operator || '==';
  const operators = {
    '==':       (l,r) => { return l == r; },
    '===':      (l,r) => { return l === r; },
    '!=':       (l,r) => { return l != r; },
    '<':        (l,r) => { return l < r; },
    '>':        (l,r) => { return l > r; },
    '<=':       (l,r) => { return l <= r; },
    '>=':       (l,r) => { return l >= r; },
    typeof:     (l,r) => { return typeof l == r; }
  };

  if (!operators[operator]) throw new Error(`Handlebars Helper 'compare' doesn't know the operator ${operator}`);

  const result = operators[operator](lvalue,rvalue);

  if (result) return options.fn(this);

  return options.inverse(this);
});

/**
 * Capitalizes a string.
 */
Handlebars.registerHelper('capitalize', function(str) {
  return _.capitalize(str);
});

/**
 * Converts a string to its camel-cased version.
 */
Handlebars.registerHelper('camelCase', function(str) {
  return _.camelCase(str);
});

/**
 * Converts a multi-line string to a single line.
 */
Handlebars.registerHelper('inline', function(str) {
  return str ? str.replace(/\n/g, '') : '';
});

/**
 * Quotes a JS identifier, if necessary.
 */
Handlebars.registerHelper('quote', function(str) {
  return /[$&@-]/.test(str) ? `'${str}'` : str
});

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('reqIsJson', function(obj, options) {
  if (obj.requestBody && obj.requestBody.content['application/json']) return options.fn(this)
  return options.inverse(this);
});

Handlebars.registerHelper('resIsJson', function(obj, options) {
  if (obj.responses && obj.requestBody.content['application/json']) return options.fn(this)
  return options.inverse(this);
});


Handlebars.registerHelper('parse', function(context) {
  return JSON.parse(context);
});

Handlebars.registerHelper('ifObject', function(item, options) {
  if(typeof item === "object") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifArray', function(item, options) {
  if(Array.isArray(item)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('testForObjValue', function(obj, testFor, options) {
  if (!obj) return options.inverse(this);
  if (Array.isArray(obj)) {
    let hasValue = obj.some(item => {
      return item.in == testFor;
    });
    if (hasValue) {
      return options.fn(this)
    } else {
      return options.inverse(this);
    }
  } else {
    if(Object.values(obj).includes(testFor)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
});

Handlebars.registerHelper('createName', function(val1, val2) {
  let val2Arr = val2.split("/:");
  return `${val1}${val2Arr[1] || ''}${val2Arr[2] || ''}`;
});

Handlebars.registerHelper('colonReplacer', function(val) {
  if (val.includes(':')) {
    let valArr = val.split(":");
    if (valArr.length === 2) {
      return `${valArr[0]}{${valArr[1]}}`
    } else if (valArr.length === 3) {
      return `${valArr[0]}{${valArr[1]}}{${valArr[2]}`
    }
  } else {
    return val;
  }
});