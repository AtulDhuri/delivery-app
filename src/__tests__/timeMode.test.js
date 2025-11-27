import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { runTimeMode } from '../timeMode.js';

describe('runTimeMode function tests', () => {
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

  test('should parse input correctly and handle basic scenario', () => {
    const input = [
      '100 1 1 50 100',
      'PKG1 80 40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('PKG1 0.80 hours');
  });

  test('should handle empty package list', () => {
    const input = ['100 0 1 50 100'];
    runTimeMode(input);

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('should reject negative weight', () => {
    const input = [
      '100 1 1 50 100',
      'PKG1 -10 40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid weight'));
  });

  test('should reject negative distance', () => {
    const input = [
      '100 1 1 50 100',
      'PKG1 10 -40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid distance'));
  });

  test('should reject zero vehicles', () => {
    const input = [
      '100 1 0 50 100',
      'PKG1 10 40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid vehicle count'));
  });

  test('should reject zero speed', () => {
    const input = [
      '100 1 1 0 100',
      'PKG1 10 40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid speed'));
  });

  test('should reject package exceeding max weight', () => {
    const input = [
      '100 1 1 50 50',
      'PKG1 100 40 OFR001'
    ];

    runTimeMode(input);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('exceeds max weight'));
  });

  test('should calculate delivery times correctly', () => {
    const input = [
      '100 2 1 60 100',
      'PKG1 50 30 OFR001',
      'PKG2 75 60 OFR002'
    ];

    runTimeMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });

  test('should handle multiple vehicles', () => {
    const input = [
      '100 2 2 50 100',
      'PKG1 50 100 OFR001',
      'PKG2 60 100 OFR002'
    ];

    runTimeMode(input);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });

  test('should handle empty input', () => {
    runTimeMode([]);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('No input provided'));
  });
});
