---
layout: blog
title: The future of Drupal front-end development
date: 2019-11-02T08:36:08.508Z
description: >-
  With the move to decoupled applications and adoption of frameworks like React
  and Vue.js, the workload of front-end development in Drupal will change. A
  different skillset will be required and the community will have to adjust as a
  result.
featuredImage: /images/uploads/right-arrow-in-the-sand.jpg
---
Drupal 8 made a huge stride with the adoption of Twig and the abolishment of its custom templating solution. However, while the Drupal community has been focused on improving the experience for tightly coupled front-end output. The rest of the web is moving steadily in the direction of a more decoupled set-up with Javascript front-ends enabling more advanced user interactions.

This article sparks from an inspiring discussion that was had at DrupalCon Europe and led by Facebook's Jesse Beach and Dominic Gannaway. The discussion was had as a [BoF session](https://events.drupal.org/amsterdam2019/bof-sessions) and focused on how to make React and Drupal thrive together. The discussion brought to light some interesting differences in direction between React and Drupal as well as some impediments for adoption.

<h2>A different set of skills</h2>

One of the things that I've noticed as a member of the Drupal community, is that the skillset of a front-end developer is a lot different within Drupal than outside of it. 

As a front-end developer working with Drupal you need knowledge beyond HTML and CSS and require a good grasp of how Drupal's theming layer works. How do you use Twig in a performant manner and when should you use templates vs render arrays and alter hooks. In addition, with Drupal's State and AJAX APIs, a lot can be accomplished without writing Javascript.

Outside of Drupal, a front-end developer still requires the same knowledge of semantic markup and accessible styling. However, with most of today's popular front-end frameworks relying heavily on Javascript, it's a necessity to have a powerful grasp of this language.

It is interesting to see how moving in either direction requires new learning. A large impediment for adoption of React (or other Javacript front-ends) in Drupal will be a mismatch in skillset of the teams within companies. Any Drupal developer can figure out how to create a new form with the Form API that can be handed to a front-end developer for some styling. However, in a React world, a bigger chunk of the work will need to be performed by front-end developers. This will require either retraining of existing staff, or new hires.

<h2>Decoupling data</h2>

One of the first points that was raised in the discussion by members of the Drupal community is [Drupal's focus on the JSON:API](https://dri.es/headless-cms-rest-vs-jsonapi-vs-graphql). With the inclusion of the JSON:API in core it's become the standard for Drupal installations. It's now the first thing that people exploring decoupled Drupal will see. Even though there is [great support for GraphQL in the contrib space](https://www.drupal.org/project/graphql), the inclusion in core means that the most resources will now be allocated to the JSON:API.

This decision is in sharp contrast with that of the React community. Pushed by Facebook, GraphQL is the de-facto standard with [multiple](https://relay.dev/) [libraries](https://www.apollographql.com/) that offer great support. Any innovation that is done in the space of data fetching and data mangement in the React space will first and foremost be implemented using GraphQL.

This split of direction, with React focused on GraphQL and Drupal focused on JSON:API, means that any advancements made by the React-GraphQL community will have to be remade, in large part, by the Drupal community.

<h2>What about sitebuilders</h2>
