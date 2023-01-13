---
layout: talk
title: Building a GraphQL API - Beyond the basics
date: 2022-09-21T10:30:00.000Z
conference: DrupalCon Europe
description: >-
  Take a deep dive in using the GraphQL module version 4 to build a GraphQL API for your Drupal project.
slides: /talks/2022-09-21 - DrupalCon Prague - Advanced GraphQL.pdf
recording: >-
  <iframe src="https://www.youtube.com/embed/DNYynzpYWCQ?t=481"
  width="920" height="690" frameborder="0" marginwidth="0" marginheight="0"  
  scrolling="no" style="max-width: 100%;" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
---
Creating a GraphQL API is about more than just exposing your data. To build an
API that’s delightful to use for your API consumers you must consider the use
cases. Version 4 of the GraphQL module enables you do to so, with the downside
that you have to design your entire schema.

In this session, I'll take you from nothing to having implemented the three
GraphQL operations (query, mutation and subscription) in Open Social. We’ll
explore inner workings of the GraphQL module and take a look at the library
underneath it. It’s not as scary as you think.

We'll take a look at turning your schema into data using Drupal, using modules
for a modular API, pagination according to the Relay specification, and why we 
load data the way we do. I’ll also briefly highlight the work in progress for
authorisation using OAuth scopes and API monitoring and security.

Optional viewing before this session:

Sebastian Siemssen (a.k.a Fubhy)’s excellent introduction of the GraphQL module
and how it worked up to version 3 at DrupalCon New Orleans 2016:
<a href="https://www.youtube.com/watch?v=3zFpiYmRIkc">https://www.youtube.com/watch?v=3zFpiYmRIkc</a>
It also explains why you may want to use GraphQL instead of e.g. a traditional
REST API.

Maria Comas (a.k.a. una_maria)’s session at DrupalCon Seattle 2019 providing a
GraphQL 101 introduction: <a href="https://www.youtube.com/watch?v=WOaHRtaI8GY&t=110s">https://www.youtube.com/watch?v=WOaHRtaI8GY&t=110s</a>

## Follow along on GitHub
I've created [a repository on GitHub](https://github.com/Kingdutch/drupal-graphql-example) where you
can view an example project that uses the code and techniques from this presentation. Thanks to the
kind people at [Open Social](https://www.getopensocial.com) for letting me share code from some of 
our internal modules.
