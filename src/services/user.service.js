const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

class UserService {

    async createUser({ name, email, password }) {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email: email }
    });

    if(emailAlreadyExists) {
      return {
        success: false,
        error: {  message: 'Email already exists',}
      }
    }

      const user =  await prisma.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 8)
        }
      });

      if(!user) {
        return {
          success: false,
          error: {
            message: 'Failed to create user'
          }
        }
      }

      return { success: true, message: 'User created', data: user };
  }

  async getAll({ page = 1 }) {
    const currentPage = page || 1;
    const listPerPage = 5;
    const offset = (currentPage - 1) * listPerPage;

    const allUsers = await prisma.user.findMany({
      skip: offset,
      take: listPerPage,
    });

    if(!allUsers) {
      return {
        success: false,
        error: {  message: 'Failed to list all users',}
      }
    }
    return { success: true, message: 'All Users', data: allUsers};
  }

  async update({ id, name, email, password }) {
    let passwordHash = null;
    const userAlreadyExists = await prisma.user.findUnique({
      where: { id }
    });

    if(!userAlreadyExists) {
      return {
        success: false,
        error: {  message: 'User not found' }
      }
    }

    if (password) {
       passwordHash = await bcrypt.hash(password, 8)
    }

    if (email) {
      const emailAlreadyExists = await prisma.user.findUnique({
        where: { email: email }
      });

      if(emailAlreadyExists) {
        return {
          success: false,
          error: {  message: 'Email already exists' }
        }
      }
    }

    const userUpdated = await prisma.user.update({
      data: {
        name: name,
        password: password ? passwordHash : userAlreadyExists.password,
        email: email
      },
      where: { id: id }
    });

    return {
      success: true,
      data: userUpdated
    }
  }

  async delete({ id }) {
    const userDeleted = await prisma.user.delete({
      where: { id: id },
    });

    if(!userDeleted) {
      return {
        success: false,
        error: { message: 'Failded to delete user' }
      }
    }

    return {
      success: true,
    }
  }
}


module.exports = UserService;
