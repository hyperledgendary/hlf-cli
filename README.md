# hlf-cli

[![Build Status](https://dev.azure.com/hyperledgendary/hlf-cli/_apis/build/status/hyperledgendary.hlf-cli?branchName=master)](https://dev.azure.com/hyperledgendary/hlf-cli/_build/latest?definitionId=1&branchName=master)

Experimental Hyperledger Fabric CLI

**Warning:** nothing is guaranteed stay the same, or to even work!

## Installation

```
npm install -g hlf-cli
```

## Usage

Type `hlf --help` to list the available commands.

## Example

To list the files inside a package:

```
hlf package -x ./mysterious.cds | tar -tvf -
```
