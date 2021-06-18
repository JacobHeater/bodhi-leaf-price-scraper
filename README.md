# Bodhi Leaf Coffee Trader's Price Scraper

This app is designed to make it easy to search and scrape
[Bodhi Leaf's](https://www.bodhileafcoffee.com/) green coffee items. 
You can use this tool via the command line, and then pipe it to filter 
results. There is some basic sorting features designed to render the output
as desired.

You may format the data in the following formats: JSON, table, and
CSV.

## Getting Started

### Dependencies

1. Node.js

You must install Node.js to run this tool.

### Running the App

1. Clone the repository.
2. Run `npm install`.
3. Run `npm start`
    a. To pass additional command line arguments see examples below.

#### Command Line Parameters

```bash
Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -s, --sort         How to sort the product results.
      [string] [choices: "price ASC", "price DESC", "rating ASC", "rating DESC",
                               "title ASC", "title DESC"] [default: "price ASC"]
  -f, --format       How to present the report results.
                   [string] [choices: "table", "json", "csv"] [default: "table"]
  -p, --pretty       Print JSON in pretty print format?
                                                      [boolean] [default: false]
  -i, --interactive  Run the app in interactive mode? [boolean] [default: false]
      --noHeader     Do you want to omit the header from stdout?
                                                      [boolean] [default: false]
```

## Configuration

There are two way to run the app – interactive, and non-interactive.

## Examples

### Interactive

```bash
npm start -- --interactive
```

### Non-Interactive

```bash
npm start
```

#### Non-Interactive With Arguments

```bash
npm start -- --sort "price DESC" --format JSON
```

### Getting Help

```bash
npm start -- --help
```

## Searching for Coffees by Id

If you have found a coffee in the output that you would like to search
by id, you may use the command line to search for a specific coffee by
id. Usage instructions can be found at [SEARCH.md](/SEARCH.md).

## Issues

Please use the issue tracker to submit any issues.
