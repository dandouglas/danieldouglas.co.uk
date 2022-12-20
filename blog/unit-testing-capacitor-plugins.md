---
title: 'Unit testing Capacitor plugins'
description: 'A simple guide on how to mock a Capacitor plugin'
image: 'assets/images/blog/testing-capacitor-plugins/capacitor-banner.jpeg'
published: true
topic: ['angular', 'capacitor']
date: '20/12/2022'


---
# Unit testing Ionic Angular Capacitor plugins

<small>21/12/2022</small>

![Capacitor and Ionic logo](../../assets/images/blog/testing-capacitor-plugins/capacitor-banner.jpeg)

Capacitor is a hybrid app runtime for creating apps that run on a number of platforms, including iOS, Android and Electron.

Many plugins are available to enhance these applications by bridging the native capabilities of the device with apps that are written in HTML, CSS and JavaScript.

If you are building your Ionic applications with the Angular framework, you may hit difficulties unit testing components that interact with one of these plugins. This is because a plugin is really just a global object and global objects are hard to mock.

<p class="tldr">TLDR: Create a DI token that uses a factory method which returns the global `FirebaseAnalytics` object.</p>

Let's say you have a service responsible for tracking analytics via the community Firebase Analytics plugin.

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

The Capacitor [docs](https://capacitorjs.com/docs/guides/mocking-plugins) suggest adding a `__mocks__/@capacitor` folder where you can store your stubs for the plugins you wish to test.

**Example stub**

```
export const FirebaseAnalytics = {
    async logEvent(name: string, options: any) {
        ...
    }
}
```

When you run the tests then they should use the stub, rather than the real plugin, and you can mock and spy on the plugin methods.

This approach did not work for me due to my project setup.  My apps live in an NX monorepo and I assumed it was due to the placement of the `__mocks__/@capacitor` folder.  But, I tried placing the folder in many different places but to no avail.


## Alternative approach

I decided to take a different approach, one that also solved another bugbear of mine. I am not a fan of global objects in Angular applications and wanted to replace the global object with an injection token.

Injection tokens make use of Angular's dependency injection, allowing them to be injected into a constructor. We've also seen them in action before, but we may not have realised it. One example is the `DOCUMENT` DI Token.


```
constructor(@Inject(DOCUMENT) private document: Document) {}
```

Injection tokens are fairly simple to create. I created an injection token for the Firebase Analytics plugin which made it easy for me to mock the plugin methods.

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
It's as simple as that. The DI token uses a factory method that returns the global `FirebaseAnalytics` object.

To use this in our application, we use the `@Inject` decorator inside of our service constructor.

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

Of course, the method described here can solve a number of problems, not just those related to Capacitor plugins. For example, when working with older APIs that don't have any injectable services etc.
