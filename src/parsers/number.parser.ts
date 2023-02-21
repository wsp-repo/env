/* eslint-disable @typescript-eslint/naming-convention */

import { isUndefined } from '../helpers';

/**
 * Проверяет число на корректность значения
 */
function isValidNumber(value?: number): value is number {
  return !isUndefined(value) && !Number.isNaN(value);
}

/**
 * Парсер для одиночного числового значения
 */
export function NumberValue(
  envValue?: string,
  defValue?: number,
): number | undefined {
  if (isUndefined(envValue)) return defValue;

  const numValue = Number(envValue);

  return isValidNumber(numValue) ? numValue : defValue;
}

/**
 * Парсер для массива числовых значений
 */
export function NumberValues(
  envValue?: string,
  defValue?: number[],
): number[] | undefined {
  if (isUndefined(envValue)) return defValue;

  const values = envValue.replace(/[^0-9]+/g, ',').split(',');
  const nums = values.map(NumberValue).filter(isValidNumber);

  return nums.length > 0 ? nums : defValue;
}

export type NumberParser = typeof NumberValue | typeof NumberValues;
