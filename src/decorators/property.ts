/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

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
 * Декоратор для чтения переменных окружения
 */
export function EnvProperty(
  envName: string,
  parser: ParserFn,
  defValue?: unknown,
) {
  return (target: Object, propertyKey: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const value = parser(getEnvValue(envName), defValue as any);
    const attrs = { get: () => value, set: (): void => {} };

    Object.defineProperty(target, propertyKey, attrs);
  };
}
