import { Router } from 'express';
import multer from 'multer';

import uploadConf from './config/upload';
import PostController from './controllers/PostController';
import UserController from './controllers/UserController';
import authentication from './middleware/authentication';

const routes = Router();
const upload = multer(uploadConf);

routes.post('/users/:nome/:login/:senha/:tipo', UserController.create);
//routes.get("/users", UserController.index);
routes.get('/users/:id', UserController.findById);
//routes.get("/users", authentication.validate, UserController.index);
routes.get('/users', UserController.index);
//routes.get("/users/:login/:senha", UserController.logar);

routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.post('/posts', upload.array('images'), PostController.create);

routes.post('/login', UserController.login);

routes.post('/posts/autorizar/:id', PostController.autorizar);

export default routes;
