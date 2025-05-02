let xp = 0;
let health = 100;
let gold = 5000;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let potionInventory = {
  "small health": 0,
  "large health": 0,
  "rage": 0
};


const stats = document.querySelector("#stats")
const fundo = document.querySelector("#game");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'sword', power: 50 },
  { name: 'claw hammer', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "frost giant",
    level: 6,
    health: 30
  },
  {
    name: "crystal golem",
    level: 3,
    health: 20
  },
  {
    name: "lava wolf",
    level: 9,
    health: 55
  },
  {
    name: "infernal djinn",
    level: 11,
    health: 66
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to caves", "Fight dragon", "Inventory"],
    "button functions": [goStore, goCave, fightDragon, openInventory],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Buy potions", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, buyPotions, goTown],
    text: "You enter the store."
  },
  {
    name: "potions",
    "button text": ["Buy sm health (15 gold)", "Buy lg health (70 gold)", "Buy rage (60 gold)", "Go back"],
    "button functions": [smPotion, lgPotion, ragePotion, goStore],
    text: "Potion Stock:<br>- small health potion (+25 health)<br>- large health potion (+60 health)<br>- rage potion (+75 damage next hit)"
  },
  {
    name: "cave",
    "button text": ["Temple of DOOM", "Frostlight Den", "The Burning Silence", "Go to town square"],
    "button functions": [goDoom, goFrostlight, goBurning, goTown],
    text: "You enter the cave and see 3 different paths. Which one are you picking?"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Potions", "Run"],
    "button functions": [attack, dodge, yourPotions, goCave],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "inventory",
    "button text": ["Go to town square"],
    "button functions": [goTown],
  },
  {
    name: "potion inventory",
    "button text": ["sm health potion", "lg health potion", "rage potion", "Back to fight"],
    "button functions": [smPotionAction, lgPotionAction, ragePotionAction, returnToFight],
  },
  {
    name: "cave1",
    "button text": ["Fight slime", "Fight fanged beast", "Back to caves"],
    "button functions": [fightSlime, fightBeast, goCave],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "cave2",
    "button text": ["Fight frost giant", "Fight crystal golem", "Back to caves"],
    "button functions": [fightGiant, fightGolem, goCave],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "cave3",
    "button text": ["Fight lava wolf", "Fight infernal djinn", "Back to caves"],
    "button functions": [fightWolf, fightDjinn, goCave],
    text: "You enter the cave. You see some monsters."
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = openInventory;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  button2.style.display = "inline-block";
  button3.style.display = "inline-block";
  button4.style.display = "inline-block";
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[3]);
  button4.style.display = "inline-block"
  fundo.style.setProperty("background", "#ffffff")
  stats.style.setProperty("color", "#000000")
}

function goDoom() {
  update(locations[11]);
  button4.style.display = "none";
  stats.style.setProperty("color", "#ffffff");
  fundo.style.setProperty("background", "linear-gradient(rgb(13, 107, 5),rgb(178, 233, 51))");
}

function goFrostlight() {
  update(locations[12])
  button4.style.display = "none";
  stats.style.setProperty("color", "#ffffff");
  fundo.style.setProperty("background", "linear-gradient(rgb(63, 151, 240),rgb(126, 184, 218))");
}

function goBurning() {
  update(locations[13]);
  button4.style.display = "none";
  stats.style.setProperty("color", "#ffffff");
  fundo.style.setProperty("background", "linear-gradient(rgb(218, 28, 28),rgb(231, 123, 72))");
}

function openInventory() {
  const allZero = Object.values(potionInventory).every(value => value === 0)
  text.innerHTML = `<b>Inventory:</b><br>Weapons - ${inventory.join(", ")}<br>`
  if (allZero) {
    
  } else {
    text.innerHTML += 'Potions - '
    for (const [key, value] of Object.entries(potionInventory)) {
      if (value >= 1) {
        text.innerHTML += `${value} ${key}, `
      }
    }
    text.innerHTML = text.innerHTML.slice(0, -2)
  }
  button1.innerText = "Go to town square";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
  button1.onclick = goTown;
}

