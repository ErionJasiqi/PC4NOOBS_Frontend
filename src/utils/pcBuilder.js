export function generateCombinations(categories) {
  return categories.reduce((acc, category) => {
    const newCombos = [];
    acc.forEach(combo => {
      category.items.forEach(item => {
        newCombos.push({ ...combo, [category.id]: item });
      });
    });
    return newCombos;
  }, [{}]);
}

export function isCompatible(build) {
  return (
    build.cpu.socket === build.motherboard.socket &&
    build.ram.ramType === build.motherboard.ramType
  );
}

export function hasEnoughPower(build) {
  return build.psu.power >= build.gpu.powerDraw + 150;
}

export function getTotalPrice(build) {
  return Object.values(build).reduce((sum, item) => sum + item.price, 0);
}


export function scoreBuild(build, preferences) {
  let score = 0;

  score += Object.values(build).reduce((s, item) => s + item.performance, 0);

  if (preferences.activity === "gaming") {
    score += build.gpu.performance * 2;
  }

  if (preferences.activity === "work") {
    score += build.cpu.performance * 2;
  }

  if (preferences.activity === "graphic-design") {
    score += build.cpu.performance + build.ram.performance;
  }

  if (preferences.activity === "film-production") {
    score += build.cpu.performance * 2 + build.ram.performance;
  }

  return score;
}


export function findBestBuild(categories, preferences) {
  const combos = generateCombinations(categories);

  const valid = combos
    .filter(isCompatible)
    .filter(hasEnoughPower)
    .filter(c => getTotalPrice(c) <= preferences.budget);

  const scored = valid.map(c => ({
    build: c,
    score: scoreBuild(c, preferences),
    price: getTotalPrice(c)
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored[0];
}