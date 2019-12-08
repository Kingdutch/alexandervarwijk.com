---
layout: blog
title: RustFest Barcelona 2019 in Review
date: 2019-12-06T14:45:00.000Z
description: >-
  This year was the first time I attended RustFest. The European conference for
  the Rust Programming language. I take a look back at the experience.
featuredImage: /images/uploads/hola-spanish-hello-light-sign.jpg
---
RustFest Barcelona 2019 was the first time I attended a Rust conference. I've previously been to a few editions of DrupalCon as well as React.Amsterdam so I have something to compare the experience with. However, RustFest was a unique experience compared to the previous conferences I attended.

RustFest Barcelona was only the 6th edition of the conference. The first edition was [held in 2016 in Berlin](https://blog.rustfest.eu/past_events/). This makes it a relatively young conference (compared to [DrupalCon's 14 year track-record](https://www.drupal.org/association/drupalcon/locations#2005) for example). There were around 400 attendees in Barcelona. This made for enough people to be able to meet new people in every coffee or lunch break and yet was not too big to find a friendly face.

## Why Rust?

If you're already convinced that Rust is your systems programming language of choice then it's safe to skip this section. However, whenever I talk about Rust this is one of the first questions I'm asked, so it's worth addressing.

The [Rust project homepage](https://www.rust-lang.org/) actually summarises Rust very well: Rust offers performance, reliability and productivity. Rust is just as fast (and sometimes faster) as C and C++. The language got popular for its type system which prevents memory safety issues. Microsoft recently published [an article](https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/) that shows 70% of the issues that the Microsoft Security Response Centre assigned a CVE (Common Vulnerabilities and Exposure) number to were caused by memory safety issues. Rust's type system was built to prevent these issues.

There is one thing in the survey that caught my eye and describes what I like about the language better than the marketing bullet points. The Rust typesystem offers many tools to write correct code. It ensures that you handle error conditions and if used correctly forces you to cover every code path. I talked about this briefly in my DrupalCon 2019 talk "[Multilingualism makes better programmers](https://www.alexandervarwijk.com/talks/2019-10-30-multilingualism-makes-better-programmers-a-look-beyond-php-and-javascript/)".

> According to an internal survey, the top reason for adoption was “correctness” - an extension of Rust’s safety guarantees that work towards making true the adage “if it compiles, then it works”. — <cite>Why Rust for safe systems programming, MSRC Team (2019)</cite>

## Two days of talks and workshops

RustFest Barcelona was held on Saturday the 9th and Sunday the 10th of November 2019. The conference being held in the weekend made it easy to attend the conference without having to take days off from work. Unfortunately I don't work with the Rust language in my day to day programming so having the trip sponsored by work was not an option. I think roughly half the people I met at the conference were working with Rust currently. Attendees that had been to previous RustFests noted that this number was steadily increasing :)

Although I've been to conferences before, RustFest was the first conference I attended that included workshops in the ticket price. The conference was divided into two parts each day. The mornings comprised a single track of talks in the auditorium. The workshops were held in the afternoon and provided the choice of both single-day workshops as well as workshops that spanned both days. I attended [the workshop of Luca Palmieri](https://github.com/LukeMathWalker/ndarray-koans) about using the [ndarray crate](https://docs.rs/ndarray/0.13.0/ndarray/) to implement a K-means clustering algorithm.

The talks that were given were all excellent. Covering a broad range of topics suitable both for beginners as well as more advanced users. Some highlights for me personally were a talk about [adopting Rust at Microsoft](https://barcelona.rustfest.eu/sessions/r-evolution) which can be useful if Rust ever needs to be sold inside of your own organisation. An introduction to [D-bus and the Rust D-bus library](https://barcelona.rustfest.eu/sessions/zbus-yet-another-d-bus-library) was also very interesting. The story of [how the Rust compiler ships a new version every 6 weeks](https://barcelona.rustfest.eu/sessions/shipping-a-compiler) without breaking every project using Rust is something that any software company can learn form.

The talk by [Katharina Fey](https://twitter.com/spacekookie) deserves its own paragraph. She held a passionate speech about [the human cost of development](https://barcelona.rustfest.eu/sessions/human-cost-of-dev). Going into detail on why people get burned out as well as why our current corporate view of recovery is wrong. We should instead adopt a more human centered approach to burnout recovery. I tweeted [about](https://twitter.com/Kingdutch/status/1193492840518733825) [this](https://twitter.com/Kingdutch/status/1193497701813489665) [already](https://twitter.com/Kingdutch/status/1193505350068121600) but everyone should watch (or read the transcript of) her talk, no matter your function, no matter your industry.

## A welcoming community

I arrived in Barcelona late on Friday evening and was at the conference about half an hour early on Saturday morning. People were waiting outside to pick up their badge and enter the conference. Many were happy to engage in conversation, tell me about their own experiences and asked me about mine. The day of talks and workshops flew by. There were no organised after-conference activities but at the end of each day people used Discord and Twitter to group up and spread out across Barcelona.

Unfortunately I had to return to the Netherlands on Monday morning and was unable to attend the impl days where attendees work on Rust projects together. However, I did sign-up to be involved in organising [the next edition of RustFest](https://netherlands.rustfest.eu/) which will be held in Q2 of 2020 in the Netherlands!

I very much look forward to seeing all the people I met in Barcelona once more.
