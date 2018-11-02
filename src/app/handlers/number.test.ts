import { render } from '../renderer';


describe('$number', () => {
	const template = `
		const num = <$number value={$.a} />;
	`;

	it('should inject a number into the template', async () => {
		// Arrange
		const data = { a: 1 };

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const num = 1;`);
	});
});
