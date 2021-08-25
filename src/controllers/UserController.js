const UserService = require('../services/user.service');
const userService = new UserService();

class UserController {

  async createUser(ctx) {
    const {name, email, password} =ctx.request.body;
    const userCreated = await userService.createUser({ name, email, password });


    if (!userCreated.success) {
      ctx.response.status = 400;
      return ctx.body = userCreated;
    }

    ctx.response.status = 200;
    return ctx.body = userCreated

  }

  async updateUser(ctx) {
    const { name, email, password } = ctx.request.body;
    const { user_id } = ctx.request.body;

    const userUpdated = await userService.update({ id: user_id, name, email, password });

    if(!userUpdated.success) {
      ctx.response.status = 400;
      return ctx.body = userUpdated;
    }

    ctx.response.status = 200;
    return ctx.body = userUpdated;
  }

  async getAllUsers(ctx) {
    const { page } = ctx.request.query;
    const allUsers = await userService.getAll({ page });

    if(!allUsers.success) {
      ctx.response.status = 400;
      return ctx.body = allUsers;
    }

    ctx.response.status = 200;
    ctx.body = allUsers;
  }

  async deleteUser(ctx) {
    const { user_id } = ctx.request.body;
    const userDeleted = await userService.delete({ id: user_id });

    if(!userDeleted.success) {
      ctx.response.status = 400;
      return ctx.body = userDeleted;
    }

    return ctx.response.status == 204;
  }
}

module.exports = UserController;
