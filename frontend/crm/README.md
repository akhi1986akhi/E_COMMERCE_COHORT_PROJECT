# Crm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   ├── login.component.scss
│   │   │   └── login.component.spec.ts
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.scss
│   │   │   └── dashboard.component.spec.ts
│   │   └── layout/
│   │       ├── header/
│   │       │   ├── header.component.ts
│   │       │   ├── header.component.html
│   │       │   ├── header.component.scss
│   │       │   └── header.component.spec.ts
│   │       └── sidebar/
│   │           ├── sidebar.component.ts
│   │           ├── sidebar.component.html
│   │           ├── sidebar.component.scss
│   │           └── sidebar.component.spec.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   └── auth.guard.ts
│   ├── interfaces/
│   │   └── user.interface.ts
│   ├── utils/
│   │   └── constants.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   └── app.module.ts
├── assets/
│   └── images/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles/
    └── styles.scss
