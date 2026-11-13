/* =========================================================
   rewards.js — Rewards page only
   ---------------------------------------------------------
   Star calculator: estimates demo stars from weekly spend.
   (The reward tier tabs and FAQ are handled by main.js.)
   ========================================================= */

// Sample rules for the demo program
const STARS_PER_DOLLAR = 2;
const STARS_FOR_FREE_DRINK = 200; // the "handcrafted drink" tier

const spendRange = document.getElementById("spend-range");
const spendValue = document.getElementById("spend-value");
const calcResult = document.getElementById("calc-result");

/* Recalculate and show the result */
function updateCalculator() {
  const weeklySpend = Number(spendRange.value);
  const weeklyStars = weeklySpend * STARS_PER_DOLLAR;
  const monthlyStars = weeklyStars * 4;

  // How many weeks until 200 stars? Round up to whole weeks.
  const weeksToDrink = Math.ceil(STARS_FOR_FREE_DRINK / weeklyStars);

  spendValue.textContent = "$" + weeklySpend;
  calcResult.innerHTML =
    "You'd earn about <strong>" + monthlyStars + "</strong> demo stars a month &mdash; " +
    "enough for a free handcrafted drink every " +
    (weeksToDrink === 1 ? "week" : weeksToDrink + " weeks") + ".";
}

spendRange.addEventListener("input", updateCalculator);
updateCalculator(); // show a result straight away
