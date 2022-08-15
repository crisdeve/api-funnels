import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DB,
    port: process.env.DB_port,
  },
  apiKey: process.env.API_KEY,
}));
