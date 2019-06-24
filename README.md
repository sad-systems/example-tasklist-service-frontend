# Task list demo application (client side interface)

###### Author: MrDigger <mrdigger@mail.ru>
###### © SAD-Systems [http://sad-systems.ru](), 2019

## Is used

  * [React.js](https://reactjs.org)
  * [apollo graphql](https://www.apollographql.com)
  * [bootstrap](https://getbootstrap.com)
    
## Description

This repository contains the client side interface implementation only.
The server side is placed in [tasklist-service-backtend](https://github.com/sad-systems/example-tasklist-service-backend)
repository. 

It represents a simple User Interface is designed with using the Bootstrap CSS library 
and powered with React.js + Apollo.

The application uses GraphQL technology to provide service.
GraphQL is a modern way to build HTTP APIs consumed by the web and mobile clients. 
It is intended to be an alternative to REST and SOAP APIs

### Live demo

Try the [live demo](http://tasklist.frontend.examples.sad-systems.ru/)
  
Use: 

  * username: admin
  * password: 123
   
to get the access to edit tasks.
 
### Project source files

  All the source files are placed under the [/src](./src) folder
  
### Project build files

 Production files are placed under the `/build` folder.
 To see the working project replace all the files from this 
 folder to the web server document root folder. 

## To developer

### Setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```
