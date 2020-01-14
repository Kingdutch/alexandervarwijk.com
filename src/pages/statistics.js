import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';

// String sort helper.
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

// Sorting functions
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

// Convert X seconds to human readable A hour B minutes C seconds.
const secondsToHuman = (s) => {
  const hour = Math.floor(s / 3600);
  const minutes = Math.floor((s - hour * 3600) / 60);
  const seconds = s - hour * 3600 - minutes * 60;

  let ret = "";
  if (hour > 0) {
    ret += hour + (hour === 1 ? "\u00A0hour " : "\u00A0hours ");
  }
  if (minutes > 0) {
    ret += minutes + (minutes === 1 ? "\u00A0minute " : "\u00A0minutes ");
  }
  if (seconds > 0) {
    ret += seconds + (seconds === 1 ? "\u00A0second " : "\u00A0seconds");
  }

  return ret;
};

const Button = styled.button`
  all: unset;
  color: #0067fb;
  cursor: pointer;
`;

const initialStatisticsState = {
  loading: false,
  statistics: [],
};

function statisticsReducer(state, action) {
  switch(action.type) {
    case 'fetch':
      return {
        ...state,
        loading: true,
      };
    case 'complete':
      return {
        loading: false,
        statistics: action.statistics,
      };
    default:
      throw new Error("Invalid action " + action.type);
  }
}

const initialSortState = {
  by: sortById,
  reverse: false,
};

function sortReducer(state, action) {
  switch (action.type) {
    case "sort":
      // By default don't reverse, but toggle reverse when the same sort column
      // is clicked again.
      return {
        by: action.by,
        reverse: state.by === action.by ? !state.reverse : false,
      };
    default:
      throw new Error("Invalid action " + action.type);
  }
}

const Statistics = () => {
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [{loading, statistics}, dispatchStatistics] = useReducer(statisticsReducer, initialStatisticsState);
  const [sort, dispatchSort] = useReducer(sortReducer, initialSortState);
  const fetchPageviews = () => {
    if (!credentials.user.length || !credentials.pass.length) {
      return;
    }
    dispatchStatistics({type: 'fetch'});
    fetch('https://visit.alexandervarwijk.com/pageviews', {
      headers: new Headers({
        "Authorization": `Basic ${btoa(`${credentials.user}:${credentials.pass}`)}`,
      }),
    })
      .then(response => response.json())
      .then(statistics => dispatchStatistics({type: 'complete', statistics}))
  };
  useEffect(fetchPageviews,  [credentials, dispatchStatistics]);

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

  const statisticList = statistics.sort(sort.by)
    .map(statistic => (
      <tr>
        <td>{statistic.type}</td>
        <td>{statistic.path}</td>
        <td>{statistic.user_agent}</td>
        <td>{statistic.timezone}</td>
        <td>{(new Date(statistic.visited)).toLocaleString('nl')}</td>
        <td>{(new Date(statistic.submitted)).toLocaleString('nl')}</td>
        <td>{secondsToHuman(statistic.time_on_page)}</td>
        <td>{statistic.width}px</td>
        <td>{statistic.height}px</td>
        <td>{statistic.scroll / 100}%</td>
        <td>{statistic.source_source}</td>
        <td>{statistic.source_medium}</td>
        <td>{statistic.source_campaign}</td>
        <td>{statistic.source_referrer}</td>
      </tr>
    ));

  if (sort.reverse) {
    statisticList.reverse();
  }

  return (
    <Layout noContainer={true}>
      <h1>Pageviews</h1>
      {loading ? "Loading..." : <Button onClick={fetchPageviews}>Reload pageviews</Button>}
      <br/>
      <Button onClick={() => dispatchSort({type: 'sort', by: sortById})}>Reset sort</Button>
      <table>
        <thead>
        <tr>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByType})}>type</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByPath})}>path</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByUserAgent})}>user agent</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByTimezone})}>timezone</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByVisited})}>visited</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortBySubmitted})}>submitted</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByTimeOnPage})}>time on page</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByWidth})}>width</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByHeight})}>height</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByScroll})}>scroll</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortBySource})}>source</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByMedium})}>medium</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByCampaign})}>campaign</Button></td>
          <td><Button onClick={() => dispatchSort({type: 'sort', by: sortByReferrer})}>referrer</Button></td>
        </tr>
        </thead>
        <tbody>
          {statisticList}
        </tbody>
      </table>
    </Layout>
  );
};

export default Statistics;
