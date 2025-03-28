import RouterUsers from '../routers/user.js';

const initRouter = (app) => {
  app.use('/api/user', RouterUsers);
};

export default initRouter;
