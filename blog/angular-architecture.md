---
title: 'Angular Architecture'
description: 'blog description'
image: "/assets/images/blog/how-I-built-this-blog.jpeg"
published: false
slugs:
    - ___UNPUBLISHED___knuhcsd5_aGDZlWfPUNR8nQzYZRGGVxypAnFixmW6
---

# Angular Architecture

## Introduction

There are many different ways to architect an Angular application.  This post details my approach which works well for large applications.

## Top Level Folders

![Top level folder structure](../../assets/images/blog/angular-architecture/top-level-folders.png)

There's not much different here to what Angular gives you out the box.  The only addition is the "testing" folder.  This is where we can store any helper and utilities files for testing such as generating dummy data or mocking dependencies.

## The App Folder

![The app folder structure](../../assets/images/blog/angular-architecture/app-folder.png)

This is where it gets a little bit more interesting.  This folder contains two sub-folders and the core module which is also a folder but it's important to mention that the other two are just folders and not modules.

1. Core Module
2. Shared Folder
3. Features Folder

Other than the three folders above which I will go into more detail about next, there are also the files associated with the app component.  The app component is the default entry component that Angular bootstraps when the application is launched.  When creating a new Angular application this is the initial component that is created.

### Core Module

![The core module](../../assets/images/blog/angular-architecture/core-module.png)

The core module is originally where the application services were located as most services are singletons and this module is only ever imported once into the App Module.

However since Angular 6.0 you can pass the `providedIn` property to the `@Injectable()` decorator to declare that a service should be provided in the root of the application making it a singleton.  This means that we no longer need to place all our services in the Core Module and it's actually better to declare services for specific features in their respective feature module.

I have come across some Angular applications in recent years where there is not a core module but I think this is a bad idea, especially for larger complex apps.  I want to know exactly what an application needs to run and without the core module it makes it very difficult.

The core module should contain all the components and services that the app needs to function apart from the App Component itself.  If you were to remove a component or service from the Core Module then you should expect the app to loose some essential core functionality.  This could be that it no longer reports analytics or you can no longer navigate about the app.

Examples of other sub-modules you may expect to find here are:

1. Analytics Module
2. Authentication Module
3. Navigation Module
4. Root Store Module (NgRx)

It is likely that every feature in the app will need to send analytics to some third party service.  If the app is secure then the authentication module will need to always be available.  Without the navigation module users will not be able to navigate about the app.  If the application uses NgRx for state management then removing the root store module will likely stop the app from functioning at all.

### Shared Folder

The distinction between this being a folder rather than a module is important. I have worked with developers who feel a shared module is the devil... and I somewhat agree.

The problem with shared modules is that they become a dumping ground for all the components, pipes, and directives that we share amongst the various feature modules.

Over time this "module" could become huge and it is likely imported into pretty much every feature module. This can result in bloated bundle sizes and a fairly chaotic-looking dependency graph.

The solution is to lose the shared module and just keep the folder. You can then create multiple modules for the various shared components and directives etc.

For example, you may have a data table that is required in multiple feature modules. Simply creating a module for the data table means you can just import that single component into those feature modules and not the entire shared module which could potentially be many MB's in size.

How granular you go with the shared module is up to you and dependent upon the application you are building. You could create a module for every single pipe, directive, or component. You could group all the pipes, directives, and components logically into various modules. For example, you may have a module for all your pipes or create a table module for all shared table components and directives, etc.

### Feature Folder

![The feature folder](../../assets/images/blog/angular-architecture/feature-folder.png)

The feature folder is once again just a folder.  When I first started building apps with Angular I used to create a feature module which contained all what I would refer to as domain level components.  This is fine for small and simple applications but for medium sized apps and above I would not recommend doing this.  

If all your various feature modules are imported into one single feature module which in turn is imported into the app module then you will loose the ability to lazy load them.  This means that the initial startup time of your application could be very slow as it needs to load all the various modules regardless if the user ever visits that part of the application.

Only importing your feature modules when a user navigates to that specific view will keep your startup times small.

Organising the feature folder by their domain makes it easy for new developers to quickly navigate about the code base.  Even though this blog is relatively small I still chose to architect in this way.  

Therefore my feature folder contains the following feature modules:

1. About
2. Blog
3. Home

These relate to the top level domains of the site.

![The top level site domains](../../assets/images/blog/angular-architecture/site-domains.png)


