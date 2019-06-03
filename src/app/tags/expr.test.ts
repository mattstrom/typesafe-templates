import { render } from '../renderer';

describe('$expr', () => {
	const template = `
		const expr = <$expr code={$.a} />;
	`;

	it('should inject object into the template', async () => {
		// Arrange
		const data = { a: '({ a: 1 })' };

		// Act
		const result = await render(template, data);
		const code = result && result.code && result.code.replace(/\n/g, '');

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const expr = {  a: 1};`); // TODO: Why is object outputted with extra spaces?
	});

	it('should inject array into the template', async () => {
		// Arrange
		const data = { a: '[1, 2]' };

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const expr = [1, 2];`);
	});
});
