import { render } from '../renderer';

describe('$boolean', () => {
	const template = `
		const condition = <$boolean value={$.a} />;
	`;

	it('should inject true into the template', async () => {
		// Arrange
		const data = { a: true };

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const condition = true;`);
	});

	it('should inject true into the template', async () => {
		// Arrange
		const data = { a: false };

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const condition = false;`);
	});
});
