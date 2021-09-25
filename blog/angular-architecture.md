---
title: 'Angular Architecture'
description: 'Some simple steps to ensure your application is as lean as possible'
image: "/assets/images/blog/angular-architecture/angular.jpeg"
published: true
topic: 'angular'
date: '25/09/2021'
---

# Angular Architecture

## Introduction

It is essential to structure your Angular application correctly to provide the best user experience.  As web technology has improved over the years with client-side routing and caching, users are unwilling to wait long for apps to start.

Therefore, we must understand how to architect our apps to optimise the initial load time.  Nordstrom (a North American fashion retailer) reported that they suffered an 11% drop in sales when their website initial load time increased by just half a second.

Luckily for us Angular developers, it's not too difficult to do, and it just takes a little bit of thought as to where we want to include the application modules.  This is down to Angular's code splitting API... sometimes referred to as "lazy-loading".

The application structure should be divided into modules required at startup (eager loaded) and modules only needed when the user navigates to that part of the application (lazy-loaded).

The primary purpose of this architecture is to keep the main bundle size as small as possible for faster initial load times.

Inspiration for this article came from a very insightful episode of [Angular Air](https://angularair.com/) featuring [Tomas Trajan](https://tomastrajan.com/home).  I have been building Angular applications for many years following this architecture, and Tomas's talk inspired me to write this article.

![Application Architecture](../../assets/images/blog/angular-architecture/angular-architecture.png)

## Eager Loaded

These modules will be loaded when the application starts.
Examples of modules required at startup are the navigation components, layout components, authentication, analytics etc.

When adding a piece of code, you should ask the question, "Does this code need to run when the application starts up?".  If the answer is "Yes", then include it in the core or app module.  If the answer is "No", then you should lazy load it.
## Lazy Loaded

These modules will only be loaded when the user navigates to the various parts of the application via Angular's lazy-loaded routing mechanism.

You can lazy-load a route in the following way.
<pre>
const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  }
];
</pre>

When modules are lazy-loaded, they get their own separate bundle to the main bundle. Having an individual bundle for modules has many advantages, such as keeping the main bundle size small, resulting in faster initial loading times and a better developer experience.

When working on lazy-loaded modules, that module bundle will be rebuilt and not the main bundle or any other lazy-loaded module bundles.

Lazy loading modules also give you the advantage of runtime errors if you are using any components or services etc., from one feature module in another. This is advantageous as it's not good practice to do this as you would not expect to change something in "Feature A" that results in "Feature B" breaking.

## Services

We should only provide services at the root level if the entire application requires them or is essential for starting up.

A service provided at the root level will have a decorator with the `providedIn` property set to `'root'`.

<pre>
@Injectable({ providedIn: 'root' })
export class SomeService { }
</pre>

Alternatively add them to the providers array in the Core or App module.

Services required for one module should be provided by adding them to the module's providers array. The injectable decorator should be empty in these cases.

<pre>
@Injectable()
export class SomeService { }
...

@NgModule({
    providers: [
        SomeService,
    ],
})
export class SomeModule { }
</pre>

If a service is required by several feature modules, then it should be added to a module in the shared folder and imported into the feature modules as needed.

## Shared Folder

It is an important distinction that the shared folder is a folder and not a module. A shared module will become substantial and will likely get imported into all the feature modules, bloating their bundle size.

The shared folder should consist of several child modules, which will be imported as needed. For example, it may contain a list module for all the list components or a table module for all the table components.

## Features

As mentioned previously, all feature modules should be lazy-loaded via Angular's code splitting API.

It is essential to build out your feature pages with as many dumb UI components as possible, and doing this will increase the reusability and performance of the application.

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

These are simple presentational components that do not contain any business logic and will rarely have their own state except for UI state (as opposed to data state).

For performance, they should always use the `OnPush` change detection strategy.

They should have zero external dependencies, ie the constructor should be empty.

Data is passed to them via the `input` decorator, and the parent component will deal with any functionality via the `output` decorator.  The parent component should be either a Smart component or a Page.

### Smart Components

Smart components can contain the application's business logic, and the template will generally include one or more dumb components.

Smart components can also have external dependencies, and the dependencies may consist of services that can handle the business logic for the component if needed.

I usually keep the change detection strategy as the default setting as you may not guarantee any side effects due to the business logic.

They may also have `inputs` and possibly `outputs`, but this is less likely as the component or service usually handles any functionality.

Smart components are usually used to avoid nesting dumb components. If you are nesting dumb components, you may be in a position where you are passing data up multiple levels to be dealt with, which is not good practice. It is best to use a Smart component if you are doing this, so data only has to be passed up one level.

### Pages

These are the same as smart components, but the only difference is that these will be part of the application routing, and all navigation should be to a Page component.

Page templates may consist of a number of dumb and container components.

### Store

This folder will contain all the relative NgRx logic for the feature.  It is good to decouple the store from the rest of the application to reduce the complexity for the not so experienced developers.

I would also suggest using a facade service for any store interactions so that developers without any NgRx knowledge can work on the feature components without being too overwhelmed. 

NgRx is too broad of a subject to cover in this article, and I will cover this in a future blog post. 

## Conclusion

As this article shows, it is relatively simple to architect your Angular applications in the best possible way to increase performance and to provide the best user and developer experience.

If you think about these things upfront, you can ensure that users will not leave your site due to slow load times.  Applying these concepts as an afterthought will make your life a lot more complicated.

To avoid regression over time, be sure to watch for Angular warnings when your bundle size exceeds the budget allowance configured in the `angular.json` file.
