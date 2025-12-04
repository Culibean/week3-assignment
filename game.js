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
  const list = document.createElement("ul");
  //forEach loop to create all elements
  shop.forEach((upgrade) => {
    const item = document.createElement("li");
    item.textContent = `${upgrade.name} - Cost: ${upgrade.cost}, CPS: ${upgrade.increase}`;
    list.appendChild(item);
  });
  upgradeContainer.appendChild(list);
}

async function renderUpgrade() {
  const upgradeData = await getUpgradeData();
  createUpgradeContainer(upgradeData);
}

renderUpgrade();
