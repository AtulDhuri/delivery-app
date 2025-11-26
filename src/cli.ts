#!/usr/bin/env node
import * as readline from "readline";
import { runCostMode } from "./costMode.js";
import { runTimeMode } from "./timeMode.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let mode: "cost" | "time" | null = null;
const lines: string[] = [];

let expectedLines = 0;

// Step 1: Ask user to select mode
rl.question("Select mode (cost / time): ", (answer) => {
  if (answer.toLowerCase() === "cost") {
    mode = "cost";
    console.log("You selected COST mode.");
    console.log("Enter base cost and number of packages (e.g., '100 3'):");
  } else if (answer.toLowerCase() === "time") {
    mode = "time";
    console.log("You selected TIME mode.");
    console.log("Enter base cost, number of packages, number of vehicles, max speed, max weight (e.g., '100 5 2 70 200'):");
  } else {
    console.error("Invalid mode. Please restart and type 'cost' or 'time'.");
    rl.close();
    return;
  }

  // Step 2: Start collecting input lines
  rl.on("line", (line: string) => {
    if (line.trim()) {
      lines.push(line.trim());
      
      // If this is the first line, extract expected number of packages
      if (lines.length === 1) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          expectedLines = 1 + Number(parts[1]); // 1 header + N packages
          if (mode === "cost") {
            console.log(`Enter ${parts[1]} package details (format: PKG_ID WEIGHT DISTANCE OFFER_CODE):`);
          } else if (mode === "time") {
            console.log(`Enter ${parts[1]} package details (format: PKG_ID WEIGHT DISTANCE OFFER_CODE):`);
          }
        }
      }
      
      // Auto-process when we have all expected lines
      if (expectedLines > 0 && lines.length >= expectedLines) {
        rl.close();
      }
    }
  });

  // Step 3: Process input when finished
  rl.on("close", () => {
    if (lines.length === 0) {
      console.log("No input provided.");
      return;
    }
    
    if (mode === "cost") {
      runCostMode(lines);
    } else if (mode === "time") {
      runTimeMode(lines);
    }
  });
});