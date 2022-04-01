export interface ProductProps {
  title: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  category?: string;
  description?: string;
  id: number;
}
