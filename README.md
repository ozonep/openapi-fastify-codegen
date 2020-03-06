# openapi-fastify-codegen




<br><br>
Use your OpenAPI 3 YAML spec to generate Node.js + Fastify code for your API.

The generated code features:

* One-time operation, after generation you don't need original YAML file 
* Easy to read - generated code looks just like normal server code, no abstractions.
* Uses Fastify - the fastest web framework for Node.js
* Validation based on ajv-oai
* Configured for Docker use (includes Dockerfile)


## Install

To use it from the CLI:

```bash
npm install -g openapi-fastify-codegen
```

## Usage

### From the command-line interface (CLI)

```bash
  Usage: ofc <swaggerFile> [options]


  Options:
    -o, --output <outputDir>       directory where to put the generated files
```

Example:

```bash
ofc patstore-expanded.yaml -o ./petstore 
```

## Example

You can find generated code in example/petstore folder.


## Requirements

* Node.js v13.2+   (Project uses ES modules)


## Authors

Project is based on [@fmvilas](http://twitter.com/fmvilas) work, but with lots of adjustments & changes.
<br/>
Original repo:
https://github.com/fmvilas/swagger-node-codegen