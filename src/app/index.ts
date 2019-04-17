/// <reference path="./typings.d.ts" />

export * from './errors';
export * from './plugins';
export * from './renderer';

import { TypesafeTemplatePlugin } from './plugins';
export { TypesafeTemplatePlugin as default };

export {
	$any,
	$array,
	$boolean,
	$expr,
	$if,
	$number,
	$object,
	$repeat,
	$string
} from './handlers';
