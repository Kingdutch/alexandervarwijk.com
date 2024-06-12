---
layout: talk
title: Rethinking Product Architecture for Drupal SaaS Products
date: 2024-06-12T14:10:00.000+02:00
conference: DrupalJam
slides: /talks/2023-06-12 - DrupaJam  - Rethinking product architecture for Drupal SaaS products DrupalJam 2024.pdf
description: >-
  A presentation about how my thoughts of building with Drupal have changed from building 
  one-off websites to building products that last for years. 
recording: >-
  
notes:
  -
   It's great to be back here at DrupalJam, where I actually had my first ever conference 
   presentation 5 years ago.

   In the next 40 minutes I want to share with you how my approach to building things with 
   Drupal have changed after joining a successful Drupal agency turned SaaS start-up.
  -
   Before we begin I'd like to get to know you a little bit by a show of hands.

   First of all, who is currently working at or operating an agency?
   Keep your hands up, who of those are thinking of building a product or SaaS offering?
   Who of you are already working in a product or SaaS company?
  -
   Now that I know a bit about you let me tell you who I am.
 
   My name is Alexander Varwijk and I'm a Technical Architect at Open Social. I've been building 
    websites with Drupal for over 12 years. Before that I was building websites without Drupal for about 10 years. I'm very lucky to have been able to turn my hobby into a career and I'm still enjoying what I do.
 
   I joined Open Social nearly 8 years ago at the end of 2016. It's this time period, from about 
    2016 up til now that I want to talk with you about. The way I look at building websites has changed and the way I look at Drupal has changed as well. I believe there's quite a difference between what Drupal agencies need to build a website for a customer and what SaaS organisations need from the Drupal ecosystem. It's these changes and these differences that I want to talk about today.
  -
   To provide you with a bit of context of the change I'm talking about here's a short history of 
   how Open Social came to be.
 
   16 years ago GoalGorilla started as a small Drupal agency in Twente.
 
   In 2011, having grown quite a bit we started a project for Greenpeace which would become 
   Greenpeace Greenwire. The platform we built for them sparked the idea of what would later become the Open Social platform which was funded using crowdfunding in 2015 and launched with an initial version in 2016. We've since received VC funding and have been working on that same product ever since.
 
   In 2019 at DrupalCon Amsterdam, our founder Taco Potze gave a great talk of the business 
   differences between an agency and a SaaS business, but I'll be focusing on the technical decision making today.
 
   Looking at this history, I believe the timeline of projects is a first big difference. In an 
   agency setting it's not uncommon to have a project that can range from 6-18 months. Then the site is launched and you may work on it again to add some new functionality. But by and large the core functionality of the website won't change much and it'll be in maintenance mode. It'll either fulfil its need and stay relatively static from a feature perspective. Alternatively, maybe every five to seven years the branding or strategy of an organization will change sufficiently that the current website no longer suffices and an ambitious plan is created to rebuild and relaunch the website.
 
   At Open Social we actually relaunched our marketing website just a few weeks ago to show our 
   vision for the next 8 years. The previous iteration was about 4-5 years old just like the iteration that came before.

  -
   This is in stark contrast with the lifecycle of a product. Our customers choose our product 
    for a specific purpose. If their needs change too much they may churn, but by and large, as long as their needs stay aligned with the goals of our product, they won't be paying us for a rebuild. I don't know if you're all familiar with Netscape. They were the company that made the first popular browser when the World Wide Web was gaining traction. At some point for all intents and purposes they were the only browser on the web. However, they suffered from feature creep and decided to rebuild their browser from scratch. This caused them to not release a browser for 3 years between 1997 and 2000, which subsequently left openings for others like Internet Explorer and we now know Netscape only as a cautionary tale from the past.
 
   This means that when you take a developer from an agency, which is the majority of the Drupal 
    community, and you bring them on board for a product, that you want to live and thrive for 10s of years, you're going to have to change their mindset to development.
  - 
   However we all know that change is hard.
 
   Making this transitions is very much like turning an oil tanker, requiring careful 
    coordination and with a lot more inertia than we might like.
 
   In 2019 Taco showed the Open Social team a picture of an oil-tanker. To signify the changes 
    we'd have to make and the effort that'd be involved to turn the ship. At that point we were saying goodbye to our last agency customer. I remember that I was a bit skeptical, already well onboard with the product mindset. How hard could it be?
 
   It turns out that it's actually very difficult even from a technical standpoint. I still 
    think of this oil-tanker often because I can see the inertia even in the great Drupal developers that join our team.
  - >-
   The first mental shift that developers need to make is to switch from thinking about a single 
    customer and a single use-case to thinking about all of the customers. Think about the possible use-cases.

   Photo by Hans-Peter Gauster on Unsplash: https://unsplash.com/photos/stack-of-jigsaw-puzzle-pieces-3y1zF4hIPCg

  - >-
   You're solving a very different puzzle. It's not enough to fulfil a single use-case and 
    similarly on the other spectrum you don't have time to fulfil them all. However, it's important that for the use-cases you don't fulfil right now, you give yourself room to add them later.

   Photo by Xavi Cabrera on Unsplash: https://unsplash.com/photos/yellow-red-blue-and-green-lego-blocks-kn-UmDZQDjM

  - >-
   When solving puzzles within Drupal it might be very tempting to think "There's a module for 
    that". But there's a risk involved because the goal of most module developers often aligns well with the target audience of site builders, but not necessarily with product builders.
 
   An example of this is that I often see are modules that contain only very generic permissions 
    such as "administer module". In a site builder context, for an agency project for example, this permission makes a lot of sense. We often have a few people who are building or developing the site for us who get access to everything and then our users will be writers and editors who work in content. So you see a clear split in permissions between "configuration" and "content".
 
   However, in a product setting that line is not as black and white. You'll likely want to set 
    80% of the configuration as fixed but expose the last 20% of the configuration to your customer to give your product that much needed flexibility. For example in Drupal's site settings you'll likely want to set the 404 Not Found and 403 Access Denied pages to some nicely styled page. Considering that to be part of your product. But your customers should be able to set the site name. To achieve that you'll have to do some work on top of the module, or contribute to the module to make its permissions more granular.
 
   Picture courtesy of The LEGO Group: https://www.lego.com/nl-nl/product/the-lord-of-the-rings-barad-dur-10333
  - >-
    When thinking about how you use these modules and Drupal to build your product you may think a bit like this. It's how we've always presented the Open Social product. At the core is Drupal, around which we have the open core that might be your own public set of modules, distribution or recipe that you can download from Drupal.org. On top of that you build our SaaS product and finally for your largest customers you add customizations and integrations that may be specific to their workflows and systems.

    This looks like a very nice layered approach and from a business perspective it makes a lot 
    of sense. You give and take from the open source community and leverage the flexibility of Drupal to provide the best solution to your customers.

    However, when we look at the reality from a tech perspective then it looks more like this. 
    With some things complexly intertwined. Drupal makes it very tempting to simply add an alter hook and change some functionality that's in a lower level.
  
    The SaaS product will alter features from the distribution, or maybe a core module. An 
    enterprise customisation will just add a field to one of your SaaS features. The result is actually a very fragile system because it means that a change in any part of your platform may have far reaching consequences in all the other layers.
  
    You end up with a system where you need to make sure that your entire team constantly has the 
    entire product in mind. They need to be aware of all customisations on a feature you might have made. So what do I believe you should do instead?

  - >-
    I think instead you should make a clear distinction between features and systems. Your module should be one, or the other, but never both. Features and systems from different levels can build on top of systems from lower levels, but they can't ever touch a feature from a lower level.

    So let's re-draw our circle in a different way to show what that might look like. We first 
    define our layers with our systems at the bottom, our features above that, and then our users at the top who interact with our features.
  
    The first system we have is Drupal core which provides a ton of value, like user management, 
    data architecture, access handling, and UI rendering. On top of that we build our first open source system and a feature on top of this. For example we introduce the group module as a system and we create a group type that signifies a feature around collaboration.
  
    Next we extend the group system with a member invitation system that works by e-mail which 
    can be re-used in different group types. Our SaaS product extends this system to allow invitations by mobile phone. A new group type is created on top of this as a feature in the form of discussion sections, which allows people to be invited by mail and phone.
  
    Finally we have an enterprise customer that wants some custom data management and they want 
    the invitation system to also extend to Slack. So we once again extend the invitation system, making sure we don't touch any of the previous features, and build a specific data management feature for them.
  
    At every stage we make sure that we extend and enhance systems, in this case the invitation 
    system, without directly modifying already existing features, such as the collaboration and discussion features that were part of the distribution and SaaS product.
  
    If you feel a bit lost here, that's okay. We'll go over the individual parts of these 
    decisions to discuss how thinking has to change.

  - >-
   One of the questions you may have is how I define a feature. Where do I decide to draw the line? 

   For me, a feature is anything that a user interacts with.
   
   This could be an entity form that controls how a user enters data. It could be a display that 
    determines how an entity is shown. It can be a views view for an overview page. Maybe it's a search page backed by your search index. Or it's a specific notification that gets sent when something happens, whether it's push or e-mail.
   
   Now you may be thinking that that covers all of Drupal's functionality. If you can't modify 
    any of these things when an enterprise customer asks for it, then aren't we throwing away all of Drupal's flexibility?
   
   Lets define our systems to see what's on the other side. A system is anything that we can use 
    to extend functionality. For example the plugin system. Hooks to provide information rather than alter. Perhaps a field formatter or widget. Or a specific service that contains some business logic.

  - >-
   To make this way of thinking clear, it can help to look at a few examples that we can place 
    on a spectrum.

   With a little practice for the pub quiz tonight. First all the way on the left we as fully a 
    system module we have… group. Then in the middle which provides a bit of both, we have… book. And all the way on the right as a feature, I unfortunately didn't have an icon or puzzle handy, we have the r4032login module.
 
   So let's look at why I placed them in this categorisation. If we install the group module, 
    then out of the box basically nothing happens that our product users will see. However, it provides many building blocks for me to configure and build features with. For example the ability to group people together. To attach other types of entities to this group of people. And to define flexible access rules around these sets of data.
 
   If we look at the book module in contrast, which has been moved out of Drupal core. Then we 
    see that it actually provides two things. It provides a system to relate and nest nodes with one another to create a book-like structure. However, it also creates a new node type for us which is the book node type, which is created when you enable the module.
 
   Finally all the way in the feature category we have the r4032login module. All this really 
    does is redirect any anonymous users that run into an access denied page to the login page. This is something that your users will experience. There are some settings for you as a product builder to configure but there's no system to extend and you're unlikely to expose the configuration.

  - >-
    Especially for the group module, for us, learning to think about modules in this manner of system vs features has been a hard won lesson. When we started with Open Social we knew that we'd have different kind of groups within Open Social. This would be an important feature. So we created different types of group to handle visibility needs and created our overviews that showed groups, indexed search, all the things you do in a Drupal project.

    Then we realised we had a new feature, courses. Which was actually very much like a group of 
    people having access to common content. This made the group module a great match as a system to power this new feature.
  
    So we changed our usage of the group module: moving it from a feature to a system. However, 
    this left us stuck with the previous assumption where we treated the module as a feature and 
    any group entity was treated as a group. Even though this wasn't the case anymore.
  
    This was something we've learned 5 years ago, but it has taken us until yesterday. After 
    spending 8 months on a data migration and the group module update. To fundamentally change how we use the group module in our product and say that there's a single group bundle that represents our group feature and all other group bundles represent different features.
  
    So this finally moves the group module back to being a system that provides us with a very 
    flexible way to handle all kinds of access management needs.
  
    After a lot of time invested we're now in a position where we can create new features on top 
    of the group module without them showing up as being part of the original group feature

  - >-
   The other example which is actually still problematic for us is the book module. Contrary to 
    the group module where we made the mistake ourselves of taking a great system module and using it as a feature. The book module itself actually puts itself in the middle and doesn't quite know what it is.

   For those of you not familiar, the book module contains a bunch of code that allows you to 
    create a structure between different nodes. It also provides a bunch of tools to work with this. Like code to load the outline, a block to display it, and a breadcrumb builder, for example.
 
   However, where I think it goes wrong and moves from being a useful system module to the 
    uncomfortable middle of a feature is that it also includes a node type. When you install both the book module and the node module at the same time, which you're likely to do because nodes make for the best books. Then the book module will automatically create a new node type for you named book.
 
   From a site building perspective this is great because when you enable the book module then 
    this is likely what you want. However, when you're building a product then you likely have other ways of creating pages too. So you may not want a new node type but instead want to create a user friendly way to choose between using the book and not using the book. However, the book module gives you no way to opt-out of this and only use its systems.
 
   This is a situation we now find ourselves in, having two content types. One named "page" and 
    the other name "book page" which are pretty much the same except that one is a book and the other isn't. You might wonder why we don't just use the content type provided by the book module. However, one of the things that makes Drupal great for product building is the flexibility. What we lose with book adding its own content type is the ability to offer a page type to costumers that don't want to have the book disabled.
 
   I hope that with the move out of Drupal core and into a standalone contrib module, one of the 
    things that the book module can do is to remove the node type configuration. Perhaps it can be moved to an accompanying recipe.

  - >-
   The last example I shared was the r4032login module. I don't really have anything to say 
    about it. It's a great module that provides a bunch of configuration with which we can shape the product experience and then it does that one thing and it does it very well.

   I'm surprised it only has 31.000 installs.

  - >-
   So why is this distinction between a module that is a system and a module that is a feature 
    so important? And why is it important for you to know which is which?

   If you're just starting out with product development then it may not matter much to you. You 
    can't sell your product if you don't ship features. However, I urge you to at least take some time to think about this because changing your features into systems later, or into different features, can take you a lot of time. There's little room to rebuild things and you'll have to keep supporting the customers that are already paying you their monthly bills.

   So if you're a developer then you might also have to change how you talk to the business side 
    of the organisation. For all the times they've been to a Drupal conference and heard "there's a module for it". When creating a cohesive and maintainable product it's not as easy as just turning on a module and you're off to the races.

  - >-
   You'll have to have a discussion with the business side of how you might want the feature to 
   evolve in the future. Are you happy taking a module, like book, that's both a system and a feature and putting it live. Perhaps you want to spend the time to decouple the two and be able to use only the system to enhance an existing feature.

   The business side of the organisation will have have to learn to educate your customers 
    differently as well. Especially when working with customers that are familiar with Drupal they may already come to you with module suggestions, but it's important to figure out what their actual need is and relate that to what your other customers and prospects might need.

   Your agency customers may not be the customers you will have for your SaaS. Your agency 
    customers came to you because they had a certain budget and wanted customization over what is already out there. Your SaaS customers will come to you because they can benefit from lower cost due to standardization and resaleability.

  - >-
   Another moment in time that this decision of building on a system or building on a feature 
    will be important is when you have your product launched and a large enterprise customer comes to you. They really like a feature you have, but they just need a few things changed. 

   Your first discussion should be whether what they want can benefit your other customers. In 
    that case it might be a nice opportunity to work together and improve your product feature for everyone. That's great!

   However, what happens when what they want is very specific to them. Maybe they have a some 
    data fields that contains data that's relevant to their organisation but not to any other. It may be very tempting to look at your feature and say, okay these are very close….

   ….I just create a new module for them that's only enabled on their platform, that adds this 
    single field to my existing feature and then I work from there.

   But this puts you in a precarious position. What if you talk to your other customers and they 
    give you the feedback that you can make their lives much easier if you evolve your feature in a slightly different direction.

   We go ahead and evolve our feature, but oh no, it's not quite compatible with the change you 
    made for your large enterprise customer. This means that you're now either blocked from making this change for all your customers, or you'll have to do work for your enterprise customer that might be costly to bring them on board.

   What if we could go back and we could make a different decision.

   What if instead we had duplicated the feature that we had, using all the underlying systems 
    but creating its own copy that was specific to that customer.
 
   This would enable us to evolve our own feature with other customers without worrying about 
   breaking the feature that our large enterprise customer is relying on, and if our change is 
    applicable to our large enterprise customer as well it's likely much easier to change it on a system layer and apply the change to both features.

  - >-
   And this is not just when you want to be able to provide customisation for an enterprise customer either. This is a mistake that at Open Social we've repeated many times over the years. 

   We would often add a new feature that, when enabled, enhances a feature that already exists. 
    For example for our event system we've built anonymous enrolment, which allows not only logged in users to enrol to an event but also allows people to enrol without account. To implement this we must store some information about the enrollee and we must change the things that an anonymous user sees. Because this is not a feature that all our customers want, it's an natural inclination for a Drupal developer to put this in its own module. So we have an event module and an anonymous enrolment module.

   Where we went wrong is that we built the anonymous enrolment in such a way that when it's 
    enabled it uses a lot of alter hooks and changes to adjust how the event module behaves. So we've started from our working feature and then implemented a module that makes a bunch of changes. As a result, whenever we change how our event module works we need to make sure that the anonymous enrolment module is updated in what changes it applies.

  - >-
   If I would rebuild this now, taking into account everything I've explained to you. Then the 
    enrolment is a part of the events that users interact with, so it's a feature that we shouldn't modify from another feature. Instead we would need some system within our event module that allows other modules to build on top of it, in this case for the enrolment methods.

   Our event module would need to have a system to collect enrolment methods. Drupal's plugin 
    system would be a great fit for this. That would allow our anonymous enrolment to provide a plugin that works for anonymous users and changes the direction of ownership. Allowing the event system to keep control over its own user interactions. Rather than the anonymous enrolment module trying to change things with alter hooks.

   The benefit is that such a system is immediately far more extensible. If we wanted to expand 
    this with monetization for example then we can evolve this plugin system, rather than having to find different ways to alter our two features.

  - >-
    I will admit that trying to boil down what's now nearly 8 years of mostly trial and error into a 40 minute presentation is a challenge that I've underestimated.

    Drupal provides so many different ways for modules to interact. So many ways to change 
     something that's not working exactly as you like. So many different ways to make an 
    exception. Covering them all and telling you what Drupal functionality you should and shouldn't use would take us way too long. It also wouldn't help you because there's always an exception.
 
    What I hope my examples have illustrated is that if you're building products, you're building 
     for the long term. It's important to think about which part of your product owns what 
    functionality and protect that in your development decisions. To protect the ability to reason about small parts of your product without having to worry that changing something in one part will make something else fall over.
 
    To help you achieve this I leave you with three guidelines to decide which of Drupal's many 
     powers you wield.

  -
   Am I providing a extension point for other features? Great, keep going!

  -
   Is my feature altering another feature due ot a lack of system/extension point?

   Re-evaluate, first build the extension point

  -
   Is my feature altering another feature for one specific customer?

   Turn back, here be dragons


---
After 8 years of building Open Social as a SaaS product and open source distribution lets reflect
on all that has changed since Drupal 8. There's plenty of things we would've done differently in
hindsight and luckily there is a lot we are doing differently now.

In this talk I'll discuss how to approach the challenges that come from rebuilding something you
want to deploy 100s of times. How we reason about organizing systems and features within Drupal
development, what lessons we've learned in how we sell customization on top of our product, and
what kind of tools we use to guide us in our journey.
