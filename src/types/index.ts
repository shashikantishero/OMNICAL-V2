export interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface Conversion {
  id: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  fromValue: number;
  toValue: number;
  timestamp: number;
}
