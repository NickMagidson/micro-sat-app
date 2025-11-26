'use client';

import TLEInput from '@/components/tle-input';
import { useEffect, useState } from "react";

interface SatellitePosition {
  lat: number;
  lng: number;
  alt: number;
  name: string;
  timestamp: Date;
}

interface SingleTleProcessProps {
  onPositionCalculated?: (position: SatellitePosition, sgp4Result?: any) => void;
}


export default function SingleTleProcess({ onPositionCalculated }: SingleTleProcessProps) {
  const [tleLines, setTleLines] = useState<string[] | null>(null);
  const [sgp4Result, setSgp4Result] = useState<any>(null);

  useEffect(() => {
    if (sgp4Result?.positionAndVelocity?.position && onPositionCalculated) {
      const { x, y, z } = sgp4Result.positionAndVelocity.position;
      
      // Convert ECI coordinates to lat/lng/alt
      const r = Math.sqrt(x * x + y * y + z * z);
      const lat = Math.asin(z / r) * (180 / Math.PI);
      const lng = Math.atan2(y, x) * (180 / Math.PI);
      const alt = r - 6371; // Earth radius approximation in km
      
      onPositionCalculated({
        lat,
        lng,
        alt,
        name: tleLines?.[0]?.trim() || 'Satellite',
        timestamp: new Date()
      }, sgp4Result);
    }
  }, [sgp4Result, onPositionCalculated, tleLines]);



  return (
    <>
    <div className="w-full max-w-2xl mx-auto">
        <TLEInput
          // tleLines={tleLines}
          setTleLines={setTleLines}
          setSgp4Result={setSgp4Result}
        />
    </div>
    </>
  )
  
}