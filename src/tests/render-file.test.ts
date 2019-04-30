import * as path from 'path';
import { renderFile } from '../app';

describe('renderFile()', () => {
	const templateFile = path.resolve(__dirname, './files/template.tsx');
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

	it('should output correct JavaScript code', async () => {
		// Arrange

		// Act
		const result = await renderFile(templateFile, data);

		// Assert
		expect(result).not.toBeNull();
		expect(result!.code).not.toBeNull();
		expect(result!.code).toEqual(output);
	});
});

const output =
`/// <reference path="./models.d.ts" />
(function () {
  scheduler.plan(() => time.getHour() >= 9 && time.getHour() <= 17, schedule => {
    schedule.reserve("100", 200);
    schedule.assign("201", "Allison");
    schedule.assign("202", "Bob");
  });
  scheduler.plan(() => time.getHour() >= 7 && time.getHour() <= 23, schedule => {
    schedule.reserve("1", 75);
    schedule.assign("2", "Charlie");
    schedule.assign("3", "Denise");
    schedule.include();
  });
})();`;
