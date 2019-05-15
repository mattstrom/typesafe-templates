import { render } from '../renderer';


describe('$unescape', () => {

	describe('when type is base64', () => {
		const template = `
			const str = <$encode type="base64"><$string value={$.a} /></$encode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: 'hello world' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const str = "aGVsbG8gd29ybGQ=";`);
		});
	});

	describe('when type is uri', () => {
		const template = `
			const uri = <$encode type="uri"><$string value={$.a} /></$encode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: 'http://localhost/url with spaces' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const uri = "http://localhost/url%20with%20spaces";`);
		});
	});

	describe('when type is uri', () => {
		const template = `
			const uri = <$encode type="uri-component"><$string value={$.a} /></$encode>;
		`;

		it('should decode value and insert into template', async () => {
			// Arrange
			const data = { a: '/path/segment' };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const uri = "%2Fpath%2Fsegment";`);
		});
	});

	fdescribe(`when child is an expression`, () => {
		const template = `
			const expr = <$encode type="base64"><$expr code={$.a} /></$encode>;
		`;

		it('should encode expression and insert into template', async () => {
			// Arrange
			const data = { a: /^www\.github\.io$/ };

			// Act
			const result = await render(template, data);
			const code = result && result.code;

			// Assert
			expect(result).not.toBeNull();
			expect(code).not.toBeNull();
			expect(code).toEqual(`const expr = "L153d3dcLmdpdGh1YlwuaW8kLw==";`);
		});
	});
});
