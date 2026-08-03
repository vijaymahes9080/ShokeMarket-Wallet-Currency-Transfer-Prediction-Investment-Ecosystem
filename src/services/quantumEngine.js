export function runMonteCarloSimulation({ initialNetWorth = 34200, volatility = 0.15, inflationRate = 0.03, interestRate = 0.05, iterations = 1000, years = 5 }) {
  const timeSteps = 12 * years;
  const dt = 1 / 12;
  const paths = [];

  for (let i = 0; i < iterations; i++) {
    const path = [initialNetWorth];
    let currentVal = initialNetWorth;

    for (let t = 1; t <= timeSteps; t++) {
      // Geometric Brownian Motion with drift
      const shock = (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.732; // Normal approx
      const drift = (interestRate - inflationRate - 0.5 * Math.pow(volatility, 2)) * dt;
      const diffusion = volatility * Math.sqrt(dt) * shock;
      
      currentVal = currentVal * Math.exp(drift + diffusion);
      path.push(Math.max(100, currentVal));
    }

    paths.push(path);
  }

  // Calculate percentiles across time steps
  const percentile95 = [];
  const medianPath = [];
  const percentile5 = [];

  for (let t = 0; t <= timeSteps; t += 3) {
    const valsAtT = paths.map(p => p[t]).sort((a, b) => a - b);
    percentile5.push(Math.round(valsAtT[Math.floor(iterations * 0.05)]));
    medianPath.push(Math.round(valsAtT[Math.floor(iterations * 0.50)]));
    percentile95.push(Math.round(valsAtT[Math.floor(iterations * 0.95)]));
  }

  const chartData = percentile5.map((val5, idx) => {
    const monthNum = idx * 3;
    const yearLabel = `Yr ${(monthNum / 12).toFixed(1)}`;
    return {
      time: yearLabel,
      p5: val5,
      median: medianPath[idx],
      p95: percentile95[idx]
    };
  });

  const finalMedian = medianPath[medianPath.length - 1];
  const survivalRate = ((paths.filter(p => p[timeSteps] >= initialNetWorth).length / iterations) * 100).toFixed(1);

  return {
    chartData,
    finalMedian,
    survivalRate
  };
}
