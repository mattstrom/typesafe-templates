import { TagName } from '../../tags';
import { Handler } from '..';
import {
	handleArrayElement, handleInjectionElement,
	handleObjectElement, handleStringElement
} from './inject';
import { handleDecodeElement } from './decode';
import { handleEncodeElement } from './encode';
import { handleExprElement } from './expr';
import { handleIfElement } from './if';
import { handleNullableElement } from './nullable';
import { handleRepeatElement } from './repeat';


export default new Map<TagName, Handler>([
	['$any', handleInjectionElement],
	['$array', handleArrayElement],
	['$boolean', handleInjectionElement],
	['$decode', handleDecodeElement],
	['$encode', handleEncodeElement],
	['$expr', handleExprElement],
	['$if', handleIfElement],
	['$nullable', handleNullableElement],
	['$number', handleInjectionElement],
	['$object', handleObjectElement],
	['$repeat', handleRepeatElement],
	['$string', handleStringElement]
]);
