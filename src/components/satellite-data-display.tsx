'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Separator } from '@radix-ui/react-separator';

interface SatelliteDataDisplayProps {
  sgp4Result: any;
}

export default function SatelliteDataDisplay({ sgp4Result }: SatelliteDataDisplayProps) {
  const hasData = sgp4Result && sgp4Result.positionAndVelocity;

  if (!hasData) {
    return (
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Satellite Data</CardTitle>
          <CardDescription>Satellite information and orbital elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-2">No satellite data available</p>
              <p className="text-sm">Please paste a TLE to see satellite information and orbital elements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-y-auto h-[33rem]">
      <CardHeader>
        <CardTitle>Satellite Data</CardTitle>
        <CardDescription>Satellite information and orbital elements</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {/* Basic Satellite Information */}
            <TableRow>
              <TableCell className="font-medium">Satellite Name</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.satelliteName || 'Unknown'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NORAD ID</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.noradId || 'N/A'}</TableCell>
            </TableRow>
            
            <TableRow><TableCell colSpan={2}><Separator className="my-2" /></TableCell></TableRow>
            
            {/* Position Data */}
            <TableRow>
              <TableCell className="font-medium">Latitude</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.latitude?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Longitude</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.longitude?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Altitude</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.altitude?.toFixed(2) || 'N/A'} km</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Speed</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.speed?.toFixed(3) || 'N/A'} km/s</TableCell>
            </TableRow>

            <TableRow><TableCell colSpan={2}><Separator className="my-2" /></TableCell></TableRow>

            {/* Orbital Elements */}
            <TableRow>
              <TableCell className="font-medium">Semi-major Axis</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.semiMajorAxis?.toFixed(2) || 'N/A'} km</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Eccentricity</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.eccentricity?.toFixed(6) || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Inclination</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.inclination?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">RAAN</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.raan?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Argument of Perigee</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.argOfPerigee?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mean Anomaly</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.meanAnomaly?.toFixed(4) || 'N/A'}°</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Apogee</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.apogee?.toFixed(2) || 'N/A'} km</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Perigee</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.perigee?.toFixed(2) || 'N/A'} km</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Orbital Period</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.orbitalPeriod?.toFixed(2) || 'N/A'} minutes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mean Motion</TableCell>
              <TableCell className="font-mono text-sm">{sgp4Result.orbitalElements?.meanMotion?.toFixed(6) || 'N/A'} rev/day</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
