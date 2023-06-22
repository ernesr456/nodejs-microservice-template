import { FastifyPluginAsync } from 'fastify';
import { loginHandler, registerHandler, sessionHandler } from './controllers';
import {
  IUserLoginRequestBody,
  IUserLoginResponseError,
  IUserLoginResponseSuccessful,
  IUserRegisterRequestBody,
  IUserRegisterResponseError,
  IUserRegisterResponseSucessful,
  IUserSessionRequestBody,
  IUserSessionResponseError,
  IUserSessionResponseSuccessful,
} from './schemas';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Querystring: IUserLoginRequestBody;
    Reply: IUserLoginResponseSuccessful | IUserLoginResponseError;
  }>('/login', loginHandler(fastify));

  fastify.post<{
    Querystring: IUserRegisterRequestBody;
    Reply: IUserRegisterResponseSucessful | IUserRegisterResponseError;
  }>('/register', registerHandler);

  fastify.post<{
    Querystring: IUserSessionRequestBody;
    Reply: IUserSessionResponseSuccessful | IUserSessionResponseError;
  }>('/session', sessionHandler(fastify));
};

export default auth;
