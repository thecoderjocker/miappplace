export type BoutiqueCategory = 'all' | 'flagship' | 'concept' | 'lifestyle' | 'aperturas';

export type BoutiqueStatus = 'open' | 'closing_soon' | 'closed';

export interface ScheduleItem {
  days: string;
  hours: string;
  isSpecial?: boolean;
}

export interface Boutique {
  id: string;
  name: string;
  category: 'flagship' | 'concept' | 'lifestyle' | 'aperturas';
  categoryLabel: string;
  status: BoutiqueStatus;
  statusText: string;
  stateText: string; // e.g. "EN OPERACIÓN"
  niche: string; // e.g. "Boutique de Moda", "Diseño Nórdico", "Joyería", "Moda Sostenible"
  city: string;
  country: string;
  stockCount: number;
  operator: {
    name: string;
    teamName: string;
    initials: string;
    avatarBg: string;
    verified: boolean;
    badgeIcon: 'lightning' | 'dot';
    badgeText: string;
  };
  schedule: ScheduleItem[];
  actionLabel: string; // "Ver negocio" or "Ver tienda"
  image: string;
  gallery: string[];
  address: string;
  phone: string;
  email: string;
  conciergeWhatsapp: string;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // percentage on graphic map
    mapY: number;
  };
  distanceKm: number;
  occupancy: {
    percentage: number;
    label: string;
    level: 'baja' | 'media' | 'alta';
  };
  services: string[];
  architect: string;
  sqm: number;
  description: string;
}

export interface BookingFormState {
  boutiqueId: string;
  service: string;
  date: string;
  time: string;
  advisor: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  specialNotes: string;
}
