'use client';

import CesiumWrapper from "@/app/Components/CesiumWrapper";
import SingleTleProcess from "@/components/single-tle-process";
import { useCallback, useState } from "react";

interface SatellitePosition {
  lat: number;
  lng: number;
  alt?: number;
  name?: string;
  timestamp?: Date;
}

export default function SingleTleProcessContainer() {
  const [satellitePositions, setSatellitePositions] = useState<SatellitePosition[]>([]);
  
  const handleSatellitePosition = useCallback((position: SatellitePosition) => {
    setSatellitePositions([position]); // Replace with single position for single TLE
    console.log("Satellite position calculated:", position);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full p-4">
      {/* Left side - TLE Input and Results */}
      {/* <div className="overflow-auto"> */}
        <SingleTleProcess onPositionCalculated={handleSatellitePosition} />
      {/* </div> */}
      
      {/* Right side - Cesium Globe */}
      {/* <div className="h-full"> */}
        <CesiumWrapper positions={satellitePositions} />
      {/* </div> */}
    </div>
  );
}