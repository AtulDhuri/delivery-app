import { Package } from "./package.js";

export class Shipment {
  constructor(public packages: Package[], public totalWeight: number) {}
}