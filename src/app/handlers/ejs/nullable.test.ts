import { precompile } from '../../precompile';
import * as ejs from 'ejs';


describe('$nullable', () => {
	it('should compile to the expected EJS', async () => {
		// Arrange
		const template = `
			<$nullable><$string value={$.value} /></$nullable>
		`;

		// Act
		const code = await precompile(template);

		// Assert
		expect(code).not.toBeNull();
		expect(code).toMatch(`<%- $.value === undefined ? "undefined" : $.value === null ? "null" : '\\\'' + clean($.value) + '\\\'' %>;`);
	});

	describe('when wrapping <$string>', function() {
		const factory = (value: string | null | undefined) => {
			return {
				template: `fn(<$nullable><$string value={ $.value } /></$nullable>);`,
				data: { $: { value } }
			};
		};

		it('should render as expected when value is defined', async () => {
			// Arrange
			const { template, data } = factory('string');

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn('string')`);
		});

		it('should render as expected when value is undefined', async () => {
			// Arrange
			const { template, data } = factory(undefined);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(undefined)`);
		});

		it('should render as expected when value is null', async () => {
			// Arrange
			const { template, data } = factory(null);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(null)`);
		});
	});

	describe('when wrapping <$number>', function() {
		const factory = (value: number | null | undefined) => {
			return {
				template: `fn(<$nullable><$number value={ $.value } /></$nullable>);`,
				data: { $: { value } }
			};
		};

		it('should render as expected when value is defined', async () => {
			// Arrange
			const { template, data } = factory(1);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(1)`);
		});

		it('should render as expected when value is undefined', async () => {
			// Arrange
			const { template, data } = factory(undefined);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(undefined)`);
		});

		it('should render as expected when value is null', async () => {
			// Arrange
			const { template, data } = factory(null);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(null)`);
		});
	});

	describe('when wrapping <$boolean>', function() {
		const factory = (value: boolean | null | undefined) => {
			return {
				template: `fn(<$nullable><$boolean value={ $.value } /></$nullable>);`,
				data: { $: { value } }
			};
		};

		it('should render as expected when value is defined', async () => {
			// Arrange
			const { template, data } = factory(true);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(true)`);
		});

		it('should render as expected when value is undefined', async () => {
			// Arrange
			const { template, data } = factory(undefined);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(undefined)`);
		});

		it('should render as expected when value is null', async () => {
			// Arrange
			const { template, data } = factory(null);

			// Act
			const code = await precompile(template);
			const rendered = ejs.render(code!, data);

			// Assert
			expect(rendered).not.toBeNull();
			expect(rendered).toMatch(`fn(null)`);
		});
	});
});
