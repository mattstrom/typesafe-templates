declare module '@babel/plugin-syntax-jsx';
declare module '@babel/preset-typescript';

declare module 'babel-literal-to-ast' {
	export default function astify(literal: any): babel.Node;
}

interface Array<T> {
	filter<U extends T>(pred: (a: T) => a is U): U[];
}
