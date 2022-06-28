export interface Product {
  id: number;
  temperature: number;
  data: number;
  timestamp: string;
}

export interface CurrentTemperatureProps {
  id: number;
  temperature: number;
}

export interface TemperatureBoxProps {
  data: Array<Product>;
}
