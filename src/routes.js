import { Router } from 'express';
import session from './app/controllers/SessionController';
import student from './app/controllers/StudentController';
import user from './app/controllers/UserController';
import auth from './app/middlewares/auth';

const routes = new Router();

// session routes
routes.post('/sessions', session.store);

routes.use(auth);
// users routes
routes.post('/users', user.store);
routes.put('/users', user.update);
routes.delete('/users', user.delete);

// students routes
routes.post('/students', student.store);
routes.put('/students/:id', student.update);

export default routes;
