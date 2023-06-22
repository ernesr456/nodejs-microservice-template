import { FastifyPluginAsync } from 'fastify';
import {
  IExampleIndexRequestBody,
  IExampleIndexResponseError,
  IExampleIndexResponseSuccessful,
} from '../../schemas/ExampleSchemas';
import { indexHandler } from '../../controllers/ExampleControllers';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: IExampleIndexRequestBody;
    Reply: IExampleIndexResponseSuccessful | IExampleIndexResponseError;
  }>('/', { onRequest: [fastify.authenticate] }, indexHandler);
};

export default example;
