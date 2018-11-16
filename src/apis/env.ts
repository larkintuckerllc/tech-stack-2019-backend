
import Ajv from 'ajv';
import dotenv from 'dotenv';
import fs from 'fs';

export interface Env {
  helloValue: string;
}

// ENVIRONMENT VALIDATOR
const ENV_KEYS = ['HELLO_VALUE'];
const ajv = new Ajv();
const envReducer = (accumulator: any, currentValue: string) => {
  accumulator[currentValue] = { type: 'string' };
  return accumulator;
};
const envProperties = ENV_KEYS.reduce(envReducer, {});
const ENV_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: envProperties,
  required: ENV_KEYS,
  type: 'object',
};
const validateEnvironment = ajv.compile(ENV_SCHEMA);

// ENVIRONMENT
const ENV_FILE = './.env';
if (fs.existsSync(ENV_FILE)) {
  ENV_KEYS.map((key: string) => delete process.env[key]);
  const envParseResult = dotenv.config();
  if (envParseResult.error) {
    console.log('Invalid Environment File');
    process.exit(1);
  }
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) {
  console.log('Invalid Environment');
  process.exit(1);
}
export default {
  helloValue: process.env.HELLO_VALUE,
} as Env;
