import { Package } from "./package.js";
import { Vehicle } from "./vehicle.js";

export class Scheduler {
  constructor(private vehicles: Vehicle[]) {}

  assignShipments(packages: Package[]): Map<string, number> {
    const deliveryTimes = new Map<string, number>();

    // Sort packages by rules: heavier first, then shorter distance
    packages.sort((a, b) => {
      if (a.weight !== b.weight) return b.weight - a.weight;
      return a.distance - b.distance;
    });

    for (const pkg of packages) {
      if (this.vehicles.length === 0) {
        console.error("No vehicles available for delivery");
        continue;
      }
      
      // Find vehicle with earliest availability that can carry package
      let bestVehicle: Vehicle | undefined = this.vehicles[0];
      for (const v of this.vehicles) {
        if (bestVehicle && v.availableAt < bestVehicle.availableAt && pkg.weight <= v.maxWeight) {
          bestVehicle = v;
        }
      }

      if (bestVehicle && pkg.weight <= bestVehicle.maxWeight) {
        const travelTime = pkg.distance / bestVehicle.maxSpeed;
        const deliveryTime = bestVehicle.availableAt + travelTime;
        deliveryTimes.set(pkg.pkgId!, deliveryTime);

        // Update vehicle availability (return trip)
        bestVehicle.availableAt = deliveryTime + travelTime;
      }
    }

    return deliveryTimes;
  }
}
