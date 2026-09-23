<p align="center">
  <img
    src="https://raw.githubusercontent.com/ngx-semantic/ngx-semantic-docs/master/src/assets/images/logo.png"
    alt="NgxSemantic"  />
  <h1 align=center>NgxSemantic</h1>
</p>


<p align="center">
  <a href="https://github.com/ngx-semantic/ngx-semantic/actions/workflows/build-and-test.yml"><img src="https://github.com/ngx-semantic/ngx-semantic/actions/workflows/build-and-test.yml/badge.svg" alt="Build and Test"></a>
  <a href="https://www.npmjs.com/package/ngx-semantic"><img alt="npm" src="https://img.shields.io/npm/v/ngx-semantic"></a>
  <a href="https://codecov.io/gh/ngx-semantic/ngx-semantic"><img src="https://codecov.io/gh/ngx-semantic/ngx-semantic/branch/master/graph/badge.svg?token=P93GI0LR8F" alt="codecov"/></a>
  <a href="https://github.com/acekyd/made-in-nigeria"><img src="https://img.shields.io/badge/made%20in-nigeria-008751.svg?style=flat-square" alt="Made in Nigeria"/></a><br />
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

## Looking for help!

There is a lot to do and few maintainers with little time :). If you'd like to help with this project, please let us know.

NgxSemantic is the Angular integration for <a src="https://semantic-ui.com/">Semantic UI</a>. It is highly inspired by <a src="https://react.semantic-ui.com">Semantic UI React</a> and <a src="https://semantic-ui-vue.github.io">Semantic UI Vue</a>
NgxSemantic is still **under heavy development**. Please, feel free to contribute to the [codebase](https://github.com/ngx-semantic/ngx-semantic) or to the [documentation](https://github.com/ngx-semantic/ngx-semantic-docs).

## 🚀 Installation

See the [Documentation](https://ngx-semantic.github.io/) for installation instructions and extensive examples.

## Dependencies

* [Angular](https://angular.io) (>=21.0.0)
* [Semantic UI CSS](https://semantic-ui.com/) (>=2.4.1) (jQuery is **not** required)

## Standalone usage

All directives, components, and pipes in this library are **standalone**. You can either:

- **NgModules (existing style):** import a feature module such as `SuiButtonModule` from `ngx-semantic/elements/button` and add it to your module’s `imports`, or import `NgxSemanticModule` from `ngx-semantic` to register the full set.
- **Standalone components / `bootstrapApplication`:** import the concrete classes you need (for example `SuiButtonDirective`, `SuiTabsComponent`) from the same secondary entry points and add them to your component’s `imports` array.

## Component Support

|           Icon          |                                      Description                                    |
|-------------------------|-------------------------------------------------------------------------------------|
| :white_check_mark:      | Component supported by ngx-semantic.                                                |
| :rocket:                | Semantic UI plugin supported by ngx-semantic (not in Semantic UI Core).             |
| :x:                     | Component currently unavailable.                                                    |
| :no_entry_sign:         | Component not applicable to Angular.                                                |

| Elements                     | Collections                   | Views                            | Modules                       | Behaviors                       |
|------------------------------|-------------------------------|----------------------------------|-------------------------------|---------------------------------|
| :white_check_mark: Button    | :white_check_mark: Breadcrumb | :white_check_mark: Advertisement | :white_check_mark: Accordion  | :no_entry_sign: API             |
| :white_check_mark: Container | :white_check_mark: Form       | :white_check_mark: Card          | :white_check_mark: Checkbox   | :no_entry_sign: Form Validation |
| :white_check_mark: Divider   | :white_check_mark: Grid       | :white_check_mark: Comment       | :white_check_mark: Dimmer     | :white_check_mark: Visibility   |
| :white_check_mark: Flag      | :white_check_mark: Menu       | :white_check_mark: Feed          | :white_check_mark: Dropdown   |                                 |
| :white_check_mark: Header    | :white_check_mark: Message    | :white_check_mark: Item          | :white_check_mark: Embed      |                                 |
| :white_check_mark: Icon      | :white_check_mark: Table      | :white_check_mark: Statistic     | :white_check_mark: Modal      |                                 |
| :white_check_mark: Image     |                               |                                  | :white_check_mark: Popup      |                                 |
| :white_check_mark: Input     |                               |                                  | :white_check_mark: Progress   |                                 |
| :white_check_mark: Label     |                               |                                  | :white_check_mark: Rating     |                                 |
| :white_check_mark: List      |                               |                                  | :white_check_mark: Search     |                                 |
| :white_check_mark: Loader    |                               |                                  | :rocket: Select               |                                 |
| :white_check_mark: Rail      |                               |                                  | :white_check_mark: Shape      |                                 |
| :white_check_mark: Reveal    |                               |                                  | :white_check_mark: Sidebar    |                                 |
| :white_check_mark: Segment   |                               |                                  | :white_check_mark: Sticky     |                                 |
| :white_check_mark: Step      |                               |                                  | :white_check_mark: Tab        |                                 |
|                              |                               |                                  | :white_check_mark: Transition |                                 |

## Development

To generate all library files:

```bash
$ npm run build:local
```

## Testing

To run the unit tests suite:
```bash
$ npm test
```

## Releasing

The version that is published to npm is **`src/package.json`**, not the root workspace `package.json`.

1. Bump the version in `src/package.json` and merge that change to `master`.
2. Tag the release to match that version (include the leading `v`):

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

Pushing a `v*` tag runs CI on that commit, publishes `dist/` to npm with provenance, and creates a GitHub Release. Alpha and beta versions (`-alpha`, `-beta`) publish to the `alpha` / `beta` npm dist-tags and are marked as GitHub prereleases.

To retry a failed publish of an existing tag, use **Actions → Publish to Registry → Run workflow** and pass the tag (for example `v2.0.7-beta.2`). npm will reject a version that is already published.

## Dependency security

The published library depends only on `tslib` and Angular peer packages. CI fails on high-or-worse findings from `npm audit --omit=dev`.

Full `npm audit` may still report a moderate `uuid` issue pulled in through `sockjs` → `webpack-dev-server` (Karma / `ng serve` only). There is no patched `sockjs` on Angular 21; it is not shipped to consumers.

## License

MIT © [Ngx-Semantic Team](https://github.com/ngx-semantic)
