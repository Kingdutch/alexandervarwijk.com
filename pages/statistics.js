import React, { useEffect, useReducer, useState, useMemo } from 'react';
import StatisticsTable from "../components/statistics/StatisticsTable";
import ProseContainer from "../components/ProseContainer";
import PageViews from "../components/statistics/PageViews";

const initialStatisticsState = {
  loading: false,
  statistics: [],
};

function statisticsReducer(state, action) {
  switch (action.type) {
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
      throw new Error('Invalid action ' + action.type);
  }
}

function toPreviousMonth({ from, to }) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return {
    from: fromDate.setMonth(fromDate.getMonth() - 1, 1),
    to: toDate.setMonth(toDate.getMonth(), 0),
  }
}

function toNextMonth({ from, to }) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return {
    from: fromDate.setMonth(fromDate.getMonth() + 1, 1),
    to: toDate.setMonth(toDate.getMonth() + 2, 0),
  }
}

function StatisticsDisplay({statistics}) {
  return <>
    <h2 className="px-2 text-2xl font-bold mt-4 mb-2">Pageviews</h2>
    <PageViews statistics={statistics}/>

    <h2 className="px-2 text-2xl font-bold mt-4 mb-2">Raw data</h2>
    <StatisticsTable statistics={statistics} />
  </>;
}

export default function Statistics() {
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [{ loading, statistics }, dispatchStatistics] = useReducer(
    statisticsReducer,
    initialStatisticsState
  );

  const fetchPageviews = () => {
    if (!credentials.user.length || !credentials.pass.length) {
      return;
    }
    dispatchStatistics({ type: 'fetch' });
    fetch('https://visit.alexandervarwijk.com/pageviews', {
      headers: new Headers({
        Authorization: `Basic ${btoa(
          `${credentials.user}:${credentials.pass}`
        )}`,
      }),
    })
      .then(response => response.json())
      .then(statistics => dispatchStatistics({ type: 'complete', statistics }));
  };
  useEffect(fetchPageviews, [credentials, dispatchStatistics]);
  const [{ from, to }, setBetween] = useState(() => {
    let start = new Date();
    start.time
    start.setMonth(start.getMonth() - 1);
    start.setHours(24, 0, 0, 0);
    let end = new Date();

    return {
      from: start.getTime() - start.getTimezoneOffset() * 60 * 1000,
      to: end.getTime(),
    };
  });
  const shownStatistics = useMemo(() => statistics.filter(pageview => from < pageview.visited && pageview.visited <= to), [from, to, statistics])

  if (!credentials.user.length || !credentials.pass.length) {
    const submit = e => {
      setCredentials({ user: e.target.name.value, pass: e.target.pass.value });
      e.preventDefault();
    };
    return (
      <>
        <form onSubmit={submit}>
          <label>
            Name
            <br />
            <input name="name" type="text" />
            <br />
          </label>
          <label>
            Password
            <br />
            <input name="pass" type="password" />
            <br />
          </label>
          <input type="submit" value="Show statistics" />
        </form>
      </>
    );
  }

  if (loading) {
    return <div className="px-2">Loading...</div>;
  }

  return (
    <div className="px-2">
      <h1 className="px-2 text-3xl font-bold mt-4 mb-2">Statistics</h1>
      <button onClick={fetchPageviews} className="px-2">Reload pageviews</button>

      <p className="px-2 mt-2">
        <label>From: <input type="date" value={(new Date(from)).toISOString().split('T')[0]} onChange={e => setBetween(({ to }) => ({ from: e.target.valueAsNumber, to }))} /></label><br />
        <label>To: <input type="date" value={(new Date(to)).toISOString().split('T')[0]} onChange={e => setBetween(({ from }) => ({ from, to: e.target.valueAsNumber }))}/></label>
      </p>
      {
        statistics.length


        ? <p className="px-2 mt-2">
            <button className="mr-2"
                    onClick={() => setBetween({from: statistics[0].visited, to: Date.now()})}>All Time
            </button>
          </p>
        : null
      }
      <p className="px-2 mt-2">
        <button className="mr-2" onClick={() => setBetween(toPreviousMonth)}>&lt; Previous Month</button>
        <button className="ml-2" onClick={() => setBetween(toNextMonth)}>Next Month &gt;</button>
      </p>

      {
        shownStatistics.length
          ? <StatisticsDisplay statistics={shownStatistics} />
          : <div className="px-2">There are no page views in this period.</div>
      }
    </div>
  );
}
