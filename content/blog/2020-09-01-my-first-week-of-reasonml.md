---
layout: blog
title: My first week of ReasonML
date: 2020-09-01T20:15:00.007Z
description: >-
  A look back on my first week of using Reason to build a native GraphQL 
  server. Looking at the tools used and the changes in the ReasonML ecosystem.
featuredImage: /images/uploads/backpacker-on-a-high-ledge.jpg
---
Last week was the first week of actually using ReasonML to build an application instead of looking at Reason theoretically. If you want to know what I’m building you’ll have to keep an eye on [the Open Social blog](https://www.getopensocial.com/blog) but below I’ll take you through my experience.

## Reason vs ReasonML vs BuckleScript vs ReScript
The different names that you encounter when starting with Reason can be quite confusing. ReasonML is the term used by the community to refer to all the tools in the ecosystem. Reason is used to refer to the syntax and the native development toolchain. BuckleScript was the name used for the Reason to JavaScript compiler.

ReScript is the new name of the BuckleScript compiler and a new slightly altered Reason syntax. This change was [announced recently](https://reasonml.org/blog/bucklescript-is-rebranding "BuckleScript is rebranding to ReScript"). The team working on the BuckleScript compiler has decided to break with the native compiler team in order to be able to more quickly provide a compelling language and toolset to current JavaScript-developers.

There is a thriving community for both ReasonML and ReScript. The Reason Discord has focused itself around native development (although there are still some lesser active ReScript channels). The ReScript team has set-up a new Discourse forum where they’ve [included an FAQ](https://forum.rescript-lang.org/t/rescript-frequently-asked-questions/59 "Frequently Asked Questions about the ReScript rename") about the changes.

The current Reason syntax will be supported by ReScript for a while to ensure the community can transition and not create a giant fracture. However, future versions of the Reason syntax may not be supported by the ReScript tools, requiring use of the ReScript syntax instead. Eventually Reason may support compilation to JavaScript again using JS of OCaml but that will be a while away.

## ReScript with NodeJS vs Native Reason
In our investigation to select ReasonML we were heavily focused on client side JavaScript, for which there are already a lot of bindings and tools available for things like Next.js and GraphQL. However, unexpectedly my first ReasonML project involved setting up a GraphQL server. This turned out to be in a bit more in the baby shoes than expected ([although exciting work is being done for Node.js bindings](https://github.com/sikanhe/reason-nodejs)).

With some help from the Reason discord I’ve decided to build the GraphQL server with Reason Native. The biggest hurdle was making sure that Reason could be built and run on Platform.sh which is one of the hosting providers of Open Social. Thanks to the people on Discord we were able to figure out how to do this.

To build the GraphQL server itself I’ve been using [Morph](https://github.com/reason-native-web/morph) which wraps [ocaml-graphql-server](https://github.com/andreas/ocaml-graphql-server) and a webserver together in an easy to use package. It’s been quite a ride to learn how to use [esy](https://esy.sh/) and figure out how all the types work. However, over the course of the week I’ve been slowly figuring out how to deliberately trigger type errors to see what types I’m working with. Knowing what to do with those types is also coming more easily every day and to my surprise I’m even learning to read OCaml by regularly converting small snippets using [Reason Try](https://reasonml.github.io/en/try).

## Onwards
I’ll continue working on the GraphQL server. I’ve been able to create my first connections to the database and my first parts of the GraphQL schema. Along the way I’ve been able to add tests using [Rely](https://reason-native.com/docs/rely/). It feels like a lot of the initial exploring is complete and I can now start duplicating and modifying my initial snippets to add more models and endpoints.

Implementing GraphQL Subscriptions will be an upcoming adventure and will require playing with [some more experimental Morph code](https://github.com/reason-native-web/morph/pull/45 "The pull request to add Websocket support to Morph. This PR is awaiting testing."). Beyond that I’ll be moving on to some work on consuming GraphQL from the same Reason Native application.

In a few more weeks still I hope to be able to start playing more concretely with the improvements that have been made to the ReScript language and start using React with the GraphQL client tools to consume data from our newly built Reason Native GraphQL server. Stay tuned!
