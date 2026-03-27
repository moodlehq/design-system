# Changelog

## [2.2.0](https://github.com/moodlehq/design-system/compare/design-system-v2.1.1...design-system-v2.2.0) (2026-03-27)


### Features

* **AI:** Add AI agent tooling for streamlined co-working  ([#154](https://github.com/moodlehq/design-system/issues/154)) ([a8b10f5](https://github.com/moodlehq/design-system/commit/a8b10f52937c3f969a08d097c32626dd5f819000))


### Bug Fixes

* **AI:** Add i18n guidance to instructions ([#157](https://github.com/moodlehq/design-system/issues/157)) ([bd21822](https://github.com/moodlehq/design-system/commit/bd21822fec34f9d63dad8fa2f1c8cc9ac9d84d58))

## [2.1.1](https://github.com/moodlehq/design-system/compare/design-system-v2.1.0...design-system-v2.1.1) (2026-03-12)


### Bug Fixes

* **Build:** Publish the correct build ([#148](https://github.com/moodlehq/design-system/issues/148)) ([0c0dc44](https://github.com/moodlehq/design-system/commit/0c0dc44912cbf08ce1a1811d2765dcfef37a17bd))

## [2.1.0](https://github.com/moodlehq/design-system/compare/design-system-v2.0.0...design-system-v2.1.0) (2026-03-11)


### Features

* **Button:** Update example component no longer need React-BS ([#145](https://github.com/moodlehq/design-system/issues/145)) ([670a1f3](https://github.com/moodlehq/design-system/commit/670a1f3dea47bd48d0e6c1828d91cafcbf08465c))
* **tokens:** SCSS tokens are now themeable with the !default feature ([#144](https://github.com/moodlehq/design-system/issues/144)) ([759e34b](https://github.com/moodlehq/design-system/commit/759e34b12b4b015c4fd857746129f55d693b75da))

## [2.0.0](https://github.com/moodlehq/design-system/compare/design-system-v1.0.0...design-system-v2.0.0) (2026-03-06)


### ⚠ BREAKING CHANGES

* **Build:** Core LMS compatibility improvements ([#141](https://github.com/moodlehq/design-system/issues/141))
* **fonts:** Several font tokens are removed and replaced. Consumers must update their consumption on typography tokens. New guides added in the README of how to setup fonts properly

### Bug Fixes

* **fonts:** Rework font tokens to be usable for css attributes ([#130](https://github.com/moodlehq/design-system/issues/130)) ([196f245](https://github.com/moodlehq/design-system/commit/196f2450f91becd62909e64b480ada2323a3a98a))


### Miscellaneous Chores

* **Build:** Core LMS compatibility improvements ([#141](https://github.com/moodlehq/design-system/issues/141)) ([a024d30](https://github.com/moodlehq/design-system/commit/a024d30d39e577ec17710736e3f756bb413ad8f1))

## [1.0.0](https://github.com/moodlehq/design-system/compare/design-system-v0.1.0...design-system-v1.0.0) (2026-02-06)


### ⚠ BREAKING CHANGES

* **tokens:** brand colors tokens no longer exists

### Features

* **tokens:** First release of tokens for standalone consumptions ([#103](https://github.com/moodlehq/design-system/issues/103)) ([6f48a7c](https://github.com/moodlehq/design-system/commit/6f48a7cf46da980eee26ed6bb18d93bb10c1cbc8))


### Bug Fixes

* **button:** Adjust css to the renamed tokens ([#108](https://github.com/moodlehq/design-system/issues/108)) ([870b421](https://github.com/moodlehq/design-system/commit/870b421416e06cdccbd61b95803c7d526f7d90e7))
* **tokens:** Typo fix on a token group name ([#101](https://github.com/moodlehq/design-system/issues/101)) ([31e81da](https://github.com/moodlehq/design-system/commit/31e81da242af3a36b3db0fe2da24a7fa88491f41))


### Miscellaneous Chores

* **tokens:** Removed brand colors from tokens ([#111](https://github.com/moodlehq/design-system/issues/111)) ([74f34f0](https://github.com/moodlehq/design-system/commit/74f34f0ef3b3c333a8431940bd421f8258f9d471))

## [0.1.0](https://github.com/moodlehq/design-system/compare/design-system-v0.0.2...design-system-v0.1.0) (2025-12-22)


### Features

* Add and relocate community insight files ([#69](https://github.com/moodlehq/design-system/issues/69)) ([1fdd1b2](https://github.com/moodlehq/design-system/commit/1fdd1b2e09ec0db54d7ba188821e1e8eea6300f6))
* **button:** Improve variant restriction and tidy up unit tests ([#56](https://github.com/moodlehq/design-system/issues/56)) ([465cb7b](https://github.com/moodlehq/design-system/commit/465cb7be3d37e9db2ba3727713a8e8f1ecdbadb8))
* **Security:** Improvements suggested by OSSF Scorecard ([#55](https://github.com/moodlehq/design-system/issues/55)) ([89b3d37](https://github.com/moodlehq/design-system/commit/89b3d37e236aa8b89981d2fb31b6d30fcc51bb70))


### Bug Fixes

* **button:** Remove the border from bootstrap when clicked (MDS-263) ([#49](https://github.com/moodlehq/design-system/issues/49)) ([d2346ae](https://github.com/moodlehq/design-system/commit/d2346aeed0bf0dd40b13c3fefe1c8f5e4d4638b0))
* **GHA:** Add id-token permission to the StoryBook deploy ([#63](https://github.com/moodlehq/design-system/issues/63)) ([0655a78](https://github.com/moodlehq/design-system/commit/0655a78feb35adb884091cf8329bce76625ee8b1))


### Reverts

* **#48:** Revert the previous merge due to merge message([#52](https://github.com/moodlehq/design-system/issues/52)) ([15b4af1](https://github.com/moodlehq/design-system/commit/15b4af19c440144964ae14f214d90e9638cbd35c))


### Miscellaneous Chores

* release 0.0.1 ([c82de7a](https://github.com/moodlehq/design-system/commit/c82de7af2849bbd3620350ba573ea89bfc29ab29))
* Release 0.1.0 ([#78](https://github.com/moodlehq/design-system/issues/78)) ([3a91749](https://github.com/moodlehq/design-system/commit/3a91749c95a62c14667aa74b5bb4f14a642b9998))

## [0.0.2](https://github.com/moodlehq/design-system/compare/v0.0.1...v0.0.2) (2025-12-03)


### Bug Fixes

* **button:** Remove the border from bootstrap when clicked (MDS-263) ([#49](https://github.com/moodlehq/design-system/issues/49)) ([d2346ae](https://github.com/moodlehq/design-system/commit/d2346aeed0bf0dd40b13c3fefe1c8f5e4d4638b0))


### Reverts

* **#48:** Revert the previous merge due to merge message([#52](https://github.com/moodlehq/design-system/issues/52)) ([15b4af1](https://github.com/moodlehq/design-system/commit/15b4af19c440144964ae14f214d90e9638cbd35c))

## 0.0.1 (2025-12-02)


### Miscellaneous Chores

* release 0.0.1 ([c82de7a](https://github.com/moodlehq/design-system/commit/c82de7af2849bbd3620350ba573ea89bfc29ab29))
