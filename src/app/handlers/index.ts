import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

export type Handler = (path: NodePath<JSXElement>, state: any) => void;

export * from './visitor';
