import { render } from '../renderer';


describe('$decode', () => {

	describe('when type is base64', () => {
		const template = `
			const str = <$decode type="base64"><$string value={$.a} /></$decode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: 'aGVsbG8gd29ybGQ=' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const str = "hello world";`);
		});
	});

	describe('when type is uri', () => {
		const template = `
			const uri = <$decode type="uri"><$string value={$.a} /></$decode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: 'http://localhost/url%20with%20spaces' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const uri = "http://localhost/url with spaces";`);
		});
	});

	describe('when type is uri-component', () => {
		const template = `
			const uri = <$decode type="uri-component"><$string value={$.a} /></$decode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: '%2Fpath%2Fsegment' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const uri = "/path/segment";`);
		});
	});

	describe(`when child is an expression`, () => {
		const template = `
			const fn = () => <$decode type="base64"><$expr code={$.a} /></$decode>;
		`;

		it('should decode value and insert an expression into template', async () => {
			// Arrange
			const data = { a: 'L153d3dcLmdpdGh1YlwuaW8kLw==' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const fn = () => /^www\\.github\\.io$/;`);
		});
	});
});
