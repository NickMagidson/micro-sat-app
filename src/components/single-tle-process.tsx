'use client';

import TLEInput from '@/components/tle-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from "react";

interface SatellitePosition {
  lat: number;
  lng: number;
  alt: number;
  name: string;
  timestamp: Date;
}

// interface SingleTleProcessProps {
//   tleLines: string[] | null;
//   setTleLines: (lines: string[] | null) => void;
// }

interface SingleTleProcessProps {
  onPositionCalculated?: (position: SatellitePosition) => void;
}

// Helper function to convert ECI to lat/lng (you'll need to implement proper conversion)
// function eciToLatLng(x: number, y: number, z: number) {
//   // Simplified conversion - you should use a proper library like satellite.js
//   const r = Math.sqrt(x * x + y * y + z * z);
//   const lat = Math.asin(z / r) * (180 / Math.PI);
//   const lng = Math.atan2(y, x) * (180 / Math.PI);
//   const alt = r - 6371; // Earth radius approximation
  
//   return { lat, lng, alt };
// }


export default function SingleTleProcess({ onPositionCalculated }: SingleTleProcessProps) {
  const [tleLines, setTleLines] = useState<string[] | null>(null);
  const [sgp4Result, setSgp4Result] = useState<any>(null);
  const [fetchedPosition, setFetchedPosition] = useState<any>(null);

  // useEffect(() => {
  //   if (sgp4Result?.positionAndVelocity?.position && onPositionCalculated) {
  //     const { x, y, z } = sgp4Result.positionAndVelocity.position;
  //     const { lat, lng, alt } = eciToLatLng(x, y, z);
      
  //     onPositionCalculated({
  //       lat,
  //       lng,
  //       alt,
  //       name: tleLines?.[0]?.trim() || 'Satellite',
  //       timestamp: new Date()
  //     });
  //   }
  // }, [sgp4Result, onPositionCalculated, tleLines]);


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
      });
    }
  }, [sgp4Result, onPositionCalculated, tleLines]);



  return (
    <>
    <div className="w-3/4 max-w-2xl mx-auto">
      <div >
        <TLEInput
          // tleLines={tleLines}
          setTleLines={setTleLines}
          setSgp4Result={setSgp4Result}
        />
      </div>

    {/* <CesiumWrapper positions={fetchedPosition ? [fetchedPosition.position] : []} /> */}
    
      <div>
        {sgp4Result && (
          <div className="mt-6 space-y-6">
            {/* Position and Velocity */}
            <Card>
              <CardHeader>
                <CardTitle>Position and Velocity</CardTitle>
                <CardDescription>ECI coordinate frame</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Position (km)</TableHead>
                      <TableHead>Velocity (km/s)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Latitude</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.position?.x?.toFixed(3) || 'N/A'}</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.velocity?.x?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Longitude</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.position?.y?.toFixed(3) || 'N/A'}</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.velocity?.y?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Altitude</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.position?.z?.toFixed(3) || 'N/A'}</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.velocity?.z?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Mean Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Satellite Orbit Elements</CardTitle>
                <CardDescription>Mean elements as evolved at propagation date</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Element</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Value</TableHead>
                    
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Semi-major axis</TableCell>
                      <TableCell className="font-mono text-sm">am</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.am?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eccentricity</TableCell>
                      <TableCell className="font-mono text-sm">em</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.em?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Inclination</TableCell>
                      <TableCell className="font-mono text-sm">im</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.im?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Right ascension of ascending node</TableCell>
                      <TableCell className="font-mono text-sm">Om</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.Om?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Argument of perigee</TableCell>
                      <TableCell className="font-mono text-sm">om</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.om?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mean motion</TableCell>
                      <TableCell className="font-mono text-sm">nm</TableCell>
                      <TableCell className="font-mono text-sm">{sgp4Result.positionAndVelocity?.meanElements?.nm?.toFixed(6) || 'N/A'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    </>
  )
  
}