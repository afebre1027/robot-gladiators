var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("you don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("upgrading players attack by 6 for 7 dollars.");
      this.attack = +6;
      this.money -= 7;
    } else {
      window.alert("you dont have enough money!");
    }
  },
};
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];
console.log(enemyNames);
console.log(enemyNames.length);

// fight function (now with parameter for enemy's name)
var fight = function (enemyName) {
  while (playerInfo.health > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt(
      'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
    );

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + " has decided to skip this fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerInfo.name +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    playerInfo.health = Math.max(0, playerInfo.Health - damage);
    console.log(
      enemyName +
        " attacked " +
        playerInfo.name +
        ". " +
        playerInfo.name +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );
    }
  }
};

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

      // reset enemyHealth before starting new fight
      var randomNumber = function (min, max) {
        var value = Math.floor(Math.random() * (max - min + 1) + min);
        enemyHealth = randomNumber(40, 60);

        return value;
      };
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);

      // if were not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyNames.lenght - 1) {
        var storeConfirm = window.confirm(
          "the fight is over, visit te store before the next round!"
        );

        // if yes go to store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("you have lost your robot in battle! game over!");
      break;
    }
  }

  endGame();
};

var endGame = function () {
  window.alert("the games has now ended. lets see how you did!");
  //if okay is still alive
  if (playerInfo.health > 0) {
    window.alert(
      " Great job, you've survived the game! you now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("you've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing! come back soon!");
  }
};
var shop = function () {
  var shopOptionPrompt = window.prompt(
    "would you like to REFILL your health, UPGRADE your attack, or LEAVE the game?"
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerInfo.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerInfo.health = playerInfo.health + 20;
        playerInfo.money = playerInfo.money - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case "UPGRADE":
    case "upgrade":
      if (playerInfo.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerInfo.attack = playerInfo.attack + 6;
        playerInfo.money = playerInfo.money - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

startGame();
