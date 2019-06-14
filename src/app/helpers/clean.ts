export function clean(value: any): any {
	if (typeof value !== 'string') {
		return value;
	}

	return value
		.replace(/'/g, "\\'") // tslint:disable-line:quotemark
		.replace(/\n/gm, '\\n');
}
