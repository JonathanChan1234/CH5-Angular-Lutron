# Crestron CH5 Project in Angular

> Crestron CH5 UI Project aims at integrating with Lutron HWQS System (Individual Load Control/Scene Editing)

## Development (running in web browser)

``` bash
yarn start
```

## Build the project

``` bash
yarn build
```

## Deploy the project (to Crestron Touch Panel)

***Need to change the IP address of the touch panel in package.json***

``` bash
yarn archive
```

## Project Structure

    ├──app              # Root directory of the source files
        ├── components  # UI components used in the project
        ├── crestron    # Directive for Crestron signal joining 
        ├── directive   # Helper Directive for UI components
        ├── http        # HTTP interceptor
        ├── model       # Typescript types used in HTTP
        ├── page        # Entry components of each route
        ├── service     # Angular service for handling business logic
        ├── translation # ngx-translate custom loader
