import User from '../models/User';
import postView from './post-view';

export default {
  render(user: User) {
    return {
      id: user.id,
      nome: user.nome,
      // posts: postView.renderMany(user.posts),
      login: user.login,
      tipo: user.tipo,
    };
  },
  renderMany(users: User[]) {
    console.log(users);
    return users.map((user) => this.render(user));
  },
};
