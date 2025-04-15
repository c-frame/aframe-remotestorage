#!/bin/sh
OUT=build/aframe-remotestorage
set -xe
{ 
  curl "https://unpkg.com/remotestoragejs@2.0.0-beta.7/release/remotestorage.js" && echo ";" && \
  curl "https://unpkg.com/remotestorage-widget@1.6.0/build/widget.js"            && echo ";" && \
  cat index.js
} > $OUT.js

command -v minify && minify -o $OUT.min.js $OUT.js 

ls -lh build
