---
layout: blog
title: GraphQL in the Open Social Drupal distribution
date: 2020-11-18T08:30:00.000Z
description: >-
  Walking through the creation of the first GraphQL endpoint in Open Social from 
  module set-up to query resolver. Open Social provides solutions for flexible and
  engaging online communities. GraphQL in Drupal will pave the road for exciting 
  new features and external integrations.
featuredImage: /images/uploads/wires-between-two-square-panels.jpg
---

At [Open Social](https://www.getopensocial.com) we’ll be using GraphQL to make the data of community platforms available to applications outside of Open Social. This is an important first step in our plans to [build an entirely new front-end](https://www.getopensocial.com/blog/open-source/open-social-evolving-first-phase-decoupling). In this post I will explore the options for GraphQL in Drupal, how to get started with GraphQL in Drupal and what GraphQL looks like in the Open Social Drupal distribution.

The work that this article discusses is still ongoing at the time of writing. However, you can dive into the code in [the pull request on GitHub](https://github.com/goalgorilla/open_social/pull/1994/ "PR 1994 for Open Social: Implement basic GraphQL support for users and profile data").

## Standing on the shoulders of giants
What’s great about Drupal is that the saying “there’s a module for that” was true 10 years ago and still rings true today. It’s no different when you want to use Drupal to build a GraphQL server. The module is hosted on Drupal.org so that it can easily be downloaded using composer, although actual development is done on [GitHub](https://github.com/drupal-graphql/graphql). The documentation can be found on [a separate gitbook site](https://drupal-graphql.gitbook.io/graphql/v/8.x-4.x/).

[The GraphQL module](https://www.drupal.org/project/graphql) for Drupal is currently available in two versions. The 3.x version which has a stable release and the 4.x version which has just seen its third beta release at the time of writing. It’s worth taking a moment to look at the differences between the two versions. 

The 3.x version of the module is a plug-and-play version. When enabling it, it will easily set up a GraphQL API for you based on the entity data in your Drupal website. This makes it easy to get started and is great for experimenting. A downside is that it’ll expose your data structures as-is. This may expose more than you want to. It’ll also make your GraphQL API dependant on the choices you made for other reasons. For example, all Node types will be treated the same, even though you may be using them in very different ways and want to keep them separate in your API. The result of this set-up is that you will still experience coupling between the way your front-end requests data and the way you store it in the back-end.

The 4.x version has a different design philosophy to avoid exposing your internal data structure. Instead of basing your GraphQL schema on Drupal’s entity and field structure, it requires you to define the GraphQL schema manually. This is a bit more work and requires Drupal developer knowledge. The advantage however is that you can define the GraphQL schema in the way that makes the most sense for your application. This ensures that you can provide the best experience to your decoupled front-end developers and change your internal Drupal data structures as needed without creating issues for the applications using your API.

At Open Social we have some internal data structures that were created to easily share functionality between objects. However, those same data structures have very different purposes when facing a user or application. Therefore it makes sense for us to use the 4.x version of the GraphQL module. This will allow us to create a GraphQL API that best represents the data that Open Social has.

## Adding a base GraphQL module to Open Social
A new module has been created (Social GraphQL) in Open Social that sits on top of the Drupal GraphQL module. This allows shared functionality for GraphQL support to be bundled in this single module and lets any future Open Social feature that requires GraphQL to depend on this module.

The Social GraphQL module contains the default Open Social GraphQL server (`open_social_graphql`). It is also the ideal place for us to implement screens needed to perform management for API consumers. The GraphQL module itself contains the configuration screen that has been used to create the `open_social_graphql` server configuration. That module also contains the GraphiQL Explorer and Voyager tools which allow you to explore and test GraphQL schemas manually. 

The most important part of the new Social GraphQL module is the GraphQL schema base. Open Social uses [composable schema’s](https://drupal-graphql.gitbook.io/graphql/v/8.x-4.x/advanced/composable-schemas). This allows each module responsible for data (e.g. Social User, Social Profile, Social Courses, etc.) to implement the schema for the data that the module manages, ensuring that the schema is automatically updated with the new features when they are enabled. The base schema in the Social GraphQL module contains some shared base types (e.g. [the Connection type](https://www.apollographql.com/blog/explaining-graphql-connections-c48b7c3d6976/) that helps in pagination) to ensure these are consistently implemented across Open Social.

## Building the base GraphQL schema
There are only three things that you need when starting out with Drupal’s GraphQL module version 4: a server entity, a GraphQL schema (`.graphqls`) file, and a schema plugin. The GraphQL module contains examples for each. Below I will explain how we’ve set this up in Open Social.

The GraphQL module ships with the ability to make a composable schema. For Open Social [a new GraphQL server is defined](https://github.com/goalgorilla/open_social/pull/1994/files#diff-2243e0072f734952f75c782eb1cf117f). This provides an easy target for Open Social module developers to add their own extensions onto and allows anyone using Open Social to ignore the default set-up altogether and build their own schema, if they so desire.

The `social_graphql` module also defines the base of the schema in [`open_social.graphqls`](https://github.com/goalgorilla/open_social/pull/1994/files#diff-6b01b6a902f9451f9b2cec25843a02b7). This contains shared types, such as the root `Query` type. As well as a scalar type for `Email` and primitives for pagination.

```graphql
# A simplified excerpt of the Open Social base schema.
# The full version can be found in the Open Social 
# repository. 
"""
The schema's entry-point for queries. This acts as the public, top-level API
from which all queries must start.
"""
type Query

# The actual GraphQL schema
schema {
  query: Query
}

"""
A valid email address.
"""
scalar Email

"""
A cursor for use in pagination.
"""
scalar Cursor

"""
A node on an edge.
"""
interface Node {
  uuid: ID!
}
```

_If you’re using PHPStorm I recommend installing the js-graphql plugin to add syntax highlighting for `graphqls` files._

This schema on its own doesn’t do anything yet. It only lets clients know what they are able to request and how to do it. To let the GraphQL module know how to transform a GraphQL request into a response we will need to define a Schema plugin.

[The `OpenSocialBaseSchema` class](https://github.com/goalgorilla/open_social/pull/1994/files#diff-ae3ccfa0d80f03747015a7501c14239a) contains the base schema plugin for the open\_social GraphQL schema. The GraphQL module turns Drupal data into valid GraphQL output using resolvers. In a Schema plugin you define resolvers for fields that you’ve previously defined in your schema.

The `OpenSocialBaseSchema` plugin doesn’t provide any resolvers that load data. However, it does implement resolvers for types related to pagination as well as shared types such as `FormattedText`.

## Extending the GraphQL schema to provide data
With the base set of functionality implemented we don’t actually have any data that we can query yet. We change this by extending the schema in the `social_user` module. This module is responsible for user related functionality in Open Social so it makes sense to colocate the user part of the GraphQL API in this module.

We begin by creating a SchemaExtension plugin [`UserSchemaExtension`](https://github.com/goalgorilla/open_social/pull/1994/files#diff-5a9e683bcd43b3e4c38c3d721b7ceab8). This class does not extend `SdlSchemaPluginBase` but instead extends `SdlSchemaExtensionPluginBase`. The extension plugin base will not look for a regular `.graphqls` file but will instead try to load a `.base.graphqls` and `.extension.graphqls` file with the id of the schema extension.

The [`social_user_schema_extension.base.graphqls`](https://github.com/goalgorilla/open_social/pull/1994/files#diff-a829683e10a050b9bb83a40192023fbd) is where we create the `User` type which will contain user data. An excerpt from this type definition is provided below.

```graphql
"""
An Open Social user.
"""
type User implements Node {
  """
  The Universally Unique Identifier for the user.
  """
  uuid: ID!
  """
  The display name of the user.

  The specific format of the display name could depend on permissions of the
  requesting user or application.
  """
  display_name: String!
  """
  The e-mail of the user.

  Can be null if the user has not filled in an e-mail or if the user/application
  making the request is not allowed to view this user's e-mail.
  """
  mail: Email

  # other properties omitted for brevity...
}
```

As you can see the `User` type implements the `Node` interface. It is important to note that this interface does not represent a Drupal Node type but instead points to a Node in our data graph. The required `uuid` field is implemented as well as a display name and the user’s e-mail using the previously defined `Email` scalar. The actual representation of an `Email` is simply a string but we perform server side validation that lets clients know that this is not simply any string.

The `social_user_schema_extension.base.graphqls` file has defined the shape of the user data as well as some supporting types. However, it does not yet provide applications any means of requesting the data from our graph. For this we will have to extend the `Query` type. This happens in the `social_user_schema_extension.extension.graphqls` file.

```graphql
extend type Query {
  """
  Fetch data for a specific user.
  """
  user(
    """
    The uuid of the user to load.
    """
    uuid: ID!
  ) : User
}
```

Here we extend the `Query` type to add a `user` endpoint that takes the `uuid` of a user and returns a User object.

The key takeaway is that in a module that’s extending a schema using a `SchemaExtension` plugin there are two files important. The `[plugin_id].base.graphqls` is used to define new types that are provided by the module making the extension. The `[plugin_id].extension.graphqls` file is used to extend types provided by the base schema and in other module’s `.base.graphqls` files.

## Resolving a GraphQL request to a response with data
We now know how we define a GraphQL schema in Drupal and how to structure these so the GraphQL modules can find them. We’re still missing a step however that actually translates the request into some data that can be sent back to the client.

This translation of request to data happens by defining resolvers for the fields in a GraphQL schema. A GraphQL request always starts with one or more fields at the root of a Query, Mutation, or Subscription. In our `social_user_schema_extension.extension.graphqls` schema file we defined a `user` root field that returns an object with type `User`. In the `social_user_schema_extension.base.graphqls` schema file we defined fields such as `uuid`, `display_name` and `mail` on the `User` type.

The definition of resolvers happens in classes such as`OpenSocialSchemBase` and `UserSchemaExtension`. We’ll take a look at the implementation of `UserSchemaExtension` to see how it defines revolvers for the `user` root field and the fields in the `User` type.

```php
<?php

namespace Drupal\social_user\Plugin\GraphQL\SchemaExtension;

use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql\GraphQL\ResolverRegistryInterface;
use Drupal\graphql\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase;

/**
 * Adds user data to the Open Social GraphQL API.
 *
 * @SchemaExtension(
 *   id = "social_user_schema_extension",
 *   name = "Open Social - User Schema Extension",
 *   description = "GraphQL schema extension for Open Social user data.",
 *   schema = "open_social"
 * )
 */
class UserSchemaExtension extends SdlSchemaExtensionPluginBase {

  /**
   * {@inheritdoc}
   */
  public function registerResolvers(ResolverRegistryInterface $registry) {
    // Resolver definitions happen here.
  }

}
```

The class starts with a plugin annotation of the type `SchemaExtension`. The `id` defined here is the what determines the names of the `*.base.graphql` and `*.extension.graphqls` files discussed earlier. The `name` and `description` are helpful to developers and users of the GraphQL module’s UI. The `schema` key of the annotation references our base schema plugin which this class extends.

The resolvers themselves are defined in the `registerResolvers` method. Let’s fill those in for the fields we’ve previously defined for a user. In the example below I’ve omitted the class definition and kept only the method’s signature.

```php
public function registerResolvers(ResolverRegistryInterface $registry) {
  $builder = new ResolverBuilder();

  // User query.
  $registry->addFieldResolver('Query', 'user',
    $builder->produce('entity_load_by_uuid')
      ->map('type', $builder->fromValue('user'))
      ->map('uuid', $builder->fromArgument('uuid'))
  );

  // User type fields.
  $registry->addFieldResolver('User', 'uuid',
    $builder->produce('entity_uuid')
      ->map('entity', $builder->fromParent())
  );

  $registry->addFieldResolver('User', 'display_name',
    $builder->produce('entity_label')
      ->map('entity', $builder->fromParent())
  );

  $registry->addFieldResolver('User', 'mail',
    // TODO: Replace with simplified form once
    //   https://github.com/drupal-graphql/graphql/pull/1089 lands.
    // $builder->fromPath('entity:user', 'mail.value')
    $builder->produce('property_path')
      ->map('type', $builder->fromValue('entity:user'))
      ->map('path', $builder->fromValue('mail.value'))
      ->map('value', $builder->fromParent())
  );
}
```

This is quite a bit of code that we’ve added for our four fields (the root `users` field on the `Query` type and the `uuid`, `display_name`, and `mail` field on the `User` type). 

At first it may look a bit weird as there are a lot of function calls but there aren’t actually any variables being manipulated. This is because defining the resolvers requires a little bit of indirection. Instead of manipulating values directly you describe what functions or classes are used to manipulate the values and describe the inputs to those methods. This allows the GraphQL module to create a pipeline that loads and transforms data in the most efficient manner.

The first thing we do is create a new `ResolverBuilder` instance. This helps us access many [pre-defined data producers](https://drupal-graphql.gitbook.io/graphql/data-producers/built-in) and map the data in the resolver pipeline to the inputs of those data producers.

The next step is to begin adding resolvers for fields to the resolver registry. This is done with the `addFieldResolver` function. The function takes three arguments: the type the field is being defined on, the name of the field, and a data producer instance that knows how to map inputs to outputs.

The order of definitions doesn’t really matter here. Your entire resolver mapping will be instantiated before a request is processed. However, in the Open Social codebase I’ve tried to define types higher up in the graph (such as `Query`) before more specific types (such as `User`).

The first such definition for this schema extension is for the `user` field on the `Query` type.

```php
  $registry->addFieldResolver('Query', 'user',
    $builder->produce('entity_load_by_uuid')
      ->map('type', $builder->fromValue('user'))
      ->map('uuid', $builder->fromArgument('uuid'))
  );
```

The GraphQL type and field name a pretty straightforward. The definition of the resolver itself is a bit more complex. Looking at the [definition of the ResolverBuilder](https://git.drupalcode.org/project/graphql/-/blob/8.x-4.x/src/GraphQL/ResolverBuilder.php) may leave you puzzled so let’s take a closer look at what’s going on.

Your resolver definitions will usually start with `$builder->produce` which creates an instance of a `DataProducerProxy` for the data producer that you’ve specified. In the above example this is `entity_load_by_uuid` which is a DataProducer plugin implemented in the [`EntityLoadByUuid`](https://git.drupalcode.org/project/graphql/-/blob/8.x-4.x/src/Plugin/GraphQL/DataProducer/Entity/EntityLoadByUuid.php) class of the GraphQL module.

If you want to know how to create your own data producers then you can take a look at the implementation of the class. For now we’ll only look at the plugin definition to see how we can use the data producer.

```php
/**
 * @DataProducer(
 *   id = "entity_load_by_uuid",
 *   name = @Translation("Load entity by uuid"),
 *   description = @Translation("Loads a single entity by uuid."),
 *   produces = @ContextDefinition("entity",
 *     label = @Translation("Entity")
 *   ),
 *   consumes = {
 *     "type" = @ContextDefinition("string",
 *       label = @Translation("Entity type")
 *     ),
 *     "uuid" = @ContextDefinition("string",
 *       label = @Translation("Unique identifier")
 *     ),
 *     "language" = @ContextDefinition("string",
 *       label = @Translation("Entity language"),
 *       required = FALSE
 *     ),
 *     "bundles" = @ContextDefinition("string",
 *       label = @Translation("Entity bundle(s)"),
 *       multiple = TRUE,
 *       required = FALSE
 *     ),
 *     "access" = @ContextDefinition("boolean",
 *       label = @Translation("Check access"),
 *       required = FALSE,
 *       default_value = TRUE
 *     ),
 *     "access_user" = @ContextDefinition("entity:user",
 *       label = @Translation("User"),
 *       required = FALSE,
 *       default_value = NULL
 *     ),
 *     "access_operation" = @ContextDefinition("string",
 *       label = @Translation("Operation"),
 *       required = FALSE,
 *       default_value = "view"
 *     )
 *   }
 * )
 */
```

You can see the `id` is what we referenced in our call to `$builder->produce('entity_load_by_uuid')`. The `produces` key shows us that it produces a value of type `entity`. Finally the `consumes` key shows us that the data producer can take some inputs. The `type` and `uuid` are the only ones that are required, the others are optional. We can see that we can filter by `bundles`, `access` checking is on by default, the `access_user` isn’t provided (the implementation defaults to the current user of the HTTP request) and the default `access_operation` is to treat this access check as if the entity is being loaded for viewing.

This plugin definition tells us that we can retrieve an entity by providing the data producer with just two inputs and get an entity as output. That is exactly what our calls with the `ResolverBuilder` do. First we specify the data producer that we want and then we specify how to map data to the inputs for `type` and `uuid`.

The `$builder->fromValue('user')` call produces a map definition that will provide the data producer with the literal value `'user'`. The `$builder->fromArgument('uuid')` produces a map definition that will use the argument provided in a GraphQL request (you can see the `uuid` argument defined for the  `user` field in our schema).

Although at this point we’ve told GraphQL how it can take a request for a user and load a user, it still doesn’t know how to send that user back to the client. For this we’ll need to add fields for the `User` type (as defined in our schema) that end up mapping to primitive types (such as a string, an integer or an enum value).

We can add a resolver for the `uuid` field on the `User` type with the following lines of code.
```php
  $registry->addFieldResolver('User', 'uuid',
    $builder->produce('entity_uuid')
      ->map('entity', $builder->fromParent())
  );
```

This time we use the [`EntityUuid` data producer](https://git.drupalcode.org/project/graphql/-/blob/8.x-4.x/src/Plugin/GraphQL/DataProducer/Entity/EntityUuid.php) which takes an entity and calls the `uuid()` method on that entity. This looks very similar to how we loaded a user, except a new value is used for the second value to our `map()` call.

The `$builder->fromParent()` will use the output of the data producer that was used previously in our chain of data producers. In this case that is the output of our `entity_load_by_uuid` data producer.

The definitions for the `display_name` and `mail` fields on the `User` type follow similar patterns. 

The `property_path` producer is used often taking a typed data type, a path to a field’s value, and a typed data value (such as an entity) to work on. This is why there’s work going on to simplify this pattern into a `$builder->fromPath` call.

It may not feel very useful to implement the `uuid` field resolver for the `User` type which is loaded using the `uuid`. However, this same resolver is used when a listing is produced of users. In a listing of users a client may request only the uuid and a user name, using the returned uuid to load more data for a detailed view of a selected user.

## Wrapping up
In this blogpost we’ve gone over the options for GraphQL servers in Drupal projects, outlining why Open Social has chosen for the 4.x version of the GraphQL module. A base module is introduced in Open Social that defines our base schema and shared (re-usable) data types. Next we’ve defined a schema to fetch user data and explained how we can instruct the GraphQL module to turn a request into data.

In a future article I intend to look at the implementation of the Relay Connection specification which can make it easy for GraphQL clients to implement pagination. We will also want to start testing our schema to make sure it works how we expect. If you can’t wait for the future articles and want to see how we’ve done these things, dive into [the pull request that adds GraphQL to Open Social](https://github.com/goalgorilla/open_social/pull/1994/).
