import React, { useReducer } from 'react';

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
  const types = { 'js-tracking': 1, 'image-fallback': 2 };
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

  let ret = '';
  if (hour > 0) {
    ret += hour + (hour === 1 ? '\u00A0hour ' : '\u00A0hours ');
  }
  if (minutes > 0) {
    ret += minutes + (minutes === 1 ? '\u00A0minute ' : '\u00A0minutes ');
  }
  if (seconds > 0) {
    ret += seconds + (seconds === 1 ? '\u00A0second ' : '\u00A0seconds');
  }

  return ret;
};

const initialSortState = {
  by: sortById,
  reverse: true,
};

function sortReducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialSortState;
    case 'sort':
      // By default don't reverse, but toggle reverse when the same sort column
      // is clicked again.
      return {
        by: action.by,
        reverse: state.by === action.by ? !state.reverse : false,
      };
    default:
      throw new Error('Invalid action ' + action.type);
  }
}

const initialFields = [
  { id: 'id', title: 'id', sort: sortById, visible: false },
  { id: 'type', title: 'type', sort: sortByType, visible: false },
  { id: 'path', title: 'path', sort: sortByPath, visible: true },
  {
    id: 'user_agent',
    title: 'user agent',
    sort: sortByUserAgent,
    visible: false,
  },
  { id: 'timezone', title: 'timezone', sort: sortByTimezone, visible: true },
  {
    id: 'visited',
    title: 'visited',
    sort: sortByVisited,
    visible: true,
    process: (value) => new Date(value).toLocaleString('nl'),
  },
  {
    id: 'submitted',
    title: 'submitted',
    sort: sortBySubmitted,
    visible: true,
    process: (value) => new Date(value).toLocaleString('nl'),
  },
  {
    id: 'time_on_page',
    title: 'time on page',
    sort: sortByTimeOnPage,
    visible: true,
    process: secondsToHuman,
  },
  { id: 'width', title: 'width', sort: sortByWidth, visible: true },
  { id: 'height', title: 'height', sort: sortByHeight, visible: true },
  {
    id: 'scroll',
    title: 'scroll',
    sort: sortByScroll,
    visible: true,
    process: (value) => `${value / 100}%`,
  },
  { id: 'source_source', title: 'source', sort: sortBySource, visible: false },
  { id: 'source_medium', title: 'medium', sort: sortByMedium, visible: false },
  {
    id: 'source_campaign',
    title: 'campaign',
    sort: sortByCampaign,
    visible: false,
  },
  {
    id: 'source_referrer',
    title: 'referrer',
    sort: sortByReferrer,
    visible: false,
  },
];

function fieldsReducer(state, action) {
  switch (action.type) {
    case 'visibilityChange':
      // Toggle
      return state.map((field) =>
        field.id === action.field
          ? { ...field, visible: action.visible }
          : field
      );
    default:
      throw new Error('Invalid action ' + action.type);
  }
}

export default function StatisticsTable({ statistics }) {
  const [sort, dispatchSort] = useReducer(sortReducer, initialSortState);
  const [fields, dispatchVisibility] = useReducer(fieldsReducer, initialFields);

  const visibilityControl = (
    <div className="px-2">
      {fields.map((field) => (
        <label key={field.id} style={{ marginRight: '.5rem' }}>
          <input
            onChange={(e) =>
              dispatchVisibility({
                type: 'visibilityChange',
                field: field.id,
                visible: e.target.checked,
              })
            }
            type="checkbox"
            value={true}
            checked={field.visible}
          />
          {field.title}
        </label>
      ))}
    </div>
  );

  const heading = fields.map((field) =>
    field.visible ? (
      <td
        key={field.id}
        className="sticky top-0 px-2 py-3 bg-white dark:bg-black"
      >
        <button onClick={() => dispatchSort({ type: 'sort', by: field.sort })}>
          {field.title}
        </button>
      </td>
    ) : null
  );

  const statisticList = statistics.sort(sort.by).map((statistic) => (
    <tr key={statistic.id}>
      {fields.map((field) =>
        field.visible ? (
          <td key={field.id} className="px-2">
            {field.process
              ? field.process(statistic[field.id])
              : statistic[field.id]}
          </td>
        ) : null
      )}
    </tr>
  ));

  if (sort.reverse) {
    statisticList.reverse();
  }

  return (
    <>
      <button onClick={() => dispatchSort({ type: 'reset' })} className="px-2">
        Reset sort
      </button>
      {visibilityControl}
      <table>
        <thead>
          <tr>{heading}</tr>
        </thead>
        <tbody>{statisticList}</tbody>
      </table>
    </>
  );
}
