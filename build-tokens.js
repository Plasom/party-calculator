#!/usr/bin/env node

import fs from 'fs';

// Read tokens.json
const tokens = JSON.parse(fs.readFileSync('./tokens.json', 'utf8'));

// Function to resolve token references
function resolveReferences(obj, allTokens) {
  if (typeof obj === 'string' && obj.startsWith('{') && obj.endsWith('}')) {
    // This is a reference, resolve it
    const path = obj.slice(1, -1).split('.');
    let value = allTokens;
    
    for (const key of path) {
      value = value[key];
      if (!value) break;
    }
    
    if (value && value.value) {
      return resolveReferences(value.value, allTokens);
    }
    return obj; // Return original if can't resolve
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = resolveReferences(value, allTokens);
    }
    return result;
  }
  
  return obj;
}

// Resolve all references
const resolvedTokens = resolveReferences(tokens, tokens);

// Function to convert nested object to CSS custom properties
function objectToCssVars(obj, prefix = '') {
  let css = '';
  
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.value) {
      // This is a token with a value
      css += `  --${cssKey}: ${value.value};\n`;
    } else if (value && typeof value === 'object' && !value.value) {
      // This is a nested object, recurse
      css += objectToCssVars(value, cssKey);
    }
  }
  
  return css;
}

// Generate CSS
const cssContent = `:root {
${objectToCssVars(resolvedTokens)}}\n`;

// Ensure src/styles directory exists
if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src');
}
if (!fs.existsSync('./src/styles')) {
  fs.mkdirSync('./src/styles');
}

// Write CSS file
fs.writeFileSync('./src/styles/design-tokens.css', cssContent);

console.log('✅ Design tokens generated successfully!');
console.log('📁 Generated: src/styles/design-tokens.css');
