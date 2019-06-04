import { render } from '../renderer';


describe('$string', () => {
	const template = `
		const str = <$string value={$.a} />;
	`;

	it('should inject a string into the template', async () => {
		// Arrange
		const data = { a: 'hello' };

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const str = "hello";`);
	});
});
