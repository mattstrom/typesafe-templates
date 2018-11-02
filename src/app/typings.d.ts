declare module '@babel/plugin-syntax-jsx';
declare module '@babel/preset-typescript';

interface Array<T> {
	filter<U extends T>(pred: (a: T) => a is U): U[];
}
