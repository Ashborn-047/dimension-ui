#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const targetDir = process.cwd();

const registryPath = path.join(__dirname, 'src', 'registry', 'registry-index.ts');

if (command === 'init') {
    console.log('🚀 Initializing Dimension UI...');
    const uiDir = path.join(targetDir, 'src', 'components', 'ui');
    if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

    const libDir = path.join(targetDir, 'src', 'lib');
    if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

    const utilsPath = path.join(libDir, 'utils.ts');
    fs.writeFileSync(utilsPath, `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`);

    const cssPath = path.join(targetDir, 'src', 'index.css');
    if (fs.existsSync(cssPath)) {
        fs.appendFileSync(cssPath, '\n/* Dimension UI */\n@layer base {\n  :root { --perspective: 1000px; }\n  .perspective { perspective: var(--perspective); }\n  .preserve-3d { transform-style: preserve-3d; }\n}\n');
    }
    console.log('✅ Initialization complete!');
}

else if (command === 'add') {
    const componentName = process.argv[3];
    if (!componentName) process.exit(1);

    const registryContent = fs.readFileSync(registryPath, 'utf8');
    const startMarker = `"${componentName}": {`;
    const startIdx = registryContent.indexOf(startMarker);
    if (startIdx === -1) {
        console.error('❌ Not found');
        process.exit(1);
    }

    const sourceMarker = 'source: {';
    const sourceStartIdx = registryContent.indexOf(sourceMarker, startIdx);
    const codeMarker = 'code: `';
    const codeStartIdx = registryContent.indexOf(codeMarker, sourceStartIdx) + codeMarker.length;

    let codeEndIdx = -1;
    for (let i = codeStartIdx; i < registryContent.length; i++) {
        if (registryContent[i] === '`') {
            // Check if it's not escaped
            if (registryContent[i - 1] !== '\\') {
                codeEndIdx = i;
                break;
            }
        }
    }

    if (codeEndIdx === -1) {
        console.error('❌ Could not find end of code block');
        process.exit(1);
    }

    let code = registryContent.slice(codeStartIdx, codeEndIdx);
    // Unescape common template literal characters
    code = code.replace(/\\n/g, '\n').replace(/\\`/g, '`').replace(/\\\$/g, '$');

    const uiDir = path.join(targetDir, 'src', 'components', 'ui');
    if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });
    fs.writeFileSync(path.join(uiDir, `${componentName}.tsx`), code);
    console.log(`✅ Added ${componentName}`);
}
