---
layout: blog
title: A comparison of JavaScript typesystems
date: 2020-01-13T08:00:00.000Z
description: >-
  A look at JavaScript, TypeScript, Flow, and ReasonML for their suitability in
  Enterprise applications.
featuredImage: /images/uploads/rainbow-colored-smoke-plumes.jpg
---
## Introduction
In this article I evaluate four options for type systems when it comes to writing enterprise grade software for the browser: plain JavaScript is the simplest but offers no security; Flow and TypeScript mend this somewhat but have some drawbacks; ReasonML is a separate language that compiles to JavaScript but this relatively young ecosystem offer its own challenges.

JavaScript has been the only language to enable interactivity across the web without requiring users to install anything besides their browser. It won't go away any time soon either. As computing power grew and JavaScript continuously received new features, developers have been building increasingly complex applications to run in the browser. However, with increasing complexity comes the increased risk of bugs. Luckily there are tools that can help us with this that offer type information to help combat bugs.

## Why use a type system?
JavaScript is a weakly typed language. This means that it enforces no types for values that get passed around a JavaScript program. It’s trivial to change an integer to a string or vice-versa and JavaScript will not complain when using a string as an array. That is until you try to do something with your variable that’s unsupported. At that point your program can come screeching to a halt.

Ensuring that you’re using the right types for your data requires an enormous amount of discipline. Something not always available in an enterprise setting with pressure to ship. In a [recent article about the Rust programming language](https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/) (the current golden standard for type-safe systems programming), Microsoft highlighted that 70% of all bugs come from memory issues. These are prevented by Rust’s type-safety system. 

In JavaScript memory safety is less important (due to garbage collection and lack of multi-threading). However, __it’s still very important to handle cases where functions can return `null` or `undefined` instead of an object you need__. These cases require the same discipline as memory safety and suffer from the same lack thereof! To avoid these types of errors it’s worth investing time in type-checking JavaScript.

## A look at the options
### JavaScript
The first possible option is to decide not to do any type checking and use plain JavaScript. This option has the largest community support (all other tools build on top of JavaScript) and it allows the use of tools such as Babel and Webpack to configure the build-pipeline. Both are proven contenders. However, this option relies entirely on the developer writing the code. I hope by now you understand why this is a bad choice. However, it’s useful to set as baseline in our comparison.

### TypeScript
The most well-known solution for type-checking at the moment is TypeScript. It’s a superset of JavaScript and comes with both a type-checker and a compiler.

