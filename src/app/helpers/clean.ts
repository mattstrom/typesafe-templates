// tslint:disable:quotemark

export function clean(value: string) {
	return value
		.replace(/'/g, "\\'")
		.replace(/\n/gm, '\\n');
}
