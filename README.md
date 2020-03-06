# openapi-fastify-codegen




<br><br>
Use your OpenAPI 3 YAML spec to generate Node.js + Fastify code for your API.

The generated code features:

* One-time operation, after generation you don't need original YAML file 
* Easy to read - generated code looks just like normal server code, no abstractions.
* Uses Fastify - the fastest web framework for Node.js
* Validation based on ajv-oai
* Configured for Docker use (includes Dockerfile)


## Usage

To test it, clone this repo & run:

```bash
node cli.js <path-to-YAML-spec> -o <output-folder>
```

Example:

```bash
node cli.js tests/openapi3/patstore-expanded.yaml -o ./generated/petstore 
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