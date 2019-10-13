import { aggregateByYear, aggreateByMonth } from '../normalization';

const timeSeriesObject = {
  '2014-12-05': 5,
  '2014-12-18': 4,
  '2014-12-20': 1,
  '2014-12-21': 2,
  '2015-08-05': 5,
  '2015-11-05': 5,
  '2015-12-05': 5,
  '2015-12-18': 4,
  '2017-12-21': 2,
};

describe('Normalizations', () => {
  it('Should return an object of years', () => {
    const aggregatedByYear = aggregateByYear(timeSeriesObject);

    const years = Object.keys(aggregatedByYear);
    expect(years).toContain('2014');
    expect(years).toContain('2015');
    expect(years).toContain('2016');
    expect(years).toContain('2017');
  });

  it('Should return an object of months by year', () => {
    const aggreatedByMonth = aggreateByMonth(timeSeriesObject);
    const months = Object.keys(aggreatedByMonth);
    expect(months).toContain('2014-12');
    expect(months).toContain('2015-01');
    expect(months).toContain('2015-02');
    expect(months).toContain('2015-03');
    expect(months).toContain('2015-08');
    expect(months).toContain('2015-11');
    expect(months).toContain('2015-12');
    expect(months).toContain('2016-01');
    expect(months).toContain('2016-05');
    expect(months).toContain('2017-04');
    expect(months).toContain('2017-12');
  });
});
