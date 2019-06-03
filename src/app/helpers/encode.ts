import { Encoding } from '../tags';

export function encode(type: string, value: string): string {
	switch (type) {
		case Encoding.Base64: {
			return Buffer.from(value).toString('base64');
		}
		case Encoding.Uri: {
			return encodeURI(value);
		}
		case Encoding.UriComponent: {
			return encodeURIComponent(value);
		}
		default: {
			throw new Error(`Invalid encoding type '${type}'`);
		}
	}
}
