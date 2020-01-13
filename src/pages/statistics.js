import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Header from "../components/header";

const sortByString = (column) => (a, b) => {
  // Ignore case.
  const valueA = a[column].toUpperCase();
  const valueB = b[column].toUpperCase();
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  // must be equal
  return 0;
};

const sortById = (a, b) => a.id - b.id;
const sortByType = (a, b) => {
  const types = {'js-tracking': 1, 'image-fallback': 2};
  return (types[a.type] || 50) - (types[b.type] || 50);
};
const sortByPath = sortByString('path');
const sortByUserAgent = sortByString('user_agent');
const sortByTimezone = (a, b) => a.timezone - b.timezone;
const sortByVisited = (a, b) => a.visited - b.visited;
const sortBySubmitted = (a, b) => a.submitted - b.submitted;
const sortByTimeOnPage = (a, b) => a.time_on_page - b.time_on_page;
const sortByWidth = (a, b) => a.width - b.width;
const sortByHeight = (a, b) => a.height - b.height;
const sortByScroll = (a, b) => a.scroll - b.scroll;
const sortBySource = sortByString('source_source');
const sortByMedium = sortByString('source_medium');
const sortByCampaign = sortByString('source_campaign');
const sortByReferrer = sortByString('source_referrer');

const Button = styled.button`
  all: unset;
  color: #0067fb;
  cursor: pointer;
`;

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [sortBy, setSortColumn] = useState({func: sortById});
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  useEffect(() => {
    if (!credentials.user.length || !credentials.pass.length) {
      return;
    }
    fetch('https://visit.alexandervarwijk.com/pageviews', {
      headers: new Headers({
        "Authorization": `Basic ${btoa(`${credentials.user}:${credentials.pass}`)}`,
      }),
    })
      .then(response => response.json())
      .then(setStatistics)
  }, [credentials, setStatistics]);

  if (!credentials.user.length || !credentials.pass.length) {
    const submit = e => {
      setCredentials({user: e.target.name.value, pass: e.target.pass.value})
      e.preventDefault();
    };
    return (
      <Layout>
        <form onSubmit={submit}>
          <label>
            Name<br />
            <input name="name" type="text" /><br />
          </label>
          <label>
            Password<br />
            <input name="pass" type="password" /><br />
          </label>
          <input type="submit" value="Show statistics" />
        </form>
      </Layout>
    )
  }

  console.log("Statistics", statistics);

  return (
    <>
      <Header isFront={false} siteTitle={"Statistics"} />
      <SEO title="Pageviews" />
      <h1>Pageviews</h1>
      <Button onClick={() => setSortColumn({func: sortById})}>Reset sort</Button>
      <table>
        <thead>
        <tr>
          <td><Button onClick={() => setSortColumn({func: sortByType})}>type</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByPath})}>path</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByUserAgent})}>user agent</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByTimezone})}>timezone</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByVisited})}>visited</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortBySubmitted})}>submitted</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByTimeOnPage})}>time on page</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByWidth})}>width</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByHeight})}>height</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByScroll})}>scroll</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortBySource})}>source</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByMedium})}>medium</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByCampaign})}>campaign</Button></td>
          <td><Button onClick={() => setSortColumn({func: sortByReferrer})}>referrer</Button></td>
        </tr>
        </thead>
        <tbody>
          {statistics.sort(sortBy.func)
            .map(statistic => (
            <tr>
              <td>{statistic.type}</td>
              <td>{statistic.path}</td>
              <td>{statistic.user_agent}</td>
              <td>{statistic.timezone}</td>
              <td>{(new Date(statistic.visited)).toLocaleString('nl')}</td>
              <td>{(new Date(statistic.submitted)).toLocaleString('nl')}</td>
              <td>{statistic.time_on_page} s</td>
              <td>{statistic.width}px</td>
              <td>{statistic.height}px</td>
              <td>{statistic.scroll / 100}%</td>
              <td>{statistic.source_source}</td>
              <td>{statistic.source_medium}</td>
              <td>{statistic.source_campaign}</td>
              <td>{statistic.source_referrer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
