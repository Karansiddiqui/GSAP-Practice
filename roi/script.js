function tierSelect() {
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect.querySelector(".select-selected");
  const items = customSelect.querySelector(".select-items");

  // Toggle dropdown
  selected.addEventListener("click", function (e) {
    e.stopPropagation();
    customSelect.classList.toggle("open");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    customSelect.classList.remove("open");
  });

  // Prevent dropdown from closing when clicking inside items
  items.addEventListener("click", function (e) {
    e.stopPropagation();
    customSelect.classList.remove("open");
  });

  // Handle option selection
  items.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", function () {
      const value = this.getAttribute("value");
      const text = this.textContent;

      // Update selected text
      selected.querySelector("span").textContent = text;

      // Update selected state
      items.querySelectorAll("div").forEach((div) => {
        div.classList.remove("selected");
      });
      this.classList.add("selected");

      // Close dropdown
      customSelect.classList.remove("open");
    });
  });
}

tierSelect();

// ROI Calculator
(() => {
  function calculateROI(event) {
    event.preventDefault();
    const currentMonthlyRevenue = document.querySelector(
      'input[name="current-monthly-revenue"]'
    );
    const clawbackCosts = document.querySelector(
      'input[name="clawback-costs"]'
    );
    const uncollectedRevenue = document.querySelector(
      'input[name="uncollected-revenue"]'
    );
    const operatingCosts = document.querySelector(
      'input[name="operating-costs"]'
    );
    const mgmtrxTier = document.querySelector(".select-selected span");

    const formData = {
      monthlyRevenue: parseFloat(currentMonthlyRevenue.value) || 50000,
      clawbackCosts: parseFloat(clawbackCosts.value) || 10000,
      uncollectedRevenue: parseFloat(uncollectedRevenue.value) || 15000,
      operatingCosts: parseFloat(operatingCosts.value) || 30000,
      mgmtrxTier: mgmtrxTier.textContent,
    };

    console.log("Form Data:", formData);

    // Calculate metrics
    const newMetrics = calculateMetrics(formData);

    // Update comparison chart
    updateComparisonChart(newMetrics);

    currentMonthlyRevenue.value = "";
    clawbackCosts.value = "";
    uncollectedRevenue.value = "";
    operatingCosts.value = "";
    mgmtrxTier.textContent = "1";
  }

  function calculateMetrics(data) {
    // Calculate before MGMTRX metrics
    const beforeMetrics = {
      revenue: data.monthlyRevenue.toFixed(0),
      savings: 0,
      recovered: 0,
      profit: (
        data.monthlyRevenue -
        data.operatingCosts -
        data.clawbackCosts -
        data.uncollectedRevenue
      ).toFixed(0),
      roi: (
        ((data.monthlyRevenue -
          data.operatingCosts -
          data.clawbackCosts -
          data.uncollectedRevenue) /
          data.operatingCosts) *
        100
      ).toFixed(0),
      payback: 0,
    };

    // Calculate after MGMTRX metrics (your existing calculations)
    const afterMetrics = {
      revenue: (data.monthlyRevenue * 1.1).toFixed(0), // 10% increase instead of decrease
      savings: (data.clawbackCosts * 0.15).toFixed(0), // 15% of costs saved
      recovered: (data.uncollectedRevenue * 0.2).toFixed(0), // 20% of uncollected revenue recovered
      profit: (
        data.monthlyRevenue * 1.1 - // Increased revenue
        data.operatingCosts * 0.9 - // 10% reduction in operating costs
        data.clawbackCosts * 0.85 - // 15% reduction in clawback costs
        data.uncollectedRevenue * 0.8
      ) // 20% reduction in uncollected revenue
        .toFixed(0),
      roi: (
        ((data.monthlyRevenue * 1.1 - data.operatingCosts * 0.9) /
          (data.operatingCosts * 0.9)) *
        100
      ).toFixed(0),
      payback: (3).toFixed(0), // Fixed 3-month payback period
    };

    return { beforeMetrics, afterMetrics };
  }

  function updateComparisonChart(metrics) {
    const maxValues = {
      revenue: 1000000, // $1M max revenue
      savings: 100000, // $100K max savings
      recovered: 100000, // $100K max recovered
      profit: 500000, // $500K max profit
      roi: 300, // 300% max ROI
      payback: 12, // 12 months max payback
    };

    // Helper function to calculate safe percentage
    function calculateSafePercentage(value, maxValue) {
      // Convert to number to ensure proper calculation
      const numValue = parseFloat(value);
      // Calculate percentage and cap at 100
      const percentage = Math.min((numValue / maxValue) * 100, 100);
      // Round to whole number
      return Math.round(percentage);
    }

    // Update before MGMTRX metrics
    Object.entries(metrics.beforeMetrics).forEach(([metric, value]) => {
      const progressBar = document.querySelector(
        `.comparison-column-1 .metric-group:nth-child(${getMetricIndex(
          metric
        )}) .progress`
      );
      const valueElement = document.querySelector(
        `.comparison-column-1 .metric-group:nth-child(${getMetricIndex(
          metric
        )}) .value`
      );

      if (progressBar && valueElement) {
        const percentage = calculateSafePercentage(value, maxValues[metric]);
        progressBar.style.width = `${percentage}%`;
        valueElement.textContent = formatValue(metric, value);
      }
    });

    // Update after MGMTRX metrics
    Object.entries(metrics.afterMetrics).forEach(([metric, value]) => {
      const progressBar = document.querySelector(
        `.comparison-column-2 .metric-group:nth-child(${getMetricIndex(
          metric
        )}) .progress`
      );
      const valueElement = document.querySelector(
        `.comparison-column-2 .metric-group:nth-child(${getMetricIndex(
          metric
        )}) .value`
      );

      if (progressBar && valueElement) {
        const percentage = calculateSafePercentage(value, maxValues[metric]);
        progressBar.style.width = `${percentage}%`;
        valueElement.textContent = formatValue(metric, value);
      }
    });
  }

  function getMetricIndex(metric) {
    const metrics = [
      "revenue",
      "savings",
      "recovered",
      "profit",
      "roi",
      "payback",
    ];
    return metrics.indexOf(metric) + 1;
  }

  function formatValue(metric, value) {
    switch (metric) {
      case "roi":
        return `${value}%`;
      case "payback":
        return value;
      default:
        return `$${value}`;
    }
  }

  // Add form submit event listener
  document.querySelector("form").addEventListener("submit", calculateROI);
})();

// card
(() => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let previousClicked = false;

    card.addEventListener("click", () => {
      cards.forEach((card) => {
        card.classList.remove("clicked");
      });
      card.classList.toggle("clicked");
    });
  });
})();
