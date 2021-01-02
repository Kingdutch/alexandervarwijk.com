import React, { useEffect, useReducer, useState } from 'react';
import StatisticsTable from "../components/statistics/StatisticsTable";
import ProseContainer from "../components/ProseContainer";

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

  return (
    <>
      <h1>Pageviews</h1>
      {loading ? (
        'Loading...'
      ) : (
        <button onClick={fetchPageviews}>Reload pageviews</button>
      )}
      <br />
      <StatisticsTable statistics={statistics} />
    </>
  );
}
