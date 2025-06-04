#!/bin/bash

#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
