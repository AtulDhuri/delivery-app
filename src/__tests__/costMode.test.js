import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { runCostMode } from '../costMode.js';

describe('runCostMode function tests', () => {
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

  test('should parse input and calculate costs correctly', () => {
    const input = [
      '100 2',
      'PKG1 5 5 OFR001',
      'PKG2 15 5 OFR002'
    ];

    runCostMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'PKG1 0 175');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'PKG2 0 275');
  });

  test('should handle single package', () => {
    const input = [
      '100 1',
      'PKG1 10 20 OFR001'
    ];

    runCostMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('PKG1 0 300');
  });

  test('should handle empty package list', () => {
    const input = ['100 0'];
    runCostMode(input);

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('should reject negative weight', () => {
    const input = [
      '100 1',
      'PKG1 -5 10 OFR001'
    ];

    runCostMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid weight'));
  });

  test('should reject negative distance', () => {
    const input = [
      '100 1',
      'PKG1 10 -5 OFR001'
    ];

    runCostMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid distance'));
  });

  test('should reject negative base cost', () => {
    const input = [
      '-100 1',
      'PKG1 10 10 OFR001'
    ];

    runCostMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid base cost'));
  });

  test('should reject package count mismatch', () => {
    const input = [
      '100 2',
      'PKG1 10 10 OFR001'
    ];

    runCostMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Package count mismatch'));
  });

  test('should handle empty input', () => {
    runCostMode([]);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('No input provided'));
  });

  test('should calculate costs with different weights and distances', () => {
    const input = [
      '50 3',
      'PKG1 2 10 OFR001',
      'PKG2 8 15 OFR002', 
      'PKG3 12 25 OFR003'
    ];

    runCostMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'PKG1 0 120');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'PKG2 0 205');
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'PKG3 0 295');
  });
});
