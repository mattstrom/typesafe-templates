export class InvalidExpressionError extends Error {
	constructor(expr: string) {
		super(`Expression '${expr}' is not valid.`);
	}
}
