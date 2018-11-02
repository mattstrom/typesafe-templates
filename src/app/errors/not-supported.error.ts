export class NotSupportedError extends Error {
	constructor(reason: string = '') {
		super(`Not supported: ${reason}`);
	}
}
