
export class NonexistentAttribute extends Error {
	constructor(attributeName: string) {
		super(`Attribute '${attributeName}' does not exist on JSX element.`);
	}
}
