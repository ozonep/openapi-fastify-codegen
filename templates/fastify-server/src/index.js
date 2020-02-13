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
fastify.register('{{@root.swagger.basePath}}{{this}}', import('./routes/{{this}}'), {
    prefix: '/{{this}}'
});
    {{else}}
fastify.register('{{@root.swagger.basePath}}/{{this}}', import('./routes/{{this}}'), {
    prefix: '/{{this}}'
});
    {{/endsWith}}
{{/each}}

const port = process.env.PORT || 3000;

fastify.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
});