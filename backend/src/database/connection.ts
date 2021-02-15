import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'fotolog',
  entities: [__dirname + '/entity/*.js'],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));
