---
layout: blog
title: Start your next React project with ReasonML
date: 2020-02-17T08:00:00.000Z
description: >-
  When evaluating ReasonML for use in your React project you may have some
  doubts. Fear not! You can do the things you could do without ReasonML, but
  better!
featuredImage: /images/uploads/reason-with-react.jpg
---
In a previous blogpost I’ve [compared plain Javascript, TypeScript, Flow, and ReasonML](/blog/2020-01-13-a-comparison-of-javascript-typesystems/). I ended the article with a recommendation for using ReasonML in your new React projects. In this article I want to answer some questions that you may have about adopting ReasonML for React projects.

## Does it work with Next.js?

Next.js is the standard for server-side rendering (SSR) with isomorphic components (components that are the same client and server side). Thankfully, some people have gone ahead and provided examples for using [ReasonML for components](https://github.com/zeit/next.js/tree/canary/examples/with-reasonml) as well as [for custom server side logic](https://github.com/zeit/next.js/tree/canary/examples/custom-server-reasonml).

There is [an open issue about combining the two Next.js examples](https://github.com/zeit/next.js/issues/7326) that links to some outstanding tasks. However, the underlying problems that the issue refers to have been fixed at the time of writing this.

This means that if you were planning to use Next.js in your React application, this won’t stop you from adopting ReasonML.

## Does it work with GraphQL?

One of the advantages of ReasonML is its static typing. This can be especially powerful when combined with type information from your data source. To make this work requires clients that are able to consume this type information and make it available in your ReasonML project.

For GraphQL, the most popular client, Apollo, provides [ReasonML bindings](https://github.com/apollographql/reason-apollo) from their own GitHub organisation. It being in the main Apollo GitHub repository gives some assurance that it will be supported in the future. 

What makes this exciting is that GraphQL itself is also strongly typed. The Apollo client can consume the GraphQL schema and make this available as types that can be checked in your application at compile time. This also gives you strong guarantees that you’re properly handling information that’s optional and may not be returned from the server.

## Does it work with JSON:API?

An alternative to GraphQL that is heavily used in the Drupal ecosystem is JSON:API. This is another layer on top of normal JSON requests that provide information about schema’s. 

[A medium article](https://medium.com/@sharifsbeat/fetching-data-in-reasonml-pt-1-c06f3cc6b250) outlines how to use ReasonML bindings for `fetch` and a Reason JSON encoding/decoding library to consume a JSON data source. Although not directly making the JSON:API schema available in your type-checked code, these tools do ensure that you properly handle the success and error codes for the request and the availability of fields in the returned JSON.

## Can we reuse community React components?

One of React’s strengths is its component hierarchy. This model that makes rendering so efficient, also enables the React community to create and share re-usable components. It would be very inefficient if none of these community components could be used on Reason applications.

Luckily for us, Reason was created with a big focus on [interoperating with existing Javascript code](https://reasonml.github.io/reason-react/docs/en/components#interop). This allows to consume existing components in a Reason application. Another option is to write components in Reason code and publish them for consumption using Reason as well as with other typing systems or plain Javascript. The [genType tool](https://github.com/cristianoc/genType) can help in creating TypeScript or Flow typing information from ReasonML code.

## What about the community?

Community around a project is very important. It dictates the development and improvement of tools, as well as the ability to get help for more complex projects. The Reason community is still a bit smaller and younger than the communities behind alternatives like TypeScript. However, in my personal initial contact the community has been very friendly and provided a wealth of links on where I can find information.

One of the goals for 2020 is to collect all the scattered information about Reason, ReasonReact, BuckleScript, esy, dune, etc. onto a single documentation website: [Reasonml.org](https://reasonml.org/).

If you want to chat with people that are using Reason already, be sure to [join the Reason discord](https://discordapp.com/invite/reasonml).

## Can we use styled-components?

Styled components is a great solution for styling React components. Unfortunately styled components doesn’t translate well to ReasonML. Styled components allows arbitrary arguments which makes it hard to match with a static typing system. 

There are other solutions. Both fully typed which go away from writing actual CSS, as well as systems that allow you to write actual CSS strings.

Moving to a fully typed CSS solution may make it more difficult to onboard someone on the front-end who only knows HTML/CSS. However, with any Javascript based front-end you’ll need more knowledge than plain CSS anyway so this may be a moot point. The advantage of static typed CSS can be better code-completion and validation for people less familiar with CSS (arguably you’ll need to know both in any scenario).

A large part of the web is moving to utility classes which fits well into Atomic 
Design and forces a good separation of concerns. You can 
[read the article that convinced me](https://frontstuff.io/in-defense-of-utility-first-css) for more info on utility based CSS.

## Can you show me a video about why ReasonML is great and works well for React?

[Absolutely, here’s the maker of ReasonML and React on the subject.](https://www.youtube.com/watch?v=5fG_lyNuEAw) If you’re short on time I recommend watching at least the first 10 minutes. Hopefully that’ll convince you to also watch the other 20.

## Conclusion
Hopefully at this point, your questions about working with ReasonML have been answered. If you want to get started with ReasonML, I recommend starting with [the Reason documentation](https://reasonml.github.io/docs/en/installation). Be sure to keep an eye on [Reasonml.org](https://reasonml.org/) too to see the information about the Reason ecosystem being brought together in one place.

If you have any questions about adopting Reason that are not covered above, [let me know on Twitter](https://twitter.com/Kingdutch/) or [ask me on the Reason discord](https://discordapp.com/invite/reasonml).
