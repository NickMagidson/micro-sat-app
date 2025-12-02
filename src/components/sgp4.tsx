import { json2satrec, sgp4, twoline2satrec } from "satellite.js";

interface TleProps {
  line1: string;
  line2: string;
}

function sgp4FromTle({ line1, line2 }: TleProps) {
  const satrec = twoline2satrec(line1, line2);
  const positionAndVelocity = sgp4(satrec, 0);
  
  // Calculate orbit path - one complete orbit
  const orbitPath = [];
  const orbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(satrec.a * 6371, 3) / 398600.4418); // Approximate period in seconds
  const steps = 100; // Number of points along the orbit
  
  for (let i = 0; i < steps; i++) {
    const timeOffset = (i / steps) * orbitalPeriod / 60; // Convert to minutes for SGP4
    const orbitPosition = sgp4(satrec, timeOffset);
    
    if (orbitPosition && orbitPosition.position) {
      const { x, y, z } = orbitPosition.position;
      const r = Math.sqrt(x * x + y * y + z * z);
      const lat = Math.asin(z / r) * (180 / Math.PI);
      const lng = Math.atan2(y, x) * (180 / Math.PI);
      const alt = r - 6371; // Earth radius in km
      
      orbitPath.push({ lat, lng, alt });
    }
  }
  
  return { positionAndVelocity, satrec, orbitPath };
}

function sgp4FromOmm({ omm }: { omm: any }) {
  const satrecFromOmm = json2satrec(omm);
  return satrecFromOmm;
}

export { sgp4FromOmm, sgp4FromTle };
