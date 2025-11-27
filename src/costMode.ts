import { Package } from "./package.js";
import { offersMap } from "./offers.js";
import { CostCalculator } from "./calculator.js";

function validateInput(lines: string[]): { valid: boolean; error?: string } {
  if (!lines || lines.length === 0) return { valid: false, error: "No input provided" };
  
  const headerLine = lines[0];
  if (!headerLine) return { valid: false, error: "Invalid header format" };
  const parts = headerLine.split(/\s+/);
  const baseCostStr = parts[0];
  const noOfPackagesStr = parts[1];
  
  if (!baseCostStr || !noOfPackagesStr) return { valid: false, error: "Invalid header format" };
  
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);

  if (isNaN(baseCost) || baseCost < 0) return { valid: false, error: "Invalid base cost" };
  if (isNaN(noOfPackages) || noOfPackages < 0) return { valid: false, error: "Invalid package count" };
  if (lines.length !== noOfPackages + 1) return { valid: false, error: "Package count mismatch" };

  for (let i = 1; i <= noOfPackages; i++) {
    const line = lines[i];
    if (!line) return { valid: false, error: `Missing package at line ${i + 1}` };
    const pkgParts = line.split(/\s+/);
    const pkgId = pkgParts[0]!;
    const weightStr = pkgParts[1]!;
    const distStr = pkgParts[2]!;
    
    const weight = Number(weightStr);
    const distance = Number(distStr);

    if (isNaN(weight) || weight < 0) return { valid: false, error: `Invalid weight at line ${i + 1}` };
    if (isNaN(distance) || distance < 0) return { valid: false, error: `Invalid distance at line ${i + 1}` };
  }

  return { valid: true };
}

export function runCostMode(lines: string[]) {
  const validation = validateInput(lines);
  if (!validation.valid) {
    console.error(`Error: ${validation.error}`);
    return;
  }

  const headerLine = lines[0];
  if (!headerLine) return;
  const parts = headerLine.split(/\s+/);
  const baseCostStr = parts[0]!;
  const noOfPackagesStr = parts[1]!;
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);

  const packages: Package[] = [];
  for (let i = 1; i <= noOfPackages; i++) {
    const line = lines[i]!;
    const pkgParts = line.split(/\s+/);
    const pkgId = pkgParts[0]!;
    const weightStr = pkgParts[1]!;
    const distStr = pkgParts[2]!;
    const offerCode = pkgParts[3];
    
    packages.push(new Package(baseCost, Number(weightStr), Number(distStr), offerCode || undefined, pkgId));
  }

  const calculator = new CostCalculator();
  packages.forEach(pkg => {
    const offer = pkg.offerCode && offersMap[pkg.offerCode] ? offersMap[pkg.offerCode] : undefined;
    const totalCost = calculator.calculate(pkg, offer);

    let discount = 0;
    const originalCost = CostCalculator.baseFormula(pkg);
    if (offer && offer.isValid(pkg)) {
      discount = originalCost - totalCost;
    }

    console.log(`${pkg.pkgId} ${Math.round(discount)} ${Math.round(totalCost)}`);
  });
}
