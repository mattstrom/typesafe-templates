declare module '@babel/plugin-syntax-jsx';
declare module '@babel/preset-typescript';

declare namespace JSX {
	type Element = any;

	export interface IntrinsicElements {}
}
