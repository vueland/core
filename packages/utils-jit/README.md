<div align="center">
  <img src="https://raw.githubusercontent.com/vueland/vueland/master/logo.png" style="max-width: 100%;">
</div>

# @vueland/utils-jit

Vite JIT utility engine for the Vueland platform.

@vueland/utils-jit generates CSS utilities on demand from arbitrary utility classes used in your source files. It is designed for Vue/Vite projects that need a lightweight utility layer without shipping a large predefined CSS bundle.

## Documentation

Full documentation and examples are available here:

https://vueland.github.io/vueland/en/plugins/utils-jit/getting-started

## Installation

bash pnpm add -D @vueland/utils-jit

You also need Vite installed in your project:

bash pnpm add -D vite

## Usage

Add the plugin to your Vite config:

ts import { defineConfig } from 'vite' import { utilsJit } from '@vueland/utils-jit'  export default defineConfig({   plugins: [     utilsJit(),   ], })

Then use arbitrary utility classes in your templates:

vue <template>   <button class="w-[160px] px-[20px] py-[12px] radius-[8px] bg-[#42b883] color-[#fff]">     Button   </button> </template>

The plugin scans your project files and generates only the CSS utilities that are actually used.

## Variants

Utility classes can be combined with variants:

vue <template>   <button class="w-[160px] hover:w-[180px] focus:px-[24px]">     Button   </button> </template>

Example output:

css .hover\:w-\[180px\]:hover {   width: 180px !important; }  .focus\:px-\[24px\]:focus {   padding-left: 24px !important;   padding-right: 24px !important; }

## Responsive utilities

Responsive variants are also supported:

vue <template>   <div class="w-[100%] md:w-[720px] lg:w-[960px]"></div> </template>

## Why @vueland/utils-jit?

- Generates utilities on demand
- Works with Vite
- Supports arbitrary values
- Supports pseudo-class and responsive variants
- Keeps generated CSS close to actual project usage
- Designed to be used as part of the Vueland ecosystem

## Package

bash pnpm add -D @vueland/utils-jit

npm:

https://www.npmjs.com/package/@vueland/utils-jit

## License

MIT
