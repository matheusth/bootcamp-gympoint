import { Router } from 'express';
import session from './app/controllers/SessionController';
import student from './app/controllers/StudentController';
import auth from './app/middlewares/auth';

const routes = new Router();
routes.use(auth);
routes.post('/sessions', session.store);
routes.post('/students', student.store);
export default routes;
