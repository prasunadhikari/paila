export type Hotel = {
  id: string;
  name: string;
  slug: string;
  destination: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  description: string;
  amenities: string[];
  featured?: boolean;
};