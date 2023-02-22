import { EnvProperty, StringValue, StringValues } from '../index';

class EnvConfig {
  @EnvProperty('ENV_STRING', StringValue)
  public strValue!: string;

  @EnvProperty('ENV_STRINGS', StringValues)
  public strValues!: string[];
}

const config = new EnvConfig();

console.info(`strValue1 = ${JSON.stringify(config.strValue, null, 2)}`);
console.info(`strValues1 = ${JSON.stringify(config.strValues, null, 2)}`);

config.strValue = 'new value';

console.info(`strValue2 = ${JSON.stringify(config.strValue, null, 2)}`);
