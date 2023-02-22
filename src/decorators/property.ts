import { isUndefined } from '../helpers';
import {
  BooleanParser,
  CustomParser,
  JsonParser,
  NumberParser,
  StringParser,
} from '../parsers';

type ParserFn =
  | CustomParser
  | NumberParser
  | StringParser
  | BooleanParser
  | JsonParser;

/**
 * Подготавливает имя переменной
 */
function prepareName(name: string): string {
  return name.replace(/[^0-9A-Z]+/gi, '_').toUpperCase();
}

/**
 * Возвращает значение переменной или undefined
 * - переменная с префиксом приложения приоритетнее
 */
function getEnvValue(name: string): string | undefined {
  const appName = prepareName(process.env.qe || '');
  const envName = name.trim().replace(/[^0-9A-Z]+/gi, '_');
  const appEnvName = `${appName}__${envName}`;

  return !isUndefined(process.env[appEnvName])
    ? process.env[appEnvName]
    : process.env[envName];
}

/**
 * Определение сеттера для env-свойств
 */
function throwSetter(): void {
  throw new Error('Property not writeble');
}

/**
 * Декоратор для чтения переменных окружения
 */
export function EnvProperty(
  envName: string,
  parser: ParserFn,
  defValue?: unknown,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const propValue = parser(getEnvValue(envName), defValue as any);
    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
