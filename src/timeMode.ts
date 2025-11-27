import { Package } from "./package.js";
import { Vehicle } from "./vehicle.js";
import { Scheduler } from "./scheduler.js";

function validateTimeInput(lines: string[]): { valid: boolean; error?: string } {
  if (!lines || lines.length === 0) return { valid: false, error: "No input provided" };
  
  const headerLine = lines[0];
  if (!headerLine) return { valid: false, error: "Invalid header format" };
  const parts = headerLine.split(/\s+/);
  const baseCostStr = parts[0];
  const noOfPackagesStr = parts[1];
  const noOfVehiclesStr = parts[2];
  const speedStr = parts[3];
  const maxWeightStr = parts[4];
  
  if (!baseCostStr || !noOfPackagesStr || !noOfVehiclesStr || !speedStr || !maxWeightStr) {
    return { valid: false, error: "Invalid header format" };
  }
  
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);
  const noOfVehicles = Number(noOfVehiclesStr);
  const speed = Number(speedStr);
  const maxWeight = Number(maxWeightStr);

  if (isNaN(baseCost) || baseCost < 0) return { valid: false, error: "Invalid base cost" };
  if (isNaN(noOfPackages) || noOfPackages < 0) return { valid: false, error: "Invalid package count" };
  if (isNaN(noOfVehicles) || noOfVehicles <= 0) return { valid: false, error: "Invalid vehicle count" };
  if (isNaN(speed) || speed <= 0) return { valid: false, error: "Invalid speed" };
  if (isNaN(maxWeight) || maxWeight <= 0) return { valid: false, error: "Invalid max weight" };
  if (lines.length !== noOfPackages + 1) return { valid: false, error: "Package count mismatch" };

  for (let i = 1; i <= noOfPackages; i++) {
    const pkgLine = lines[i];
    if (!pkgLine) return { valid: false, error: `Missing package at line ${i + 1}` };
    const pkgParts = pkgLine.split(/\s+/);
    const pkgId = pkgParts[0];
    const weightStr = pkgParts[1];
    const distStr = pkgParts[2];
    
    if (!pkgId || !weightStr || !distStr) return { valid: false, error: `Invalid package format at line ${i + 1}` };
    
    const weight = Number(weightStr);
    const distance = Number(distStr);

    if (isNaN(weight) || weight < 0) return { valid: false, error: `Invalid weight at line ${i + 1}` };
    if (isNaN(distance) || distance < 0) return { valid: false, error: `Invalid distance at line ${i + 1}` };
    if (weight > maxWeight) return { valid: false, error: `Package ${pkgId} exceeds max weight` };
  }

  return { valid: true };
}

export function runTimeMode(lines: string[]) {
  const validation = validateTimeInput(lines);
  if (!validation.valid) {
    console.error(`Error: ${validation.error}`);
    return;
  }

  const headerLine = lines[0];
  if (!headerLine) return;
  const parts = headerLine.split(/\s+/);
  const baseCostStr = parts[0]!;
  const noOfPackagesStr = parts[1]!;
  const noOfVehiclesStr = parts[2]!;
  const speedStr = parts[3]!;
  const maxWeightStr = parts[4]!;
  
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);

  const packages: Package[] = [];
  for (let i = 1; i <= noOfPackages; i++) {
    const pkgLine = lines[i];
    if (!pkgLine) continue;
    const pkgParts = pkgLine.split(/\s+/);
    const pkgId = pkgParts[0]!;
    const weightStr = pkgParts[1]!;
    const distStr = pkgParts[2]!;
    const offerCode = pkgParts[3];
    
    packages.push(new Package(baseCost, Number(weightStr), Number(distStr), offerCode, pkgId));
  }

  const vehicles: Vehicle[] = [];
  for (let i = 0; i < Number(noOfVehiclesStr); i++) {
    vehicles.push(new Vehicle(i + 1, Number(speedStr), Number(maxWeightStr)));
  }

  const scheduler = new Scheduler(vehicles);
  const deliveryTimes = scheduler.assignShipments(packages);

  packages.forEach(pkg => {
    const time = deliveryTimes.get(pkg.pkgId!);
    console.log(`${pkg.pkgId} ${time?.toFixed(2)} hours`);
  });
}
