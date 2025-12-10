'use client';

import TLEInput from '@/components/tle-input';
import { useEffect, useState } from "react";

interface SatellitePosition {
  lat: number;
  lng: number;
  alt: number;
  name: string;
  timestamp: Date;
  orbitPath: any[];
}

interface SingleTleProcessProps {
  onPositionCalculated?: (position: SatellitePosition, sgp4Result?: any) => void;
  currentEpoch?: Date;
}


export default function SingleTleProcess({ onPositionCalculated, currentEpoch }: SingleTleProcessProps) {
  const [tleLines, setTleLines] = useState<string[] | null>(null);
  const [sgp4Result, setSgp4Result] = useState<any>(null);

  useEffect(() => {
    if (sgp4Result?.latitude !== undefined && sgp4Result?.longitude !== undefined && onPositionCalculated) {
      onPositionCalculated({
        lat: sgp4Result.latitude,
        lng: sgp4Result.longitude,
        alt: sgp4Result.altitude,
        name: tleLines?.[0]?.trim() || 'Satellite',
        timestamp: sgp4Result.epochUsed || new Date(),
        orbitPath: sgp4Result.orbitPath || []
      }, sgp4Result);
    }
  }, [sgp4Result, onPositionCalculated, tleLines]);



  return (
    <>
    <div className="w-full max-w-2xl mx-auto 2xl:mr-auto 2xl:ml-0">
        <TLEInput
          // tleLines={tleLines}
          setTleLines={setTleLines}
          setSgp4Result={setSgp4Result}
          currentEpoch={currentEpoch}
        />
    </div>
    </>
  )
  
}