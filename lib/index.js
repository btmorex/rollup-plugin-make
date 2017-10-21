'use strict';

import {writeFileSync} from 'fs';

export default function dependencies(options = {}) {
  return {
    ongenerate({bundle, file}) {
      const mangle = options.mangle || ((file) => file.substring(0, file.lastIndexOf('.')) + '.d');
      const deps = bundle.modules.map((module) => module.id)
                                 .filter((id) => id.charCodeAt(0) !== 0)
                                 .map((dep) => dep.replace(`${process.cwd()}/`, ''));
      const emptyRules = deps.map(dep => `${dep}:`).join('\n');
      const contents = `${file}: ${deps.join(' ')}\n${emptyRules}\n`;
      writeFileSync(mangle(file), contents, {mode: 0o644});
    },
  };
}
