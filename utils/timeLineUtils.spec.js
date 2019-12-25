import {
  aggregateByYear,
  aggregateByMonth,
  aggregateTotal,
  getMonthsArray
} from "./timeLineUtils";
import tinderData from "./kyleTinderData.json";

const timeSeriesObject = {
  "2014-12-05": 5,
  "2014-12-18": 4,
  "2014-12-20": 1,
  "2014-12-21": 2,
  "2015-08-05": 5,
  "2015-11-05": 5,
  "2015-12-05": 5,
  "2015-12-18": 4,
  "2017-12-21": 2
};

const matches = tinderData.Usage.matches;

describe("Normalizations", () => {
  it("Should return an object of years", () => {
    const aggregatedByYear = aggregateByYear(timeSeriesObject);

    const years = Object.keys(aggregatedByYear);
    expect(years).toContain("2014");
    expect(years).toContain("2015");
    expect(years).toContain("2016");
    expect(years).toContain("2017");
  });

  it("Should return an object of months by year", () => {
    const aggreatedByMonth = aggregateByMonth(timeSeriesObject);
    const months = Object.keys(aggreatedByMonth);
    expect(months).toContain("2014-12");
    expect(months).toContain("2015-01");
    expect(months).toContain("2015-02");
    expect(months).toContain("2015-03");
    expect(months).toContain("2015-08");
    expect(months).toContain("2015-11");
    expect(months).toContain("2015-12");
    expect(months).toContain("2016-01");
    expect(months).toContain("2016-05");
    expect(months).toContain("2017-04");
    expect(months).toContain("2017-12");
  });
});

describe("test aggregateTotal", () => {
  it("Should sum correctly to 10", () => {
    const aggregation = {
      "2014-12-05": 5,
      "2014-12-18": 4,
      "2014-12-20": 1
    };

    const total = aggregateTotal(aggregation);
    expect(total).toBe(10);
  });

  it("Should give the correct month array", () => {
    const start = "2018-10-15";
    const end = "2019-11-01";
    const monthArray = getMonthsArray(start, end);
    console.log("monthArray", monthArray);
    expect(monthArray.length).toBe(14);
  });
});

describe("Aggregation totals", () => {
  it("All aggreageations should have the same total", () => {
    const aggregatedByDay = matches;
    const aggregatedByMonth = aggregateByMonth(aggregatedByDay);
    const aggregatedByYear = aggregateByYear(aggregatedByDay);

    const daySum = aggregateTotal(aggregatedByDay);
    const monthSum = aggregateTotal(aggregatedByMonth);
    const yearSum = aggregateTotal(aggregatedByYear);

    expect(daySum).toEqual(monthSum);
    expect(daySum).toEqual(yearSum);
    expect(monthSum).toEqual(yearSum);
  });
});
