import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  tipo: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: ["insert", "update", "remove"],
  })
  posts: Post[];
}
