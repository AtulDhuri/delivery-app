import { Package } from "./package.js";
import { Vehicle } from "./vehicle.js";
import { Scheduler } from "./scheduler.js";

export function runTimeMode(lines: string[]) {
  const [baseCostStr, noOfPackagesStr, noOfVehiclesStr, speedStr, maxWeightStr] = lines[0]?.split(/\s+/) || [];
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);

  const packages: Package[] = [];
  for (let i = 1; i <= noOfPackages; i++) {
    const [pkgId, weightStr, distStr, offerCode] = lines[i]?.split(/\s+/) || [];
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