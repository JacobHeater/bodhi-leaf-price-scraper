# Bodhi Leaf Coffee Trader's Coffee Search

Use this tool to lookup coffees by the id that is returned
from the main search application.

## Dependencies

See the dependencies from the main README file.

## Getting Started

Make sure to follow all of the getting started steps
from the main README file.

## Usage Instructions

### CLI Options

```bash
Options:
      --help           Show help                                       [boolean]
      --version        Show version number                             [boolean]
      --id             The id of the coffee product to get details for.
                                                             [string] [required]
      --reportPrice    Should the price be included as part of the plain text
                       report?                         [boolean] [default: true]
      --reportReviews  Should the reviews be included as part of the plain text
                       report?                         [boolean] [default: true]
  -f, --format         The format the report should be generated in.
                            [string] [choices: "json", "text"] [default: "text"]
  -p, --pretty         Do you want to pretty print the JSON?
                                                      [boolean] [default: false]
      --noHeader       Do you want to omit the header from stdout?
                                                      [boolean] [default: false]
```

### Examples

```bash
# Defaults for format
npm run search -- --id "your id here"

# JSON format
npm run search -- --id "your id here" --format json --pretty

# No product header in stdout
npm run search -- --id "your id here" --noHeader

# Getting the help message
npm run help:search
```

## Issues

Please use the issue tracker to document any issues encountered.
