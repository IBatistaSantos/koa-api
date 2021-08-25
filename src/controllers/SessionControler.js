

const SessionService = require('../services/session.service');

class SessionController {

  async singIn(ctx) {
    const { email, password } =ctx.request.body; 
    const sessionService = new SessionService()
    const userCreated = await sessionService.signIn({email, password});


    if (!userCreated.success) {
      ctx.response.status = 400;
      return ctx.body = userCreated;
    }

    ctx.response.status = 200;
    return ctx.body = userCreated
  }
}

module.exports = SessionController;