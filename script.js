// === Variables ===
let dataStolen = 0;
let dps = 0;
let clicks = 0;
let biggestDps = 0;
let hackMultiplier = 1;
let buyAmount = 1;
let matrixSpeed = 35;
let clickBoostActive = false;
let unlockTimeout;
let unlockedAchievements = [];

const units = ["MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

let upgrades = {
  autoHacker: { name: 'Auto-Hacker', baseCost: 100, cost: 100, amount: 0, dps: 1, icon: 'computer', unlocked: true },
  botnet: { name: 'Botnet', baseCost: 500, cost: 500, amount: 0, dps: 5, icon: 'globe', unlocked: false },
  serverFarm: { name: 'Server Farm', baseCost: 2000, cost: 2000, amount: 0, dps: 20, icon: 'building', unlocked: false },
  quantumComputer: { name: 'Quantum Computer', baseCost: 10000, cost: 10000, amount: 0, dps: 100, icon: 'dna', unlocked: false },
  
  // New upgrades you wanted added:
  aiOverlord: { name: 'AI Overlord', baseCost: 50000, cost: 50000, amount: 0, dps: 500, icon: 'computer', unlocked: false },
  darkWebServer: { name: 'Dark Web Server', baseCost: 250000, cost: 250000, amount: 0, dps: 2500, icon: 'globe', unlocked: false },
  malwareFactory: { name: 'Malware Factory', baseCost: 1000000, cost: 1000000, amount: 0, dps: 10000, icon: 'building', unlocked: false },
  blackHoleComputer: { name: 'Black Hole Computer', baseCost: 5000000, cost: 5000000, amount: 0, dps: 50000, icon: 'dna', unlocked: false },
};




let enhancements = {
  autoHackerBoost1: { name: "Auto-Hacker Boost I", cost: 1000, unlocked: false, applied: false, upgradeKey: 'autoHacker', multiplier: 2, requiredAmount: 10, icon: 'computer' },
  autoHackerBoost2: { name: "Auto-Hacker Boost II", cost: 5000, unlocked: false, applied: false, upgradeKey: 'autoHacker', multiplier: 2, requiredAmount: 25, icon: 'computer' },
  autoHackerBoost3: { name: "Auto-Hacker Boost III", cost: 20000, unlocked: false, applied: false, upgradeKey: 'autoHacker', multiplier: 2, requiredAmount: 50, icon: 'computer' },
  autoHackerBoost4: { name: "Auto-Hacker Boost IV", cost: 100000, unlocked: false, applied: false, upgradeKey: 'autoHacker', multiplier: 2, requiredAmount: 100, icon: 'computer' },

  botnetOverclock1: { name: "Botnet Overclock I", cost: 2000, unlocked: false, applied: false, upgradeKey: 'botnet', multiplier: 2, requiredAmount: 10, icon: 'globe' },
  botnetOverclock2: { name: "Botnet Overclock II", cost: 10000, unlocked: false, applied: false, upgradeKey: 'botnet', multiplier: 2, requiredAmount: 25, icon: 'globe' },
  botnetOverclock3: { name: "Botnet Overclock III", cost: 40000, unlocked: false, applied: false, upgradeKey: 'botnet', multiplier: 2, requiredAmount: 50, icon: 'globe' },
  botnetOverclock4: { name: "Botnet Overclock IV", cost: 200000, unlocked: false, applied: false, upgradeKey: 'botnet', multiplier: 2, requiredAmount: 100, icon: 'globe' },

  serverOptimization1: { name: "Server Optimization I", cost: 5000, unlocked: false, applied: false, upgradeKey: 'serverFarm', multiplier: 2, requiredAmount: 10, icon: 'building' },
  serverOptimization2: { name: "Server Optimization II", cost: 25000, unlocked: false, applied: false, upgradeKey: 'serverFarm', multiplier: 2, requiredAmount: 25, icon: 'building' },
  serverOptimization3: { name: "Server Optimization III", cost: 100000, unlocked: false, applied: false, upgradeKey: 'serverFarm', multiplier: 2, requiredAmount: 50, icon: 'building' },
  serverOptimization4: { name: "Server Optimization IV", cost: 500000, unlocked: false, applied: false, upgradeKey: 'serverFarm', multiplier: 2, requiredAmount: 100, icon: 'building' },

  quantumUpgrade1: { name: "Quantum Upgrade I", cost: 20000, unlocked: false, applied: false, upgradeKey: 'quantumComputer', multiplier: 2, requiredAmount: 10, icon: 'dna' },
  quantumUpgrade2: { name: "Quantum Upgrade II", cost: 100000, unlocked: false, applied: false, upgradeKey: 'quantumComputer', multiplier: 2, requiredAmount: 25, icon: 'dna' },
  quantumUpgrade3: { name: "Quantum Upgrade III", cost: 400000, unlocked: false, applied: false, upgradeKey: 'quantumComputer', multiplier: 2, requiredAmount: 50, icon: 'dna' },
  quantumUpgrade4: { name: "Quantum Upgrade IV", cost: 2000000, unlocked: false, applied: false, upgradeKey: 'quantumComputer', multiplier: 2, requiredAmount: 100, icon: 'dna' },

  aiOverlordUpgrade1: { name: "AI Overlord Upgrade I", cost: 100000, unlocked: false, applied: false, upgradeKey: 'aiOverlord', multiplier: 2, requiredAmount: 10, icon: 'chip' },
  aiOverlordUpgrade2: { name: "AI Overlord Upgrade II", cost: 500000, unlocked: false, applied: false, upgradeKey: 'aiOverlord', multiplier: 2, requiredAmount: 25, icon: 'chip' },
  aiOverlordUpgrade3: { name: "AI Overlord Upgrade III", cost: 2000000, unlocked: false, applied: false, upgradeKey: 'aiOverlord', multiplier: 2, requiredAmount: 50, icon: 'chip' },
  aiOverlordUpgrade4: { name: "AI Overlord Upgrade IV", cost: 10000000, unlocked: false, applied: false, upgradeKey: 'aiOverlord', multiplier: 2, requiredAmount: 100, icon: 'chip' },

  darkWebServerUpgrade1: { name: "Dark Web Server Upgrade I", cost: 500000, unlocked: false, applied: false, upgradeKey: 'darkWebServer', multiplier: 2, requiredAmount: 10, icon: 'cloud' },
  darkWebServerUpgrade2: { name: "Dark Web Server Upgrade II", cost: 2500000, unlocked: false, applied: false, upgradeKey: 'darkWebServer', multiplier: 2, requiredAmount: 25, icon: 'cloud' },
  darkWebServerUpgrade3: { name: "Dark Web Server Upgrade III", cost: 10000000, unlocked: false, applied: false, upgradeKey: 'darkWebServer', multiplier: 2, requiredAmount: 50, icon: 'cloud' },
  darkWebServerUpgrade4: { name: "Dark Web Server Upgrade IV", cost: 50000000, unlocked: false, applied: false, upgradeKey: 'darkWebServer', multiplier: 2, requiredAmount: 100, icon: 'cloud' },

  malwareFactoryUpgrade1: { name: "Malware Factory Upgrade I", cost: 1000000, unlocked: false, applied: false, upgradeKey: 'malwareFactory', multiplier: 2, requiredAmount: 10, icon: 'bug' },
  malwareFactoryUpgrade2: { name: "Malware Factory Upgrade II", cost: 5000000, unlocked: false, applied: false, upgradeKey: 'malwareFactory', multiplier: 2, requiredAmount: 25, icon: 'bug' },
  malwareFactoryUpgrade3: { name: "Malware Factory Upgrade III", cost: 20000000, unlocked: false, applied: false, upgradeKey: 'malwareFactory', multiplier: 2, requiredAmount: 50, icon: 'bug' },
  malwareFactoryUpgrade4: { name: "Malware Factory Upgrade IV", cost: 100000000, unlocked: false, applied: false, upgradeKey: 'malwareFactory', multiplier: 2, requiredAmount: 100, icon: 'bug' },

  blackHoleComputerUpgrade1: { name: "Black Hole Computer Upgrade I", cost: 5000000, unlocked: false, applied: false, upgradeKey: 'blackHoleComputer', multiplier: 2, requiredAmount: 10, icon: 'blackhole' },
  blackHoleComputerUpgrade2: { name: "Black Hole Computer Upgrade II", cost: 25000000, unlocked: false, applied: false, upgradeKey: 'blackHoleComputer', multiplier: 2, requiredAmount: 25, icon: 'blackhole' },
  blackHoleComputerUpgrade3: { name: "Black Hole Computer Upgrade III", cost: 100000000, unlocked: false, applied: false, upgradeKey: 'blackHoleComputer', multiplier: 2, requiredAmount: 50, icon: 'blackhole' },
  blackHoleComputerUpgrade4: { name: "Black Hole Computer Upgrade IV", cost: 500000000, unlocked: false, applied: false, upgradeKey: 'blackHoleComputer', multiplier: 2, requiredAmount: 100, icon: 'blackhole' },
};


const counter = document.getElementById('counter');
const dpsDiv = document.getElementById('dps');
const clicker = document.getElementById('clicker');
const upgradesDiv = document.getElementById('upgrades');
const enhancementsDiv = document.getElementById('enhancements');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupBody = document.getElementById('popup-body');
const unlockPopup = document.getElementById('unlock-popup');
const achievementContainer = document.getElementById('achievement-container');

// === Clicking
clicker.addEventListener('click', () => {
  clicks++;
  dataStolen += 1;
  spawnClickEffect();
  checkAchievements();
  update();
  saveGame();
});

// New function to make the +1 float
function spawnClickEffect() {
  const container = document.getElementById('click-effect-container');
  const effect = document.createElement('div');
  effect.classList.add('click-effect');
  effect.textContent = '+1';

  const randomOffset = (Math.random() * 40) - 20; // Random between -20 and 20
  effect.style.position = 'absolute';
  effect.style.left = `calc(50% + ${randomOffset}px)`;
  effect.style.bottom = `-35px`; /* ✨ move it *above* instead of under */
  effect.style.transform = 'translateX(-50%)';
  effect.style.color = '#0f0';
  effect.style.fontSize = '24px';
  effect.style.fontFamily = 'monospace';
  effect.style.pointerEvents = 'none';
  effect.style.animation = 'floatUp 1s forwards';

  container.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 1000);
}




