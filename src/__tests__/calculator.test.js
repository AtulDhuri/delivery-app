import { Package } from '../package.js';
import { CostCalculator } from '../calculator.js';
import { OFR001 } from '../offers.js';
describe('CostCalculator', () => {
    const calculator = new CostCalculator();
    test('should calculate base cost without offer', () => {
        const pkg = new Package(100, 50, 30);
        const cost = calculator.calculate(pkg);
        // 100 + (50 * 10) + (30 * 5) = 100 + 500 + 150 = 750
        expect(cost).toBe(750);
    });
    test('should apply discount when offer is valid', () => {
        const pkg = new Package(100, 100, 100);
        const offer = new OFR001();
        const cost = calculator.calculate(pkg, offer);
        // Base: 100 + (100 * 10) + (100 * 5) = 1600
        // Discount: 1600 * 0.10 = 160
        // Final: 1600 - 160 = 1440
        expect(cost).toBe(1440);
    });
    test('should not apply discount when offer is invalid', () => {
        const pkg = new Package(100, 50, 100); // Weight too low for OFR001
        const offer = new OFR001();
        const cost = calculator.calculate(pkg, offer);
        // 100 + (50 * 10) + (100 * 5) = 1100 (no discount)
        expect(cost).toBe(1100);
    });
    test('baseFormula should calculate correctly', () => {
        const pkg = new Package(100, 75, 125);
        const baseCost = CostCalculator.baseFormula(pkg);
        // 100 + (75 * 10) + (125 * 5) = 100 + 750 + 625 = 1475
        expect(baseCost).toBe(1475);
    });
});
