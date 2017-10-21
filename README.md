# rollup-plugin-make

Rollup plugin to build dependency files suitable for make

## Options

- `mangle`: [Default: `output.file` with existing extension replaced by `.d`] A function that will be passed `output.file` and should return the file to write dependencies to.

## Example

Suppose a make rule builds `dist/script/*` from `script/*`. With an input of `script/app.js`, the plugin will write dependencies to `dist/script/app.d` by default. In the example below, dependencies will instead be written to `dist/.dep/script/app.d`:

```javascript
import make from 'rollup-plugin-make';
import path from 'path';

export default {
  ...
  plugins: [
    ...
    make({
      mangle: (file) => {
        const outputStem = 'dist/';
        const input = file.replace(outputStem, '');
        const inputDep = `${input.substring(0, input.lastIndexOf('.'))}.d`;
        return path.join(outputStem, '.dep', inputDep);
      },
    }),
  ],
};
```
