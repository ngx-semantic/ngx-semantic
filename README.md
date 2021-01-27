<p align="center">
  <img
    src="https://raw.githubusercontent.com/ngx-semantic/ngx-semantic-docs/master/src/assets/images/logo.png"
    alt="NgxSemantic"  />
  <h1 align=center>NgxSemantic</h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ngx-semantic"><img alt="npm" src="https://img.shields.io/npm/v/ngx-semantic"></a>
  <a href="https://codecov.io/gh/ngx-semantic/ngx-semantic"><img src="https://codecov.io/gh/ngx-semantic/ngx-semantic/branch/master/graph/badge.svg" alt="codecov"/></a>
  <a href="https://github.com/acekyd/made-in-nigeria"><img src="https://img.shields.io/badge/made%20in-nigeria-008751.svg?style=flat-square" alt="Made in Nigeria"/></a><br />
  <a href="https://ci.appveyor.com/project/BolorunduroWinnerTimothy/ngx-semantic/branch/master"><img src="https://ci.appveyor.com/api/projects/status/gd04694avya0aa2f/branch/master?svg=true" alt="CI Build"/></a>
</p>

<h4 align="center">
  <br />
  <a href="https://ngx-semantic.github.io/">Website</a>
  ·
  <a href="#-installation">Installation</a>
</h4>

## Introduction

Angular and jQuery don't go together - this is the fundamental principle of this library. It provides Angular component versions of the Semantic UI elements, views and modules, so that you don't need to add jQuery to your app.

**NOTE:** Unlike most other angular libraries that provide Semantic UI support, this library covers much more than the Semantic UI modules. It also provides Angular wrappers for the Elements, Collections, as well as Views.

## 🚀 Installation

See the [Documentation](https://ngx-semantic.github.io/) for installation instructions and extensive examples.

## Dependencies

* [Angular](https://angular.io) (>=9.0.0)
* [Semantic UI CSS](https://semantic-ui.com/) (^2.4.1) (jQuery is **not** required)

## Component Support

|           Icon          |                                      Description                                    |
|-------------------------|-------------------------------------------------------------------------------------|
| :white_check_mark:      | Component supported by ngx-semantic.                                                |
| :rocket:                | Semantic UI plugin supported by ngx-semantic (not in Semantic UI Core).             |
| :white_check_mark: | Component supported natively by [Semantic UI](https://semantic-ui.com/) (CSS only). |
| :x:                     | Component currently unavailable.                                                    |
| :no_entry_sign:         | Component not applicable to Angular.                                                |

|              Elements              |            Collections             |                   Views                  |              Modules              |              Behaviors              |
|------------------------------------|------------------------------------|------------------------------------------|-----------------------------------|-------------------------------------|
| :white_check_mark: Button     | :white_check_mark: Breadcrumb | :white_check_mark: Advertisement     | :white_check_mark: Accordion      | :no_entry_sign: API                 |
| :white_check_mark: Container  | :white_check_mark: Form       | :white_check_mark: Card             | :white_check_mark: Checkbox       | :no_entry_sign: Form Validation     |
| :white_check_mark: Divider    | :white_check_mark: Grid       | :white_check_mark: Comment          | :rocket: Collapse                 | :rocket: Localization               |
| :white_check_mark: Flag       | :white_check_mark: Menu       | :white_check_mark: Feed             | :rocket: Datepicker               | :x: Visibility                      |
| :white_check_mark: Header     | :white_check_mark: Message         | :white_check_mark: Item             | :white_check_mark: Dimmer         |                                     |
| :white_check_mark: Icon       | :white_check_mark: Table                | :white_check_mark: Statistic        | :white_check_mark: Dropdown       |                                     |
| :white_check_mark: Image      |      |                                          | :x: Embed                         |                                     |
| :white_check_mark: Input      |                                    |                                          | :white_check_mark: Modal          |                                     |
| :white_check_mark: Label      |                                    |                                          | :white_check_mark: Popup          |                                     |
| :white_check_mark: List       |                                    |                                          | :white_check_mark: Progress       |                                     |
| :white_check_mark: Loader     |                                    |                                          | :white_check_mark: Rating         |                                     |
| :white_check_mark: Rail       |                                    |                                          | :white_check_mark: Search         |                                     |
| :white_check_mark: Reveal     |                                    |                                          | :x: Shape                         |                                     |
| :white_check_mark: Segment    |                                    |                                          | :white_check_mark: Sidebar        |                                     |
| :white_check_mark: Step       |                                    |                                          | :x: Sticky                        |                                     |
|                                    |                                    |                                          | :white_check_mark: Tab            |                                     |
|                                    |                                    |                                          | :white_check_mark: Toast          |                                     |
|                                    |                                    |                                          | :white_check_mark: Transition     |                                     |

# NgxSemantic

[![Build status](https://ci.appveyor.com/api/projects/status/gd04694avya0aa2f/branch/master?svg=true)](https://ci.appveyor.com/project/BolorunduroWinnerTimothy/ngx-semantic/branch/master) 
[![codecov](https://codecov.io/gh/ngx-semantic/ngx-semantic/branch/master/graph/badge.svg)](https://codecov.io/gh/ngx-semantic/ngx-semantic) 
![npm (tag)](https://img.shields.io/npm/v/ngx-semantic) 
![npm (tag)](https://img.shields.io/npm/v/ngx-semantic/alpha) [![Made in Nigeria](https://img.shields.io/badge/made%20in-nigeria-008751.svg?style=flat-square)](https://github.com/acekyd/made-in-nigeria)

## Installation

```bash
npm install ngx-semantic
```
or
```bash
yarn add ngx-semantic
```

## Usage

Check out the docs at the [wiki](http://ngx-semantic.github.io/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
