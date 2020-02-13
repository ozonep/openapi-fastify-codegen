import Fastify from 'fastify';
import fastifyFormbody from 'fastify-formbody';
import fastifyMultipart from 'fastify-multipart';
import fastifyCors from 'fastify-cors';

const fastify = Fastify();


fastify.register(fastifyFormbody);
fastify.register(fastifyMultipart);
fastify.register(fastifyCors, {});

{{#each @root.swagger.endpoints}}
    {{#endsWith @root.swagger.basePath '/'}}
fastify.register(import('./routes/{{this}}.js'), {
    prefix: '/{{this}}'
});
    {{else}}
fastify.register(import('./routes/{{this}}.js'), {
    prefix: '/{{this}}'
});
    {{/endsWith}}
{{/each}}

const port = process.env.PORT || 3000;

fastify.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    console.log(`server listening on ${address}`)
});