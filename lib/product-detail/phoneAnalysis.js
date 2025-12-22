export function analyzePhone(phone) {
  const price = phone?.price || 2000;
  const specs = phone?.specs || {};

  const analysis = {
    camera: analyzeCamera(specs, price),
    battery: analyzeBattery(specs, price),
    performance: analyzePerformance(specs, price),
    display: analyzeDisplay(specs, price),
  };

  const scores = Object.values(analysis).map((a) => a.score);
  const avgScore = (
    scores.reduce((a, b) => a + b, 0) / (scores.length || 1)
  ).toFixed(1);

  return { analysis, avgScore };
}

function analyzeCamera(specs, price) {
  const camera = String(specs.camera || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (camera.includes("200MP")) {
    score = 9.5;
    good.push("High-resolution main camera");
    details.push(
      "A high-resolution main sensor can capture more detail in good light."
    );
  } else if (camera.includes("108MP") || camera.includes("50MP")) {
    score = 8.8;
    good.push("Strong main camera for everyday shots");
  } else if (camera.includes("64MP") || camera.includes("48MP")) {
    score = 8;
    good.push("Solid camera for the price");
  } else {
    score = 6.5;
    bad.push("Basic camera setup");
  }

  if (camera.toUpperCase().includes("OIS")) {
    score = Math.min(score + 0.4, 10);
    good.push("OIS helps with low-light and video stability");
  } else if (price > 1200) {
    bad.push("No OIS listed");
  }

  if (camera.toLowerCase().includes("ultrawide") || camera.includes("+")) {
    good.push("Extra lens options (ultrawide/secondary)");
  }

  return {
    score,
    label: "Camera",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent camera"
        : score >= 8
          ? "Good everyday camera"
          : "Basic camera",
  };
}

function analyzeBattery(specs, _price) {
  const battery = String(specs.battery || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (
    battery.includes("6000") ||
    battery.includes("6500") ||
    battery.includes("7000")
  ) {
    score = 9.5;
    good.push("Large battery capacity");
  } else if (battery.includes("5000") || battery.includes("5500")) {
    score = 8.8;
    good.push("All-day battery for most users");
  } else if (battery.includes("4500")) {
    score = 8;
    good.push("Decent daily battery");
  } else if (battery.includes("4000")) {
    score = 7;
  } else {
    score = 6.5;
    bad.push("Smaller battery capacity");
  }

  if (battery.includes("120W") || battery.includes("150W")) {
    score = Math.min(score + 0.4, 10);
    good.push("Very fast charging");
    details.push("Fast charging can greatly reduce time plugged in.");
  } else if (battery.includes("65W") || battery.includes("67W")) {
    score = Math.min(score + 0.2, 10);
    good.push("Fast charging");
  }

  return {
    score,
    label: "Battery",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent battery"
        : score >= 8
          ? "All-day battery"
          : "Average battery",
  };
}

function analyzePerformance(specs, price) {
  const processor = String(specs.processor || "").toLowerCase();
  const ram = String(specs.ram || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (
    processor.includes("a18") ||
    processor.includes("a17") ||
    processor.includes("8 gen 3") ||
    processor.includes("8 gen 2")
  ) {
    score = 9.5;
    good.push("High-end performance");
  } else if (processor.includes("tensor") || processor.includes("dimensity 9")) {
    score = 9;
    good.push("Strong performance");
  } else if (
    processor.includes("snapdragon 7") ||
    processor.includes("dimensity 7")
  ) {
    score = 8;
    good.push("Good daily performance");
  } else if (
    processor.includes("snapdragon 6") ||
    processor.includes("dimensity 6") ||
    processor.includes("helio")
  ) {
    score = 6.8;
    bad.push("Best for basic use");
  } else {
    score = 6.5;
  }

  if (ram.includes("12") || ram.includes("16")) {
    good.push("Plenty of RAM for multitasking");
  } else if ((ram.includes("4") || ram.includes("6")) && price > 1200) {
    bad.push("Limited RAM for heavy multitasking");
  }

  return {
    score,
    label: "Performance",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent performance"
        : score >= 8
          ? "Smooth daily use"
          : "Basic performance",
  };
}

function analyzeDisplay(specs, price) {
  const display = String(specs.display || "").toLowerCase();
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (display.includes("amoled") || display.includes("oled")) {
    score += 1.2;
    good.push("OLED/AMOLED display");
  } else if (display.includes("lcd") || display.includes("ips")) {
    if (price > 1500) bad.push("LCD at this price");
  }

  if (
    display.includes("120hz") ||
    display.includes("144hz") ||
    display.includes("165hz")
  ) {
    score += 1.2;
    good.push("High refresh rate");
    details.push("High refresh rate makes scrolling feel smoother.");
  } else if (display.includes("90hz")) {
    score += 0.4;
    good.push("90Hz refresh rate");
  } else {
    if (price > 1200) bad.push("Standard 60Hz");
  }

  const finalScore = Math.min(score, 10);

  return {
    score: finalScore,
    label: "Display",
    details,
    good,
    bad,
    summary:
      finalScore >= 9
        ? "Excellent display"
        : finalScore >= 8
          ? "Good display"
          : "Basic display",
  };
}
