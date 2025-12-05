console.log("Hello Cookie");

let totalCookieCount = 0;
let cps = 0;

const backgroundAudio = document.getElementById("xmas");
backgroundAudio.volume = 0.05;

//TODO: Add click sound every time the users clicks on the cookie

const clickSound = new Audio("sounds/computer-mouse-click-351398.mp3");

//TODO: Add purchase sound every time the user buys something
const buySound = new Audio("sounds/purchase-success-384963.mp3");
buySound.volume = 0.09;

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

// TODO: create a way that pulls from local storage when page reloads - in startup function
function startup() {
  const savedCookieCount = localStorage.getItem("totalCookieCount");
  const savedCps = localStorage.getItem("cps");

  if (savedCookieCount != null) {
    totalCookieCount = JSON.parse(savedCookieCount);
  }
  if (savedCps != null) {
    cps = JSON.parse(savedCps);
  }

  document.getElementById(
    "cookie-count"
  ).textContent = `Total cookie count: ${totalCookieCount}`;
  document.getElementById(
    "cps-count"
  ).textContent = `Cookies per second (cps): ${cps}`;
}

startup();

function createUpgradeContainer(upgrades) {
  //forEach loop to create all elements
  upgrades.forEach((upgrade) => {
    const shopElement = document.createElement("div");
    shopElement.className = "upgradeShop";
    const text = document.createElement("p");
    text.textContent = `${upgrade.name} - Cost: ${upgrade.cost}, CPS: ${upgrade.increase}`;
    //function for buying upgrades button
    const button = document.createElement("button"); //including function to deduct cookies when upgrade is bought
    button.textContent = "Buy Now";
    button.className = "buyButton";
    button.addEventListener("click", function () {
      if (totalCookieCount >= upgrade.cost) {
        totalCookieCount -= upgrade.cost;
        cps += upgrade.increase;
        console.log(`Bought ${upgrade.name}!`);
        document.getElementById(
          "cps-count"
        ).textContent = `Cookies per second (cps): ${cps}`;
        document.getElementById(
          "cookie-count"
        ).textContent = `Total cookie count: ${totalCookieCount}`;
        buySound.currentTime = 0;
        buySound.play();
      } else {
        alert("You need to bake more cookies!");
      }

      const stringifiedtotalCookieCount = JSON.stringify(totalCookieCount);
      localStorage.setItem("totalCookieCount", stringifiedtotalCookieCount);
      localStorage.getItem(totalCookieCount);
      JSON.parse(stringifiedtotalCookieCount);

      const stringifiedcps = JSON.stringify(cps);
      localStorage.setItem("cps", stringifiedcps);
      localStorage.getItem(cps);
      JSON.parse(stringifiedcps);
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
  clickSound.currentTime = 0;
  clickSound.play();
});

setInterval(function () {
  totalCookieCount += cps;
  document.getElementById(
    "cookie-count"
  ).textContent = `Total cookie count: ${totalCookieCount}`;
  document.getElementById(
    "cps-count"
  ).textContent = `Cookies per second (cps): ${cps}`;
  const stringifiedtotalCookieCount = JSON.stringify(totalCookieCount);
  localStorage.setItem("totalCookieCount", stringifiedtotalCookieCount);
  localStorage.getItem(totalCookieCount);
  JSON.parse(stringifiedtotalCookieCount);

  const stringifiedcps = JSON.stringify(cps);
  localStorage.setItem("cps", stringifiedcps);
  localStorage.getItem(cps);
  JSON.parse(stringifiedcps);
}, 1000);

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", function () {
  localStorage.clear();
  totalCookieCount = 0;
  cps = 0;
  document.getElementById(
    "cookie-count"
  ).textContent = `Total cookie count: ${totalCookieCount}`;
  document.getElementById(
    "cps-count"
  ).textContent = `Cookies per second (cps): ${cps}`;
});
