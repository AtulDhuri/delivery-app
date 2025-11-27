import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { runCostMode } from '../costMode.js';
import { runTimeMode } from '../timeMode.js';

describe('Integration Tests', () => {
  let consoleSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('Cost Mode Integration', () => {
    test('should process complete cost mode workflow', () => {
      const input = [
        '100 3',
        'PKG1 50 30 OFR001',
        'PKG2 100 100 OFR002',
        'PKG3 20 50 OFR003'
      ];

      runCostMode(input);

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle cost mode with no offers', () => {
      const input = [
        '100 2',
        'PKG1 50 30',
        'PKG2 100 100'
      ];

      runCostMode(input);

      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Time Mode Integration', () => {
    test('should process complete time mode workflow', () => {
      const input = [
        '100 3 2 70 200',
        'PKG1 50 30 OFR001',
        'PKG2 100 100 OFR002',
        'PKG3 20 50 OFR003'
      ];

      runTimeMode(input);

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should distribute packages across multiple vehicles', () => {
      const input = [
        '100 4 2 60 150',
        'PKG1 100 100 OFR001',
        'PKG2 120 80 OFR002',
        'PKG3 50 50 OFR003',
        'PKG4 80 60 OFR001'
      ];

      runTimeMode(input);

      expect(consoleSpy).toHaveBeenCalledTimes(4);
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle malformed cost mode input gracefully', () => {
      const input = [
        'invalid data',
        'PKG1 50 30'
      ];

      runCostMode(input);

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should handle malformed time mode input gracefully', () => {
      const input = [
        'invalid data',
        'PKG1 50 30'
      ];

      runTimeMode(input);

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should reject inconsistent data in cost mode', () => {
      const input = [
        '100 3',
        'PKG1 50 30',
        'PKG2 100 100'
      ];

      runCostMode(input);

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Package count mismatch'));
    });

    test('should reject inconsistent data in time mode', () => {
      const input = [
        '100 3 2 70 200',
        'PKG1 50 30',
        'PKG2 100 100'
      ];

      runTimeMode(input);

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Package count mismatch'));
    });
  });
});
