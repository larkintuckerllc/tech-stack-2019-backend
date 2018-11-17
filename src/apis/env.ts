
import Ajv from 'ajv';
import dotenv from 'dotenv';
import fs from 'fs';

export interface Env {
  HELLO_VALUE: string;
}

const ENV_KEYS = ['HELLO_VALUE'];

const ajv = new Ajv();
const ENV_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  required: ENV_KEYS,
  type: 'object',
};
const validateEnvironment = ajv.compile(ENV_SCHEMA);
const ENV_FILE = './.env';
if (fs.existsSync(ENV_FILE)) {
  ENV_KEYS.map((key: string) => delete process.env[key]);
  dotenv.config();
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) {
  console.log('Invalid Environment');
  process.exit(1);
}
const { HELLO_VALUE } = process.env;
export default {
  HELLO_VALUE,
} as Env;
