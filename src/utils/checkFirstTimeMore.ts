const parseTimestamp = (timestampStr: string | Date) =>
  new Date(
    new Date(timestampStr).getTime() +
      new Date(timestampStr).getTimezoneOffset() * 60 * 1000,
  );

const checkFirstTimeMore = (
  valueA?: string | Date | null,
  valueB?: string | Date | null,
) => {
  if (!valueA || !valueB) return false;

  const convertedValueA = parseTimestamp(new Date(valueA));
  const convertedValueB = parseTimestamp(new Date(valueB));

  return convertedValueA.getTime() > convertedValueB.getTime();
};

export { checkFirstTimeMore };
