console.log("Hello Cookie");

let totalCookieCount = 0;
let cps = 0;

async function getUpgradeData() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

const upgradeContainer = document.getElementById("shop-container");

function createUpgradeContainer(shop) {
  const upgrade = document.createElement("table");
  upgradeContainer.appendChild(upgrade);
}

async function renderUpgrade() {
  const upgradeData = await getUpgradeData();
  createUpgradeContainer(upgradeData);
}

renderUpgrade();
