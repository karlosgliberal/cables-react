# Cables React

A React library for integrating Cables.gl patches.

## Installation

```bash
npm install cables-react
```

## Usage

```tsx
import { CablesPatch, CablesSync } from "cables-react";

const App = () => (
    <CablesPatch patchDir="path/to/your/patch" />
);
```

## API
- `CablesPatch`: Loads a Cables.gl patch.
- `CablesSync`: Syncs variables with React state.
- `useCables`: A hook for custom integrations.
