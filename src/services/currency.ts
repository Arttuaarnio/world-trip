export async function fetchCurrencyRate(currencyCode: string) {
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=${currencyCode}&to=EUR`
  );
  if (!response.ok) throw new Error("Currency fetch failed");
  return response.json();
}
