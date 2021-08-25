const Router = require('koa-router')

const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/SessionControler");
const ensureAuth = require('../middlewares/jwt');
const router = new Router();

const userController = new UserController();
const sessionController = new SessionController();

router.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

router.post('/users', async (ctx) => userController.createUser(ctx));
router.get('/users', ensureAuth, async (ctx) => userController.getAllUsers(ctx));
router.put('/users', ensureAuth, async (ctx) => userController.updateUser(ctx));
router.delete('/users', ensureAuth, async (ctx) => userController.deleteUser(ctx));

router.post('/sessions', async (ctx) => sessionController.singIn(ctx))

module.exports = router;
