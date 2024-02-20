#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <document>"
    exit 1
fi

DOCUMENT=$1

mkdir -p img

grep -o '[https:]*//[^"]*\.png' "$DOCUMENT" | while read -r URL; do
    FILENAME="${URL##*/}"
    DOWNLOAD_PATH=$URL
    if [[ ! $URL =~ ^https:// ]]; then
        DOWNLOAD_PATH="https:${URL}"
    fi
    wget -O "img/$FILENAME" "$DOWNLOAD_PATH" --no-check-certificate
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|$URL|/img/index/$FILENAME|g" "$DOCUMENT"
    else
        sed -i "s|$URL|/img/index/$FILENAME|g" "$DOCUMENT"
    fi
done

echo "OK."
