import { TagName } from '../../tags';
import { Handler } from '..';
import { handleAnyElement } from './any';
import { handleArrayElement } from './array';
import { handleBooleanElement } from './boolean';
import { handleDecodeElement } from './decode';
import { handleEncodeElement } from './encode';
import { handleExprElement } from './expr';
import { handleIfElement } from './if';
import { handleNullableElement } from './nullable';
import { handleNumberElement } from './number';
import { handleObjectElement } from './object';
import { handleRepeatElement } from './repeat';
import { handleStringElement } from './string';


export const handlers = new Map<TagName, Handler>([
	['$any', handleAnyElement],
	['$array', handleArrayElement],
	['$boolean', handleBooleanElement],
	['$decode', handleDecodeElement],
	['$encode', handleEncodeElement],
	['$expr', handleExprElement],
	['$if', handleIfElement],
	['$nullable', handleNullableElement],
	['$number', handleNumberElement],
	['$object', handleObjectElement],
	['$repeat', handleRepeatElement],
	['$string', handleStringElement]
]);

export default handlers;
