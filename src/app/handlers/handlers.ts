import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { handleBooleanElement } from './boolean';
import { handleExprElement } from './expr';
import { handleIfElement } from './if';
import { handleNumberElement } from './number';
import { handleRepeatElement } from './repeat';
import { handleStringElement } from './string';


export type Handler = (path: NodePath<JSXElement>, state: any) => void;

export const handlers = new Map<string, Handler>([
	['$boolean', handleBooleanElement],
	['$expr', handleExprElement],
	['$if', handleIfElement],
	['$number', handleNumberElement],
	['$repeat', handleRepeatElement],
	['$string', handleStringElement]
]);
