import * as path from 'path';

import { renderFile } from '../app';


async function main() {
	const data: Campus = {
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
					{ type: 'conference', number: '1', size: 75},
					{ type: 'office', number: '2', person: 'Charlie' },
					{ type: 'office', number: '3', person: 'Denise' },
					{ type: 'closet', number: 'B1', purpose: 'utility' }
				]
			}
		]
	};

	const result = await renderFile(
		path.resolve(__dirname, '../../src/tests/files/template.tsx'),
		data,
		{
			plugins: []
		}
	);

	if (result !== null) {
		console.log(result.code);
	}
}

main();
