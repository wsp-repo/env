export type CustomParser = <T>(
  envValue?: string,
  defValue?: T,
) => T | undefined;
