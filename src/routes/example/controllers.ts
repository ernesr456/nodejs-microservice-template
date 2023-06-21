import { FastifyRequest, FastifyReply } from 'fastify';

export const indexHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return 'this is an example';
};
