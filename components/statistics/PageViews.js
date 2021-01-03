import { useState, useEffect, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar'

function groupByDay(acc, { visited }) {
  const date = new Date(visited);
  const day = date.setHours(12, 0, 0, 0);

  return {
    ...acc,
    [day]: { time: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`, pageviews: (acc[day]?.pageviews ?? 0) + 1 },
  };
}

const lightTheme = {
  // "background": "transparent",
  textColor: "#111111",
};

const darkTheme = {
  textColor: "rgb(209, 213, 219)",
  tooltip: {
    container: {
      background: 'rgb(17, 24, 39)',
      // border: "1px solid #eee",
    },
  },
}

function useDetectDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    function onChange(event) {
      setDarkMode(event.matches);
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', onChange);
    setDarkMode(query.matches);
    return () => query.removeEventListener('change', onChange);
  }, [setDarkMode]);

  return darkMode;
}

export default function PageViews({ statistics }) {
  const wantsDarkMode = useDetectDarkMode();
  const timeSpan = statistics[statistics.length - 1].visited - statistics[0].visited;

  const perDay = Object.values(statistics.reduce(groupByDay, {}));


  const dayInMs = 1000 * 60 * 60 * 24;

  let dateOpts;
  // For timespans under a month we show every day.
  if (timeSpan < (30 * dayInMs)) {
    dateOpts = { year: 'numeric', month: 'numeric', day: 'numeric' };
  }
  // Above that we show only months.
  else {
    dateOpts = { year: 'numeric', month: 'long' };
  }
  console.log(Object.values(perDay));
  return (
    <div className="h-96 w-full">
      <ResponsiveBar
        data={Object.values(perDay)}
        keys={[ 'pageviews' ]}
        indexBy="time"
        margin={{ top: 20, right: 20, bottom: 100, left: 60 }}
        padding={0}
        xScale={{ type: 'time', format: '%d-%m-%Y', precision: 'day' }}
        colors={{ scheme: 'category10' }}
        theme={wantsDarkMode ? darkTheme : lightTheme}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 70
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Pageviews',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        enableLabel={false}
        animate={true}
      />
    </div>
  )
}