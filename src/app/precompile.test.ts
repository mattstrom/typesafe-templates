import { render } from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';
import { promisify } from 'util';

import { precompile } from './precompile';


type Campus = any;

const readFile = promisify(fs.readFile);

describe('precompile()', () => {
	describe('with EJS', () => {
		let code;
		let intermediate: string;

		beforeEach(async () => {
			code = await readFile(__dirname + '/../tests/files/template.tsx', 'utf8');
			intermediate = await precompile(code) || '';
		});

		const data: Campus = {
			thing: { a: 1, b: 2 },
			buildings: [
				{
					isOpen: `(time.getHour() >= 9 && time.getHour() <= 17)`,
					rooms: [
						{ type: 'conference', number: '100', size: 200 },
						{ type: 'office', number: '201', person: 'Allison' },
						{ type: 'office', number: '202', person: 'Bob' }
					]
				},
				{
					isOpen: `(time.getHour() >= 7 && time.getHour() <= 23)`,
					rooms: [
						{ type: 'conference', number: '1', size: 75 },
						{ type: 'office', number: '2', person: 'Charlie' },
						{ type: 'office', number: '3', person: 'Denise' },
						{ type: 'closet', number: 'B1', purpose: 'utility' }
					]
				}
			]
		};

		it('should output rendered EJS', async () => {
			// Act
			const output = await render(intermediate, { $: data });
			const prettified = prettier.format(output, { parser: 'babel' });

			// Assert
			expect(prettified).toMatchSnapshot();
		});
	});

	describe('when data contain multiline strings', () => {
		it('should escape new lines as \\n', async () => {
			// Arrange
			const template = 'const str = <$string value={$.str} />';
			const data = {
				str: `
					This is a multiline
					string.
				`
			};

			const code = await precompile(template) || '';

			// Act
			const output = await render(code, { $: data });

			// Assert
			expect(output).toMatchSnapshot();
		});
	});
});
