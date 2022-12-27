import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { container, aside, body, footer, links, skills, link, nosplit, mastodon } from "./resume.module.css"

export default function Resume() {
  return (
    <>
      <Head>
        <title>Resume | Alexander Varwijk</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta
          name="description"
          content="Alexander Varwijk's resume."
        />
        <meta property="og:title" content="Resume" />
        <meta
          property="og:description"
          content="Alexander Varwijk's resume."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0067FB" />
        <link
          rel="canonical"
          href="https://www.alexandervarwijk.com/resume"
        />
        <style type='text/css' media='print'>{`
          @page {
            margin: 1rem .5rem;
          }
        `}</style>
      </Head>
      <main className={container + " flex flex-col md:flex-row print:flex-row"}>
        <div className={aside}>
          <h1 className="center hidden print:inline-block">Alexander Varwijk</h1>
          <div className="hidden print:block md:block rounded-full border-double border-stone-500 border-2 pt-2 overflow-hidden relative aspect-square m-2 -order-1">
            <Image
              src={"/images/alexandervarwijk.jpeg"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2>Links</h2>
          <ul className={links}>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 8 8">
                <path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z"/>
              </svg>
              <a href="https://www.alexandervarwijk.com/">alexandervarwijk.com</a>
            </li>
            <li>
              <svg width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 2.83783C1 2.35041 1.19363 1.88295 1.53829 1.53829C1.88295 1.19363 2.35041 1 2.83783 1H21.1611C21.4025 1 21.6415 1.04754 21.8644 1.1399C22.0874 1.23226 22.29 1.36763 22.4607 1.53829C22.6313 1.70895 22.7667 1.91155 22.8591 2.13452C22.9514 2.3575 22.999 2.59648 22.999 2.83783V21.1611C22.999 21.4025 22.9514 21.6415 22.8591 21.8644C22.7667 22.0874 22.6313 22.29 22.4607 22.4607C22.29 22.6313 22.0874 22.7667 21.8644 22.8591C21.6415 22.9514 21.4025 22.999 21.1611 22.999H2.83783C2.35041 22.999 1.88295 22.8053 1.53829 22.4607C1.19363 22.116 1 21.6486 1 21.1611V2.83783ZM9.70792 9.38711H12.687V10.884C13.1164 10.0232 14.2168 9.24961 15.8699 9.24961C19.0387 9.24961 19.7908 10.9628 19.7908 14.1063V19.9283H16.5826V14.8222C16.5826 13.0321 16.1532 12.0224 15.061 12.0224C13.5463 12.0224 12.9161 13.1109 12.9161 14.8222V19.9283H9.70792V9.38711ZM4.20818 19.7908H7.41637V9.24961H4.20818V19.7908ZM7.87468 5.81227C7.87468 6.08311 7.82133 6.3513 7.71769 6.60152C7.61404 6.85174 7.46212 7.0791 7.27061 7.27061C7.0791 7.46212 6.85174 7.61404 6.60152 7.71769C6.3513 7.82133 6.08311 7.87468 5.81227 7.87468C5.54144 7.87468 5.27325 7.82133 5.02303 7.71769C4.7728 7.61404 4.54545 7.46212 4.35393 7.27061C4.16242 7.0791 4.01051 6.85174 3.90686 6.60152C3.80322 6.3513 3.74987 6.08311 3.74987 5.81227C3.74987 5.26529 3.96716 4.74071 4.35393 4.35393C4.74071 3.96716 5.26529 3.74987 5.81227 3.74987C6.35926 3.74987 6.88384 3.96716 7.27061 4.35393C7.65739 4.74071 7.87468 5.26529 7.87468 5.81227Z"/>
              </svg>
              <a href="https://www.linkedin.com/in/alexander-varwijk/">/in/alexander-varwijk</a>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="19" height="19">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z"></path>
              </svg>
              <a href="https://github.com/Kingdutch/">Kingdutch</a>
            </li>
            <li>
              <svg className={mastodon} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 216.4144 232.00976">
                <path d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"/>
                <path d="M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"/>
              </svg>
              <a href="https://hachyderm.io/@Kingdutch">@Kingdutch@hachyderm.io</a>
            </li>
          </ul>
          <h2>Languages</h2>
          <ul className={skills}>
            <li>English Fluent</li>
            <li>Dutch Native</li>
            <li>German Day-to-day proficient</li>
          </ul>

          <h2>Business Skills</h2>
          <ul className={skills}>
            <li>Coaching</li>
            <li>Roadmap Planning</li>
            <li>Technical Architecture</li>
            <li>Process Architecture</li>
            <li>Organisational Strategy</li>
            <li>KPIs and OKRs</li>
          </ul>

          <h2>Technical Skills</h2>
          <ul className={skills}>
            <li>GraphQL</li>
            <li>PHP</li>
            <li>MySQL/PostgresQL</li>
            <li>JavaScript</li>
            <li>Rust</li>
            <li>ReScript</li>
            <li>SOLR</li>
            <li>Redis</li>
            <li>Docker</li>
            <li>GitHub Workflows</li>
          </ul>
          <p>
            I've used many tools and Languages through the years, not all of which are reflected above.
            The biggest hurdle for a new tool is how good its documentation is. The biggest hurdle for
            a new programming language is familiarity with its ecosystem of existing libraries.
          </p>
          <p>
            I've previously discussed this in my talk <a href="/talks/2019-10-30-multilingualism-makes-better-programmers-a-look-beyond-php-and-javascript" className={link}>Multilingualism Makes Better Programmers</a>.
          </p>

        </div>
        <div className={body}>
          <h2>About Me</h2>
          <p>
            I am an ambitious person with a passion for software development and entrepreneurship.
            With over 20 years of programming experience of which more than 10 in a professional capacity,
            I enjoy working on complex strategical projects.
          </p>
          <p>
            I've contributed to organisational growth through advice on business processes, strategy,
            and technical architecture. I've shared my knowledge through{" "}
            <a href="https://www.alexandervarwijk.com/talks" className={link}>conference speaking</a>,
            moderating, and writing <a href="https://www.alexandervarwijk.com/blog" className={link}>blog posts</a>.
          </p>
          <h2>Experience</h2>
          <dl>
            <div className={nosplit}>
              <dt>Lead Engineer, Open Social; The Netherlands — 2016-Present</dt>
              <dd>
                <p>
                  I've spearheaded the shift towards a decoupled project. Introducing GraphQL in the company and
                  educating colleagues. The first feature was a real time chat with a back-end in PHP and a
                  front-end with ReScript and React. A big part of my work is a push towards a platform vision
                  for Open Social to enable and encourage third party integrations.
                </p>
                <p>
                  Set up a translation management system using Weblate, Jenkins and custom bash scripts to extract, translate and import translations for Open Social. This replaced a previous workflow with spreadsheets.
                </p>
                <p>
                  Built a site management and deployment system using Jenkins, Ansible and Symfony.
                  This system allowed us to manage dependencies and bundle these in packages to create various templates for Open Social platforms.
                  The system could deploy these templates to create new sites on Platform.sh in 15 minutes (this was dependency management, to deployment, to site install).
                  This system was built on earlier work that I performed using just Ansible to remove the manual aspects of managing our fleet of platforms.
                </p>
              </dd>
            </div>

            <div className={nosplit}>
              <dt>Founder, Ontdekbier; The Netherlands — 2016-2017</dt>
              <dd>
                <p>
                  Ontdekbier was a craft beer subscription box service which aimed to surprise and delight members every month.
                  The project was started after my experience as purchaser of craft beers for the student bar at the Unversity of Twente.
                </p>
                <p>
                  Although proven a good idea, operations were ceased after a multi-million euro investment by Heineken to start BeerWulf in their bid to capture
                  the craft-beer eCommerce market. BeerWulf featured among its products a similar offering as Ontdekbier.
                </p>
              </dd>
            </div>

            <div className={nosplit}>
              <dt>Various Positions, De Vestingbar; The Netherlands - 2013-2018</dt>
              <dd>
                <p>
                  De Vestingbar is a student bar owned and operated by a student association of about 40 members.
                  The bar would be open daily with regular large scale student events.
                  The associations takes care of all aspects ranging from purchasing, bartending, DJs, audio/lighting, and security.
                  As president of de Vestingbar I was responsible for a 5 person board that oversaw the day to day operations of the association.
                </p>
              </dd>
            </div>
          </dl>

          <h2>Education</h2>
          <p>
            Open Universiteit, The Netherlands — Bachelors Business Administration, 2016-2022<br/>
            University of Twente, The Netherlands  — Bachelors Electrical Engineering, 2012-2016<br/>
            Het Rietveld Lyceum, Doetinchem, The Netherlands - VWO, 2009-2012<br/>
            Het Bonhoeffercollege, Castricum, The Netherlands - VWO, 2006-2009<br/>
          </p>
        </div>
      </main>
      <p className={footer + " hidden print:block"}>
        This resume was printed from <a href="https://www.alexandervarwijk.com/resume" className={link}>https://www.alexandervarwijk.com/resume</a>
      </p>
    </>
  );
}
