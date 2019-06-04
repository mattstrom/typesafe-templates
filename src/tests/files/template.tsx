/// <reference path="./models.d.ts" />
import { $expr, $if, $number, $repeat, $string } from 'typesafe-templates';


declare const $: Campus;

(function() {
	<$repeat items={$.buildings}>
		{(building: Building) => {
			scheduler.plan(
				() => <$expr code={building.isOpen} />,
				(schedule: Schedule) => {
					<$repeat items={building.rooms}>{(room: Room) => {
						<$if test={room.type === 'conference'}>
							{(room: ConferenceRoom) => {
								schedule.reserve(<$string value={room.number} />, <$number value={(room).size} />);
							}}
						</$if>;
						<$if test={room.type === 'office'}>
							{(room: Office) => {
								schedule.assign(<$string value={room.number}/>, <$string value={room.person}/>);
							}}
						</$if>;
						<$if test={room.type === 'closet'}>
							{(room: Closet) => {
								schedule.include();
							}}
						</$if>;
					}}</$repeat>;
				}
			);
		}}
	</$repeat>;
})();
