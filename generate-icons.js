/**
 * Script to generate PNG icons from SVG
 * Requires the 'sharp' package
 * Run with: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Icon sizes
const sizes = [16, 48, 128];

// Paths
const svgPath = path.join(__dirname, 'extension', 'assets', 'icons', 'icon.svg');
const outputDir = path.join(__dirname, 'extension', 'assets', 'icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Generate icons for each size
async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${outputPath}`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Run the function
generateIcons();
