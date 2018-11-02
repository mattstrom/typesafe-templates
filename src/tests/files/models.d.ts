declare module 'typesafe-templates';

interface Room {
	type: 'conference' | 'office' | 'closet';
	number: string;
}

interface ConferenceRoom extends Room {
	size: number;
}

interface Closet extends Room {
	purpose: 'utility' | 'supply' | 'coat';
}

interface Office extends Room {
	person: string;
}

interface Building {
	isOpen: string;
	rooms: (ConferenceRoom | Office | Closet)[];
}

interface Schedule {
	assign(roomNumber: string, person: string): void;
	reserve(roomNumber: string, size: number);
	include(): void;
}

interface Scheduler {
	plan(condition: () => boolean, scheduleBuilder: (schedule: Schedule) => void): void;
}

interface Campus {
	buildings: Building[];
}

declare const scheduler: Scheduler;
