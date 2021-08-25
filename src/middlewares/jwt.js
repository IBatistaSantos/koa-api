const jwt = require('jsonwebtoken');


module.exports =  async (ctx, next) =>  {
  const authHeader = ctx.request.headers.authorization;

  if (!authHeader) {
    return ctx.throw(401, 'No token in header');
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id } = jwt.verify(token, process.env.KOA_SECRET);
    ctx.request.body = {...ctx.request.body, user_id: id};
    await next();
  } catch {
    return ctx.throw(401, 'Invalid token');
  }
}
