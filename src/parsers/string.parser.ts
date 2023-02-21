/* eslint-disable @typescript-eslint/naming-convention */

import { isUndefined } from '../helpers';

/**
 * Проверяет строку на корректность значения
 */
function isValidString(value?: string): value is string {
  return !isUndefined(value) && value.length > 0;
}

/**
 * Парсер для одиночного строкового значения
 */
export function StringValue(
  envValue?: string,
  defValue?: string,
): string | undefined {
  if (isUndefined(envValue)) return defValue;

  const strValue = envValue.trim();

  return strValue.length === 0 && defValue ? defValue : strValue;
}

/**
 * Парсер для массива строковых значений
 * - разделителем служат символы ; и ,
 */
export function StringValues(
  envValue?: string,
  defValue?: string[],
): string[] | undefined {
  if (isUndefined(envValue)) return defValue;

  const values = envValue
    .split(/[,;]+/g)
    .map((v) => StringValue(v))
    .filter(isValidString);

  return values.length > 0 ? values : defValue;
}

export type StringParser = typeof StringValue | typeof StringValues;
