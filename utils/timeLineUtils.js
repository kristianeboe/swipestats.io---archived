export function dataNormalizer(timeSeriesObject) {
  const dayList = timeSeriesNormalizer(timeSeriesObject);

  const normalizedData = dayList.reduce((acc, cur) => {
    acc[cur] = timeSeriesObject[cur] || 0;
    return acc;
  }, {});

  return normalizedData;
}

export function timeSeriesNormalizer(timeSeriesObject) {
  const keys = Object.keys(timeSeriesObject);
  const start = keys[0];
  const end = keys[keys.length - 1];
  console.log("start end", start, end);
  const daysArray = getDaysArray(new Date(start), new Date(end));

  const dayList = daysArray.map(v => v.toISOString().slice(0, 10));

  return dayList;
}

export function getDaysArray(start, end) {
  for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

export function getDaysInMonth(month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
}

export function aggregateByYear(timeSeriesObject) {
  const valuesByYear = Object.entries(timeSeriesObject).reduce(
    (acc, [date, value]) => {
      const year = date.substr(0, 4);
      acc[year] = (acc[year] || 0) + value;

      return acc;
    },
    {}
  );

  console.log("valuesByYear", valuesByYear);

  const years = Object.keys(valuesByYear).map(y => Number(y));
  let minYear = years[0];
  const maxYear = years[years.length - 1];
  const yearKeys = [];

  while (minYear <= maxYear) {
    yearKeys.push(String(minYear));
    minYear += 1;
  }

  const normalizedYearData = yearKeys.reduce((acc, cur) => {
    acc[cur] = valuesByYear[cur] || 0;
    return acc;
  }, {});

  return normalizedYearData;
}

export function getMonthsArray(startDate, endDate) {
  var start = startDate.split("-");
  var end = endDate.split("-");
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth].join("-"));
    }
  }
  return dates;
}
export function aggregateByMonth(timeSeriesObject) {
  const valuesByMonth = Object.entries(timeSeriesObject).reduce(
    (acc, [date, value]) => {
      const yearMonth = date.substr(0, 7);
      acc[yearMonth] = (acc[yearMonth] || 0) + value;

      return acc;
    },
    {}
  );

  const months = Object.keys(valuesByMonth);

  let minMonth = months[0];
  const maxMonth = months[months.length - 1];

  const monthKeys = getMonthsArray(minMonth, maxMonth);

  const normalizedMonthData = monthKeys.reduce((acc, cur) => {
    acc[cur] = valuesByMonth[cur] || 0;
    return acc;
  }, {});

  return normalizedMonthData;
}

export function aggregateTotal(timeSeriesObject) {
  return Object.entries(timeSeriesObject).reduce(
    (acc, [key, value]) => (acc += value),
    0
  );
}

// aggregateByWeek

// module.exports = {
//   dataNormalizer,
//   timeSeriesNormalizer,
//   getDaysArray,
//   aggregateByYear,
//   aggregateByMonth,
// };
