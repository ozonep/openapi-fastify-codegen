import Fastify from 'fastify';
import fastifyFormbody from 'fastify-formbody';
import fastifyMultipart from 'fastify-multipart';
import fastifyLoader from 'fastify-loader';
import fastifyCors from 'fastify-cors';

const fastify = Fastify();


fastify.register(fastifyLoader, {
    paths: ['./routes/*.js']
});
fastify.register(fastifyFormbody);
fastify.register(fastifyMultipart);
fastify.register(fastifyCors, {});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
});