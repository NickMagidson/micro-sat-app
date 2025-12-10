import { degreesLat, degreesLong, eciToGeodetic, gstime, json2satrec, sgp4, twoline2satrec } from "satellite.js";

interface TleProps {
  line0?: string; // Satellite name
  line1: string;
  line2: string;
  epochTime?: Date; // Add optional epoch parameter
}

function sgp4FromTle({ line0, line1, line2, epochTime }: TleProps) {
  const satrec = twoline2satrec(line1, line2);
  
  // Use current time if no epoch provided
  const targetTime = epochTime || new Date();
  
  // Calculate time since TLE epoch in minutes
  // Convert TLE epoch (Julian days) to JavaScript Date
  const tleEpochJulian = satrec.jdsatepoch;
  const tleEpochMs = (tleEpochJulian - 2440587.5) * 86400000; // Convert Julian to Unix timestamp
  const tleEpoch = new Date(tleEpochMs);
  
  const timeOffset = (targetTime.getTime() - tleEpoch.getTime()) / (1000 * 60); // Difference in minutes
  
  // Calculate GMST for proper coordinate conversion
  const gmst = gstime(targetTime);
  
  // Calculate position at target time
  const positionAndVelocity = sgp4(satrec, timeOffset);
  
  if (!positionAndVelocity || !positionAndVelocity.position) {
    throw new Error('SGP4 propagation failed');
  }

  // Convert ECI to geodetic coordinates (lat/lon/alt)
  const geodetic = eciToGeodetic(positionAndVelocity.position, gmst);
  
  const latitude = degreesLat(geodetic.latitude);
  const longitude = degreesLong(geodetic.longitude);
  const altitude = geodetic.height; // km above sea level
  
  // Calculate velocity magnitude (speed)
  const velocity = positionAndVelocity.velocity;
  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
  
  // Calculate orbital elements
  const meanMotion = satrec.no; // revolutions per day
  const eccentricity = satrec.ecco;
  const inclination = satrec.inclo * (180 / Math.PI); // convert from radians to degrees
  const raan = satrec.nodeo * (180 / Math.PI); // Right Ascension of Ascending Node
  const argOfPerigee = satrec.argpo * (180 / Math.PI);
  const meanAnomaly = satrec.mo * (180 / Math.PI);
  
  // Calculate semi-major axis (a) from mean motion
  const mu = 398600.4418; // Earth's gravitational parameter (km³/s²)
  const n = meanMotion * 2 * Math.PI / (24 * 3600); // convert to rad/s
  const semiMajorAxis = Math.pow(mu / (n * n), 1/3);
  
  // Calculate apogee and perigee
  const apogee = semiMajorAxis * (1 + eccentricity) - 6371; // Earth radius ~6371 km
  const perigee = semiMajorAxis * (1 - eccentricity) - 6371;
  
  // Calculate orbital period in minutes
  const orbitalPeriod = (2 * Math.PI) / satrec.no; // Period in minutes
  
  // Calculate orbit path for visualization
  const orbitPath = [];
  const steps = 100;
  
  for (let i = 0; i < steps; i++) {
    const pathTimeOffset = timeOffset + (i / steps) * orbitalPeriod;
    const orbitPosition = sgp4(satrec, pathTimeOffset);
    
    if (orbitPosition && orbitPosition.position) {
      // Calculate GMST for this time step
      const stepTime = new Date(targetTime.getTime() + (i / steps) * orbitalPeriod * 60 * 1000);
      const stepGmst = gstime(stepTime);
      const stepGeodetic = eciToGeodetic(orbitPosition.position, stepGmst);
      
      orbitPath.push({
        lat: degreesLat(stepGeodetic.latitude),
        lng: degreesLong(stepGeodetic.longitude),
        alt: stepGeodetic.height
      });
    }
  }
  
  return {
    positionAndVelocity,
    orbitPath,
    satrec,
    timeOffset,
    epochUsed: targetTime,
    // Geodetic coordinates for easy access
    latitude,
    longitude,
    altitude,
    speed,
    // Orbital elements
    orbitalElements: {
      semiMajorAxis,
      eccentricity,
      inclination,
      raan,
      argOfPerigee,
      meanAnomaly,
      meanMotion,
      orbitalPeriod,
      apogee,
      perigee
    },
    // Raw ECI coordinates
    eci: {
      x: positionAndVelocity.position.x,
      y: positionAndVelocity.position.y,
      z: positionAndVelocity.position.z
    },
    // TLE data
    satelliteName: line0?.trim().replace(/^0\s+/, '') || 'Unknown Satellite',
    noradId: satrec.satnum
  };
}

function sgp4FromOmm({ omm }: { omm: any }) {
  const satrecFromOmm = json2satrec(omm);
  return satrecFromOmm;
}

export { sgp4FromOmm, sgp4FromTle };
