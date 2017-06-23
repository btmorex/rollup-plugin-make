# rollup-plugin-make

Rollup plugin to build dependency files suitable for make

## Options

- `file`: [Default: `dest` with existing extension replaced by `.d`] Either a string or a function. If it's a string, write dependencies to that file. If it's a function, the plugin will call it with `dest` and `entry` and write dependencies to the returned file.

## Example

Suppose a make rule builds `dist/script/*` from `script/*`. With an entry of `script/app.js`, the plugin will write dependencies to `dist/script/app.d` by default. In the example below, dependencies will instead be written to `dist/.dep/script/app.d`:

```javascript
import make from 'rollup-plugin-make';
import path from 'path';

export default {
  ...
  plugins: [
    ...
    make({
      file: (dest, entry) => {
        const destStem = dest.substring(0, dest.lastIndexOf(entry));
        const entryDep = entry.substring(0, entry.lastIndexOf('.')) + '.d';
        return path.join(destStem, '.dep', entryDep);
      },
    }),
  ],
};
```
