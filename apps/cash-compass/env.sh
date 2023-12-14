#!/bin/bash

# Create a new file to store our global variables
echo "window._env = {" > ./dist/cash-compass/env-config.js

# Read each line in .env.docker and create a JavaScript entry
while read -r line || [[ -n "$line" ]];
do
  if [[ ! $line == \#* && ! -z $line ]]; then
    key=$(echo $line | cut -f1 -d'=')
    value=$(echo $line | cut -f2 -d'=')
    echo "  $key: \"$value\"," >> ./dist/cash-compass/env-config.js
  fi
done < .env.docker

echo "}" >> ./dist/cash-compass/env-config.js
