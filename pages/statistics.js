import React, { useEffect, useReducer, useState } from 'react';
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
    fetch('http://visit.alexandervarwijk.localhost/pageviews', {
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

  if (!statistics.length) {
    return (
      <div className="px-2">
        <h1 className="px-2 text-3xl font-bold mt-4 mb-2">Statistics</h1>
        <button onClick={fetchPageviews} className="px-2">Reload pageviews</button>
        <br />
        <div className="px-2">Your site doesn't have any visitors yet.</div>
      </div>
    );
  }

  return (
    <div className="px-2">
      <h1 className="px-2 text-3xl font-bold mt-4 mb-2">Statistics</h1>
      <button onClick={fetchPageviews} className="px-2">Reload pageviews</button>

      <h2 className="px-2 text-2xl font-bold mt-4 mb-2">Pageviews</h2>
      <PageViews statistics={statistics}/>

      <h2 className="px-2 text-2xl font-bold mt-4 mb-2">All data</h2>
      <StatisticsTable statistics={statistics} />
    </div>
  );
}
