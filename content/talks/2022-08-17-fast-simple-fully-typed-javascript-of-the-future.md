---
layout: talk
title: Fast, Simple, Fully Typed JavaScript from the Future
date: 2022-08-17T16:50:00.000Z
conference: Decoupled Days
description: >-
  In this talk I will take you through what ReScript is, how its type and module systems work and its great integration with React and GraphQL.
slides: /talks/2022-08-17 - Decoupled Days - ReScript.pdf
recording: >-

notes:
 -
  _Notes start on next slide_
 -
  I am Alexander Varwijk. I’m Lead Front-End engineer at Open Social and currently responsible for the rebuild of our web front-end from a coupled Drupal front-end to a decoupled React front-end. At Open Social I’ve previously worked on building our Real-Time chat feature and I currently assist our back-end developers with the adoption of GraphQL.


  I started programming about 20 years ago and have been programming professionally for over ten years now.
 -
  Imagine a world where your front-end applications could run without worrying about type related bugs. Never get a critical issue submitted for a broken application caused by “cannot call method on undefined”. Never experience showing an invoice with a total of the dreaded NaN (not a number).


  Focus only on making sure that your business logic is correct and that your users have an awesome experience.


  That sounds great doesn’t it?
 - >-
  You may be thinking: “that’s exactly what TypeScript is giving me and my team!” and I’d be very happy for you! Or maybe you’re still thinking “Who needs types in their code? Vanilla JavaScript works just fine!” in which case I hope to nudge you towards a different vision.


  Whatever your stance may be, TypeScript has taken the JavaScript world by storm and convinced many developers that they can no longer live without types.

  TypeScript defines itself as “JavaScript with syntax for types”. The goal of the TypeScript team is ambitious in that they try to type the entirety of JavaScript. However, this can be tough to do at scale because JavaScript was never build with strong types in mind.
 -
  What if instead we could take a different path? Rather than trying to retrofit a type system to JavaScript, we take a robust and well developed type system and use it to generate human readable JavaScript.
 -
  I would like to introduce to you ReScript. Rather than trying to type all of JavaScript, ReScript approaches the problem from the other direction. It took the OCaml type system and build a compiler on top of it that produces human readable JavaScript. The result is a compiler that’s fast and great at type inference. This allows us to write type safe code with minimal type annotations.
 -
  Some names may jump out to you. Facebook wrote messenger in an early version of ReScript.


  Maybe you can spot Tiny. The team behind the TinyMCE editor used ReScript for their Real-Time collaboration.


  You may notice Open Social’s logo is not there yet, that’s because I haven’t submitted our logo yet, but we’ve been running ReScript in production for about a year now and recommitted to building our brand new decoupled front-end in ReScript too.
 -
  Open Social chose for ReScript because we found that it encouraged thinking about data. It made it more difficult to make mistakes. Compiles very quickly, usually in the order of milliseconds. Has great type inference which means you usually only write the type when you declare it. It has great GraphQL support
 -
  Let’s get ReScript installed in our project. ReScript and everything you need are available from npm so you can just install it with your favourite JavaScript package manager.
 -
  Since ReScript is a compiler that will take ReScript code and turn it into JavaScript we want to update our package.json so that we can easily build our project with NPM.
 -
  Alright lets write our first bit of ReScript code. We’ll start with the infamous “Hello World”. There’s already enough to unpack here.


  Comments work as you’re used to. I’ve added the path to the top of the file for clarity, though you normally wouldn’t do that. Take note of the file extension for ReScript files, we’re using .res here.


  To actually get access to our log function we must reach into the Js and Console module. The Js module ships with ReScript and provides access to functions in the JavaScript standard library. Log is our actual function call and we pass it a single string argument.
 -
  Our code is ready so let’s build!


  Okay looks like we forgot something. We’ll have to add a configuration file to tell the ReScript compiler about our project. It’s called bsconfig.json for historical reasons.
 -
  Let’s take a look at the contents of this configuration file.


  At the top is the name of our project for ReScript, you’ll usually want to mirror the name you have in your package.json file.


  Below that we define where ReScript should actually look for and compile ReScript files. In this case we tell it to compile all files in our `src` folder and any of its subdirectories. Other options we have here would be to specify a single file or a directory without subdirectories. Additionally we can mark files as being specifically for development. Files in those directories will not be available for use in other parts of our application or for external applications if we’re working on a library.


  Next up we configure how we want JavaScript modules to be imported and where we want code to be generated. We choose to use es6 modules, though ReScript also supports output in commons using require and module exports. We also tell ReScript to create our JavaScript output next to our ReScript output. This generally works best for use with most JavaScript tools. When this is set to false JavaScript would be output to `lib/js` instead.


  Finally we determine the file extension for our JavaScript output. The recommended default is `.bs.js` which allows you to easily distinguish between ReScript output and manually created JavaScript files. There’s some others you can choose from too for interoperability with JavaScript tools. The bs prefix here is again a historic artefact.
 -
  Let’s try that build again!


  Success, lets look at the output
 -
  I’ve added the filename at the top for easy reference but everything from the second line on is produced by the ReScript compiler. There’s a warning at the top of the file because your edits will get overwritten when you make changes to the ReScript code and recompile.


  As you can see the console.log that we expected is there and we didn’t define any functions or declare any variables so there’s nothing to export.


  This produced a file that you could run in Node.js or sent to the browser and run there.
 -
  Of course JavaScript applications that just print Hello World to the console aren’t very useful so let’s look at something more complex.


  ReScript has first class support for React but doesn’t ship it by default so we must install it before we can use it.
 -
  We’ll have to give a few new instructions to the ReScript compiler, let’s look at the updated configuration file.


  The first thing we’ve added is support for JSX in our syntax. Next we’ve also told the ReScript compiler to use the dependency we just installed. The package contains code that tells the ReScript compiler how to create JavaScript code that uses React’s functions.


  The naming of these two fields, one named “reason” and the other with a “bs-“ prefix are historical artefacts.
 -
  With React added to our project we can create a more complex example and show off some of ReScript’s features.


  If we added the Bootstrap CSS and bundled this up with Vite we would see our buttons rendered.


  This may already look a bit complex. All of this happens in a single file. Lets divide this up into three parts and take a closer look at those. On the left we define a Button component that has two variants, using Bootstrap classes. On the right we use this component and show it off in both variants.
 -
  The first thing we see is a type definition. We give the type an explicit value, in this case that’s a Variant with two possible values, one is “Primary” for our primary button and the other is “Link” to make our button look like a link.


  Next we create a new module. Modules in ReScript are ways to types, values and functions. Though we haven’t used it yet, each file in ReScript is itself a module. So our Button module is actually inside of another module that we’re ignoring for this presentation.


  Finally inside of our Button module we have a single function. In ReScript all functions are anonymous by default so to keep them around we must assign them to a variable which we do in this case with `let make`. React Components in ReScript always consist of a module with a function named `make` that’s annotated with the `@react.component` attribute. The module itself may contain other things, though we had no need for that here.


  Let’s take a closer look at the function.
 -
  The `@react.component` attribute at the top actually tells the compiler to slightly transform our function. Contrary to React components in JavaScript we don’t take a single “props” argument but instead get each prop as a named argument to our function. The attribute will ensure that the compiled JavaScript has a shape that React knows how to work with.


  Next we have our function declaration. Our Button component will take two properties which we define as named arguments on our function. One of the properties is optional and has a default value.


  Inside of our function the first thing we do is determine what Bootstrap classes we need to add for our variant. We do this by creating a switch statement over our variant property and assigning the result to a className variable.


  Finally we return some JSX where we render a button with the chosen classNames. Two things to note here. First is that we don’t need a return statement, ReScript functions always return the last value in the function. Second we use punning to pass along the className property. Punning allows us to omit the property name if we already have a variable with the correct name.
 -
  Because the React 18 bindings are still under review but we want to use that sweet new createRoot so we can start using Suspense features for the next code we write we’ll have to write a some bindings. Bindings are how we tell the ReScript compiler how to bind ReScript code to external JavaScript code. They will probably be the most difficult thing you encounter when learning ReScript. They require you to understand the binding syntax and its different attributes, understand the type system, understand the code you’re binding to and make decisions about how to deal with some of JavaScripts quirks. So lets look at how we do this.


  First we define a new type. This type doesn’t have a concrete implementation so it’s an opaque type. We’ll see one binding that creates it and another than uses it. We don’t expect ReScript to otherwise interact with the contents of this type.


  Next we have three bindings we’ll zoom in on the first one and then discuss the differences with the second two.
 -
  Bindings always start with the `external` keyword, this tells the compiler what kind of declaration we’re making here.


  Next up we specify the name that we want to use in ReScript. We could use anything here but we’ll stick to the same name as in JavaScript to make using this binding predictable.


  The next part separated by a colon is the type definition. `createRoot` is a function that takes a `Dom.element` as only argument and returns our opaque `reactRoot` type. `Dom.element` is a type that’s provided by the ReScript standard library. While it doesn’t provide any functions out of the box to work with the DOM (since what’s useful may depend on your use-case), it does provide a set of shared types so that libraries that fill in this functionality can easily interoperate.


  Finally after our type definition this time separated by an equals sign we specify the external name of what we’re binding to in JavaScript. In this case that’s React’s `createRoot`.


  We’re not quite done here because this function doesn’t live in the global namespace. Instead it comes from the `react-dom/client` module. To make this clear to the compiler we add an attribute.


  This would generate the following code when we actually use our binding.
 -
  I’ve added the basic structure at the top as a cheat sheet. So lets look at the differences between createRoot and the other two bindings.


  For the render binding we can highlight two differences. We’re using the `send` attribute instead of `module` and our type signature is a function that takes two arguments and returns the `unit` type, or no data. If you’re familiar with the `render` method  when called on a created root you may know it only takes one argument. That’s what the `send` attribute does here. It will compile to calling the `render` function on the first argument to the bound function.


  For our third binding we can again highlight two differences. The attributes have changed, we have two this time, as well as the type. This time we set the type to be `Dom.element` rather than a function, this indicates to ReScript that it should be used as a value and can’t be called as function. Similarly when generating code we want the JavaScript to treat `body` as a simple value so we add the `@val` attribute. Again `body` is not a global but actually a property of the `document` global so we add a `scope` attribute to indicate this.


  That concludes a breakdown of our bindings, lets move to the fun stuff of actually using the JavaScript we just made available.
 -
  We start out by using the `body` value and passing this to our `createRoot` function. We do this with the pipe-first operator. The result of this is then passed as first argument to the render function. Our binding makes sure that we’re actually calling `render` on the result of our `createRoot` invocation.


  If you’re not familiar with pipe operators then it would be the same as writing `render` which takes as first argument the result of `createRoot` called with `body`.


  We also provide a second argument to `render` which is our JSX that renders a `div` with two buttons. As you can see the `variant` property is optional and the `children` property is filled in the usual way of providing children in JSX. One thing of note is that since our button expects its children to be of the `React.element` type but our `Continue` and `cancel` strings are strings, we must convert them with the `React.string` function. This is a function that won’t actually be output in JavaScript but does tell the compiler it can safely convert from one type to another.
 -
  Lets once more look at our full example.


  Take note of how few types we have to specify and how much the ReScript compiler does for us using type inference. We have two new types we define and the only place where we explicitly annotate types is for our bindings; the boundary between ReScript and JavaScript.


  Additionally to use the React or the Dom types we don’t need any imports. All defined modules are always available for use. This requires a bit of discipline in naming your modules but makes refactoring or reorganising code a breeze.
 -
  I’ve changed the formatting slightly so that it fits on the slide but aside from whitespace changes this is what you’d end up with.


  On the left we define our button component. You can see it’s prefixed with the name of the file I used. On the right we actually create a React root on our React import and render our small application to it.


  The observant among you may notice that we’re also exporting a `Button` object with a `make` function which corresponds to the module we made for our Button component. This is because all code in a module is public by default. We can change this by creating an interface file, this uses the `.resi` extension rather than the `.res` extension. Interface files allow specifying what should be made visible and what their types are. In this case our file is only for execution and shouldn’t provide anything to other modules so an empty interface file is enough. Let’s recompile after adding that.
 -
  That’s better, removed our unneeded Button object and removed our export.


  Besides telling the compiler what should and should not be exported in JavaScript land and what is and isn’t available on the ReScript side, these interface files also help ReScript determine what code to rebuild. If we now change anything in this file ReScript will know it can not impact any other code in our project and only rebuilds our current file.
 -
  So with some basic and more advanced ReScript explained down the happy path. Let’s take a look at some of the things that the ReScript compiler can help us with when we try to modify our code in the future.
 -
  The first thing we do is try to add an option type to our `buttonType` type. As you can see the compiler gives us a warning to tell us we’ve forgotten to use a value.


  In my own code I always want to make sure we handle all cases because not doing so could cause bugs, so lets modify our configuration to promote this warning to an error. We can see the warning at the top.
 -
  That’s better.


  This has some fun side-effects for two variants that the compiler provides.
 -
  The first provided variant is the Option type. It has two possible values, either `Some` holding a value of a type depending on the use-case or `None` to indicate missing data. ReScript actually does not have `null` or `undefined` but by using the `Option` type we can still model similar behaviour.


  Similarly if we have an operation that can fail with an error instead of simply not returning any data, we have the result type. The result type has two possible values, either `Ok` with the desired value or `Error` with some type of error.


  By promoting unhandled switch cases to be an error as we did we can ensure we never forget to handle a case of missing values or errors and prevent a whole swath of unwanted views showing up to for our users.
 -
  Similarly we could try to handle a non-existent case which would cause either dead code or indicate we’ve forgotten to update a type or made a typo.


  ReScript will quickly let us know that something’s not right and force us to correct the error.
 -
  Similarly if we forget to create our root we’ll get a type error to tell us that we’re missing our special `reactRoot` type that we can only create in one way.
 -
  The final example I could come up with of how the type system helps us is that our button must have children. Because we did not make the children property optional the component can not be used without children.


  ReScript will quickly tell us that there’s a type mismatch. The way this is presented may feel a bit weird at first, but will accustom quickly. Additionally work is underway to make these kinds of errors clearer.
 -
  These are some of the ways in which ReScript helps you avoid mistakes.
 -
  I want to highlight some of the things the community is working on.


  ReScript's next major version should include async/await syntactic sugar. In the current versio of ReScript we still have to work with raw promises. I personally don't find this problematic because the pipe-first operator makes it easy to avoid indentation hell. In addition the community is working on a new implementation of JSX in ReScript. This shouldn't change anything visible in your day-to-day code but it will make types somewhat simpler for advanced use-cases and give us the ability to support prop-spread, which is currently not supported.


  Outside of the language and compiler I'm very excited about [ReScript Relay Router](https://www.npmjs.com/package/rescript-relay-router). This is a project started by [Gabriel Nordeborn](https://github.com/zth/) and combines the great experience of ReScript Relay with React Router and Vite to provide a framework that allows us to do server side rendering with client side continuation. Along with things like a flat waterfall for assets and automated pre-fetching of data and code for the next page.
 -
  If you're interested in getting started with ReScript you can find more on [https://rescript-lang.org](https://rescript-lang.org). Join the community and get help with things you run into in the [Discuss Community](https://forum.rescript-lang.org/) and find more of my talks or connect with my on [my website](https://www.alexandervarwijk.com/).
 -
  Imagine a world where your front-end applications could run without worrying about type related bugs. Never get a critical issue submitted for a broken application caused by “cannot call method on undefined”. Never experience showing an invoice with a total of the dreaded NaN (not a number).


  Focus only on making sure that your business logic is correct and that your users have an awesome experience.


  You don't have to imagine, just use ReScript.


---
ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript. It comes with a lightning fast compiler toolchain that scales to any codebase size.

In this talk I will take you through what ReScript is, how its type and module systems work and its great integration with React and GraphQL.

No prior experience is required but I hope to show you an alternative to TypeScript that can be used to create applications of any size.

The code that was used in this presentation with commits corresponding to steps taken in the slides can be [found on GitHub](https://github.com/Kingdutch/rescript-introduction-presentation).

Unfortunately this talk was not recorded.