// === Buy Amount
function setBuyAmount(amount, button) {
  buyAmount = amount;
  document.querySelectorAll('#buy-amount-buttons button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// === Matrix Background
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const letters = "01";
const fontSize = 14;
let columns, drops;

function resetMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

resetMatrix();
window.addEventListener('resize', resetMatrix);
setInterval(drawMatrix, matrixSpeed);

// === Game Loop
loadGame();
setInterval(() => {
  dataStolen += dps * hackMultiplier;
  update();
  saveGame();
}, 1000);
// === Create Upgrades
function createUpgradeCards() {
  upgradesDiv.innerHTML = '';
  for (const key in upgrades) {
    const upgrade = upgrades[key];
    const card = document.createElement('div');
    card.classList.add('upgrade-card');

    if (upgrade.unlocked) {
      const totalCost = calculateTotalCost(upgrade);
      card.innerHTML = `
        <div class="upgrade-icon">${getUpgradeSVG(upgrade.icon)}</div>
  <strong>${upgrade.name}</strong><br>
  Owned: ${upgrade.amount}<br>
  +${formatNumber(upgrade.amount * upgrade.dps)} DPS<br>
  Cost: ${formatNumber(totalCost)}<br>
  <button onclick="buyUpgrade('${key}')">Buy</button>
  <button onclick="sellUpgrade('${key}')">Sell</button>
  <div class="mini-icons" id="minis-${key}"></div>
      `;
    } else {
      card.classList.add('locked');
      card.innerHTML = `
        <div class="upgrade-icon">${getLockedSVG()}</div>
        <strong>???</strong><br>
        <em>Locked</em>
      `;
    }

    upgradesDiv.appendChild(card);
    updateMiniIcons(key);
  }
}

// === Locked Icon SVG
function getLockedSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect><path d="M12 17v-2"></path><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>`;
}

// === Buy/Sell Upgrades
function buyUpgrade(key) {
  const upgrade = upgrades[key];
  if (!upgrade.unlocked) return;

  let amountToBuy = (buyAmount === 'max') ? getMaxAffordable(upgrade) : buyAmount;
  for (let i = 0; i < amountToBuy; i++) {
    if (dataStolen >= upgrade.cost) {
      dataStolen -= upgrade.cost;
      upgrade.amount++;
      dps += upgrade.dps;
      upgrade.cost = Math.floor(upgrade.cost * 1.15);
    } else break;
  }

  checkUnlocks();
  update();
  saveGame();
}

function sellUpgrade(key) {
  const upgrade = upgrades[key];
  if (upgrade.amount > 0) {
    upgrade.amount--;
    dps -= upgrade.dps;
    let refund = Math.floor(upgrade.cost * 0.75);
    dataStolen += refund;
    upgrade.cost = Math.floor(upgrade.cost / 1.15);
    if (dps < 0) dps = 0;
    update();
    saveGame();
  }
}

function getMaxAffordable(upgrade) {
  let affordable = 0;
  let tempCost = upgrade.cost;
  let tempData = dataStolen;
  while (tempData >= tempCost) {
    affordable++;
    tempData -= tempCost;
    tempCost = Math.floor(tempCost * 1.15);
  }
  return affordable;
}

function calculateTotalCost(upgrade) {
  let amount = (buyAmount === 'max') ? getMaxAffordable(upgrade) : buyAmount;
  let cost = 0;
  let tempCost = upgrade.cost;
  for (let i = 0; i < amount; i++) {
    cost += tempCost;
    tempCost = Math.floor(tempCost * 1.15);
  }
  return cost;
}

// === Unlock Upgrades
function checkUnlocks() {
  if (upgrades.autoHacker.amount >= 1) upgrades.botnet.unlocked = true;
  if (upgrades.botnet.amount >= 1) upgrades.serverFarm.unlocked = true;
  if (upgrades.serverFarm.amount >= 1) upgrades.quantumComputer.unlocked = true;
  if (upgrades.quantumComputer.amount >= 1) upgrades.aiOverlord.unlocked = true;
  if (upgrades.aiOverlord.amount >= 1) upgrades.darkWebServer.unlocked = true;
  if (upgrades.darkWebServer.amount >= 1) upgrades.malwareFactory.unlocked = true;
  if (upgrades.malwareFactory.amount >= 1) upgrades.blackHoleComputer.unlocked = true;

  for (const key in enhancements) {
    const enh = enhancements[key];
    if (!enh.unlocked && upgrades[enh.upgradeKey]?.amount >= enh.requiredAmount) {
      enh.unlocked = true;
    }
  }
}



// === Enhancements
function createEnhancementButtons() {
  enhancementsDiv.innerHTML = '';

  const sortedEnhancements = Object.entries(enhancements).sort((a, b) => {
    if (a[1].upgradeKey === b[1].upgradeKey) {
      return a[1].requiredAmount - b[1].requiredAmount;
    }
    return a[1].upgradeKey.localeCompare(b[1].upgradeKey);
  });

  for (const [key, enhancement] of sortedEnhancements) {
    if (!enhancement.unlocked && !enhancement.applied) continue;

    const button = document.createElement('button');
    button.classList.add('enhancement-button');

    if (enhancement.applied) {
      button.classList.add('purchased');
    }

    // Get SVG icon based on enhancement.icon
button.innerHTML = `
  <div style="position: absolute; top: 4px; left: 6px;">${getRomanNumeral(enhancement.requiredAmount)}</div>
  <img src="icons/${enhancement.icon}.svg" style="width: 24px; height: 24px; margin: auto; display: block;">

`;





    button.setAttribute('data-tooltip', `${enhancement.name} (Cost: ${formatNumber(enhancement.cost)})`);

    button.onclick = () => {
      buyEnhancement(key);
    };

    enhancementsDiv.appendChild(button);
  }
}



function getRomanNumeral(amount) {
  if (amount >= 100) return 'IV';
  if (amount >= 50) return 'III';
  if (amount >= 25) return 'II';
  return 'I';
}



function buyEnhancement(key) {
  const enhancement = enhancements[key];
  if (dataStolen >= enhancement.cost && !enhancement.applied) {
    dataStolen -= enhancement.cost;
    enhancement.applied = true;
    upgrades[enhancement.upgradeKey].dps *= enhancement.multiplier;
    update();
    saveGame();
  }
}



// === Mini Icons
function updateMiniIcons(key) {
  const container = document.getElementById(`minis-${key}`);
  if (!container) return;
  const upgrade = upgrades[key];
  container.innerHTML = '';
  for (let i = 0; i < upgrade.amount; i++) {
    const mini = document.createElement('div');
    mini.classList.add('mini-icon');
    container.appendChild(mini);
  }
}

// === Format Numbers
function formatNumber(x) {
  let unitIndex = 0;
  while (x >= 1000 && unitIndex < units.length - 1) {
    x /= 1000;
    unitIndex++;
  }
  return x.toFixed(1) + ' ' + units[unitIndex];
}

// === SVG Icons
function getUpgradeSVG(type) {
  const icons = {
    computer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect><path d="M8 20h8"></path><path d="M12 16v4"></path></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15 15 0 010 20"></path></svg>`,
    building: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18"></rect><rect x="14" y="3" width="7" height="18"></rect><path d="M7 9h0M7 14h0M17 9h0M17 14h0"></path></svg>`,
    dna: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4c4 4 12 4 16 0M4 20c4-4 12-4 16 0"/></svg>`,
    chip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10"></rect><path d="M4 2v2M4 20v2M2 4h2M2 20h2M20 2v2M20 20v2M22 4h-2M22 20h-2"/></svg>`,
    cloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 16a4 4 0 100-8 5.5 5.5 0 00-10.9 1.1A4 4 0 106 16h11z"/></svg>`,
    bug: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h6M9 15h6"/><path d="M13 3a2 2 0 00-2 0M4 13H2m20 0h-2"/><path d="M20 9l-2 2M4 9l2 2"/><circle cx="12" cy="12" r="4"/></svg>`,
    blackhole: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/></svg>`
  };
  return icons[type] || '';
}


function getEnhancementSVG(key) {
  const svgs = {
    computer: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2"/>
      <path d="M8 20h8M12 16v4"/>
    </svg>`,

    globe: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15 15 0 010 20"/>
    </svg>`,

    building: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="18"/>
      <rect x="14" y="3" width="7" height="18"/>
      <path d="M7 9h0M7 14h0M17 9h0M17 14h0"/>
    </svg>`,

    dna: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <path d="M4 4c4 4 12 4 16 0M4 20c4-4 12-4 16 0"/>
    </svg>`,

    chip: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <rect x="7" y="7" width="10" height="10"/>
      <path d="M4 2v2M4 20v2M2 4h2M2 20h2M20 2v2M20 20v2M22 4h-2M22 20h-2"/>
    </svg>`,

    cloud: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <path d="M17 16a4 4 0 100-8 5.5 5.5 0 00-10.9 1.1A4 4 0 106 16h11z"/>
    </svg>`,

    bug: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <path d="M9 9h6M9 15h6"/>
      <path d="M13 3a2 2 0 00-2 0M4 13H2m20 0h-2"/>
      <path d="M20 9l-2 2M4 9l2 2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>`,

    blackhole: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0f0" stroke-width="2" viewBox="0 0 24 24">
      <path d="M12 12m-9,0a9,9 0 1,0 18,0a9,9 0 1,0 -18,0"/>
      <path d="M12 12m-6,0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0"/>
    </svg>`
  };

  const enhancement = enhancements[key];
  if (!enhancement) return '';
  return svgs[enhancement.icon] || '';
}


// === Achievements
function checkAchievements() {
  if (clicks === 10 && !unlockedAchievements.includes('First 10 Clicks')) {
    showAchievement("First 10 Clicks");
    unlockedAchievements.push('First 10 Clicks');
  }
  if (dataStolen >= 1000 && !unlockedAchievements.includes('1 GB Stolen')) {
    showAchievement("1 GB Stolen");
    unlockedAchievements.push('1 GB Stolen');
  }
}

function showAchievement(text) {
  const popup = document.createElement('div');
  popup.classList.add('achievement-popup');
  popup.textContent = "🏆 " + text;
  achievementContainer.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// === Save/Load/Reset
function saveGame() {
  const saveData = { dataStolen, dps, clicks, upgrades, enhancements, unlockedAchievements };
  localStorage.setItem('hackerSave', JSON.stringify(saveData));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem('hackerSave'));
  if (save) {
    dataStolen = save.dataStolen;
    dps = save.dps;
    clicks = save.clicks;
    upgrades = { ...upgrades, ...save.upgrades }; // merge old save into new upgrades
    enhancements = { ...enhancements, ...save.enhancements };
    unlockedAchievements = save.unlockedAchievements || [];
    update();
  }
}


function resetGame() {
  if (confirm("Are you sure you want to reset?")) {
    localStorage.removeItem('hackerSave');
    location.reload();
  }
}

// === Popup Tabs
function showTab(tab, button) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  popup.classList.remove('hidden');
  popupTitle.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
  if (tab === 'achievements') {
    popupBody.innerHTML = unlockedAchievements.length ? unlockedAchievements.join('<br>') : "No achievements yet!";
  } else if (tab === 'stats') {
    popupBody.innerHTML = `Total Clicks: ${clicks}<br>Biggest DPS: ${formatNumber(dps)}`;
  } else if (tab === 'settings') {
    popupBody.innerHTML = `
      <button class="settings-button" onclick="saveGame()">Save Game</button>
      <button class="settings-button" onclick="loadGame()">Load Game</button>
      <button class="settings-button" onclick="resetGame()">Reset Game</button>
    `;
  }
}

function closePopup() {
  popup.classList.add('hidden');
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
}

// === Update
function update() {
  counter.textContent = `Data Stolen: ${formatNumber(dataStolen)}`;
  dpsDiv.textContent = `DPS: ${formatNumber(dps)}`;
  createUpgradeCards();
  createEnhancementButtons();
  document.title = `💻 ${formatNumber(dataStolen)} - Hacker Simulator`;
}
