import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
const API_KEY = '123456';

import { MongoClient } from 'mongodb';
//const uri = 'mongodb://mongo:secret@localhost:27017/?authMechanism=DEFAULT';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        //const uri = `${process.env.MONGO_CONF}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;
        const dbName = 'funnels';
        const user = process.env.MONGO_USER;
        const pass = process.env.MONGO_PASS;

        return {
          uri: `${process.env.MONGO_CONF}://${process.env.MONGO_HOST}/?authMechanism=DEFAULT`,
          user,
          pass,
          dbName,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'api',
      useValue: API_KEY,
    },
    {
      provide: 'mongo',
      useFactory: async () => {
        const uri = `${process.env.MONGO_CONF}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);

        await client.connect();
        const db = client.db('funnels');

        return db;
      },
    },
  ],
  exports: ['api', 'mongo', MongooseModule],
})
export class DatabaseModule {}
