<p align="center">
  <a href="https://amplitude.com" target="_blank" align="center">
    <img src="https://static.amplitude.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/amplitude-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# Amplitude Browser SDK Migration Tool

Tool to traverse and transform SDK APIs to Amplitude's. Currently supported only for the [browser SDK](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser). 

# Usage

Use [glob](https://en.wikipedia.org/wiki/Glob_(programming)) patterns to transform your JS/TS files

```
npx @amplitude/sdk-migrate './src/**/*.{js,ts}'
```
