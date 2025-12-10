export type Position = {
    lat: number;
    lng: number;
    alt?: number;
    name?: string;
    timestamp: Date;
    orbitPath?: Array<{ lat: number; lng: number; alt: number }>;
  }
  