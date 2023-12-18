# opencon-app

OPENCON mobile application

## Run Developer Environment

- on first start:

  - go to expo, create an account, then create a new project and copy the following commands in the root of your project:

  - eas init --id [projectId]

  - if you already don't have eas-cli, run npm install --global eas-cli

  - run npm install

  - run npx expo-doctor to make sure that dependencies are up to date and compatible with the current version of expo

  - create and update google-services.json (use google-services.json.sample) as template. https://docs.expo.dev/push-notifications/push-notifications-setup/#get-credentials-for-development-builds

```bash
npx expo start
```

## Pre-build

- run eas build:configure and follow further instructions

- run eas update:conigure and follow further instructions

- execute prepare script:

```bash
./prepare_build.sh [option]    options: test / prod
```

## Build

```bash
./prepare_build.sh
rm __metro_cache__
eas build --profile prod
```

- If you need to start a build on a simulator, include "simulator: true" in eas.json in desired configuration.
- By default it is included in "test" profile.
