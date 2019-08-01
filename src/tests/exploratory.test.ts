import { render } from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';
import { promisify } from 'util';

import { precompile } from '../app/precompile';


type Campus = any;

const readFile = promisify(fs.readFile);

describe('Exploratory Test', () => {
	describe('with EJS', () => {
		let code;
		let intermediate: string;

		beforeEach(async () => {
			code = `javascript(<$string value={$.value} />);`;
			intermediate = await precompile(code) || '';
		});

		const data: Campus = {
			value: 'hello world'
		};

		it('should output rendered EJS', async () => {
			// Act
			const contents = await readFile(`${__dirname}/data.json`, 'utf8');
			const data = JSON.parse(contents);
			const output = await render(intermediate, { $: data });
			const prettified = prettier.format(output, { parser: 'babel' });

			console.log(prettified);

			// Assert
			//expect(prettified).toMatchSnapshot();
		});
	});
});
