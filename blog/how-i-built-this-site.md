---
title: 'How I built this site'
description: 'A quick overview of the tech stack and tooling used to produce this site.'
published: true
image: "/assets/images/blog/how-I-built-this-blog.jpeg"
topic: 'tech'
date: '14/05/2022'
---

# How I built this site

<small>14/05/2022</small>

![A computer screen with random code](../../assets/images/blog/how-I-built-this-blog.jpeg)

As this is my first post, I thought what better to write about than how I built the site and the tooling used.

This site was created with [Angular](https://angular.io/).  You may be thinking, "_that's like using a sledgehammer to crack a nut_" or "_a rocket launcher to kill a flea_" or any other idiom you prefer.  To some extent, I agree, but I have my reasons for building the site with Angular.

For one, I know Angular very well as I have been developing software with it since the dark days of AngularJs.  This meant I could get the site up and running in a short amount of time as my capacity for side projects is limited.  Before I move on to my second reason, why don't you disable JavaScript in your browser?  As you can see the site still functions perfectly despite being an Angular app.  The reason for this is that it is a JamStack app.

There weren't any options to build JamStack apps with Angular, and then came [Scully](https://scully.io/) (named after a television character from a certain tv show).

Scully will turn your Angular app into highly optimized static pages.  It does this by examining the app source and creating an index file for each page while setting up a configuration file for all the routes.

There are many benefits to using static site generators other than performance, and they are more secure, scalable, and better for SEO, to name a few.

Another benefit of Scully is that it's perfect for writing blogs.  You can write all your posts in markdown and store them in the repo, so no need for a database.  Scully will handle turning your markdown files into HTML so you can concentrate on more important matters.

I chose not to use any UI frameworks such as Bootstrap or Angular Material as I wanted the site to be bespoke, and you tend to spend much time fighting with these frameworks unless you don't stray too much from their design.  They also add a fair bit of bloat to the final package size.

Now, this isn't the first time I have ever started a blog, and I've made a few in the past using WordPress and another using Jekyll. However, I found WordPress too heavy for a simple blog, and my Jekyll dev environment kept breaking for various reasons.  This led to friction which ultimately led to me giving up and removing the sites.  Therefore I knew this blog needed the least amount of conflict possible to publish a post.

Writing my posts offline in a markdown file was the first tick in the friction-reducing box, and the next was how much effort it was going to be to deploy the site and any new posts.  To tackle this, I decided to reach for [Amazon S3](https://aws.amazon.com/s3/) for hosting, [Amazon Route 53](https://aws.amazon.com/route53/) for DNS, and [CircleCi](https://circleci.com/) for CI/CD.  

To publish a post, all I need to do is check the code into [GitHub](https://github.com/), and CircleCI will do the rest.  It will build the Angular app and then use Scully to convert it into static pages.  It will then sync the static pages with Amazon S3 and deploy the site... all within a few minutes and with zero effort from myself.

The only other major part of this setup I haven't spoken about is [Cloudflare](https://www.cloudflare.com/).  Cloudflare is a fantastic tool, and it gives you HTTPS encryption for free and protects you from "_DDoS attacks, malicious bots, and other nefarious intrusions_."   It is also a CDN so it will ensure the site is delivered as quickly as possible.

That is it.  All code was written using my favorite text editor [Visual Studio Code](https://code.visualstudio.com/) on a [13" MacBook Air M1]().
