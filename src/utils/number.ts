const numberFormat = new Intl.NumberFormat('en-GB');

const priceNumberFormat = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = (input: number): string => numberFormat.format(input);

export const formatPrice = (input: number): string => priceNumberFormat.format(input);
