# Glick app

## Demo

View the app at https://glick.jennybelanger.com/

## Development setup

### Install requirements

- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Setup the API

See [Glick API](https://github.com/jlbelanger/glick-api).

### Clone the app repo

``` bash
git clone https://github.com/jlbelanger/glick-app.git
cd glick-app
```

All other commands should be run in the `glick-app` folder.

### Configure environment settings

``` bash
cp .env.example .env
```

### Install dependencies

``` bash
yarn install
```

### Start the app

``` bash
yarn start
```

Your browser should automatically open http://localhost:3000/

## Deployment

Note: The deploy script included in this repo depends on other scripts that only exist in my private repos. If you want to deploy this repo, you'll have to create your own script.

### First-time setup

Locally, run:

``` bash
cp .env.example .env.production
```

Set the variables in `.env.production`.

### Subsequent deploys

``` bash
./deploy.sh
```

## Helpful development stuff

### Lint

``` bash
yarn lint
```

### Test

``` bash
yarn test
```
