import { render } from '../app';
import { UnexpectedType } from '../app/errors';


describe('render()', () => {
	const template = `
		<$repeat items={$.items}>{($: object) => {
			console.log(<$string value={$.value} />);
		}}</$repeat>;
	`;

	it('should throw UnexpectedType error if model is bad', async () => {
		// Arrange
		const data = {
			items: [
				{ value: null }
			]
		};

		// Act & Assert
		await expect(render(template, data))
			.rejects
			.toThrow(UnexpectedType);
	});
});
