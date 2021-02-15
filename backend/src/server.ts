import express from 'express';
import { getRepository } from 'typeorm';

import './database/connection';
import User from './models/User';

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
  //desestruturar o corpo da requisição (JSON)
  console.log(req.body);

  const { nome, salario } = req.body;

  const userRepository = getRepository(User);

  const user = userRepository.create({
    nome,
    salario,
  });

  await userRepository.save(user);

  return res.status(201).json(user);
});

app.listen(3333);
