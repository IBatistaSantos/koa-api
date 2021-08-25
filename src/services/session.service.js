const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class UserService {
   async signIn({ email, password }) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email: email }
    });

    if(!userAlreadyExists) {
      return {
        success: false,
        error: {  message: 'Email/password is incorrect'}
      }
    }

    const passwordMatch = await bcrypt.compare(password, userAlreadyExists.password);

    if(!passwordMatch) {
      return {
        success: false,
        error: {  message: 'Email/password is incorrect' }
      }
    }

    return {
      success: true,
      data: {
        user: userAlreadyExists,
        token: jwt.sign({ id: userAlreadyExists.id }, process.env.KOA_SECRET),
      }
    }
  }
}


module.exports = UserService;
