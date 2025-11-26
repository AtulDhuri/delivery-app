
 import { Package } from "./package.js";
 import type { IOffer } from "./offers.js";

export class CostCalculator {
  static baseFormula(pkg: Package): number {
    return pkg.baseCost + (pkg.weight * 10) + (pkg.distance * 5);
  }

  calculate(pkg: Package, offer?: IOffer): number {
    const original = CostCalculator.baseFormula(pkg);
    if (offer && offer.isValid(pkg)) {
      return original - (original * offer.discount());
    }
    return original;
  }
}
