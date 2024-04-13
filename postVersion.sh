#!/bin/bash

# Use the version passed in from semantic-release
version=$1

# Use sed to replace the version in the root package.json
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$version\"/" package.json