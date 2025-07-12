#!/usr/bin/env node

import fs from 'fs';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node convert-figma-tokens.js <input-file> [output-file]');
  console.log('Example: node convert-figma-tokens.js figma-tokens.json tokens.json');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || 'tokens.json';

try {
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const figmaTokens = JSON.parse(rawData);
  
  function convertFigmaTokens(tokens) {
    if (tokens.global || tokens.$themes) {
      return convertTokensStudioFormat(tokens);
    }
    
    if (tokens.tokens) {
      return convertDesignTokensFormat(tokens);
    }
    
    return tokens;
  }
  
  function convertTokensStudioFormat(tokens) {
    const converted = {};
    
    if (tokens.global) {
      Object.keys(tokens.global).forEach(category => {
        converted[category] = tokens.global[category];
      });
    }
    
    return converted;
  }
  
  function convertDesignTokensFormat(tokens) {
    return tokens.tokens || tokens;
  }
  
  const convertedTokens = convertFigmaTokens(figmaTokens);
  
  fs.writeFileSync(outputFile, JSON.stringify(convertedTokens, null, 2));
  
  console.log(`✅ Converted tokens from ${inputFile} to ${outputFile}`);
  console.log('🔄 Now run: npm run tokens:build');
  
} catch (error) {
  console.error('❌ Error converting tokens:', error.message);
  console.log('\n💡 Tips:');
  console.log('1. Check if the input file exists and is valid JSON');
  console.log('2. Make sure the Figma export format is supported');
  console.log('3. You might need to manually adjust the token structure');
}
