import { Package } from '../package.js';
import { OFR001, OFR002, OFR003, offersMap } from '../offers.js';
describe('Offers', () => {
    describe('OFR001', () => {
        const offer = new OFR001();
        test('should validate packages within weight and distance limits', () => {
            const pkg = new Package(100, 100, 100);
            expect(offer.isValid(pkg)).toBe(true);
        });
        test('should reject packages below weight limit', () => {
            const pkg = new Package(100, 50, 100);
            expect(offer.isValid(pkg)).toBe(false);
        });
        test('should reject packages above distance limit', () => {
            const pkg = new Package(100, 100, 250);
            expect(offer.isValid(pkg)).toBe(false);
        });
        test('should return 10% discount', () => {
            expect(offer.discount()).toBe(0.10);
        });
    });
    describe('OFR002', () => {
        const offer = new OFR002();
        test('should validate packages within limits', () => {
            const pkg = new Package(100, 150, 100);
            expect(offer.isValid(pkg)).toBe(true);
        });
        test('should return 7% discount', () => {
            expect(offer.discount()).toBe(0.07);
        });
    });
    describe('OFR003', () => {
        const offer = new OFR003();
        test('should validate packages within limits', () => {
            const pkg = new Package(100, 100, 100);
            expect(offer.isValid(pkg)).toBe(true);
        });
        test('should return 5% discount', () => {
            expect(offer.discount()).toBe(0.05);
        });
    });
    test('offersMap should contain all offers', () => {
        expect(offersMap['OFR001']).toBeInstanceOf(OFR001);
        expect(offersMap['OFR002']).toBeInstanceOf(OFR002);
        expect(offersMap['OFR003']).toBeInstanceOf(OFR003);
    });
});
