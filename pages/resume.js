import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { container, aside, body, footer, links, skills, link, nosplit, education } from "./resume.module.css"

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
      <main className={container}>
        <div className={"flex flex-col md:flex-row print:flex-row"}>
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
              <li>PHP</li>
              <li>Rust</li>
              <li>JavaScript/TypeScript</li>
              <li>HTML/CSS</li>
              <li>GraphQL</li>
              <li>MySQL/PostgresQL</li>
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
            <h3>Technical Architect, Open Social; The Netherlands — 2024-Present</h3>
            <p>
              Open Social is a leader in collaborative ecosystems, Specialized in
              mission-critical community and collaboration solutions, it serves
              some of the most ambitious organizations in the world, including the
              European Commission, IATA, Greenpeace International, the World Bank,
              the United Nations, WAGGGS, and many more.
            </p>
            <ul>
              <li>Responsible for the <b>technical architecture</b> of products at Open Social.</li>
              <li><b>Guide development teams</b> through technical decisions and best practices.</li>
              <li><b>Align technology investments</b> with long-term business strategy through <b>executive-level advising</b>.</li>
              <li>Map client and prospect requirements to existing features and <b>roadmap initiatives</b>.</li>
              <li>Engage in the <b>customer acquisition process and implementation process</b> of the Open Social platform for large NGOs.</li>
              <li>Be a <b>sparring partner for management</b> in further development of the platform and the company.</li>
              <li>Actively <b>participate in recruiting</b> and onboarding of new team members.</li>
              <li>Improve development workflows via <b>CI/CD enhancements</b> and <b>direct coaching</b>.</li>
            </ul>

            <h3>Lead Engineer, Open Social; The Netherlands — 2020-2024</h3>
            <ul>
              <li>Created an <b>automated site deployment system</b> (using Jenkins, Ansible, and Symfony), reducing new platform setup time to 15 minutes.</li>
              <li>Introduced <b>GraphQL for API strategy</b> and <b>built a Real-Time Chat</b> feature using async PHP, ReScript, and React.</li>
              <li>Set-up a <b>translation management system</b> with Weblate and GitHub actions, replacing an inefficient spreadsheet-based workflow.</li>
              <li>Led the push towards a <b>platform-based architecture</b> to encourage third-party integrations.</li>
              <li>Actively <b>support the transition of the company</b> from a consultancy-based company to a <b>product-based company</b>.</li>
            </ul>

            <h3>Developer, Open Social; The Netherlands — 2016-2020</h3>
            <ul>
              <li>Contributed to the core product team, leading <b>open-source efforts</b> and infrastructure automation.</li>
              <li>Served as contact point for <b>Enterprise clients</b>, addressing bugs, feature requests, and ensuring new product features integrated seamlessly with existing functionality.</li>
              <li>Delivered a <b>Drupal eCommerce platform</b> (€500k annual revenue) in six months, turning around a stalled 24-month project.</li>
            </ul>

            <h3>Founder, Ontdekbier; The Netherlands — 2016-2017</h3>
            <ul>
              <li><b>Launched a craft beer subscription service</b>, leveraging expertise in product sourcing and logistics.</li>
              <li>Successfully <b>validated the business model</b> but ceased operations following Heineken’s entry into the market with BeerWulf.</li>
            </ul>

            <h3>President and Head  of Craft Beer, De Vestingbar; The Netherlands - 2013-2018</h3>
            <ul>
              <li><b>Served as President</b>, managing a five-person board and ensuring smooth daily operations.</li>
              <li>Led a 40-member student <b>bar association with €300k,- annual revenue</b>, overseeing operations, purchasing, events, and security.</li>
              <li>Responsible for selecting of craft beer assortment and <b>meeting with suppliers</b> for purchasing agreements.</li>
            </ul>
          </div>
        </div>
        <div className={education}>
          <h2>Education</h2>
          <h3>Open Universiteit, The Netherlands — Business Administration 2016-2022</h3>
          <p>
            Completed the courses (80 credits): "Research Methods and Techniques", "Basic Academic Skills",
            "Management and Organisation", "Entrepreneurship", "Organizational science",
            "Financial accounting and administrative processes", "Supply chain management",
            "Behaviour in organizations", "Human resource management", "Management accounting",
            "Organizational advice and coaching", "Political Science for Management",
            and "Organizational strategy".
          </p>

          <h3>University of Twente, The Netherlands  — Electrical Engineering 2012-2016</h3>
          <p>Completed 120 credits towards a Bachelors Degree in Electrical Engineering with a minor in Entrepreneurship.</p>
        </div>
      </main>
      <p className={footer + " hidden print:block"}>
        This resume was printed from <a href="https://www.alexandervarwijk.com/resume" className={link}>https://www.alexandervarwijk.com/resume</a>
      </p>
    </>
  );
}
