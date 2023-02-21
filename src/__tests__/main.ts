import { EnvProperty, StringValue, StringValues } from '../index';

class EnvConfig {
  @EnvProperty('ENV_STRING', StringValue)
  public strValue!: string;

  @EnvProperty('ENV_STRINGS', StringValues)
  public strValues!: string[];
}

const config = new EnvConfig();

console.info(`strValue = ${JSON.stringify(config.strValue, null, 2)}`);
console.info(`strValues = ${JSON.stringify(config.strValues, null, 2)}`);
