import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { handleArrayElement } from './array';
import { handleBooleanElement } from './boolean';
import { handleExprElement } from './expr';
import { handleIfElement } from './if';
import { handleNumberElement } from './number';
import { handleObjectElement } from './object';
import { handleRepeatElement } from './repeat';
import { handleStringElement } from './string';


export type Handler = (path: NodePath<JSXElement>, state: any) => void;

export const handlers = new Map<string, Handler>([
	['$array', handleArrayElement],
	['$boolean', handleBooleanElement],
	['$expr', handleExprElement],
	['$if', handleIfElement],
	['$number', handleNumberElement],
	['$object', handleObjectElement],
	['$repeat', handleRepeatElement],
	['$string', handleStringElement]
]);
