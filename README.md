# Delivery App

A TypeScript-based CLI application for calculating delivery costs and optimizing delivery times using vehicle scheduling.

## Design Approach

### Problem-Solving Strategy
- **Modular Architecture**: Separated concerns into distinct classes (Package, Vehicle, Scheduler, CostCalculator)
- **Interface-Based Design**: Used TypeScript interfaces (IOffer) for extensible offer system
- **Input Validation**: Comprehensive validation at entry points to catch errors early
- **Error Handling**: Graceful error handling with meaningful error messages

### Key Design Decisions

1. **Cost Calculation**: Base formula = `baseCost + (weight * 10) + (distance * 5)`
   - Offers are applied as percentage discounts when validation criteria are met
   - Discount calculation: `originalCost - (originalCost * discountPercentage)`

2. **Scheduler Algorithm**: Greedy approach with optimization
   - Sorts packages by weight (descending) then distance (ascending)
   - Assigns to earliest available vehicle that can carry the package
   - Accounts for return trip time in vehicle availability

3. **Offer System**: Strategy pattern with three predefined offers
   - OFR001: 10% discount (weight 70-200, distance 0-200)
   - OFR002: 7% discount (weight 100-250, distance 50-150)
   - OFR003: 5% discount (weight 10-150, distance 50-250)

## Features

### Cost Mode
Calculates delivery costs with optional discounts based on offer codes.

**Input Format:**
```
<base_cost> <number_of_packages>
<package_id> <weight> <distance> <offer_code>
...
```

**Output:**
```
<package_id> <discount> <total_cost>
```

### Time Mode
Calculates delivery times using vehicle scheduling.

**Input Format:**
```
<base_cost> <number_of_packages> <number_of_vehicles> <max_speed> <max_weight>
<package_id> <weight> <distance> <offer_code>
...
```

**Output:**
```
<package_id> <delivery_time> hours
```

## Validation

### Input Validation
- Non-negative base cost, weights, and distances
- Valid package count matching actual packages provided
- Vehicle count > 0, speed > 0, max weight > 0
- Package IDs must be present
- Packages cannot exceed vehicle max weight

### Error Handling
- Clear error messages for validation failures
- Graceful handling of malformed input
- No crashes on invalid data

## Testing

### Test Coverage
- **Unit Tests**: Individual class functionality (Calculator, Offers, Package, Vehicle)
- **Integration Tests**: Complete workflows for both modes
- **Edge Cases**: Empty inputs, boundary conditions, validation errors

### Running Tests
```bash
npm test
```

### Test Files
- `calculator.test.js`: Cost calculation logic
- `offers.test.js`: Offer validation and discounts
- `package.test.js`: Package model
- `costMode.test.js`: Cost mode functionality and validation
- `timeMode.test.js`: Time mode functionality and validation
- `integration.test.js`: End-to-end workflows

## Code Quality

### Best Practices Implemented
- TypeScript for type safety
- Immutable data handling where possible
- Clear separation of concerns
- Minimal, focused functions
- Comprehensive error handling
- Extensive test coverage

### Production Readiness
- Input validation prevents invalid states
- Error messages guide users to correct input
- Modular design allows easy extension
- Tests ensure reliability

## Setup

### Prerequisites
- Node.js 16+
- npm

### Installation
```bash
npm install
```

### Build
```bash
npm run build
```

### Run
```bash
npm start
```

## Architecture

```
src/
├── cli.ts              # CLI entry point
├── costMode.ts         # Cost calculation mode
├── timeMode.ts         # Time optimization mode
├── calculator.ts       # Cost calculation logic
├── offers.ts           # Offer definitions
├── package.ts          # Package model
├── vehicle.ts          # Vehicle model
├── scheduler.ts        # Delivery scheduling
├── shipment.ts         # Shipment model
└── __tests__/          # Test suite
```

## Trade-offs

1. **Scheduler Simplicity vs Optimization**: Current greedy approach is simple and fast but may not find globally optimal solution. Could be enhanced with more sophisticated algorithms (e.g., bin packing, genetic algorithms).

2. **Validation Strictness**: Strict validation prevents invalid states but requires precise input format. Could add more flexible parsing if needed.

3. **Offer System**: Fixed offers require code changes to add new ones. Could be externalized to configuration for runtime flexibility.

## Future Enhancements

- Configuration file support for offers
- Advanced scheduling algorithms (simulated annealing, genetic algorithms)
- Persistent storage for delivery history
- REST API for programmatic access
- Real-time tracking capabilities
