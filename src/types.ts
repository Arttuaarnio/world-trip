export type Country = {
  name: string;
  flag: string;
  capital: string;
  population: number;
  languages: string[];
  currency: string;
  rateToEur?: number | undefined;
};
