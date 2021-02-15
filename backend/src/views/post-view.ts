import Post from "../models/Post";
import imageView from "./image-view";
import userView from "./user-view";

export default {
  render(post: Post) {
    return {
      id: post.id,
      message: post.message,
      images: imageView.renderMany(post.images),
      user: post.user==null?null:userView.render(post.user),
      autorizacao: post.autorizacao,
      data: post.data
    };
  },
  renderMany(posts: Post[]) {
    return posts.map((post) => this.render(post));
  },
};