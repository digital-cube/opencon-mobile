#!/usr/bin/env bash

VERSION_FILE=constants/buildVersion.js
current_date=`date +"%d %b %Y %H:%M"`
current_version=`git log --pretty=format:'%h' -n 1`
SED=sed
[[ -x `which gsed 2>/dev/null` ]] && SED=gsed

if grep -q 'BUILD_DATE' $VERSION_FILE
then
  $SED -i "s/BUILD_DATE.*/BUILD_DATE = \"$current_date\"/g" $VERSION_FILE
else
  echo "export const BUILD_DATE = \"$current_date\"" >> $VERSION_FILE
fi

if grep -q 'BUILD_VERSION' $VERSION_FILE
then
  $SED -i "s/BUILD_VERSION.*/BUILD_VERSION = \"$current_version\"/g" $VERSION_FILE
else
  echo "export const BUILD_VERSION = \"$current_version\"" >> $VERSION_FILE
fi

