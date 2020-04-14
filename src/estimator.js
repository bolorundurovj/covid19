const covid19ImpactEstimator = (data) => {
    const impact = {
      currectlyInfected: data.reportedCases * 10
    };
  
    const severeImpact = {
      currentlyInfected: data.reportedCases * 50
    };
  
    const checkDuration = (period, duration) => {
      let result = 2 ** Math.floor(duration / 3);
      if (period === 'weeks') {
        result = 2 ** Math.floor((duration * 7) / 3);
      } else if (period === 'months') {
        result = 3 ** Math.floor((duration * 30) / 3);
      }
      return result;
    };
  
    const duration = checkDuration(data.periodType, data.timeToElapse);
  
  
    impact.infectionsByRequestedTime = impact.currectlyInfected * duration;
  
    impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  
    // Challenge 2
    impact.hospitalBedsByRequestedTime = Math.floor(
      data.totalHospitalBeds * 0.35
    ) - impact.severeCasesByRequestedTime;
  
    impact.casesForICUByRequestedTime = Math.floor(
      impact.infectionsByRequestedTime * 0.05
    );
  
    impact.casesForVentilatorsByRequestedTime = Math.floor(
      impact.infectionsByRequestedTime * 0.02
    );
  
    severeImpact.infectionsByRequestedTime = severeImpact.currectlyInfected * duration;
  
    severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  
    severeImpact.hospitalBedsByRequestedTime = Math.floor(
      data.totalHospitalBeds * 0.35
    ) - severeImpact.severeCasesByRequestedTime;
  
    severeImpact.casesForICUByRequestedTime = Math.floor(
      severeImpact.infectionsByRequestedTime * 0.05
    );
  
    severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
      severeImpact.infectionsByRequestedTime * 0.02
    );
  
  
    impact.dollarsInFlight = Math.floor(impact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD
      * duration);
  
    severeImpact.dollarsInFlight = Math.floor(severeImpact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD
      * duration);
  
    // no-console
    console.log(impact, 'here');
  
    return {
      data,
      impact,
      severeImpact
    };
  };
  
  export default covid19ImpactEstimator;