From [typescriptlang.org](https://www.typescriptlang.org/index.html): “TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.” Typescript includes some features that are not yet part of the JavaScript standard, although it is conservative in its approach to this. TypeScript was created and is [owned by Microsoft](https://github.com/Microsoft/TypeScript).

### Flow
Another well known option, originating from Facebook, is Flow. Flow does not provide build tools but sticks to doing type-checking only. It is designed to understand idiomatic JavaScript and understands both common JavaScript patterns as well as many of the weird things JavaScript developers love to do.

Developed at Facebook, “Flow is a static type checker for JavaScript.” Flow provides nothing more than typings for your JavaScript code. If you want to use features not yet supported by browsers then you’ll have to use Babel, just as if you were writing JavaScript without any type checking.

### ReasonML
So far the mentioned options have all been put on top of JavaScript. It’s also possible to use an entirely different language. ReasonML is a language designed to compile down to JavaScript. It offers useful features found in languages such as Rust. Features not found in any of the JavaScript based alternatives. An example is the option to create switch statements with arms resolving based on the input type instead of only the value. 

From the [ReasonML Website](https://reasonml.github.io/): “Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.” An interesting note is that React was originally written in the StandardML language.

[From the documentation](https://reasonml.github.io/docs/en/what-and-why): “Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](http://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.”

Types are not bolted on top of the language but are made part of the language. This avoids some of the problems that Flow or TypeScript can have, such as types not matching the runtime. It also opens up powerful behaviours such as [pattern matching](https://reasonml.github.io/docs/en/pattern-matching).

ReasonML was created by Jordan Walke, the creator of ReactJS.

## Level of type safety
It’s important that if we adopt a tool to enforce type safety it does not produce situations where a developer thinks they are secured by type safety when this is not actually the case. It’s better if the language is explicit about missing types rather than silently complying. It’s also desirable for a type system to err on the side of caution, requiring protection against a run-time situation the developer knows will not occur, instead of missing a run-time situation that actually occurs.

### JavaScript
None. In JavaScript the developer is required to pay attention to what types are passed around. Functions should be guarded with `typeof`-if statements.

### TypeScript
Since version 2.0 (now at 3.x) TypeScript has provided [control flow based type analysis](https://mariusschulz.com/blog/control-flow-based-type-analysis-in-typescript). This means that it uses control flow branches to narrow down the type to the most specific possible type. This helps especially for nullable types as it can help enforce that both the positive case as well as the null-case are handled.

In version 3.0 TypeScript introduced the `unknown` type. This was introduced to fix issues that arose from the escape-hatch that TypeScript offered in the form of `any`. The `any` type will behave as all other types, essentially disabling type-checking. This can cause type-correct code that still causes issues at runtime. Just like `any`, the `unknown` type can be assigned any type. However, TypeScript will not let you use it as just any type. Instead, it will require you to check the type using JavaScript (e.g. `typeof`, `instanceof`, `isArray`, etc.). This makes it a safer default to use. If you adopt TypeScript you should probably [disallow any](https://palantir.github.io/tslint/rules/no-any/).

Types for packages not written in TypeScript are often found in the [@types](https://github.com/DefinitelyTyped/DefinitelyTyped) npm package. However, there’s no guarantee that the type definitions of the package match the actual code. Mismatches here can still cause hard to trace bugs. Additionally if a package does not have types you can create your own by creating a package.d.ts file.

**TypeScript uses _structural typing_**. The idea behind this is that types are compatible if their members are compatible. See the [TypeScript FAQ](https://github.com/Microsoft/TypeScript/wiki/FAQ) for more details on this.

### Flow
Just as in TypeScript, Flow uses what it calls path-sensitivity, refining a type using the runtime type checks that are implemented. Flow favours [soundness over completeness](https://flow.org/en/docs/lang/types-and-expressions/#toc-soundness-and-completeness) ([contrary to TypeScript](https://github.com/microsoft/TypeScript/issues/9825 "TypeScript prefers completeness over soundness")). This means that it favours ensuring that code works in all circumstances (even if they won’t occur at runtime) rather than focusing on errors it knows will happen at runtime (while sometimes missing harder to detect cases). Even so, [Flow has a handful of exceptions to its soundness](https://github.com/facebook/flow/issues/3702#issuecomment-293360271) since it’s dealing with JavaScript.

Flow uses nominal (name based) typing for classes but uses structural (structure/form based) typing for objects and functions. This mirrors the way that JavaScript is usually used.

Flow offers the any / Object / Function types which essentially opt out of type-checking. However, it allows to easily [ban these types in your codebase](https://flow.org/en/docs/strict/) on a file-by-file basis.

[Flow also has a repository for packages that don’t have their own typings](https://github.com/flow-typed/flow-typed). React comes shipped with flow types as it’s a Facebook project.

### ReasonML
ReasonML is fully sound and complete. Type safety is build into the language. An additional benefit of having type safety build into the language is that it allows us to use types to communicate business logic. For an example of this we can look at the documentation of Rust (similar to ReasonML) [which shows a WebEvent](https://doc.rust-lang.org/stable/rust-by-example/custom_types/enum.html) and can at compile time tell us whether all possible states of this event are handled. ReasonML offers us these tools as well by not having a `null` type but providing the `Option` enum instead which can help enforce proper error handling.

## Community
It’s easier to build on top of the work of others than to re-invent the wheel. A strong community behind the tools we use ensures that we do not need to fix all the problems that we encounter ourselves.

### JavaScript
The JavaScript community is huge and will remain this way for the foreseeable future.

### TypeScript
TypeScript has a large community. The GitHub project has 56.2k stars and is used by 1.6m other GitHub projects.

### Flow
The flow community is smaller than the TypeScript community. On GitHub the project has 20k stars and GitHub says it has about 70k projects that use it on its platform.

The smaller community probably comes in part from Flow being used internally before being opened to the community. 2017 and 2018 saw little communication from the flow team to its community. They’ve done a better job since the [start of 2019](https://medium.com/flow-type/what-the-flow-team-has-been-up-to-54239c62004f) with an exciting roadmap but the damage may have already been done.

Most notably the Jest testing framework decided to move from Flow to TypeScript to make it easier to onboard non-Facebook contributors. [The PR where this move is discussed makes for  an interesting read.](https://github.com/facebook/jest/pull/7554)

![A google trends analysis that clearly shows TypeScript outperforming Flow in search popularity.](/images/uploads/flow-typescript-google-trends.png)

### ReasonML
The Facebook/Reason project currently has 8k stars but only 266 packages on GitHub that are using it. Important packages that we care about such as React are already ported and Next.js has examples of using it with ReasonML. ReasonML allows us to escape to plain old JavaScript packages wherever we may need to.

StackOverflow help will be available less but [the Discord community](https://discordapp.com/invite/reasonml) is responsive and friendly.

## Build Tools
Similar to the need for a community, anything we do that is not plain JavaScript will require us to use build tools to compile down to JavaScript. The tools should be easy to use for new developers (ideally plug ‘n play after initial configuration) and should provide helpful messages about what’s wrong. 

For this evaluation we’re assuming that all development happens on OS X.

### JavaScript
The JavaScript community has centered around [Babel](https://babeljs.io/) to transpile language features not yet supported by browsers (such as JSX) and uses [Webpack](https://webpack.js.org/) to bundle these things into files consumable by browsers.

[ESLint](https://eslint.org/) exists to detect common JavaScript problems.

The community has centered around [Prettier](https://prettier.io/) to serve as opinionated code formatter. This avoids many of the discussions around configuring ESLint rules to accomplish the same.

### TypeScript
TypeScript has many ports or copies of popular JavaScript packages and tools. The TypeScript compiler itself offers some future JavaScript functions (replacing the need for Babel). Additionally TSLint was built to replace ESLint.

Prettier works for TypeScript just as it does for JavaScript.

Webpack is probably still needed to optimise the loading of client side JavaScript.

### Flow
Flow doesn’t have any special build tools compared to plain JavaScript. The type-checker is separate. After type-checking Flow depends on Babel to strip out the types and for the developer to continue using JavaScript as usual.

### ReasonML
The Reason tooling landscape is a bit more difficult to get into. It also depends on whether you use Reason for the web (compiling to JavaScript) or for native applications (compiling to native executables). Jordan Walk has created [a handy overview of ReasonML tooling](https://github.com/jordwalke/navigating-reason). For our purposes we’ll be using the BuckleScript tools that uses refmt to turn Reason into JavaScript code. This makes it a bit different from traditional JavaScript tooling. For development a bundler is not needed but we’ll probably want to use Webpack to optimise things for production.

## IDE Support
Type checking is only really useful if your IDE can tell you you’re doing something wrong while you’re doing it. Requiring a manual check each time code is edited will cause the type system to be quickly abolished by developers.

Open Social developers primarily uses the JetBrains IDEs so these will have focus here. However, VSCode is an editor quickly gaining ground with newer developers so it should be supported too.

### JavaScript
JavaScript has excellent support in IDEs. Both IDEs from Jetbrains as well as VSCode.

### TypeScript
TypeScript is a first-class citizen in VSCode as both tools originate from Microsoft. [PHPStorm also has TypeScript support](https://www.jetbrains.com/help/phpstorm/typescript-support.html).

### Flow
PHPStorm has good support for Flow. In the past VSCode support for Flow was more difficult. However, in the second half of 2019 Flow added support for the LSP language server that VSCode uses. Performance of type-checking has also been a large focus for Flow in this period.

### ReasonML
Reason is supported in JetBrains IDEs as well as VSCode. However, the [documentation](https://reasonml.github.io/docs/en/editor-plugins)recommends using VSCode.

## Learning curve
Evaluating from a company that specialises in Drupal and doesn’t do a lot of JavaScript a learning curve will always be present for most team-members. Even when focusing on plain JavaScript. This is okay, but it should be possible for developers to be productive relatively quickly. Good tutorials and documentation as well as a strong community can help with this.

### JavaScript
Basic JavaScript can be written pretty quickly. Getting familiar with and mastering more advanced JavaScript concepts (e.g. prototypical inheritance, promises and await/async, functional programming) can take considerably more time.

### TypeScript
When using TypeScript you’re not exempt of learning the intricacies of JavaScript. However, in addition to JavaScript you’ll have to learn the peculiarities of TypeScript. Getting started with the types of TypeScript is not that difficult. When introducing things like generics and more complex composed functions types can become a bit more hairy.

### Flow
The learning curve for Flow is probably roughly equal to that of TypeScript. I personally prefer the layout of the Flow documentation and guide.

### ReasonML
Since ReasonML is newer compared to other JavaScript solutions there will be less help available outside of the ReasonML documentation. However, in terms of difficulty it’s not more difficult than learning the typed alternatives. For developers coming from different statically typed languages (such as Rust or OCaml) it will be easier to pick up ReasonML than JavaScript with a separate type system (i.e. Flow/TypeScript).

## Lock-in
The web is based on JavaScript and we can expect this not to change in the foreseeable future, given the amount invested here already and the requirements to change this. However, the JavaScript community changes its mind often and all tools on top of JavaScript are owned by an entity. We should evaluate how difficult it is to get rid of what we’re using in case the tool goes in a direction we don’t want to follow or stops being supported altogether.

### JavaScript
On the web, we have little choice but to use JavaScript for interactive elements. That said, the chance of JavaScript disappearing are slim to non-existent. Such a shift would cause major problems for a lot of companies. 

### TypeScript
TypeScript is written inline in your JavaScript. This means that once you adopt TypeScript you’ll have to rewrite your application to remove it again. Arguably removal is easier than addition but this means TypeScript has a high degree of lock-in.

### Flow
Getting rid of Flow is quite easy. Flow doesn’t provide its own compiler but has a Babel plugin that simply removes the Flow type-annotations. The output of this (without other transforms) can probably be used to automate Flow removal.

### ReasonML
ReasonML has a slightly higher lock-in because it’s a separate language. So ejecting from ReasonML will be a bit more difficult than stripping off a type-system. With that said, ReasonML compiles down to pretty readable JavaScript that could be used as a starting point for such an endeavour. 

## Maturity
The maturity of a tool is an important indicator of how often the tool will change in breaking ways or how quickly best practices may change. These changes will require development effort on our part to adjust to or may prevent updating altogether.

### JavaScript
JavaScript is very mature. Changes occur slowly. The EcmaScript working group only makes backwards compatible changes. This makes language development more difficult but ensures that JavaScript from 10 years ago will probably still run in a browser today.

### TypeScript
TypeScript has been around in the community for a long time. With the backing of Microsoft it can be considered a mature and safe bet. TypeScript has had some clashes with newer JavaScript features and one possible upcoming clash is private class variables.

### Flow
Flow has been created by Facebook and is used in a lot of their internal projects (including React). This makes it quite mature. The size of the Facebook codebase means that the Flow team has to be careful with the introduction of backwards incompatible changes. It probably won’t go anywhere anytime soon, but shifts in the community can see its utility diminish as a tool for consumers outside of Facebook.

#### ReasonML
ReasonML itself is only a few years old (looking at the public repository). However, it’s build on OCaml which has a long and proven history. In 2017 [50% of Facebook Messenger was converted to ReasonML](https://reasonml.github.io/blog/2017/09/08/messenger-50-reason.html). With those things in mind we can conclude that the language is definitely battle tested.

As an important benefit of ReasonML being built on OCaml, it supports compiling to native targets such as iOS or Android. This could lead to even more performant native apps than when using the JavaScript version of React Native. Some web uses of ReasonML still bind on top of JavaScript frameworks though, so using ReasonML for universal apps (compiling to both web and native targets) will require more work.

## Talent pool
The talent pool for the type checking solution we choose is important. If the talent pool is small, it may be more costly to hire new talent to expand the team.

### JavaScript
There are a huge number of JavaScript developers. Each at differing levels of skill. Finding a JavaScript developer should not proof difficult. Finding a proficient JavaScript developer can be more difficult.

### TypeScript
TypeScript is well understood by now. When [looking at Google trends](https://itnext.io/choosing-typescript-vs-JavaScript-technology-popularity-ea978afd6b5f), the amount of interest in TypeScript is still lagging behind for now but steadily growing.

Existing JavaScript developers can be onboarded to learn TypeScript.

### Flow
Onboarding a developer for TypeScript or Flow will probably involve the same amount of effort. However, there is anecdotal evidence that TypeScript is more popular among developers. It may be easier to find applicants when mentioning TypeScript, requiring a bit of explaining when mentioning Flow (this article could help).

### ReasonML
Determining the talent pool is a bit difficult because the language is relatively young. ReasonML is probably easier to pick up for non-web developers than people who only know JavaScript.

## Open Social’s Goals \#our-goals

We do not have any production front-end code using React at the moment. However, whatever we write now will probably have to survive for multiple years. The language should make it possible to write code that catches as many errors at compile time as possible. 

## Conclusion \#conclusion

When looking at the development of programming languages it’s becoming clear that more checking at compile time is needed. As JavaScript applications become more prevalent and more complex, this trend is reinforced by the introduction of TypeScript and Flow. 

Drawbacks to TypeScript and Flow are that they are solutions that are essentially bolted onto something that wasn’t originally created to create large robust codebases with. ReasonML elegantly solves this by approaching the problem from a different perspective: extending a stable type-safe language to be closer to what people are used to on the web.

Although ReasonML is the youngest solution in the list of options, it best tackles the goal of providing type safety and aiding in program validity. Having been created by the original creator of the React framework means that it’s a good fit for use with React. Being based on OCaml means that it can be compiled to native code when targeting mobile platforms.

The initial investment in adopting ReasonML may be larger due to its differences with plain JavaScript. This is offset by the benefits that it provides in its type-safety and the ability to use the type system to encode and enforce business logic. Aspects that greatly benefit long running projects with multiple contributors such as [Open Social](https://www.getopensocial.com/).

## Sources \#sources

The following sources, in addition to links included in the text, were used in making this document.

Jonas Bandi (April 6, 2018), [Why you might NOT want to use TypeScript](https://medium.jonasbandi.net/here-is-why-you-might-not-want-to-use-typescript-part-1-alternatives-ec1248bb6dc) - Explains the drawbacks of TypeScript.

Jordan Walke (June 5, 2018), [Why Reason got started](https://www.listennotes.com/da/podcasts/reason-town/why-reason-got-started-with-BLiFVvkz16w/) (audio) - An interview with the creator of React on how ReasonML got started.

Marius Schulz (May 15, 2019), [The unknown type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript) - Explain the new unknown type in TypeScript and the difference to any

David Gomes (January 1, 2019) - [Porting 30K lines of code from Flow to TypeScript](https://davidgomes.com/porting-30k-lines-of-code-from-flow-to-typescript/)
