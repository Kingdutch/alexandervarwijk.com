---
layout: blog
title: Setting up my blog (again)
date: 2019-10-19T14:00:14.642Z
---

The desire to have a place on the internet that I can call my own still exists. A place where I can write out my thoughts, without the fear of my content being suddenly removed because the platform I publish on decided to change their policies or go bankrupt.

I've tried this before. Setting up a Drupal website. Something that's not difficult to do after working with the platform for almost 10 years. However, adding all the little things that you might need for a properly optimised blog can distract from actually getting to writing content. I've also tried to write something using React. In those endeavours I usually get sidetracked into building out yet another CMS, figuring out server side rendering, etc. All these attempts are very educative, usually discovering how existing tools work, why people use them over rolling their own and how I could be using them. This distraction does mean that they're never really productive towards achieving the goal of making sure that my website is not just a DNS error or a page not found.

Now, in an attempt to actually ship rather than only learn, I've set up [Gatsby](https://www.gatsbyjs.org/) which gives me an easy framework on top of React to render out content. After reading some reviews I've decided to give [Netlify](https://www.netlify.com/) a try for simple, free, hosting. So far I'm impressed with what I see and the amount of configurability that they provide. While researching hosting I came across [Netlify CMS](https://www.netlifycms.org/) which seems like a great way to allow simple content management with a git backend. I love Markdown, but I find I just can not write articles in PHPStorm, no matter how much I love Jetbrain's IDE for coding.

I first started with the [Gatsby + Netlify CMS Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms). After setting up I found that I had to remove most of what they gave me out of the box. As I'm not very familiar with either Gatsby or Netlify CMS I found that this meant that I was mostly battling the magic glue. However, it's easy to get started with Gatsby so nuking everything and starting over was quickly done. With the [Gatsby Netlify CMS plugin](https://www.npmjs.com/package/gatsby-plugin-netlify-cms) and the experience from the Netlify tutorial setting-up the Netlify CMS once more was a piece of cake.

So here we are, again, a new blog started. The editor experience of Netlify CMS feels very nice. With live preview, all the WYSIWYG tools that you want and an easy way to add extra fields for SEO or other pruposes.

All that's left to do now is to build out the actual front-end of the blog. Although the Gatsby starter gave me that for free, it also made some tech choices for React that I disagree with (I prefer styled-components over SaSS for example). Lets see if I can ship before I get distracted by the rabbit hole of development.
