#!/usr/bin/env bash
###
# switch application environment for publish to different accounts
###

dir=$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
cd "$dir"

SED=sed
[[ -x `which gsed 2>/dev/null` ]] && SED=gsed

usage() {
  echo "Usage:"
  echo ""
  echo "$0 (prod|test|loc)"
  echo ""
  exit 1
}

if [[ "$#" -lt 1 ]]
then
  usage
fi

APP_JSON=app.sfscon_test.json
EAS_JSON=eas.sfscon_test.json

case "$1" in
  "prod")
      APP_JSON=app.sfscon_prod.json
      EAS_JSON=eas.sfscon_prod.json
      ;;
  "test")
      ;;
  "loc")
      ;;
  *)
      echo "Unknown option $1"
      echo
      usage
      ;;
esac


echo "Configuring for $1:"
echo "app.json -> $APP_JSON"
echo "eas.json -> $EAS_JSON"
[[ -f app.json ]] && rm app.json
ln -s config/$APP_JSON app.json
[[ -f eas.json ]] && rm eas.json
ln -s config/$EAS_JSON eas.json

echo "WARNING!!! remove metro_cache!!!"

