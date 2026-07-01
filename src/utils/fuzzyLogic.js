// Fuzzy Logic Engine (Sugeno Method)
// Inputs: Power (Watt) and Excess Time (Hours)

function fuzzifyPower(watt) {
  let kecil = 0, sedang = 0, besar = 0;

  if (watt <= 100) {
    kecil = 1;
  } else if (watt > 100 && watt < 300) {
    kecil = (300 - watt) / 200;
    sedang = (watt - 100) / 200;
  } else if (watt === 300) {
    sedang = 1;
  } else if (watt > 300 && watt < 500) {
    sedang = (500 - watt) / 200;
    besar = (watt - 300) / 200;
  } else if (watt >= 500) {
    besar = 1;
  }

  return { kecil, sedang, besar };
}

function fuzzifyExcessTime(hoursUsed, idealHours) {
  const excess = hoursUsed - idealHours;
  let normal = 0, sedikit = 0, berlebih = 0;

  if (excess <= 0) {
    normal = 1;
  } else if (excess > 0 && excess < 2) {
    normal = (2 - excess) / 2;
    sedikit = excess / 2;
  } else if (excess === 2) {
    sedikit = 1;
  } else if (excess > 2 && excess < 4) {
    sedikit = (4 - excess) / 2;
    berlebih = (excess - 2) / 2;
  } else if (excess >= 4) {
    berlebih = 1;
  }

  return { normal, sedikit, berlebih };
}

export function calculateFuzzyWaste(watt, hoursUsed, idealHours) {
  const powerFuzzy = fuzzifyPower(watt);
  const timeFuzzy = fuzzifyExcessTime(hoursUsed, idealHours);

  // RULES (Sugeno Singleton Outputs)
  // Constants for outputs (0-100 Waste Index)
  const OUT_SANGAT_HEMAT = 0;
  const OUT_HEMAT = 15;
  const OUT_NORMAL = 30;
  const OUT_BOROS = 65;
  const OUT_SANGAT_BOROS = 85;
  const OUT_KRITIS = 100;

  const rules = [
    { w: Math.min(powerFuzzy.kecil, timeFuzzy.normal), out: OUT_SANGAT_HEMAT },
    { w: Math.min(powerFuzzy.kecil, timeFuzzy.sedikit), out: OUT_NORMAL },
    { w: Math.min(powerFuzzy.kecil, timeFuzzy.berlebih), out: OUT_BOROS },

    { w: Math.min(powerFuzzy.sedang, timeFuzzy.normal), out: OUT_HEMAT },
    { w: Math.min(powerFuzzy.sedang, timeFuzzy.sedikit), out: OUT_BOROS },
    { w: Math.min(powerFuzzy.sedang, timeFuzzy.berlebih), out: OUT_SANGAT_BOROS },

    { w: Math.min(powerFuzzy.besar, timeFuzzy.normal), out: OUT_NORMAL },
    { w: Math.min(powerFuzzy.besar, timeFuzzy.sedikit), out: OUT_SANGAT_BOROS },
    { w: Math.min(powerFuzzy.besar, timeFuzzy.berlebih), out: OUT_KRITIS }
  ];

  let totalWeight = 0;
  let weightedSum = 0;

  rules.forEach(rule => {
    totalWeight += rule.w;
    weightedSum += (rule.w * rule.out);
  });

  if (totalWeight === 0) return 0; // fallback

  const result = Math.round(weightedSum / totalWeight);

  let status = "HEMAT";
  let tip = "Penggunaan sudah sangat efisien, pertahankan kebiasaan ini!";
  
  if (result > 20 && result <= 45) {
    status = "NORMAL";
    tip = "Penggunaan dalam batas wajar. Sedikit penyesuaian durasi dapat lebih menghemat tagihan.";
  }
  else if (result > 45 && result <= 70) {
    status = "BOROS";
    tip = "Peringatan! Pertimbangkan mengurangi durasi atau mengganti dengan perangkat berteknologi inverter.";
  }
  else if (result > 70) {
    status = "SANGAT BOROS";
    tip = "Kritis! Segera matikan perangkat ini saat tidak krusial. Tagihan Anda membengkak karena ini.";
  }

  const processData = {
    tahap1: {
      watt,
      hoursUsed,
      idealHours,
      excess: hoursUsed - idealHours
    },
    tahap2: {
      powerFuzzy,
      timeFuzzy
    },
    tahap3: {
      rules: rules.map((r, i) => ({ id: i+1, w: r.w, out: r.out }))
    },
    tahap4: {
      totalWeight,
      weightedSum,
      result
    },
    tahap5: {
      status,
      tip
    }
  };

  return {
    score: result, // 0 - 100
    status: status,
    tip: tip,
    process: processData
  };
}
