# Data Models

A system for efficiently creating dummy JSON data. This data can be used to drive front-end component libraries built in Storybook. This project uses [Gulp](https://gulpjs.com/) to compile [Pug](https://pugjs.org/) into XML and then transpile the XML into JSON.

## Getting Started

### Dependencies
* Node & npm
* Gulp 4


### Installation

1. If you haven't already, [use nvm to install node and npm](https://www.codementor.io/mercurial/how-to-install-node-js-on-macos-sierra-mphz41ekk)
2. If you haven't already, globally install the gulp command line tools: `npm install --global gulp-cli`
3. Clone this repo
4. In the project folder, install the node package dependencies: `npm install`

### New Project Branches

When starting new data models for a new project, create a new branch with the project name (e.g. `dghi`) by branching off of `master`. This new branch can be considered the master branch for that specific project.

If multiple people are collaborating, create individual feature branches off of the main project branch (e.g. `dghi/photo-gallery-component`) and then open PRs to merge them in.

### Compiling and Transpiling

Gulp is used to compile the Pug into XML, and to transpile the XML into JSON. Individual tasks exist in `gulpfile.js` to perform these actions:

* To compile Pug into XML, run `gulp pug`
* To transpile XML into JSON, run `gulp xml`

Gulp also has a watch feature, which will automatically run the above commands whenever a relevant file is saved:

* To automatically run the tasks whenever a file is saved, run `gulp watch`

A default task has been configured that will run the `pug` and `xml` tasks once, and then enable `watch`:

* To run all of the above at once (recommended), run: `gulp`

To stop the watch task, type <kbd>CTRL</kbd> + <kbd>C</kbd> (MacOS)

## Writing Pug→XML→JSON

### Basic Syntax

```pug
//- component.pug
fieldOne value
fieldTwo second value
myFieldset
  nestedField lorem ipsum
photos uno
photos dos
photos tres
```

compiles to:

```xml
<!-- component.xml -->
<root>
  <fieldOne>value</fieldOne>
  <fieldTwo>second value</fieldTwo>
  <myFieldset>
    <nestedField>lorem ipsum</nestedField>
  </myFieldset>
  <photos>uno</photos>
  <photos>dos</photos>
  <photos>tres</photos>
</root>
```

which transpiles to (`component.json`):

```json
{
  "fieldOne": "value",
  "fieldTwo": "second value",
  "myFieldset": {
    "nestedField": "lorem ipsum"
  },
  "photos": [
    "uno",
    "dos",
    "tres"
  ]
}
```
