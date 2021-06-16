# Bodhi Leaf Coffee and Tea Price Scraper

This app is designed to make it easy to search and scrape
Bodhi Leaf's green coffee items. You can use this tool via
the command line, and then pipe it to filter results. There
is some basic sorting features designed to render the output
as desired.

There are two formats for formatting the data – JSON and Table format.
JSON could be useful for additional data manipulation and consumption.
Table format is designed to be human readable.

## Getting Started

### Dependencies

1. Node.js

You must install Node.js to run this tool.

### Running the App

1. Clone the repository.
2. Run `npm install`.
3. Run `npm start`
    a. To pass additional command line arguments see examples below.


## Configuration

There are two way to run the app – interactive, and non-interactive.

## Examples

### Interactive

```shell
npm start -- --interactive
```

### Non-Interactive

```shell
npm start
```

#### Non-Interactive With Arguments

```shell
npm start -- --sort "price DESC" --format JSON
```

### Getting Help

```shell
npm start -- --help
```

## Issues

Please use the issue tracker to submit any issues.
