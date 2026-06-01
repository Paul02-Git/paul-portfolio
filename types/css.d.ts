// Ambient declarations for stylesheet imports.
// Covers side-effect imports like `import "./globals.css"` so the TypeScript
// language server doesn't report TS2882. (Next types cover *.module.css only.)
declare module "*.css";
declare module "*.scss";
