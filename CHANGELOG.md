# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/UpAssist/neos-editors/compare/1.1.2...1.2.0) (2026-11-20)


### Features

* build the UI plugin with esbuild and the `extensibilityMap` of `@neos-project/neos-ui-extensibility`, following the Neos UI plugin guideline, instead of the webpack 4 / Babel 6 `neos-react-scripts` toolchain; one build serves Neos UI 7.3 up to 9.x
* CSS modules through `esbuild-plugin-lightningcss-modules` (`styles.module.css`), the loader the Neos UI itself uses
* CI rebuilds the plugin and fails when the committed `Resources/Public` bundle does not match the sources

## [1.1.2](https://github.com/UpAssist/neos-editors/compare/1.1.1...1.1.2) (2026-11-19)


### Bug Fixes

* ArrayInfoEditor: nested arrays/objects no longer crash the editor (React error #31); they render as a nested list
* ArrayInfoEditor: booleans render as `true`/`false` instead of nothing
* ArrayInfoEditor: an empty or unset value shows "No values" instead of the inherited "Choose" placeholder of the `array` data type; a configured `placeholder` still wins

## [1.1.1](https://github.com/UpAssist/neos-editors/compare/1.1.0...1.1.1) (2026-11-19)


### Bug Fixes

* constrain `neos/neos-ui` to `^7.3 || ^8.3 || ^9.0` instead of the open-ended `>=5.2` (tested on Neos 8.3, 8.4, 9.0, 9.1 and 9.2)
* remove the empty `NeosRulez.Neos.Editors.PasswordInput` stylesheet entry from `Settings.yaml`
* remove the PSR-4 autoload pointing at a missing `Classes/` folder

## [1.1.0](https://github.com/UpAssist/neos-editors/compare/1.0.0...1.1.0) (2024-11-13)


### Features

* add support for rendering HTML as value ([1af0d2f](https://github.com/UpAssist/neos-editors/commit/1af0d2fea84096b5ff0a635d95581196daf2b5de))

## 1.0.0 (2024-11-13)


### Features

* array info editor ([4e75653](https://github.com/UpAssist/neos-editors/commit/4e7565376240f959818417404396297f6a5c928a))
