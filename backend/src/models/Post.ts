import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Image from "./Image";
import User from "./User";

@Entity("post")
export default class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  autorizacao: boolean;

  @Column()
  message: string;

  @Column()
  data: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: "user_id"})
  user: User;

  @OneToMany(() => Image, image => image.post, {
    cascade: ["insert", "update", "remove"]
  })
  images: Image[]

}