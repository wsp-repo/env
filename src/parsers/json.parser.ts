/* eslint-disable @typescript-eslint/naming-convention */

import { isUndefined } from '../helpers';

/**
 * Парсер для чтения JSON значения
 */
export function JsonValue(
  envValue?: string,
  defValue?: unknown,
): unknown | undefined {
  if (isUndefined(envValue)) return defValue;

  try {
    return JSON.parse(envValue);
  } catch (e) {
    return defValue;
  }
}

export type JsonParser = typeof JsonValue;
