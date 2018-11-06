typesafe-templates
====================
Template engine for writing compiler-checked templates in TypeScript by leveraging JSX to generate JavaScript code from 
TypeScript code files rather than text templates.

Under the hood, `typesafe-templates` uses Babel to build an AST, which is then traversed to find and replace JSX nodes.
Such a tool can be useful for pre-generating customized Javascript files that vary by user or for creatihg HTML templates using
JSX rather than a syntax like Pug (some limitations apply). 

### Example
_template.tsx_
```typescript jsx
interface Message {
    name: string;
    lang: 'en' | 'es';
}

(function() {
    <$repeat items={$.messages}>
        {($: Message) => {
            <$if test={$.lang === 'en'}>
                console.log('Good morning' + <$string value={$.name} />);
            </$if>;
        	<$if test={$.lang === 'es'}>
                console.log('Bueño dias' + <$string value={$.name} />);
            </$if>;
        }}
    </$repeat>
})();
```

_script.ts_
```typescript jsx
import { renderFile } from 'typesafe-templates';

async function main() {
    const data: { messages: Message[] } = {
        messages: [
            { name: 'Alice', lang: 'en' },
            { name: 'Bob', lang: 'en' },
            { name: 'Dora', lang: 'es' },
            { name: 'Diego', lang: 'es' }
        ]
    };
    
    const { code } = await renderFile('./template.tsx', data);
    console.log(code);
}
```

Output
```javascript
(function() {
    console.log('Good morning, Alice');
    console.log('Good morning, Bob');
    console.log('Bueño dias, Dora');
    console.log('Bueño dias, Diego');
})();
```

### Installation

```bash
npm install typesafe-templates
```

> Use the `--save-dev` flag if you will be generating templates as part of a development task.

### Usage
To work properly you will need to include a type definition for JSX elements that assign `JSX.Element`
to `any`.

```typescript jsx
declare namespace JSX {
    type Element = any;
}
```

As a convenience, the `$` symbol is used to represent a parent type of a scope. However,
any name can be used. Presently the library does not support deep properties. A reference like
`$.level1.level2.level3` may type check correctly, but the proper value will not be injected into
the template.

### Elements

#### Control Elements
Control elements are similiar to JavaScript control blocks. They wrap a block of code and control
its output into the rendered code. In JSX terms, they require `props.children` to be defined.

Because JSX is used here as substitute JavaScript expressions, you will often need to include
a semicolon after the tag as you would with a normal statement.
##### `<$if test={} />`
Controls whether the wrapped contents will appear in the output.

##### `<$repeat items={} />`
Repeats the wrapped contents for each item in `items`. For each copy, a new data scope is created
and set to value of the current item.

The `$repeat` element expects the `children` prop to be a function or arrow function expression; however, this
surrounding function will be removed in the final output.

Example:
```typescript jsx
<$repeat items={$.messages}>
    {($: Message) => {
    	console.log(<$string value={$.name}>)
    }}
</$repeat>
```

#### Injection Elements
##### `<$boolean value={} />`
Outputs a boolean literal.

##### `<$expr code={} />`
Takes in a string representing an expression, parses it into AST, and adds the resultant node into the output.

##### `<$number value={} />`
Outputs a numeric literal.

##### `<$string value={} />`
Outputs a string literal.

### Limitations
Currently TypeScript treats all JSX elements as the same type (which can changed but only to one collective type). Therefore
elements, when used as values, are treated as `any` and will not show type errors unless you manually
typecast the element. Refactoring signatures, however, will work when using TS tooling to rearrange arguments. 

Example:
```typescript jsx
function print(str: string, num: number, bool: boolean) {}

print(<$string />, <$string />, <$string />); // Will not report type error

print(<$string /> as string, <$string /> as string, <$string /> as string); // Will not report type error
```
