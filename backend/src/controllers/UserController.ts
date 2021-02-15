import { Request, Response } from 'express';
import { getRepository, IsNull } from 'typeorm';
import User from '../models/User';
import userView from '../views/user-view';
import * as jwt from 'jsonwebtoken';
process.env.ACCESS_TOKEN_SECRET as jwt.Secret;

export default {
  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);

    const { nome, login, senha, tipo } = request.params;

    const userRepository = getRepository(User);

    const user = userRepository.create({
      nome,
      login,
      senha,
      tipo,
    });

    await userRepository.save(user);

    return response.status(201).json(userView.render(user));
  },
  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    response.json(userView.renderMany(users));
  },
  async findById(request: Request, response: Response) {
    const userRepository = getRepository(User);
    //const { id } = request.params;
    // ou
    const id = request.params.id;
    const user = await userRepository.findOneOrFail(id);

    response.json(userView.render(user));
  },
  async login(request: Request, response: Response) {
    try {
      const { login, senha } = request.body;

      //Verificação somente para testes (substituir)

      const userRepository = getRepository(User);

      const parametros = [login, senha];
      const usuario = await userRepository.query(
        'select * from user where login = ? and senha = ?',
        parametros
      );

      console.log(usuario[0]);

      if (usuario != undefined) {
        const user = userView.render(usuario[0]);
        console.log(user);

        const token = jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
          {
            expiresIn: 300, // expires in 5min
          }
        );
        return response.status(200).json({
          token: token,
          user: user,
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Login inválido!' });
    }
    return response.status(500).json({ message: 'Login inválido!' });
  },
};
