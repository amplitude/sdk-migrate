<p align="center">
  <a href="https://amplitude.com" target="_blank" align="center">
    <img src="https://static.amplitude.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/amplitude-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# Amplitude Browser SDK Migration Tool

Amplitude's tool to ease engineering cost of migrating SDK libraries. Currently supported only for the [browser SDK](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser). Will traverse your source code and return

# Usage

### 1. Install
```
npm install @amplitude/sdk-migrate
```

### 2. Import packages

```js
import { transformer } from "@amplitude/sdk-migrate";
```

### 3. Create instances of Amplitude and Segment SDKs

```js
const transformedCode = transformer(sourceCode)
```
