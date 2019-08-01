import { clean } from './clean';

fdescribe('clean()', () => {
	it('should replace single quote marks with escaped quote marks', () => {
		// Arrange
		const str = `He said 'Hello'.`;

		// Act
		const cleaned = clean(str);

		// Assert
		expect(cleaned).toEqual(`He said \\'Hello\\'.`);
	});

	it('should replace backslashes with escaped backslashes', () => {
		// Arrange
		const str = `He said \"Hello\".`;

		// Act
		const cleaned = clean(str);

		// Assert
		expect(cleaned).toEqual(`He said \"Hello\".`);
	});

	it('should replace new lines with escaped new lines', () => {
		// Arrange
		const str = `
			This is a multiline
			string.
		`;

		// Act
		const cleaned = clean(str);

		// Assert
		expect(cleaned).toEqual(`\\n\t\t\tThis is a multiline\\n\t\t\tstring.\\n\t\t`);
	});

	it('should not throw error if value is not a string', () => {
		expect(() => clean(null)).not.toThrowError();
	});
});
