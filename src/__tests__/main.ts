import { EnvProperty, StringValue } from './index';

class Config {
  @EnvProperty('ENV_STRING', StringValue)
  strValue!: string;
}
