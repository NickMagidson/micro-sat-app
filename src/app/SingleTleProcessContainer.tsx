'use client';

import CesiumWrapper from "@/app/Components/CesiumWrapper";
import SatelliteDataDisplay from "@/components/satellite-data-display";
import SingleTleProcess from "@/components/single-tle-process";
import { useCallback, useState } from "react";

interface SatellitePosition {
  lat: number;
  lng: number;
  alt?: number;
  name?: string;
  timestamp?: Date;
}

// Blank state component for better organization
const CesiumBlankState = () => (
  <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">🌍</div>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        Process TLE to View Satellite
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter a TLE (Two-Line Element) to visualize the satellite position on the globe
      </p>
    </div>
  </div>
);

export default function SingleTleProcessContainer() {
  const [satellitePositions, setSatellitePositions] = useState<SatellitePosition[]>([]);
  const [sgp4Data, setSgp4Data] = useState<any>(null); // Add this state

  const handleSatellitePosition = useCallback((position: SatellitePosition, rawSgp4Result?: any) => {
    setSatellitePositions([position]);
    if (rawSgp4Result) {
      setSgp4Data(rawSgp4Result); // Store the raw SGP4 result
    }
    console.log("Satellite position calculated:", position);
  }, []);

  const hasPositions = satellitePositions.length > 0;

  return (

    <>
      <div className="mb-4 text-lg">
        <h1>Process a Single TLE</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">

        {/* Left side - TLE Input and Results */}
        <div className="flex flex-col space-y-4">
          <SingleTleProcess onPositionCalculated={handleSatellitePosition} />
          <SatelliteDataDisplay sgp4Result={sgp4Data} />
        </div>
        
        {/* Right side - Cesium Globe or Blank State */}
        <div className="lg:max-w-[100%]">
          {hasPositions ? (
            <CesiumWrapper positions={satellitePositions} />
          ) : (
            <CesiumBlankState />
          )}
        </div>
    </div>
  </>



  );
}