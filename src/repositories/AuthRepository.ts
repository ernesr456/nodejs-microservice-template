import prisma from '../db';
import User from '../models/users';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../constants';

export default class AuthRepository {
  static getUserByUsername = async (username: string) => {
    const targetUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!targetUser) {
      throw 'getUserByUsername: User not found';
    }

    return targetUser;
  };

  static createUser = async (userData: User) => {
    try {
      bcrypt.hash(
        userData.password as string,
        BCRYPT_SALT_ROUNDS,
        async function (err, hash) {
          if (err) throw err;

          await prisma.user.create({
            data: {
              username: userData.username,
              password: hash,
            },
          });
        }
      );
    } catch (error) {
      throw String(error || 'Unknown error occurred.');
    }
  };
}
