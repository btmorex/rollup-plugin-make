'use strict';

import {writeFileSync} from 'fs';

export default function dependencies(options = {}) {
  return {
    onwrite({bundle, entry, dest}) {
      let file;
      switch (typeof options.file) {
        case 'string':
          file = options.file;
          break;
        case 'function':
          file = options.file(dest, entry);
          break;
        default:
          file = dest.substring(0, dest.lastIndexOf('.')) + '.d';
          break;
      }
      const deps = bundle.modules.map((module) => module.id)
                                 .filter((id) => id.charCodeAt(0) !== 0);
      const contents =`${dest}: ${deps.join(' ')}\n`;
      writeFileSync(file, contents, {mode: 0o644});
    },
  };
}
