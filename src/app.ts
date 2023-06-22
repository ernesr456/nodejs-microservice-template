import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import FastifyJwt from '@fastify/jwt';
import FastifySession from '@fastify/session';
import FastifyCookie from '@fastify/cookie';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  // Web2 token authentication
  fastify.register(FastifyJwt, {
    secret: process.env.APP_AUTH_SECRET_KEY as string,
  });

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  // Session authentication support for Polkadot
  fastify.register(FastifyCookie);
  fastify.register(FastifySession, {
    secret: process.env.APP_AUTH_SECRET_KEY as string,
  });
  fastify.addHook('preHandler', (request, reply, next) => {
    request.session.destroy(next);
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};
export default app;
export { app, options };
