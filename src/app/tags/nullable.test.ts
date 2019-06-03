import { render } from '../renderer';


describe('$nullable', () => {
	const template = `
		const num = <$nullable><$number value={$.a} /></$nullable>;
	`;

	describe('when value is not null', () => {
		it('should inject a child node into the template', async () => {
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

	describe('when value is null', () => {
		it('should inject null into the template', async () => {
			// Arrange
			const data = { a: null };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const num = null;`);
		});
	});

	describe('when value is undefined', () => {
		it('should inject null into the template', async () => {
			// Arrange
			const data = { a: undefined };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const num = undefined;`);
		});
	});
});
