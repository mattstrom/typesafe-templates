export function clean(value: any): any {
	if (typeof value !== 'string') {
		return value;
	}

	return value
		.replace(/'/g, "\\'")
		.replace(/\\/g, "\\\\\\")
		.replace(/\n/gm, '\\n');
}
