# Global CSS Variables

Vueland UI uses global CSS variables to manage colors, radii and base interface values.

## Available variables

| Variable | Default | Description |
| --- | --- | --- |
| `--global-border-radius` | `8px` | Base element border radius |
| `--global-error-color` | `#ef231f` | Error color |
| `--global-success-color` | `#43d31b` | Success state color |
| `--global-primary-color` | `#1f77c4` | Primary interface color |
| `--global-secondary-color` | `#39638c` | Secondary color |
| `--global-base-color` | `#ffffff` | Base background color |
| `--global-text-color` | `#3d3d3d` | Main text color |

## Declaration example

```css
:root {
  --global-border-radius: 8px;
  --global-primary-color: #1f77c4;
  --global-base-color: #ffffff;
  --global-text-color: #3d3d3d;
}
```

## Theme customization

```css
:root {
  --global-primary-color: #673ab7;
  --global-border-radius: 10px;
}
```

After the variables are changed, components automatically use the new values.
