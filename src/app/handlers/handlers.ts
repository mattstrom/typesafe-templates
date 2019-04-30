import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { handleAnyElement } from './any';
import { handleArrayElement } from './array';
import { handleBooleanElement } from './boolean';
import { handleExprElement } from './expr';
import { handleIfElement } from './if';
import { handleNullableElement } from './nullable';
import { handleNumberElement } from './number';
import { handleObjectElement } from './object';
import { handleRepeatElement } from './repeat';
import { handleStringElement } from './string';


export type Handler = (path: NodePath<JSXElement>, state: any) => void;

export const handlers = new Map<string, Handler>([
	['$any', handleAnyElement],
	['$array', handleArrayElement],
	['$boolean', handleBooleanElement],
	['$expr', handleExprElement],
	['$if', handleIfElement],
	['$nullable', handleNullableElement],
	['$number', handleNumberElement],
	['$object', handleObjectElement],
	['$repeat', handleRepeatElement],
	['$string', handleStringElement]
]);
