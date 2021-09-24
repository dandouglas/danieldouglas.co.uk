---
title: 'Angular Architecture'
description: 'blog description'
image: "/assets/images/blog/how-I-built-this-blog.jpeg"
published: true
slugs:
    - ___UNPUBLISHED___knuhcsd5_aGDZlWfPUNR8nQzYZRGGVxypAnFixmW6
---

# Angular Architecture

The application structure should be divided into modules required at startup (eager loaded) and modules only needed when the user navigates to that part of the application (lazy-loaded).
The primary purpose of this architecture is to keep the main bundle size as small as possible for faster initial load times.

![Application Architecture](../../assets/images/blog/angular-architecture/angular-architecture.png)

## Eager Loaded

These modules will be loaded when the application starts.
Examples of modules required at startup are the navigation components, layout components, authentication, analytics etc.

## Lazy Loaded
These modules will only be loaded when the user navigates to the various parts of the application via Angular's lazy-loaded routing mechanism.

When modules are lazy-loaded, they get their own separate bundle to the main bundle. Having an individual bundle for modules has many advantages, such as keeping the main bundle size small, resulting in faster initial loading times and a better developer experience. When working on lazy-loaded modules, that module bundle will be rebuilt and not the main bundle or any other lazy-loaded module bundles.
Lazy loading modules also give you the advantage of runtime errors if you are using any components or services etc., from one feature module in another. This is advantageous as it's not good practice to do this as you would not expect to change something in "Feature A" that results in "Feature B" breaking.

## Services

Regarding the above, we should only provide services at the root level required by the entire application.
Services that are only required for one module should only be provided for that module by adding them to the module's providers array. The injectable decorator should be empty in these cases.

If a service is required by a number of feature modules, then it should be added to a module in the shared folder and imported into the feature modules as required.

## Shared Folder

It is an important distinction that the shared folder is a folder and not a module. The reason for this is that it will become substantial and will likely get imported into all the feature modules, and this will bloat the bundle size of those feature modules and result in a loss of all the benefits of lazy loading them.

The shared folder should consist of several child modules that can be imported as needed. For example, it may contain a list module for all the list components or a table module for all the table components, etc.

## Features

For a typical Angular application with NgRx, I would structure the feature modules file structure in the following way.

\> Feature A

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> components (dumb components)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> constants

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> containers (smart components)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> enums

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> graphql (queries and mutations)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> pages (routable smart components)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> services

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> store (NgRx)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> actions

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> effects

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> models (interfaces)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> reducers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \> selectors

### Dumb Components (UI components)

These are simple UI components and should not contain any business logic.
For performance, they should always use the OnPush change detection strategy.
They should have zero external dependencies, ie the constructor should be empty.
Data should be passed to them via the input decorator. Any functionality should be passed back up to the parent component.  The parent component should be either a Smart component or Page via the output decorator.

### Smart Components

Smart components can contain the application's business logic, and the template will generally include one or more Dumb components.
They can also have external dependencies. The dependencies may consist of services that can handle the business logic for the component if needed.
It is recommended that the change detection strategy remains as the default setting as you may not guarantee that there are no side effects due to the business logic.
They may also have inputs and possibly outputs, but this is less likely as the component usually handles any functionality.
Smart components are usually used to avoid nesting dumb components. If you are nesting Dumb components, you may be in a position where you are passing data up multiple levels to be dealt with, which is not good practice. If you are doing this, it is best to use a Smart component so data only has to be passed up one level.

### Pages
These are the same as Smart components, but the only difference is that these will be part of the application routing, and all navigation should be to a Page component.
