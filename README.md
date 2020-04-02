# TrezyFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.


## Config

Before start you have to set environments file with API routes and password (md5 hash). Sample config: 
```
export const environment = {
    production: false,
    api_url: 'http://localhost:3000',
    routes: {
        incomes: 'incomes',
        income: 'income',
        expenses: 'expenses',
        expense: 'expense',
        category: 'category',
        categories: 'categories',
        account: 'account',
        accounts: 'accounts'
    },
    password: '2278a0f743d90e23b2fb4d009e6af10a', // Demo123
};
```
Path: `src/environments/environment.ts`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
