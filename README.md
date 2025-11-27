# Delivery App

CLI app to calculate delivery costs and optimize delivery times.

## Modes

**Cost Mode**: Calculate delivery cost with discounts
- Input: base cost, packages (id, weight, distance, offer code)
- Output: package id, discount, total cost

**Time Mode**: Calculate delivery time with vehicle scheduling
- Input: base cost, packages, vehicles, max speed, max weight
- Output: package id, delivery time in hours

## How to Run

```bash
npm install
npm run build
npm start
```

## Validation

- All numeric inputs must be numbers
- Package weight cannot exceed vehicle max weight (time mode)
- Vehicle count > 0, speed > 0, max weight > 0

## Offers

- OFR001: 10% (weight 70-200, distance 0-200)
- OFR002: 7% (weight 100-250, distance 50-150)
- OFR003: 5% (weight 10-150, distance 50-250)

## Cost Formula

`baseCost + (weight * 10) + (distance * 5)`

Discount applied if offer criteria met.


