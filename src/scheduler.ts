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
      // Check if we have vehicles
      if (this.vehicles.length === 0) {
        console.error("No vehicles available for delivery");
        continue;
      }
      
      // Find earliest available vehicle that can carry this package
      const vehicle = this.vehicles.reduce((earliest, v) =>
        v.availableAt < earliest.availableAt ? v : earliest
      );

      if (pkg.weight <= vehicle.maxWeight) {
        const travelTime = pkg.distance / vehicle.maxSpeed;
        const deliveryTime = vehicle.availableAt + travelTime;
        deliveryTimes.set(pkg.pkgId!, deliveryTime);

        // Update vehicle availability (return trip)
        vehicle.availableAt = deliveryTime + travelTime;
      }
    }

    return deliveryTimes;
  }
}