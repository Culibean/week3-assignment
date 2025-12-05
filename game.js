console.log("Hello Cookie");

let totalCookieCount = 0;
let cps = 1;

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

//started styling and realised that list is no longer practical. changing to <div> and adding buttons in the same functions

function createUpgradeContainer(shop) {
  //forEach loop to create all elements
  shop.forEach((upgrade) => {
    const shopElement = document.createElement("div");
    shopElement.className = "upgradeShop";
    const text = document.createElement("p");
    text.textContent = `${upgrade.name} - Cost: ${upgrade.cost}, CPS: ${upgrade.increase}`;
    const button = document.createElement("button"); //including function to deduct cookies when upgrade is bought
    button.textContent = "Buy Now";
    button.addEventListener("click", function () {
      if (totalCookieCount >= upgrade.cost) {
        totalCookieCount -= upgrade.cost;
        cps += upgrade.cps;
        console.log(`Bought ${upgrade.name}!`);
      } else {
        alert("You need to bake more cookies!");
      }
    });
    shopElement.appendChild(text);
    shopElement.appendChild(button);
    upgradeContainer.appendChild(shopElement);
  });
}

async function renderUpgrade() {
  const upgradeData = await getUpgradeData();
  createUpgradeContainer(upgradeData);
}

renderUpgrade();

const cookieButton = document.getElementById("clicker-image");

cookieButton.addEventListener("click", function () {
  totalCookieCount++;
  document.getElementById(
    "cookie-count"
  ).textContent = `Total cookie count: ${totalCookieCount}`;
});

setInterval(function () {
  totalCookieCount += cps;
  document.getElementById(
    "cookie-count"
  ).textContent = `Total cookie count: ${totalCookieCount}`;
  document.getElementById(
    "cps-count"
  ).textContent = `Cookies per second (cps): ${cps}`;
}, 1000);
