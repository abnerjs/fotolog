import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Post from "../models/Post";
import postView from "../views/post-view";

export default {
  async index(request: Request, response: Response) {
    const postRepository = getRepository(Post);

    const posts = await postRepository.find({
      relations: ["images", "user"]
    });

    response.json(postView.renderMany(posts));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const postRepository = getRepository(Post);

    const post = await postRepository.findOneOrFail(id, {
      relations: ["images", "user"]
    });

    response.json(postView.render(post));


  },

  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);
    console.log(request.files);

    const { autorizacao, message, data, user_id } = request.body;

    const postRepository = getRepository(Post);

    const requestImagens = request.files as Express.Multer.File[];
    const images = requestImagens.map(image => {
      return { path: image.filename }
    });
    var dados;
    if (user_id == null) {
      dados = {
        autorizacao,
        message,
        data,
        images,
      };
    } else {
      dados = {
        autorizacao,
        message,
        data,
        user: { id: user_id },
        images,
      };
    }
    const schema = Yup.object().shape({
      message: Yup.string().required(),
      images: Yup.array().min(1)
    });
    await schema.validate(dados, {
      abortEarly: false,
    });

    const post = postRepository.create(dados);


    await postRepository.save(post);

    return response.status(201).json(post);
  },
  async autorizar(request: Request, response: Response) {
  
      const { id } = request.params;

      //Verificação somente para testes (substituir)
      
      const userRepository = getRepository(Post);
      console.log(id);
      
      const parametros = [id];
      const usuario = await userRepository.query("update post set autorizacao = true where id= ?", parametros)

     
        return response.status(200).json({
          message: "O post foi autorizado"
        });
      

  },


};