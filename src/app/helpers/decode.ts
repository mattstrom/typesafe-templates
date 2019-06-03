import { Encoding } from '../tags';

export function decode(type: string, value: string) {
	switch (type) {
		case Encoding.Base64: {
			return Buffer.from(value, 'base64').toString();
		}
		case Encoding.Uri: {
			return decodeURI(value);
		}
		case Encoding.UriComponent: {
			return decodeURIComponent(value);
		}
		default: {
			throw new Error(`Invalid encoding type '${type}'`);
		}
	}
}