// POTIONS
function yourPotions() {
  update(locations[10])
  const allZero = Object.values(potionInventory).every(value => value === 0)
  if (allZero) {
    text.innerHTML = 'You have no potions in your inventory.'
  } else {
    text.innerText = 'Potions - '
    for (const [key, value] of Object.entries(potionInventory)) {
      if (value >= 1) {
        text.innerHTML += `${value} ${key}, `
      }
    }
    text.innerHTML = text.innerHTML.slice(0, -2)
  }
}

function buyPotions() {
  update(locations[2])
}

function smPotion() {
  if (gold >= 15) {
    gold -= 15;
    goldText.innerText = gold;
    potionInventory["small health"] += 1
    if (potionInventory["small health"] > 1) {
      text.innerText = `You now have ${potionInventory["small health"]} small potions in your inventory.`
    } else {
      text.innerText = `You now have ${potionInventory["small health"]} small potion in your inventory.`
    }
  } else {
    text.innerText = "You do not have enough gold to buy a small health potion."
  }
}
function smPotionAction() {
  if (potionInventory["small health"] > 0) {
    update(locations[4]);
    monsterStats.style.display = "block";
    text.innerText = "You used a small health potion";
    health += 25;
    healthText.innerText = health
    potionInventory["small health"] -= 1
  } else {
    text.innerText = "You do not have any small potions in your inventory."
  }
  }

function lgPotion() {
  if (gold >= 70) {
    gold -= 70;
    goldText.innerText = gold;
    potionInventory["large health"] += 1
    if (potionInventory["large health"] > 1) {
      text.innerText = `You now have ${potionInventory["large health"]} large health potions in your inventory.`
    } else {
      text.innerText = `You now have ${potionInventory["large health"]} large health potion in your inventory.`
    }
  } else {
    text.innerText = "You do not have enough gold to buy a large health potion."
  }
}
function lgPotionAction() {
  if (potionInventory["large health"] > 0) {
    update(locations[4]);
    monsterStats.style.display = "block";
    text.innerText = "You used a large health potion";
    health += 60;
    healthText.innerText = health;
    potionInventory["large health"] -= 1
  } else {
    text.innerText = "You do not have any large health potions in your inventory."
  }
}

function ragePotion() {
  if (gold >= 60) {
    gold -= 60;
    goldText.innerText = gold;
    potionInventory["rage"] += 1
    if (potionInventory["rage"] > 1) {
      text.innerText = `You now have ${potionInventory["rage"]} rage potions in your inventory.`
    } else {
      text.innerText = `You now have ${potionInventory["rage"]} rage potion in your inventory.`
    }
  } else {
    text.innerText = "You do not have enough gold to buy a rage potion."
  }
}
function ragePotionAction() {
  if (potionInventory["rage"] > 0) {
    update(locations[4]);
    monsterStats.style.display = "block"
    potionInventory["rage"] -= 1
    if (monsters[fighting].health > 75) {
      monsterHealth -= 75;
      monsterHealthText.innerText = monsterHealth;
      text.innerText = `You used your rage potion to go RAGE MODE and hit the ${monsters[fighting].name} dealing 75 damage!`
    } else {
      defeatMonster();
      monsterStats.style.display = "block";
      monsterHealth -= 75;
      monsterHealthText.innerText = monsterHealth;
      text.innerText = `You used your rage potion to go RAGE MODE and SLICED the ${monsters[fighting].name}!`;
    }
  }
}
function returnToFight() {
  update(locations[4]);
  monsterStats.style.display = "block";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightGiant() {
  fighting = 2;
  goFight();
}

function fightGolem() {
  fighting = 3;
  goFight();
}

function fightWolf() {
  fighting = 4;
  goFight();
}

function fightDjinn() {
  fighting = 5;
  goFight();
}

function fightDragon() {
  fighting = 6;
  goFight();
  button4.onclick = goTown
}

function goFight() {
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  button4.style.display = "inline-block"
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 6) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[5]);
}

function lose() {
  update(locations[6]);
}

function winGame() {
  update(locations[7]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[8]);
  button4.style.display = "none"
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
