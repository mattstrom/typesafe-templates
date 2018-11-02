/// <reference path="./typings.d.ts" />

export * from './errors';
export * from './plugins';
export * from './renderer';

import { TypesafeTemplatePlugin } from './plugins';
export { TypesafeTemplatePlugin as default };

export {
	$boolean,
	$expr,
	$if,
	$number,
	$repeat,
	$string
} from './handlers';
