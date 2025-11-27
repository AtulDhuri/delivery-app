import { Package } from '../package.js';
describe('Package', () => {
    test('should create package with all properties', () => {
        const pkg = new Package(100, 50, 30, 'OFR001', 'PKG1');
        expect(pkg.baseCost).toBe(100);
        expect(pkg.weight).toBe(50);
        expect(pkg.distance).toBe(30);
        expect(pkg.offerCode).toBe('OFR001');
        expect(pkg.pkgId).toBe('PKG1');
    });
    test('should create package with default values', () => {
        const pkg = new Package(100, 50, 30);
        expect(pkg.offerCode).toBeNull();
        expect(pkg.pkgId).toBeNull();
    });
});
