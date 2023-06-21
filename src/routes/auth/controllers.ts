import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as bcrypt from 'bcrypt';
import prisma from '../../db';
import { add, getUnixTime } from 'date-fns';
import { BCRYPT_SALT_ROUNDS } from '../../constants';
import { IUserLoginRequestBody, IUserRegisterRequestBody } from './schemas';

export const loginHandler =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const requestBody = request.body as IUserLoginRequestBody;
    const targetUser = await prisma.user.findFirst({
      where: {
        username: requestBody.username,
      },
    });

    if (!targetUser) {
      return reply.badRequest('Invalid username or password.');
    }

    const isCorrectPassword = await bcrypt.compare(
      requestBody.password,
      targetUser.password
    );

    if (!isCorrectPassword) {
      return reply.badRequest('Invalid username or password.');
    }

    const tokenExpiryDateTime = add(new Date(), { hours: 2 });
    const userId = targetUser.id;

    const newAccessToken = fastify.jwt.sign({
      aud: userId,
      exp: getUnixTime(tokenExpiryDateTime),
    });

    return reply.send({
      accessToken: newAccessToken,
    });
  };

export const registerHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IUserRegisterRequestBody;

  if (
    !requestBody ||
    !requestBody.username ||
    !requestBody.password ||
    !requestBody.confirmPassword ||
    !requestBody
  ) {
    return reply.badRequest(
      `Invalid request body. Required fields: 'username', 'password', 'confirmPassword'`
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: requestBody.username,
    },
  });

  if (existingUser) {
    return reply.badRequest('Username is already taken.');
  }

  const body = request.body as IUserRegisterRequestBody;

  const isMatchingPassword = body.password === body.confirmPassword;

  if (!isMatchingPassword) {
    return reply.badRequest('Passwords do not match');
  }

  try {
    bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS, async function (err, hash) {
      if (err) throw err;

      await prisma.user.create({
        data: {
          username: body.username,
          password: hash,
        },
      });
    });
  } catch (error) {
    reply.internalServerError(String(error || 'Unknown error occurred.'));
  }

  return reply.send({
    accessToken: 'Registration successful.',
  });
};
