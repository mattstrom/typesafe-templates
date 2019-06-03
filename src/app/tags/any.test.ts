import { render } from '../renderer';


describe('$any', () => {
	const template = `
		const thing = <$any value={$.value} />;
	`;

	it('should inject array into the template', async () => {
		// Arrange
		const data = {
			value: [1, 2]
		};

		// Act
		const result = await render(template, data);
		const code = result && result.code;

		// Assert
		expect(result).not.toBeNull();
		expect(code).not.toBeNull();
		expect(code).toEqual(`const thing = [1, 2];`);
	});

	it('should inject object into the template', async () => {
		const data = {
			value: {
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
		expect(code).toEqual(`const thing = {\n  "a": 1,\n  "b": 2\n};`);
	});
});
