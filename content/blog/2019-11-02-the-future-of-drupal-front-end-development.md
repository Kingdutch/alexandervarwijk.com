---
layout: blog
title: The future of Drupal front-end development
date: 2019-11-09T14:30:08.508Z
description: >-
  With the move to decoupled applications and the adoption of frameworks like 
  React and Vue.js, the workload of front-end development in Drupal will change. 
  A different skillset will be required and the community will have to adjust as 
  a result.
featuredImage: /images/uploads/right-arrow-in-the-sand.jpg
---
Drupal made a huge stride with the adoption of Twig and the abolishment of its custom templating solution. However, while the Drupal community has been focused on improving the experience for tightly coupled front-end output, the rest of the web is moving steadily in the direction of a more decoupled set-up with Javascript front-ends enabling more advanced user interactions.

Adopting new technologies or ways of working in existing projects is never easy. In this article I will explore some of the challenges that the Drupal communtiy faces in the adoption of React as a front-end technology.

<h2>A different set of skills</h2>

One of the things that I've noticed as a member of the Drupal community, is that the skillset of a front-end developer is a lot different within Drupal than outside of it. 

As a front-end developer working with Drupal you need knowledge beyond HTML and CSS and require a good grasp of how Drupal's theming layer works. For example: how do you use Twig in a performant manner and when should you use templates vs render arrays and alter hooks? In addition, with Drupal's State and AJAX APIs, a lot can be accomplished without writing any Javascript.

Outside of Drupal, a front-end developer still requires the same knowledge of semantic markup and accessible styling. However, with most of today's popular front-end frameworks relying heavily on Javascript, it's a necessity to have a good grasp of the language.

It is interesting to see how moving in either direction requires new learning. A large impediment for adoption of React (or other Javacript front-ends) in Drupal will be a mismatch in skillset of the teams within companies. Any Drupal developer can figure out how to create a new form with the Form API that can be handed to a front-end developer for some styling. However, in a React world, a bigger chunk of the work will need to be performed by front-end developers. This will require either retraining of existing staff, or new hires.

<h2>Decoupling data</h2>

One of the points raised in a BoF at DrupalCon Amsterdam is [Drupal's focus on the JSON:API](https://dri.es/headless-cms-rest-vs-jsonapi-vs-graphql). With the inclusion of the JSON:API in Drupal core it has become the standard for Drupal installations. It's now the first thing that people exploring decoupled Drupal will see. Even though there is [great support for GraphQL in the contrib space](https://www.drupal.org/project/graphql), the inclusion in core means that the most resources will now be allocated to the JSON:API.

This decision is in sharp contrast with that of the React community. Pushed by Facebook, GraphQL is the de-facto standard with [multiple](https://relay.dev/) [libraries](https://www.apollographql.com/) that offer great support. Any innovation that is done in the space of data fetching and data management with React will first and foremost be implemented using GraphQL.

This split of direction, with React focused on GraphQL and Drupal focused on JSON:API, means that any advancements made by the React-GraphQL community will have to be remade, in large part, by the Drupal community.

<h2>What about sitebuilders</h2>

One of Drupal's goals has always been to allow sitebuilders to do as much as possible without writing any code. This could be considered a precursor to the no-code movement that is rapidly gaining in popularity. Through extensions such as the Field UI and Views, a lot of the flexibility of Drupal can be wielded by non-programmers. These systems benefit greatly from Drupal's tight coupling between front-end and back-end. This coupling is what allows each element to describe how it will need to be displayed once configured.

Although it is a tremendous strength for Drupal, this flexibility that is offered to sitebuilders also poses a barrier for moving to a decoupled set-up. Decoupling means moving to a system where Drupal only serves as a data layer that exposes an API. This change then only covers one part of the tools that sitebbuilders require. To fully embrace React and say goodbye to Twig, a lot of work will have to be done to make React just as flexible as the current Twig set-up is.
 
To support a system where Drupal and React can still offer its full potential to sitebuilders a lot of work will need to be done. This need increases the time that Drupal will require in fully embracing a decoupled-first set-up. 

<h2>Conclusion</h2>
 
The landscape of the Web is ever evolving. This newest change poses a lot of opportunities to create evne more engaging user experiences. However, it also poses challenges for incumbent users of Drupal and its ecosystem. Businesses will have to figure out how they will deal wiht the shift in  required skills. Drupal will need to evaluate whether it is worth embracing a technology that is different from what a majority of other React users are using. Finally, we'll have to work hard to ensure that we don't leave behind an important target audience for Drupal as a Content Management Framework.

What do you think of the move to React? What are the biggest challenges that you face? Discuss this article with me <a href="https://www.twitter.com/Kingdutch" title="My twitter profile">on Twitter</a>. 
 

