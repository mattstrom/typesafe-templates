import { getAst, renderFromAst } from './renderer';

describe('renderFromAst()', () => {
	it('should render multiple models from single AST', async () => {
		// Arrange
		const code = normalize(`
			(function() {
				console.log(<$string value={$.name} />);
			})();
		`);

		const ast = await getAst(code);

		// Act
		const result1 = await renderFromAst(ast!, { name: 'Alice' });
		const result2 = await renderFromAst(ast!, { name: 'Bob' });
		const result3 = await renderFromAst(ast!, { name: 'Charlie' });

		// Assert
		expect(ast).not.toBeNull();
		expect(result1).not.toBeNull();
		expect(result1!.code).not.toBeNull();
		expect(normalize(result1!.code)).toEqual(`(function () { console.log("Alice"); })();`);

		expect(result2).not.toBeNull();
		expect(result2!.code).not.toBeNull();
		expect(normalize(result2!.code)).toEqual(`(function () { console.log("Bob"); })();`);

		expect(result3).not.toBeNull();
		expect(result3!.code).not.toBeNull();
		expect(normalize(result3!.code)).toEqual(`(function () { console.log("Charlie"); })();`);
	});
});

function normalize(value: string | null | undefined) {
	if (!value) {
		return '';
	}

	return value.trim()
		.replace(/^[\s|\t]*/gm, '')
		.replace(/\n/g, ' ');
}
