import Fastify from 'fastify';
import fastifyFormbody from 'fastify-formbody';
import fastifyMultipart from 'fastify-multipart';
import fastifyLoader from 'fastify-loader';
import fastifyCors from 'fastify-cors';

const fastify = Fastify();


fastify.register(fastifyLoader, {
    paths: ['./routes/*.js']
});
//fastify.register(require('./routes/user'))
fastify.register(fastifyFormbody);
fastify.register(fastifyMultipart);
fastify.register(fastifyCors, {});

const port = process.env.PORT || 3000;

fastify.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
});