import { Router } from 'express';
import session from './app/controllers/SessionController';
import student from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', session.store);
routes.post('/students', student.store);
export default routes;
