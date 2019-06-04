/// <reference path="./typings.d.ts" />

export * from './errors';
export * from './plugins';
export * from './precompile';
export * from './renderer';

import { TypesafeTemplatePlugin } from './plugins';
export { TypesafeTemplatePlugin as default };

export {
	$any,
	$array,
	$boolean,
	$decode,
	$encode,
	$expr,
	$if,
	$nullable,
	$number,
	$object,
	$repeat,
	$string
} from './tags';
