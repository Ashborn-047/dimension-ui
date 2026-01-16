const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const targetDir = process.env.TARGET_DIR || process.cwd();

if (command === 'init') {
    console.log('🚀 Initializing Dimension UI...');

    // 1. Create components/ui directory
    const uiDir = path.join(targetDir, 'src', 'components', 'ui');
    if (!fs.existsSync(uiDir)) {
        fs.mkdirSync(uiDir, { recursive: true });
        console.log('✅ Created src/components/ui');
    }

    // 2. Create lib/utils.ts
    const libDir = path.join(targetDir, 'src', 'lib');
    if (!fs.existsSync(libDir)) {
        fs.mkdirSync(libDir, { recursive: true });
    }
    const utilsPath = path.join(libDir, 'utils.ts');
    const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
    fs.writeFileSync(utilsPath, utilsContent);
    console.log('✅ Created src/lib/utils.ts');

    // 3. Add 3D CSS to index.css
    const cssPath = path.join(targetDir, 'src', 'index.css');
    const css3D = `
/* Dimension UI 3D Primitives */
@layer base {
  :root {
    --perspective: 1000px;
  }
  .perspective {
    perspective: var(--perspective);
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
}
`;
    if (fs.existsSync(cssPath)) {
        fs.appendFileSync(cssPath, css3D);
        console.log('✅ Added 3D primitives to src/index.css');
    }

    console.log('\n🎉 Initialization complete! You can now run "add <component>"');
}

if (command === 'add') {
    const componentName = process.argv[3];
    if (!componentName) {
        console.error('❌ Please specify a component name.');
        process.exit(1);
    }

    console.log(`📦 Adding ${componentName}...`);

    // In a real CLI, we would import registry-index.ts
    // For this simulation, we'll read it directly and extract the source.
    const registryPath = path.join(__dirname, 'Dimension UI', 'src', 'registry', 'registry-index.ts');
    const registryContent = fs.readFileSync(registryPath, 'utf8');

    // Simple regex to find the source code block for the component
    const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`"${escapedName}":\\s*{[\\s\\S]*?source:\\s*{[\\s\\S]*?code:\\s*\`(true)?([\\s\\S]*?)\`\\s*},?`, 'm');
    const match = registryContent.match(regex);

    if (match) {
        let code = match[2];
        // Unescape backticks and newlines if they are escaped in the string literal
        code = code.replace(/\\n/g, '\n').replace(/\\`/g, '`').replace(/\\\$/g, '$');

        const uiDir = path.join(targetDir, 'src', 'components', 'ui');
        if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

        const filePath = path.join(uiDir, `${componentName}.tsx`);
        fs.writeFileSync(filePath, code);
        console.log(`✅ component added: src/components/ui/${componentName}.tsx`);
    } else {
        console.error(`❌ Component "${componentName}" not found in registry.`);
    }
}
