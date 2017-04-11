# Thermostat Web UI

AngularJS & Patternfly Application: Thermostat UI

## Dependencies:

`npm`, which will pull down all other dependencies.

`keycloak.json` generated by a Keycloak server (if desired, ie, running with
`NODE_ENV=production`), placed in `src/app/auth/`. The file contents should
look like:

    {
        "url": "http://some.domain:PORT/auth",
        "realm": "FooRealm",
        "clientId": "BarClientId"
    }

## How to use

Live-reload development:

`npm start`, then point a web browser at localhost:8080.

One-time build:

`npm run build`

Run tests:

`npm test` (one-time) or `npm run test-watch` (live-reload)
