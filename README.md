# PasswordManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Functionality

It is a simple password manager tool build using Angular. Json-server is used for setting up sample API.

Features: 

Add password: Add account to database with password encrypted.

Get all passwords: Retrives all account with password encrypted.

Get single password: When searched with ID, it retrieves specified account with encrypted password.

Update password: Updates account with decrypted password.

Delete password: Deletes user account.

Install JSON Server

npm install -g json-server

Start JSON Server

json-server --watch db.json



