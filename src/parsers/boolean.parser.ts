/* eslint-disable @typescript-eslint/naming-convention */

import { isUndefined } from '../helpers';
import { StringValues } from './string.parser';

const trueValues = ['1', 'TRUE', 'ON', 'ENABLE'];
const falseValues = ['0', 'FALSE', 'OFF', 'DISABLE'];

/**
 * Парсит строковое значение в булево или undefined
 */
function getValue(value?: string): boolean | undefined {
  const upper = (value || '').toUpperCase().trim();

  if (falseValues.includes(upper)) return false;

  if (trueValues.includes(upper)) return true;

  return undefined;
}

/**
 * Парсер для одиночного булева значения
 */
export function BooleanValue(
  envValue?: string,
  defValue?: boolean,
): boolean | undefined {
  if (isUndefined(envValue)) return defValue;

  const boolValue = getValue(envValue);

  return !isUndefined(boolValue) ? boolValue : defValue;
}

/**
 * Парсер для массива булевых значений
 * - разделителем служат символы ; и ,
 */
export function BooleanValues(
  envValue?: string,
  defValue?: boolean[],
): boolean[] | undefined {
  if (isUndefined(envValue)) return defValue;

  const values = (StringValues(envValue) || [])
    .map((strValue) => getValue(strValue))
    .filter((v) => !isUndefined(v));

  return values.length > 0 ? (values as boolean[]) : defValue;
}

export type BooleanParser = typeof BooleanValue | typeof BooleanValues;
