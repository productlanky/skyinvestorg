import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Appending a new object here overrides the extended configs above
  {
    rules: {
      // Example 1: Disable TypeScript warnings for using 'any'
      "@typescript-eslint/no-explicit-any": "off",
      
      // Example 2: Disable the warning when you use standard <img> instead of Next <Image>
      "@next/next/no-img-element": "off",
      
      // Example 3: Disable unused variable warnings (or change "off" to "warn")
      "@typescript-eslint/no-unused-vars": "off",

      // Example 4: Disable React unescaped entities warning (like using ' or > directly)
      "react/no-unescaped-entities": "off",
      
      // Example 5: Disable exhaustive-deps warning in useEffects
      "react-hooks/exhaustive-deps": "off",
      // 1. Overrides the "Comments inside children section" error
      "react/jsx-no-comment-textnodes": "off",
      
      // 2. Overrides the "@ts-expect-error requires a description" error
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
