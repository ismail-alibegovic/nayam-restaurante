export type Language = 'es' | 'en';

export interface BilingualText {
  es: string;
  en: string;
}

export interface MenuItem {
  id: string;
  name: BilingualText;
  description: BilingualText;
  price: number;
  dietary: ('V' | 'VG' | 'GF' | 'DF' | 'SH')[]; // Vegetarian, Vegan, Gluten Free, Dairy Free, Shellfish
  imageUrl?: string;
  backdropGradient?: string; // CSS radial gradient as visual fallback
}

export interface MenuCategory {
  id: 'brunch' | 'starters' | 'mains' | 'desserts';
  title: BilingualText;
  items: MenuItem[];
}

export interface ReservationForm {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
}
