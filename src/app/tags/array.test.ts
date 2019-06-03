import { render } from '../renderer';


describe('$array', () => {
	const template = `
		const arr = <$array value={$.arr} />;
	`;

	it('should inject a array into the template', async () => {
		// Arrange
		const data = {
			arr: [1, 2]
		};

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const arr = [1, 2];`);
	});
});
