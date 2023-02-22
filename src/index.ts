import dotenv from 'dotenv';

dotenv.config();

export { EnvProperty } from './decorators/property';
export {
  NumberValue,
  NumberValues,
  StringValue,
  StringValues,
  BooleanValue,
  BooleanValues,
  JsonValue,
  CustomParser,
} from './parsers';
