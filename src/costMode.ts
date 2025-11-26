import { Package } from "./package.js";
import { offersMap } from "./offers.js";
import { CostCalculator } from "./calculator.js";

export function runCostMode(lines: string[]) {
  const [baseCostStr, noOfPackagesStr] = lines[0]?.split(/\s+/)|| [];;
  const baseCost = Number(baseCostStr);
  const noOfPackages = Number(noOfPackagesStr);

  const packages: Package[] = [];
  for (let i = 1; i <= noOfPackages; i++) {
    const [pkgId, weightStr, distStr, offerCode] = lines[i]?.split(/\s+/) || [];;
    packages.push(new Package(baseCost, Number(weightStr), Number(distStr), offerCode, pkgId));
  }

  const calculator = new CostCalculator();
  packages.forEach(pkg => {
    const offer = pkg.offerCode ? offersMap[pkg.offerCode] : undefined;
    const totalCost = calculator.calculate(pkg, offer);

    let discount = 0;
    const originalCost = CostCalculator.baseFormula(pkg);
    if (offer && offer.isValid(pkg)) {
      discount = originalCost - totalCost;
    }

    console.log(`${pkg.pkgId} ${Math.round(discount)} ${Math.round(totalCost)}`);
  });
}