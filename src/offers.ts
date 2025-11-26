import { Package } from "./package.js";


export interface IOffer {
  isValid(pkg: Package): boolean;
  discount(): number;
}


export class OFR001 implements IOffer {
  isValid(pkg: Package): boolean {
    return pkg.weight >= 70 && pkg.weight <= 200 && pkg.distance >= 0 && pkg.distance <= 200;
  }

  discount(): number {
    return 0.10;
  }
}

export class OFR002 implements IOffer {
  isValid(pkg: Package): boolean {
    return pkg.weight >= 100 && pkg.weight <= 250 && pkg.distance >= 50 && pkg.distance <= 150;
  }

  discount(): number {
    return 0.07;
  }
}


export class OFR003 implements IOffer {
  isValid(pkg: Package): boolean {
    return pkg.weight >= 10 && pkg.weight <= 150 && pkg.distance >= 50 && pkg.distance <= 250;
  }

  discount(): number {
    return 0.05;
  }
}

export const offersMap: Record<string, IOffer> = {
  "OFR001": new OFR001(),
  "OFR002": new OFR002(),
  "OFR003": new OFR003()
};
