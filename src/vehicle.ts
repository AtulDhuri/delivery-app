export class Vehicle {
  constructor(
    public id: number,
    public maxSpeed: number,
    public maxWeight: number,
    public availableAt: number = 0 // time in hours
  ) {}
}