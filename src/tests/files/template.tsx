/// <reference path="./models.d.ts" />
import { $expr, $if, $number, $repeat, $string } from 'typesafe-templates';


declare const $: Campus;

(function() {
	<$repeat items={$.buildings}>
		{($: Building) => {
			scheduler.plan(
				() => <$expr code={$.isOpen} />,
				(schedule: Schedule) => {
					<$repeat items={$.rooms}>
						{($: Room) => {
						<$if test={$.type === 'conference'}>
							{($: ConferenceRoom) => {
								schedule.reserve(<$string value={$.number} />, <$number value={$.size} />);
							}}
						</$if>;
						<$if test={$.type === 'office'}>
							{($: Office) => {
								schedule.assign(<$string value={$.number}/>, <$string value={$.person}/>);
							}}
						</$if>;
						<$if test={$.type === 'closet'}>
							{($: Closet) => {
								schedule.include();
							}}
						</$if>;
					}}</$repeat>
				}
			)
		}}
	</$repeat>
})();
