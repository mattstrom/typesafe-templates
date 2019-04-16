import { render } from '../renderer';


describe('$object', () => {
	const template = `
		const str = <$object value={$.obj} />;
	`;

	it('should inject a object into the template', async () => {
		// Arrange
		const data = {
			obj: {
				a: 1,
				b: 2
			}
		};

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const str = {\n  "a": 1,\n  "b": 2\n};`);
	});
});
