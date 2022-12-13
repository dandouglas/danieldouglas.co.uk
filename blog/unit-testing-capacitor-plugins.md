---
title: Unit testing Capacitor plugins
description: blog description
published: false
---

# Unit testing Ionic Angular Capacitor plugins

Capacitor is a hybrid app runtime for creating apps that run on a number of platforms including iOS, Android and Electron.

There are many plugins available to enhance these applications by bridging the native capabilities of the device with the apps that are written in HTML, CSS and JavaScript.

If you are building your Ionic applications with the Angular framework then you may hit difficulties unit testing components that interact with one of these plugins.  This is because a plugin is really just a global object.

**TLDR;** Create an DI token that uses a factory method which returns the global `FirebaseAnalytics` object.

Lets say you have a service that is responsible for tracking analytics via the community Firebase Analytics plugin.

```
import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';

export class AnalyticsService {
    constructor() { }

    logEvent() {
        FirebaseAnalytics.logEvent('page_view', {page: "dashboard"})
            .then((res: any) => console.log(res))
            .catch((error: any) => console.error(error));
    }

...
}
```

## The Capacitor way

The Capacitor [docs](https://capacitorjs.com/docs/guides/mocking-plugins) describe an approach to testing these plugins but I could not get it to work.  The suggested approach for the Jest testing framework involves adding a `__mocks__/@capacitor` where you can store your stubs for the plugins you wish to test.  With the example above we would therefore create a `firebase-analytics.ts` file where we would stub the plugin.  Something like the following...

```
export const FirebaseAnalytics = {
    async logEvent(name: string, options: any) {
        ...
    }
}
```

When you run the tests then they should use the stub rather than the real plugin and you can mock and spy on the plugin methods.

As mentioned, this approach did not work for me which may be due to my project setup.  My apps live in a NX monorepo and I assumed it was due to the placement of the `__mocks__/@capacitor` folder.  However I tried a number placing the folder in a number of different places but to no avail.


## Alternative approach

I decided to take a different approach and one that also solved another bugbear of mine.  I am not a fan of global objects in Angular applications and wanted to replace the global object with an injection token.

Injection tokens make use of Angular's Dependency Injection, allowing them to be injected into a constructor.  We've also seen them in action before but we may not have realised.  Once example is the `DOCUMENT` DI Token.


```
constructor(@Inject(DOCUMENT) private document: Document) {}
```

Injection Tokens are fairly simple to create.  To solve the issue with testing Capacitor plugins I created an Injection Token for the Firebase Analytics plugin.

```
import { InjectionToken } from '@angular/core';
import { FirebaseAnalytics, FirebaseAnalyticsPlugin } from '@capacitor-community/firebase-analytics';

export const FIREBASE_ANALYTICS: InjectionToken<FirebaseAnalyticsPlugin> = new InjectionToken<FirebaseAnalyticsPlugin>(
  'An abstraction of the Firebase Analytics plugin',
  {
    factory: () => FirebaseAnalytics,
  }
);
```
It's as simple as that.  The DI Token uses a factory method that returns the global `FirebaseAnalytics` object.

To use this in our application we use the `@Inject` decorator inside of our service constructor.

```
export class AnalyticsService {
  constructor(
    @Inject(FIREBASE_ANALYTICS) private firebaseAnalytics: FirebaseAnalyticsPlugin,
  ) {}

  logEvent() {
        this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"})
            .then((res: any) => console.log(res))
            .catch((error: any) => console.error(error));
    }

```

We can then mock the dependency inside of our Jest `spec` file and spy on the `logEvent` method.

```
const logEventSpy = jest.fn();
const createService = createServiceFactory({
    service: AnalyticsService,
    providers: [
      {
        provide: FIREBASE_ANALYTICS,
        useValue: {
          logEvent: logEventSpy,
        }
      }
    ]
```
