import { FastifyPluginAsync } from 'fastify';
import { indexHandler } from './controllers';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { onRequest: [fastify.authenticate] }, indexHandler);
};

export default example;
