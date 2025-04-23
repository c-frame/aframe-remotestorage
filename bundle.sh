#!/bin/sh
OUT=build/aframe-remotestorage
set -xe
{ 
  echo "" # leading linebreak for cat-friendly js-bundling
  curl "https://unpkg.com/remotestoragejs@2.0.0-beta.7/release/remotestorage.js" && echo ";" && \
  curl "https://unpkg.com/remotestorage-widget@1.6.0/build/widget.js"            && echo ";" && \
  cat index.js
  echo "" # trailing linebreak for cat-friendly js-bundling
} > $OUT.js

command -v minify && {
	set -x
  minify -o $OUT.min.js $OUT.js 
  echo -e "\n" >> $OUT.min.js # trailing linebreak for cat-friendly js-bundling
}

ls -lh build
