## [1.2.1](https://github.com/mattstrom/typesafe-templates/compare/1.2.0...1.2.1) (2019-06-13)


### Bug Fixes

* handle multiline strings in ejs precompilation ([ea0f7e6](https://github.com/mattstrom/typesafe-templates/commit/ea0f7e6)), closes [#35](https://github.com/mattstrom/typesafe-templates/issues/35)

# [1.2.0](https://github.com/mattstrom/typesafe-templates/compare/1.1.0...1.2.0) (2019-06-04)


### Bug Fixes

* delete ref to nonexistent dependency ([554c0d9](https://github.com/mattstrom/typesafe-templates/commit/554c0d9))
* references to ts files across project boundaries ([df1f0fd](https://github.com/mattstrom/typesafe-templates/commit/df1f0fd))


### Features

* add support for ejs precompilation ([fa083ad](https://github.com/mattstrom/typesafe-templates/commit/fa083ad)), closes [#30](https://github.com/mattstrom/typesafe-templates/issues/30)

# [1.1.0](https://github.com/mattstrom/typesafe-templates/compare/1.0.0...1.1.0) (2019-05-15)


### Bug Fixes

* address 'property children is missing' compiler error ([1b314de](https://github.com/mattstrom/typesafe-templates/commit/1b314de)), closes [#26](https://github.com/mattstrom/typesafe-templates/issues/26)


### Features

* add support for expressions in $decode and $encode ([5d2b661](https://github.com/mattstrom/typesafe-templates/commit/5d2b661)), closes [#25](https://github.com/mattstrom/typesafe-templates/issues/25)

# [1.0.0](https://github.com/mattstrom/typesafe-templates/compare/0.7.1...1.0.0) (2019-05-10)


### Features

* add support for encoding and decoding values ([584d440](https://github.com/mattstrom/typesafe-templates/commit/584d440)), closes [#23](https://github.com/mattstrom/typesafe-templates/issues/23)
* modify string attribute to be treated as string ([7cc8e64](https://github.com/mattstrom/typesafe-templates/commit/7cc8e64)), closes [#23](https://github.com/mattstrom/typesafe-templates/issues/23)


### BREAKING CHANGES

* string-valued attributes now resolve to the string itself

## [0.7.1](https://github.com/mattstrom/typesafe-templates/compare/0.7.0...0.7.1) (2019-05-07)


### Bug Fixes

* add typescript preset to render method ([53b3fd8](https://github.com/mattstrom/typesafe-templates/commit/53b3fd8))
* add typescript preset to render method ([c46f1b6](https://github.com/mattstrom/typesafe-templates/commit/c46f1b6))

# [0.7.0](https://github.com/mattstrom/typesafe-templates/compare/0.6.0...0.7.0) (2019-05-07)


### Features

* add support for rendering from precompiled ast ([b232f0e](https://github.com/mattstrom/typesafe-templates/commit/b232f0e)), closes [#14](https://github.com/mattstrom/typesafe-templates/issues/14)

# [0.6.0](https://github.com/mattstrom/typesafe-templates/compare/0.5.0...0.6.0) (2019-04-30)


### Features

* add $nullable tag ([e3a8a85](https://github.com/mattstrom/typesafe-templates/commit/e3a8a85)), closes [#12](https://github.com/mattstrom/typesafe-templates/issues/12)

# [0.5.0](https://github.com/mattstrom/typesafe-templates/compare/0.4.0...0.5.0) (2019-04-30)


### Features

* enhance error messages ([5f512ba](https://github.com/mattstrom/typesafe-templates/commit/5f512ba)), closes [#10](https://github.com/mattstrom/typesafe-templates/issues/10)

# [0.4.0](https://github.com/mattstrom/typesafe-templates/compare/0.3.0...0.4.0) (2019-04-17)


### Features

* add $any and $array tags ([2bf6ba1](https://github.com/mattstrom/typesafe-templates/commit/2bf6ba1)), closes [#5](https://github.com/mattstrom/typesafe-templates/issues/5)

# [0.3.0](https://github.com/mattstrom/typesafe-templates/compare/0.2.4...0.3.0) (2019-04-16)


### Bug Fixes

* handle typescript not-null operator ([1ed7b36](https://github.com/mattstrom/typesafe-templates/commit/1ed7b36))


### Features

* add $object handler ([570d7fd](https://github.com/mattstrom/typesafe-templates/commit/570d7fd))
* add $object handler ([#4](https://github.com/mattstrom/typesafe-templates/issues/4)) ([7a2e715](https://github.com/mattstrom/typesafe-templates/commit/7a2e715))
