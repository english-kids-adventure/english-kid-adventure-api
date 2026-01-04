import 'dotenv/config';
import { createClient } from 'redis';

const client = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET_HOST,
    port: Number(process.env.REDIS_SOCKET_PORT) || 6379,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
export default client;
