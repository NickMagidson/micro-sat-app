'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
          <CardDescription>Position, velocity, and orbital elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-2">No satellite data available</p>
              <p className="text-sm">Please paste a TLE to see position, velocity, and orbital elements</p>
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
        <CardDescription>Position, velocity, and orbital elements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Position and Velocity</h3>
          <p className="text-sm text-muted-foreground mb-4">ECI coordinate frame</p>
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
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-semibold mb-2">Satellite Orbit Elements</h3>
          <p className="text-sm text-muted-foreground mb-4">Mean elements as evolved at propagation date</p>
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
        </div>
      </CardContent>
    </Card>
  );
}
