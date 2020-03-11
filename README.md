<h1 align="center">OpenAPI Fastify Code Generator</h1>
<p align="center">
    Use your OpenAPI 3 YAML spec to generate Node.js + Fastify code for your API!
</p>

<br>
[![npm](https://img.shields.io/npm/v/openapi-fastify-codegen.svg)](https://www.npmjs.com/package/openapi-fastify-codegen)
<br>

<details>
<summary>Motivation behind this project</summary>
<p>
There are many good code generators on npm, however, I couldn't find one that really suits my needs.

Here's why:
* Generator should be written in JS/TS so I could contribute and/or change some logic if I need to
* Instead of being a tool that generates server "on-the-fly" (under the hood) from YAML every time you start it, I want "one-time" tool to generate server code
* Generated code structure should be readable & similar to ordinary server code, no abstractions and/or code specific to this generator
* Validation of requests/responses based on schema taken from OpenAPI spec
* Fastify support 
* Ready for Docker
* Not abandoned

So this project was born.
</p>
</details>


## Generated code features:

* One-time operation, after generation you don't need original YAML file 
* Easy to read - generated code looks just like normal server code, no abstractions.
* Uses Fastify - the fastest web framework for Node.js
* Validation based on ajv-oai
* Configured for Docker use (includes Dockerfile)

## Generated code structure

```
|- package.json  
|- Dockerfile            
|+ src/
 |- index.js    
 |+ lib/       
 |+ routes/
 |+ schema/
 |+ services/
  
```


## Install

To use it from the CLI:

```bash
npm install -g openapi-fastify-codegen
```

## Usage

### From the command-line interface (CLI)

```bash
  Usage: ofc <YamlFile> [options]


  Options:
    -o, --output <outputDir>       directory where to put the generated files
```

Example:

```bash
ofc patstore-expanded.yaml -o ./petstore 
```

### Local Testing:
Clone this repo, and run this:

```bash
node cli.js tests/openapi3/petstore-expanded.yaml -o ./generated/petstore
```

to generate code from test YAML.


## Example

You can find generated code in example/petstore folder.


## Requirements

* Node.js v13.2+   (Project uses ES modules)


## Contributing

Any contributions are **greatly appreciated**.<br>
If you have any suggestions/bug reports - please create an issue!


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Acknowledgements
* [Swagger Code Generator](https://github.com/fmvilas/swagger-node-codegen)  - base for my generator
* [OpenAPI > JSON Schema converter](https://github.com/mikunn/openapi2schema)