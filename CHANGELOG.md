# [1.3.0](https://github.com/mattstrom/typesafe-templates/compare/1.2.12...1.3.0) (2022-06-01)


### Features

* add option for preserving or removing comments ([0543edd](https://github.com/mattstrom/typesafe-templates/commit/0543edd5efc5d5dc85b989d24fb1c786956f11e3))

## [1.2.12](https://github.com/mattstrom/typesafe-templates/compare/1.2.11...1.2.12) (2022-06-01)


### Bug Fixes

* add .nvmrc file ([50fef0b](https://github.com/mattstrom/typesafe-templates/commit/50fef0b53b96ae69134f122c36cb1c469522ce2b))

## [1.2.11](https://github.com/mattstrom/typesafe-templates/compare/1.2.10...1.2.11) (2021-04-05)


### Bug Fixes

* update dependencies ([b475f8c](https://github.com/mattstrom/typesafe-templates/commit/b475f8c4e612693977e0736fa5949a70b0fa955c))

## [1.2.10](https://github.com/mattstrom/typesafe-templates/compare/1.2.9...1.2.10) (2019-08-29)


### Bug Fixes

* use JSON stringify to escape string ([11aea30](https://github.com/mattstrom/typesafe-templates/commit/11aea30))

## [1.2.9](https://github.com/mattstrom/typesafe-templates/compare/1.2.8...1.2.9) (2019-07-25)


### Bug Fixes

* bump version after deps fixes ([48913b0](https://github.com/mattstrom/typesafe-templates/commit/48913b0))

## [1.2.8](https://github.com/mattstrom/typesafe-templates/compare/1.2.7...1.2.8) (2019-07-25)


### Bug Fixes

* .snyk, package.json & package-lock.json to reduce vulnerabilities ([2c58b46](https://github.com/mattstrom/typesafe-templates/commit/2c58b46))

## [1.2.7](https://github.com/mattstrom/typesafe-templates/compare/1.2.6...1.2.7) (2019-07-25)


### Bug Fixes

* .snyk, package.json & package-lock.json to reduce vulnerabilities ([7317330](https://github.com/mattstrom/typesafe-templates/commit/7317330))

## [1.2.6](https://github.com/mattstrom/typesafe-templates/compare/1.2.5...1.2.6) (2019-06-14)


### Bug Fixes

* remove use of named capture groups ([7493a15](https://github.com/mattstrom/typesafe-templates/commit/7493a15)), closes [#39](https://github.com/mattstrom/typesafe-templates/issues/39)

## [1.2.5](https://github.com/mattstrom/typesafe-templates/compare/1.2.4...1.2.5) (2019-06-14)


### Bug Fixes

* correct ejs output of $nullable tag ([f13e96c](https://github.com/mattstrom/typesafe-templates/commit/f13e96c)), closes [#39](https://github.com/mattstrom/typesafe-templates/issues/39)

## [1.2.4](https://github.com/mattstrom/typesafe-templates/compare/1.2.3...1.2.4) (2019-06-14)


### Bug Fixes

* correct ejs output of $nullable tag ([df35c0b](https://github.com/mattstrom/typesafe-templates/commit/df35c0b)), closes [#39](https://github.com/mattstrom/typesafe-templates/issues/39)

## [1.2.3](https://github.com/mattstrom/typesafe-templates/compare/1.2.2...1.2.3) (2019-06-14)


### Bug Fixes

* correct ejs output of $nullable tag ([6fea7e3](https://github.com/mattstrom/typesafe-templates/commit/6fea7e3)), closes [#39](https://github.com/mattstrom/typesafe-templates/issues/39)

## [1.2.2](https://github.com/mattstrom/typesafe-templates/compare/1.2.1...1.2.2) (2019-06-14)


### Bug Fixes

* handle non-string values in clean() ([7c4d79e](https://github.com/mattstrom/typesafe-templates/commit/7c4d79e)), closes [#37](https://github.com/mattstrom/typesafe-templates/issues/37)

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
