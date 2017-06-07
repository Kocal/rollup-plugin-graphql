const rollup = require('rollup');
const graphql = require('..');

process.chdir(__dirname);

describe('plugin', () => {
  it('should parse a graphql file', () => {
    return rollup.rollup({
      entry: 'samples/basic.js',
			plugins: [graphql()]
		}).then((bundle) => {
			const generated = bundle.generate({ format: 'cjs' });
			const code = generated.code;

			const exports = {};
			const fn = new Function('exports', code);
			
			fn(exports);

			expect(exports.doc).toBeDefined();
			expect(exports.doc.kind).toBe('Document');
		});
  });
});
