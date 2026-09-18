export type Hotel = {
  id: string;
  name: string;
  slug: string;

  destination: string;
  location: string;
  address: string;

  image: string;

  rating: number;
  reviews: number;

  priceFrom?: number;
  currency: "NPR" | "USD";
  priceLabel: string;
  priceSource?: string;

  description: string;
  amenities: string[];

  officialWebsite?: string;

  featured?: boolean;
};