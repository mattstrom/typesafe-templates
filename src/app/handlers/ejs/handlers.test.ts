import outdent from 'outdent';
import { precompile } from '../../precompile';


describe('EJS handlers', () => {
	describe('$if', () => {
		it('should render as expected', async () => {
			// Arrange
			const template = `
			<$if test={name === 'world'}>
				{() => {
					const msg = 'Hello world';
				}}
			</$if>
		`;

			// Act
			const code = await precompile(template);

			// Assert
			expect(code).not.toBeNull();
			expect(code).toMatch(outdent`
			<%_ if (name === 'world') { _%>
			const msg = 'Hello world';
			<%_ } _%>
		`);
		});
	});

	describe('$repeat', () => {
		it('should render as expected', async () => {
			// Arrange
			const template = `
			<$repeat items={$.items}>
				{(item) => {
					const msg = 'Hello world';
				}}
			</$repeat>
		`;

			// Act
			const code = await precompile(template);

			// Assert
			expect(code).not.toBeNull();
			expect(code).toMatch(outdent`
			<%_ for (const item of ($.items || [])) { _%>
			const msg = 'Hello world';
			<%_ } _%>
		`);
		});
	});
});
