---
layout: talk
title: 'Maintaining a Drupal Module: Keep It Small and Simple'
date: 2018-04-05T10:00:00.000Z
conference: DrupalJam
description: >-
  This DrupalJam 2018 session is about the work I have done towards the Drupal 8
  2.0 version of the Real-Time SEO module. The talk is aimed at Drupal
  developers with an intermediate understanding of Drupal core APIs (most
  notably the Form API, Field API and Entity API).
slides: /talks/2018-04-05 - Maintaining a Drupal Module - Keep it Small and Simple.pdf
---
This session is about the work I have done towards the Drupal 8 2.0 version of the Real-Time SEO module. The 1.0 version focused very much on analysing specific fields and had its own configuration page, both things were not in the Drupal mindset. An often requested feature was support for the Paragraphs module which was impossible without a lot of paragraphs specific code. The 2.0 version of the module transitions to using the Entity API and the Object Oriented Form API to better support all kinds of fields. This ensures that the module is a lot more robust without a lot of field specific code. The Drupal way ensures that future field types will easily be supported. The configuration page was also shunned in favour of using the Field UI directly, which is what site builders are used to.

I will describe the work done in the months up to the first stable release of the 2.0 version (scheduled around DrupalJam) and the team behind Thunder showed me a very elegant way, using Drupal APIs, to solve a problem that I wrecked by brain over for weeks.

The talk is aimed at Drupal developers with an intermediate understanding of Drupal core APIs (most notably the Form API, Field API and Entity API). I hope that people will learn something from the solutions that I’ve learned and to demonstrate that sometimes, if you need a lot of code to get things done in Drupal, it could be that you’re doing it wrong.
