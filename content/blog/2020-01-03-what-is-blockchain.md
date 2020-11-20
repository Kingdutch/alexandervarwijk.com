---
layout: blog
title: What is blockchain?
date: 2020-01-03T15:00:00.000Z
description: >-
  Blockchain has been around for a while. The hype seems to be coming to an end
  as it moves to a more mainstream phase of the technology lifecycle. Lets take
  a look at what Blockchain actually is.
featuredImage: /images/blog/what-is-blockchain-scrabbletiles.jpg
---
_This article was originally published on my Explaining Crypto blog in early 2018._

In 2017 blockchain earned its spot in mainstream media. Simultaneously we reached the height of the ICO craze: simply saying that you were doing an ICO often resulted in money being thrown your way. In this article we’ll take a look at the technology behind the buzz and see whether it’s here to stay (spoiler alert: it is).

## A central source of truth

Money was once invented to make it easier to store the value that you owned. Instead of having to figure out what you want for your service or goods right this moment you could take a token instead. This token could then be used at a later point to show others you had provided some value that you could then trade in for goods or services.

Banks were created to provide an easy way of storing larger amounts of these tokens and making it easier to send them over a large distance. Instead of physically shipping a large amount of money one could bring it to a bank and have the bank send a cheque by mail or telegraph.

Banks could thus be used to send money from one party to another over a large distance. In this process the bank acted as a trusted third party. They confirm that they received the payment from one party and then that they have delivered it to the other.

Acting as a trusted third party requires some effort by the bank (although nowadays most of this is automated). This in turn is offset by transaction fees that are charged by the bank to the parties transferring value.

To ensure that banks know whether one party can actually send money to another they use what is called a ledger. This ledger serves as a record of transactions that have occurred and serves as a central source of truth.

Not all transactions lend themselves to being executed through a bank. Take cryptocurrencies for example, a relatively young technology with a lot of banks uncertain about how to handle money  related to it. Furthermore, the transaction costs can be a significant barrier to usage. 

To overcome these obstacles - availability of a trusted ledger and the associated transaction costs - an alternative was found in the form of blockchain.

## A distributed ledger

The technology underlying blockchain is named “distributed ledger technology”. In transactions on a blockchain this distributed ledger takes over the role of the bank’s ledger as a central source of truth. It allows all parties involved to see whether a transaction is possible.

When someone wants to add a transaction to this ledger then the transaction must be approved by all participants in the ledger. No special technology for this would be needed. We could all take a piece of paper, write down the transaction with our date and signature and we’d have a distributed ledger. 

This method of manually recording a distributed ledger is rather inconvenient. To verify the ledger we would have to come together and compare all entries on all pieces of paper. Comparing all transactions and ensuring they each have the correct date and signature.

## A cryptographic replacement

Using cryptography instead of our own physical signature we can digitise the paper copies of our ledger. Instead of a date and personal signature we devise a system that creates a unique value for the data we want to store on our ledger.

Taking the most well known cryptocurrency, Bitcoin, as an example. Each entry on our ledger contains a set of transactions, named a block. 

Just as a bank would, first we check for each transaction whether it’s actually possible (does the sender have the required funds and does the recipient exist). We then simply discard any transactions that are invalid.

## A chain of blocks

From the valid transactions we then calculate a single unique value using a cryptographic hash function. A cryptographic hash function takes some data as input and transforms it into a value that is unique for every combination of inputs.

The trick of chaining the blocks together happens at this point. Instead of only taking the transactions that we want to encode on our ledger, we also take the computed hash of the previous block (entry on our ledger) as input for our next hash.

By using the unique property of a hashing function that it’s output can only be produced by a single set of input data, together with the dependance of each block’s hash on that of the previous one, a verifyable chain of blocks is produced. To verify our ledger we would simply calculate the hash for each block and ensure that it matches up with our recorded hashes. 

If someone were to insert a transaction into one of the blocks, its hash would change, breaking the chain.

##  A gentleman’s agreement

The principles of how a blockchain works are relatively simple. Ensuring that all the involved parties agree on which transactions should be included in a block is quite a challenge. The two prevailing methods on how to create consensus on the transactions that should be included, proof of work and proof of stake, will be covered in a future article.

The possibilities that blockchain technology provides in enforcing agreements between two parties using smart contracts will also be covered in a future article.

## A look at the future

Although it won’t be as easy to raise money with an ICO as it was in 2017 (this is a good thing), blockchain technology is here to stay. The obvious application of a digital currency has been tried and tested. Blockchain will find its mainstay in more niche applications solving large enterprise problems such as chains of custodies for products or evidence.

A big hurdle will probably be government legislation. Keeping up to date with technological advancement is a challenge for all individuals. Even more so for a large group of individuals that are expected to govern for the future. I do believe proper legislation is necessary to protect the general public from scams and money-grabs while allowing legitimate projects to flourish. 

One project that is experimenting with a new form of ICO which promises better accountability and governance is The Abyss. Their Distributed Autonomous Initial Coin Offering (DAICO) is something that could provide a solution to these problems.
