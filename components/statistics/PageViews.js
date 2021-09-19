import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

function pageviewsPerDay(statistics) {
  if (!statistics.length) {
    return [];
  }

  // Loop through the data to find the start and end date.
  // Things may be submitted out of order so we can't just take the first and
  // last item.
  // TODO: Possibly order by visited on the server?
  let min = Date.now();
  let max = 0;
  statistics.forEach(({ visited }) => {
    const time = new Date(visited).setHours(12, 0, 0, 0);
    if (time < min) {
      min = time;
    }
    if (time > max) {
      max = time;
    }
  });

  // Create start and end times at midday;
  let current = new Date(min);
  current.setHours(12, 0, 0, 0);
  const endTime = max;

  // Start all our buckets so even on days with 0 pageviews we have an entry.
  let pageviews = {};
  do {
    pageviews[current.getTime()] = {
      time: `${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`,
      pageviews: 0,
    };
    current.setDate(current.getDate() + 1);
  } while (current.getTime() <= endTime);

  // Count all the pageviews.
  statistics.forEach(({ visited }, idx) => {
    const time = new Date(visited).setHours(12, 0, 0, 0);
    pageviews[time].pageviews++;
  });

  return Object.values(pageviews);
}

const lightTheme = {
  // "background": "transparent",
  textColor: '#111111',
};

const darkTheme = {
  textColor: 'rgb(209, 213, 219)',
  tooltip: {
    container: {
      background: 'rgb(17, 24, 39)',
      // border: "1px solid #eee",
    },
  },
};

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
  const pageviews = pageviewsPerDay(statistics);

  return (
    <div className="h-96 w-full">
      <ResponsiveBar
        data={pageviews}
        keys={['pageviews']}
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
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Pageviews',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        animate={true}
      />
    </div>
  );
}
