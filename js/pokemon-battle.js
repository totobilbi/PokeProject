// battle music
$("#battle-engage-audio").get(0).play();


let firebaseConfig = {
    apiKey: "AIzaSyBX0PlSmVaXXNOyVoVOOEi6Yb-R3wi8aow",
    authDomain: "pokedex-c677f.firebaseapp.com",
    databaseURL: "https://pokedex-c677f.firebaseio.com",
    projectId: "pokedex-c677f",
    storageBucket: "pokedex-c677f.appspot.com",
    messagingSenderId: "171485068854",
    appId: "1:171485068854:web:62097aaf48004a14a7e297"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// load moveList from firebase
let pokemonMovesList = JSON.parse(localStorage.getItem("movesJSON"));
firebase.database().ref('Moves').once('value').then(function(snapshot) {
    pokemonMovesList = snapshot.val();    
});

let hero = 
{
    Name: "",
    MaxHealth: "",    
    CurrHealth: "",
    MaxShield: "",
    CurrShield: "",
    CurrType: "",
    CurrType2: ""
};


let enemy = 
{
    ID: "",
    Name: "",
    MaxHealth: "",    
    CurrHealth: "",
    MaxShield: "",
    CurrShield: "",
    CurrType: "",
    CurrType2: ""
};


let getFromJS = JSON.parse(localStorage.getItem('pokedexJSON'));
let pokedex = JSON.parse(getFromJS);


{/* <h1> ${pokedex[temp2].name.english} </h1> */}

function checkType(arr) {
    if(arr[1]!=undefined) {
    return true; //2 types
    } else {
    return false; // 1 type
    }
    }


function closePokemonInfo(who) {
    if(who=="hero") {
    $('#heroInfo').css({visibility: "hidden"});
    } else {
    $('#enemyInfo').css({visibility: "hidden"});
    }
}

function pokemonInfo(who) {
    let temp2 = localStorage.getItem("choosenPokemon") - 1;
    if(who=="hero") {
    if(checkType(pokedex[temp2].type)==true) { // 2types
        $('#heroInfo').html(`
        <div class="container">
        <div class="row">
        <div class="col-4">
        <p>Type: </p>
        </div>
        <div class="col-8">
        <img src="images/type/${pokedex[temp2].type[0]}.gif">
        <img src="images/type/${pokedex[temp2].type[1]}.gif">
        </div>
        </div>
    
        <div class="row">
        <div class="col-4">
                <p>HP: </p> 
        </div>
    
        <div class="col-8">
                <div class="progress" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${pokedex[temp2].base.HP}%" aria-valuenow="${pokedex[temp2].base.HP}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.HP}</div>
                      </div>
            </div>
    
    </div>
    
    <div class="row">
            <div class="col-4">
                    <p>Attack: </p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-danger" role="progressbar" style="width: ${pokedex[temp2].base.Attack}%" aria-valuenow="${pokedex[temp2].base.Attack}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Attack}</div>
                          </div>
                </div>
    </div>
    
    
    <div class="row">
            <div class="col-4">
                    <p>Defense:</p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-info" role="progressbar" style="width: ${pokedex[temp2].base.Defense}%" aria-valuenow="${pokedex[temp2].base.Defense}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Defense}</div>
                          </div>
                </div>
    </div>
    
    
    
    <div class="row">
            <div class="col-4">
                    <p>Speed:</p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${pokedex[temp2].base.Speed}%" aria-valuenow="${pokedex[temp2].base.Speed}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Speed}</div>
                          </div>
                </div>
    </div>
    
    
    
    </div> 
    `);
    } else {
        $('#heroInfo').html(`
        <div class="container">
        <div class="row">
        <div class="col-4">
        <p>Type: </p>
        </div>
        <div class="col-8">
        <img src="images/type/${pokedex[temp2].type[0]}.gif">
        </div>
        </div>
    
        <div class="row">
        <div class="col-4">
                <p>HP: </p> 
        </div>
    
        <div class="col-8">
                <div class="progress" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${pokedex[temp2].base.HP}%" aria-valuenow="${pokedex[temp2].base.HP}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.HP}</div>
                      </div>
            </div>
    
    </div>
    
    <div class="row">
            <div class="col-4">
                    <p>Attack: </p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-danger" role="progressbar" style="width: ${pokedex[temp2].base.Attack}%" aria-valuenow="${pokedex[temp2].base.Attack}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Attack}</div>
                          </div>
                </div>
    </div>
    
    
    <div class="row">
            <div class="col-4">
                    <p>Defense:</p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-info" role="progressbar" style="width: ${pokedex[temp2].base.Defense}%" aria-valuenow="${pokedex[temp2].base.Defense}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Defense}</div>
                          </div>
                </div>
    </div>
    
    
    
    <div class="row">
            <div class="col-4">
                    <p>Speed:</p>
            </div>
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${pokedex[temp2].base.Speed}%" aria-valuenow="${pokedex[temp2].base.Speed}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Speed}</div>
                          </div>
                </div>
    </div>
    
    
    
    </div> 
    `);
    }
$('#heroInfo').css({visibility: "visible"});

    } else { // enemy info
        $('#enemyInfo').css({visibility: "visible"});
    }
}


setTimeout(function(){ 
    $('.start-battle-animation').fadeIn(2000).removeClass('start-battle-animation');
    $('.blinkRound').fadeOut();
    $('.blinkRound2').fadeOut();
let roundCounter = 1;    
let currPP = [0, 0, 0, 0];
let maxPP = [0,0,0,0];
let pokeInventory = checkAccountStats("pokeInventory", localStorage.getItem('lastLoggedName'));
let pokeInvHP = [];
for(x of pokeInventory) {
let pokeInvHP2 = {
    id: x,
    hp: pokedex[x].base.HP,
    shield: pokedex[x].base.Defense
}
pokeInvHP.push(pokeInvHP2)
}
localStorage.setItem("pokemonHP", JSON.stringify(pokeInvHP));






function checkAccountStats(stat, name) {
    let temp = localStorage.getItem('accounts');
    let arr = JSON.parse(temp);
    let statValue;
    for(x of arr) {
        if(x.userName==name) {
            switch(stat) {
                case "trainerLevel":
                    statValue=x.trainerLevel;
                break;
                case "trainerExp":
                    statValue=x.trainerExp;
                break;
                case "numberOfPokemons":
                    statValue=x.pokeInventory.length;
                break;
                case "numberOfBattles":
                    statValue=x.numberOfBattles;
                break;
                case "pokeMoney":
                    statValue=x.pokeMoney;
                break;
                case "battlesWon":
                    statValue=x.battlesWon;
                break;
                case "pokeInventory":
                    statValue=x.pokeInventory;
                break;
            }
        }
    }
    return statValue;
}

// let pokeInventory = checkAccountStats("pokeInventory", localStorage.getItem('lastLoggedName'));



    startGame();





    // function checkWeakAgainst(attacker, attackType) {
    // }


    function checkStrongAgainst(attacker, attackType) {
        let weakType = false;
        if (attacker=="hero") {
            switch(attackType) {
                case "bug":
                    if(enemy.CurrType=="grass" || enemy.CurrType=="psychic" || enemy.CurrType=="dark" ||  enemy.CurrType2=="grass" || enemy.CurrType2=="psychic" || enemy.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "dark":
                    if(enemy.CurrType=="ghost" || enemy.CurrType=="psychic" ||  enemy.CurrType2=="ghost" || enemy.CurrType2=="psychic")   {
                        weakType = true;
                    }
                break;
                case "dragon":
                    if(enemy.CurrType=="dragon" ||  enemy.CurrType2=="dragon")   {
                        weakType = true;
                    }
                break;
                case "electric":
                    if(enemy.CurrType=="flying" || enemy.CurrType=="water" ||  enemy.CurrType2=="flying" || enemy.CurrType2=="water")   {
                        weakType = true;
                    }
                break;
                case "fairy":
                    if(enemy.CurrType=="fighting" || enemy.CurrType=="dragon" || enemy.CurrType=="dark" ||  enemy.CurrType2=="fighting" || enemy.CurrType2=="dragon" || enemy.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "fighting":
                    if(enemy.CurrType=="normal" || enemy.CurrType=="rock" || enemy.CurrType=="steel" ||  enemy.CurrType=="ice" ||   enemy.CurrType=="dark" ||    enemy.CurrType2=="normal" || enemy.CurrType2=="rock" || enemy.CurrType2=="steel" ||  enemy.CurrType2=="ice" ||   enemy.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "fire":
                    if(enemy.CurrType=="bug" || enemy.CurrType=="steel" || enemy.CurrType=="grass" ||  enemy.CurrType=="ice" || enemy.CurrType2=="bug" || enemy.CurrType2=="steel" || enemy.CurrType2=="grass" ||  enemy.CurrType2=="ice")   {
                        weakType = true;
                    }
                break;
                case "flying":
                    if(enemy.CurrType=="fighting" || enemy.CurrType=="bug" || enemy.CurrType=="grass" ||  enemy.CurrType2=="fighting" || enemy.CurrType2=="bug" || enemy.CurrType2=="grass")   {
                        weakType = true;
                    }
                break;
                case "ghost":
                    if(enemy.CurrType=="ghost" || enemy.CurrType=="psychic" ||  enemy.CurrType2=="ghost" || enemy.CurrType2=="psychic")   {
                        weakType = true;
                    }
                break;
                case "ground":
                    if(enemy.CurrType=="poison" || enemy.CurrType=="rock" || enemy.CurrType=="steel" ||  enemy.CurrType=="fire" ||   enemy.CurrType=="electric" ||    enemy.CurrType2=="poison" || enemy.CurrType2=="rock" || enemy.CurrType2=="steel" ||  enemy.CurrType2=="fire" ||   enemy.CurrType2=="electric")   {
                        weakType = true;
                    }
                break;
                case "grass":
                    if(enemy.CurrType=="ground" || enemy.CurrType=="rock" || enemy.CurrType=="water" ||  enemy.CurrType2=="ground" || enemy.CurrType2=="rock" || enemy.CurrType2=="water")   {
                        weakType = true;
                    }
                break;
                case "ice":
                    if(enemy.CurrType=="flying" || enemy.CurrType=="ground" || enemy.CurrType=="grass" ||  enemy.CurrType=="dragon" || enemy.CurrType2=="flying" || enemy.CurrType2=="ground" || enemy.CurrType2=="grass" ||  enemy.CurrType2=="dragon")   {
                        weakType = true;
                    }
                break;
                case "normal":
                    weakType = false;
                break;
                case "poison":
                    if(enemy.CurrType=="grass" || enemy.CurrType=="fairy" ||  enemy.CurrType2=="grass" || enemy.CurrType2=="fairy")   {
                        weakType = true;
                    }
                break;
                case "psychic":
                    if(enemy.CurrType=="fighting" || enemy.CurrType=="poison" ||  enemy.CurrType2=="fighting" || enemy.CurrType2=="poison")   {
                        weakType = true;
                    }
                break;
                case "rock":
                    if(enemy.CurrType=="flying" || enemy.CurrType=="bug" || enemy.CurrType=="fire" ||  enemy.CurrType=="ice" || enemy.CurrType2=="flying" || enemy.CurrType2=="bug" || enemy.CurrType2=="fire" ||  enemy.CurrType2=="ice")   {
                        weakType = true;
                    }
                break;
                case "steel":
                    if(enemy.CurrType=="rock" || enemy.CurrType=="ice" || enemy.CurrType=="fairy" ||  enemy.CurrType2=="rock" || enemy.CurrType2=="ice" || enemy.CurrType2=="fairy")   {
                        weakType = true;
                    }
                break;
                case "water":
                    if(enemy.CurrType=="ground" || enemy.CurrType=="rock" || enemy.CurrType=="fire" ||  enemy.CurrType2=="ground" || enemy.CurrType2=="rock" || enemy.CurrType2=="fire")   {
                        weakType = true;
                    }
                break;
            }
        } else { // attacker = enemy
            switch(attackType) {
                case "bug":
                    if(hero.CurrType=="grass" || hero.CurrType=="psychic" || hero.CurrType=="dark" ||  hero.CurrType2=="grass" || hero.CurrType2=="psychic" || hero.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "dark":
                    if(hero.CurrType=="ghost" || hero.CurrType=="psychic" ||  hero.CurrType2=="ghost" || hero.CurrType2=="psychic")   {
                        weakType = true;
                    }
                break;
                case "dragon":
                    if(hero.CurrType=="dragon" ||  hero.CurrType2=="dragon")   {
                        weakType = true;
                    }
                break;
                case "electric":
                    if(hero.CurrType=="flying" || hero.CurrType=="water" ||  hero.CurrType2=="flying" || hero.CurrType2=="water")   {
                        weakType = true;
                    }
                break;
                case "fairy":
                    if(hero.CurrType=="fighting" || hero.CurrType=="dragon" || hero.CurrType=="dark" ||  hero.CurrType2=="fighting" || hero.CurrType2=="dragon" || hero.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "fighting":
                    if(hero.CurrType=="normal" || hero.CurrType=="rock" || hero.CurrType=="steel" ||  hero.CurrType=="ice" ||   hero.CurrType=="dark" ||    hero.CurrType2=="normal" || hero.CurrType2=="rock" || hero.CurrType2=="steel" ||  hero.CurrType2=="ice" ||   hero.CurrType2=="dark")   {
                        weakType = true;
                    }
                break;
                case "fire":
                    if(hero.CurrType=="bug" || hero.CurrType=="steel" || hero.CurrType=="grass" ||  hero.CurrType=="ice" || hero.CurrType2=="bug" || hero.CurrType2=="steel" || hero.CurrType2=="grass" ||  hero.CurrType2=="ice")   {
                        weakType = true;
                    }
                break;
                case "flying":
                    if(hero.CurrType=="fighting" || hero.CurrType=="bug" || hero.CurrType=="grass" ||  hero.CurrType2=="fighting" || hero.CurrType2=="bug" || hero.CurrType2=="grass")   {
                        weakType = true;
                    }
                break;
                case "ghost":
                    if(hero.CurrType=="ghost" || hero.CurrType=="psychic" ||  hero.CurrType2=="ghost" || hero.CurrType2=="psychic")   {
                        weakType = true;
                    }
                break;
                case "ground":
                    if(hero.CurrType=="poison" || hero.CurrType=="rock" || hero.CurrType=="steel" ||  hero.CurrType=="fire" ||   hero.CurrType=="electric" ||    hero.CurrType2=="poison" || hero.CurrType2=="rock" || hero.CurrType2=="steel" ||  hero.CurrType2=="fire" ||   hero.CurrType2=="electric")   {
                        weakType = true;
                    }
                break;
                case "grass":
                    if(hero.CurrType=="ground" || hero.CurrType=="rock" || hero.CurrType=="water" ||  hero.CurrType2=="ground" || hero.CurrType2=="rock" || hero.CurrType2=="water")   {
                        weakType = true;
                    }
                break;
                case "ice":
                    if(hero.CurrType=="flying" || hero.CurrType=="ground" || hero.CurrType=="grass" ||  hero.CurrType=="dragon" || hero.CurrType2=="flying" || hero.CurrType2=="ground" || hero.CurrType2=="grass" ||  hero.CurrType2=="dragon")   {
                        weakType = true;
                    }
                break;
                case "normal":
                    weakType = false;
                break;
                case "poison":
                    if(hero.CurrType=="grass" || hero.CurrType=="fairy" ||  hero.CurrType2=="grass" || hero.CurrType2=="fairy")   {
                        weakType = true;
                    }
                break;
                case "psychic":
                    if(hero.CurrType=="fighting" || hero.CurrType=="poison" ||  hero.CurrType2=="fighting" || hero.CurrType2=="poison")   {
                        weakType = true;
                    }
                break;
                case "rock":
                    if(hero.CurrType=="flying" || hero.CurrType=="bug" || hero.CurrType=="fire" ||  hero.CurrType=="ice" || hero.CurrType2=="flying" || hero.CurrType2=="bug" || hero.CurrType2=="fire" ||  hero.CurrType2=="ice")   {
                        weakType = true;
                    }
                break;
                case "steel":
                    if(hero.CurrType=="rock" || hero.CurrType=="ice" || hero.CurrType=="fairy" ||  hero.CurrType2=="rock" || hero.CurrType2=="ice" || hero.CurrType2=="fairy")   {
                        weakType = true;
                    }
                break;
                case "water":
                    if(hero.CurrType=="ground" || hero.CurrType=="rock" || hero.CurrType=="fire" ||  hero.CurrType2=="ground" || hero.CurrType2=="rock" || hero.CurrType2=="fire")   {
                        weakType = true;
                    }
                break;
            }
        }
        return weakType;
    }

    function checkDmgChange(attacker, attackType) {
        let dmgMultiplier = 1;
        let weakType = checkStrongAgainst(attacker, attackType);
        
        if(weakType==true) {
            dmgMultiplier = 2;
        }
        return dmgMultiplier;
    }

    function fixAttackName(string) {
        if(string.search(" ")!=-1) {
            let space = string.indexOf(" ");
            return string.charAt(0).toUpperCase() + string.slice(1, space) + " " + string.charAt(space+1).toUpperCase() + string.slice(space+2);
        } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    function returnPokeMoves(who) {
        let movesArray = [];
        let movesArray2= [];
        let c = 0;
        let c2 = 0;
            if(who=="hero") {
                for(x of pokemonMovesList) {
                        if(hero.CurrType==x.type || hero.CurrType2==x.type) {
                            movesArray[c] = x;
                            c++;
                    }
                }


            } else { //enemy moves
                for(x of pokemonMovesList) {
                    if(enemy.CurrType==x.type || enemy.CurrType2==x.type) {
                        movesArray[c] = x;
                        c++;
                    }
                }
            }

            while(c2<4) {
                movesArray2[c2] = movesArray[c2];
                c2++;
            }
        
        return movesArray2;

    }

    
    function startGame() {
        spawnEnemy();
        spawnHero();
    }

    function spawnEnemy() {
        let temp = Math.floor((Math.random() *807)+1);
        let temp2 = temp-1;   
        if(pokedex[temp2].type[1]==null) {
            $('#enemySpawn').html(`<img id="enemyPokeImg"  src="images/pokegif/${temp}.webp">`)
        } else {
            $('#enemySpawn').html(`<img id="enemyPokeImg"  src="images/pokegif/${temp}.webp">`)
        }
        $('#enemySpawn').animate({'opacity': '1'}, 1000);
        enemy.Name = pokedex[temp2].name.english;
        enemy.MaxHealth = pokedex[temp2].base.HP;
        enemy.CurrHealth = pokedex[temp2].base.HP;
        enemy.MaxShield = pokedex[temp2].base.Defense;
        enemy.CurrShield = pokedex[temp2].base.Defense;
        $(".health-box-enemy .health-bar-text").html(enemy.MaxHealth + "/" + enemy.MaxHealth);
        $(".shield-box-enemy .shield-bar-text").html(enemy.MaxShield + "/" + enemy.MaxShield);
        $(".enemy-name").html(enemy.Name);
        localStorage.setItem("currEnemyType", pokedex[temp2].type[0]);  
        if(pokedex[temp2].type[1]!=null) {    
            localStorage.setItem("currEnemyType2", pokedex[temp2].type[1]);    
        } else {
            localStorage.setItem("currEnemyType2", null); 
        }
        // enemy pokemon info
        if(checkType(pokedex[temp2].type)==true) { // 2types
            $('#enemyInfo').html(`
            <div class="container">
            <div class="row">
            <div class="col-4">
            <p>Type: </p>
            </div>
            <div class="col-8">
            <img src="images/type/${pokedex[temp2].type[0]}.gif">
            <img src="images/type/${pokedex[temp2].type[1]}.gif">
            </div>
            </div>
        
            <div class="row">
            <div class="col-4">
                    <p>HP: </p> 
            </div>
        
            <div class="col-8">
                    <div class="progress" style="height: 25px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${pokedex[temp2].base.HP}%" aria-valuenow="${pokedex[temp2].base.HP}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.HP}</div>
                          </div>
                </div>
        
        </div>
        
        <div class="row">
                <div class="col-4">
                        <p>Attack: </p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${pokedex[temp2].base.Attack}%" aria-valuenow="${pokedex[temp2].base.Attack}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Attack}</div>
                              </div>
                    </div>
        </div>
        
        
        <div class="row">
                <div class="col-4">
                        <p>Defense:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${pokedex[temp2].base.Defense}%" aria-valuenow="${pokedex[temp2].base.Defense}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Defense}</div>
                              </div>
                    </div>
        </div>
        
        
        
        <div class="row">
                <div class="col-4">
                        <p>Speed:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${pokedex[temp2].base.Speed}%" aria-valuenow="${pokedex[temp2].base.Speed}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Speed}</div>
                              </div>
                    </div>
        </div>
        
        
        
        </div> 
        `);
            } else {
                $('#enemyInfo').html(`
                <div class="container">
                <div class="row">
                <div class="col-4">
                <p>Type: </p>
                </div>
                <div class="col-8">
                <img src="images/type/${pokedex[temp2].type[0]}.gif">
                </div>
                </div>
            
                <div class="row">
                <div class="col-4">
                        <p>HP: </p> 
                </div>
            
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${pokedex[temp2].base.HP}%" aria-valuenow="${pokedex[temp2].base.HP}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.HP}</div>
                              </div>
                    </div>
            
            </div>
            
            <div class="row">
                    <div class="col-4">
                            <p>Attack: </p>
                    </div>
                    <div class="col-8">
                            <div class="progress" style="height: 25px;">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${pokedex[temp2].base.Attack}%" aria-valuenow="${pokedex[temp2].base.Attack}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Attack}</div>
                                  </div>
                        </div>
            </div>
            
            
            <div class="row">
                    <div class="col-4">
                            <p>Defense:</p>
                    </div>
                    <div class="col-8">
                            <div class="progress" style="height: 25px;">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: ${pokedex[temp2].base.Defense}%" aria-valuenow="${pokedex[temp2].base.Defense}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Defense}</div>
                                  </div>
                        </div>
            </div>
            
            
            
            <div class="row">
                    <div class="col-4">
                            <p>Speed:</p>
                    </div>
                    <div class="col-8">
                            <div class="progress" style="height: 25px;">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width: ${pokedex[temp2].base.Speed}%" aria-valuenow="${pokedex[temp2].base.Speed}" aria-valuemin="0" aria-valuemax="250">${pokedex[temp2].base.Speed}</div>
                                  </div>
                        </div>
            </div>
            
            
            
            </div> 
            `);
            } 
            // enemy pokemon info   
            
            let myhtml = document.createElement("div");
myhtml.innerHTML= `Wild <span style="font-weight: bold;">${enemy.Name}</span> has appeard, what would you like to do?`;



let buttons = {
    change: "Change Pokemons",
    run: "Run Away",
    fight: "Fight"
}


swal({                  
content: myhtml,
buttons: buttons,
dangerMode: true,
})

.then((value) => {
if (value=="fight") {
} else if(value=="run") {
    spawnNewEnemy();
} else {
    let tempLastPokemon = localStorage.getItem("choosenPokemon")-1;
    myhtml.innerHTML =``;
    for (i=0;i<pokeInventory.length;i++) {
        if(pokeInvHP[i].id!=tempLastPokemon) {
            if(pokeInvHP[i].hp==0) {
                myhtml.innerHTML  += `<img class="pokemons-inventory disabled"  src="images/pokegif/${pokedex[pokeInvHP[i].id].id}.webp">`
            } else {
                myhtml.innerHTML  += `<img class="pokemons-inventory"  src="images/pokegif/${pokedex[pokeInvHP[i].id].id}.webp">`
        }
    }
    }
    
    $(".pokemons-inventory").click(function () {
        $('.pokemons-inventory').css({ 'transform': 'scale(1)'});
        $(this).css({ 'transform': 'scale(2)'});
        localStorage.setItem("choosenPokemon", this.src.slice(this.src.search('pokegif')).match(/\d+/g).map(Number)[0]);
    });
    swal({                  
        content: myhtml,
        buttons:"Confirm",
        dangerMode: true,
        })
    .then((value) => {
      changePokemon(tempLastPokemon);
    });
}
});
enemy.CurrType = localStorage.getItem("currEnemyType").toLowerCase();
enemy.CurrType2 = localStorage.getItem("currEnemyType2").toLowerCase();
    }


    function spawnHero() {
        let temp2 = localStorage.getItem("choosenPokemon") - 1;
        let temp = temp2+1;
        if(pokedex[temp2].type[1]==null) {
            $('#heroSpawn').html(`<img id="heroPokeImg"   src="images/pokegif/${temp}.webp">`)
        } else {
            $('#heroSpawn').html(`<img id="heroPokeImg" src="images/pokegif/${temp}.webp">`)
        }
        $('#heroSpawn').animate({'opacity': '1'}, 1000);
        hero.Name = pokedex[temp2].name.english;
        hero.MaxHealth = pokedex[temp2].base.HP;
        hero.CurrHealth = pokedex[temp2].base.HP;
        hero.MaxShield = pokedex[temp2].base.Defense;
        hero.CurrShield = pokedex[temp2].base.Defense;
        $(".health-box-hero .health-bar-text").html(hero.MaxHealth + "/" + hero.MaxHealth);
        $(".shield-box-hero .shield-bar-text").html(hero.MaxShield + "/" + hero.MaxShield);
        $(".hero-name").html(hero.Name);
        localStorage.setItem("currHeroType", pokedex[temp2].type[0]);
        if(pokedex[temp2].type[1]!=null) {    
            localStorage.setItem("currHeroType2", pokedex[temp2].type[1]);    
        } else {
            localStorage.setItem("currHeroType2", null); 
        }
        hero.CurrType = localStorage.getItem("currHeroType").toLowerCase();
        hero.CurrType2 = localStorage.getItem("currHeroType2").toLowerCase();
        heroAttackList();
    }


    function clickPokemon() {
        
    }


    function changePokemon(tempLastPokemon) {
        for(i=0;i<pokeInventory.length;i++) {
            if(pokeInvHP[i].id==tempLastPokemon) {
                pokeInvHP[i].hp = hero.CurrHealth;
                pokeInvHP[i].shield = hero.CurrShield;
            }
        }
        localStorage.setItem("pokemonHP", JSON.stringify(pokeInvHP));
        let temp2 = localStorage.getItem("choosenPokemon") - 1;
        let temp = temp2+1;
        if(pokedex[temp2].type[1]==null) {
            $('#heroSpawn').html(`<img id="heroPokeImg"   src="images/pokegif/${temp}.webp">`)
        } else {
            $('#heroSpawn').html(`<img id="heroPokeImg" src="images/pokegif/${temp}.webp">`)
        }
        $('#heroSpawn').animate({'opacity': '1'}, 1000);
        hero.Name = pokedex[temp2].name.english;
        hero.MaxHealth = pokedex[temp2].base.HP;
        hero.CurrHealth = pokedex[temp2].base.HP;
        hero.MaxShield = pokedex[temp2].base.Defense;
        hero.CurrShield = pokedex[temp2].base.Defense;
        $(".health-box-hero .health-bar-text").html(hero.MaxHealth + "/" + hero.MaxHealth);
        $(".shield-box-hero .shield-bar-text").html(hero.MaxShield + "/" + hero.MaxShield);
        $(".hero-name").html(hero.Name);
        localStorage.setItem("currHeroType", pokedex[temp2].type[0]);
        if(pokedex[temp2].type[1]!=null) {    
            localStorage.setItem("currHeroType2", pokedex[temp2].type[1]);    
        } else {
            localStorage.setItem("currHeroType2", null); 
        }
        hero.CurrType = localStorage.getItem("currHeroType").toLowerCase();
        hero.CurrType2 = localStorage.getItem("currHeroType2").toLowerCase();

        let pokeCurrShield;
        let pokeCurrHP;
        for(i=0;i<pokeInventory.length;i++) {
            if(pokeInvHP[i].id==temp2) {
                pokeCurrHP = pokeInvHP[i].hp;
                pokeCurrShield = pokeInvHP[i].shield;
            }
        }
        console.log(pokeCurrHP);
        console.log(pokeCurrShield);
        console.log(pokedex[temp2].base.HP);
        console.log(pokedex[temp2].base.Defense);
        if(pokedex[temp2].base.HP==pokeCurrHP && pokedex[temp2].base.Defense == pokeCurrShield) {
            $(".health-box-hero .health-bar-red").animate({width: "100%"}, 700);
            $(".health-box-hero .health-bar").animate({width: "100%"}, 500);
            $(".health-box-hero .health-bar-text").html(pokeCurrHP + "/" + pokeCurrHP);
            $(".shield-box-hero .shield-bar-red").animate({width: "100%"}, 700);
            $(".shield-box-hero .shield-bar").animate({width: "100%"}, 500);
            $(".shield-box-hero .shield-bar-text").html(pokeCurrShield + "/" + pokeCurrShield);
            
        } else {
        $(".health-box-hero .health-bar-red").animate({width: pokeCurrHP + "%"}, 700);
        $(".health-box-hero .health-bar").animate({width: pokeCurrHP + "%"}, 500);
        $(".health-box-hero .health-bar-text").html(pokeCurrHP + "/" + hero.MaxHealth);
        $(".shield-box-hero .shield-bar-red").animate({width: pokeCurrShield + "%"}, 700);
        $(".shield-box-hero .shield-bar").animate({width: pokeCurrShield + "%"}, 500);
        $(".shield-box-hero .shield-bar-text").html(pokeCurrShield + "/" + hero.MaxShield);
        }
            heroAttackList();

        }


    
    function hitAnimation(attacker) {
        if(attacker=="hero") {
            $('#heroSpawn').animate({'right': '82%', 'margin-top': "10px"}, 50);
            $('#heroSpawn').animate({'right': '84%', 'margin-top': "-10px"}, 50);
            $('#heroSpawn').animate({'right': '80%', 'top': "60%", 'margin-top': "0xp"}, 50);
        } else { // attacker = enemy
            $('#enemySpawn').animate({'left': '82%', 'margin-top': "10px"}, 50);
            $('#enemySpawn').animate({'left': '84%', 'margin-top': "-10px"}, 50);
            $('#enemySpawn').animate({'left': '80%', 'top': "60%", 'margin-top': "0xp"}, 50);
        }
    }

    

   function spawnNewEnemy() {
    $('#enemySpawn').animate({'opacity': '0.2'}, 1);
    setTimeout(function() {
        spawnEnemy();
        $(".health-box-enemy .health-bar").css({width: "100%"});
        $(".shield-box-enemy .shield-bar").css({width: "100%"});
        $('#enemyPokeImg').animate({'opacity': '1'}, 2000);
        $('.health-box-enemy').animate({'opacity': '1'}, 2000);
        $('.shield-box-enemy').animate({'opacity': '1'}, 2000);
        $('.enemy-name').animate({'opacity': '1'}, 2000);
        $('.msg-board').html(`Wild ${enemy.Name} has appeared!`);
    }, 2000);
    setTimeout(function() {
        roundCounter++;
        $('.blinkRound2').html("Round " + roundCounter);
        $('.blinkRound2').fadeIn();
        }, 3000);
    setTimeout(function() {
        $('.blinkRound2').fadeOut();
        $('.attack-list').removeClass('disabled');
    }, 6000);
   }

    let accounts = localStorage.getItem('accounts');
    let accounts2 = JSON.parse(accounts);
    let expChart =  [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550];
    let playerLevel = checkAccountStats("trainerLevel", localStorage.getItem('lastLoggedName'));
    let playerCurrentExp = checkAccountStats("trainerExp", localStorage.getItem('lastLoggedName'));
    let neededExp = (expChart[playerLevel-1])-(playerCurrentExp);
    console.log(playerLevel);
    console.log(playerCurrentExp);
    console.log("Exp needed" +neededExp );

 
   function addMoney(amount) {
    let accID = localStorage.getItem('loggedAccID')-1;
    let oldMoney = accounts2[accID].pokeMoney;
    let newMoney = oldMoney + amount;
    accounts2[accID].pokeMoney = newMoney;
    localStorage.setItem('accounts', JSON.stringify(accounts2));
}

    function addBattlesWon() {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldBattlesWon = accounts2[accID].battlesWon;
        let newBattlesWon = oldBattlesWon+1;
        accounts2[accID].battlesWon = newBattlesWon;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
    }

    function addNumberOfBattles() {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldNumberOfBattles = accounts2[accID].numberOfBattles;
        let newNumberOfBattles = oldNumberOfBattles+1;
        accounts2[accID].numberOfBattles = newNumberOfBattles;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
    }

    function addExp(amount) {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldExp = accounts2[accID].trainerExp;
        let newExp = oldExp + amount;
        if(newExp > expChart[playerLevel-1]) {
            let extraExp = newExp-expChart[playerLevel-1];
            newExp = extraExp;
            levelUp();
        }
        accounts2[accID].trainerExp = newExp;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
    }

    function levelUp() {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldLevel = accounts2[accID].trainerLevel;
        let newLevel = oldLevel+1;
        accounts2[accID].trainerLevel = newLevel;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
    }

    
    
    // let test5 = [];
    // let xp = 100;
    // let xpMulti = 1;
    // for (i=0; i<50; i++) {
    //     test5[i]=xp*xpMulti;
    //     xpMulti+=0.5;
    // }
    // console.log(test5);




    function pokemonDeath(who) {
        addNumberOfBattles();
        if(who=="enemy") {
            let randomExp = (Math.floor(Math.random()*9) + 10) * roundCounter;
            let randomMoney = (Math.floor(Math.random()*9) + 10) * roundCounter;
            $('#enemyPokeImg').animate({'opacity': '0'}, 2000);
            $('.health-box-enemy').animate({'opacity': '0'}, 2000);
            $('.shield-box-enemy').animate({'opacity': '0'}, 2000);
            $('.enemy-name').animate({'opacity': '0'}, 2000);
            setTimeout(function() {
            addMoney(randomMoney);
            addBattlesWon();
            addExp(randomExp);
            }, 500);
            setTimeout(function() {
                let myhtml = document.createElement("div");
                if ((randomExp-(checkAccountStats("trainerExp", localStorage.getItem("lastLoggedName"))) )<= 0) {
                    myhtml.innerHTML = '<img class="victory-img" src="images/win.png"> <br> <br>' + "Here is your rewards: <br>"+ randomExp +'<img class="poke-money-icon" src="images/expicon.png">' +"   " +  randomMoney+ "<img class='poke-money-icon' src='images/pokemoneyicon.png'>"+
                    "<br> <br> Current Stats: <br>" + checkAccountStats("trainerLevel", localStorage.getItem("lastLoggedName"))+ `<img  class="poke-money-icon" src="images/levelicon.png"></img>`+"   " +  checkAccountStats("trainerExp", localStorage.getItem("lastLoggedName"))+ " / " + expChart[playerLevel-1] +`<img  class="poke-money-icon" src="images/expicon.png"></img>` +"   "+ checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon" src="images/pokemoneyicon.png"></img>` 
                    "<br> <br>Do you want to continue?";
                } else {
                    myhtml.innerHTML = '<img class="victory-img" src="images/win.png"> <br> <br>' + "Here is your rewards: <br>"+ "1" + `<img  class="poke-money-icon" src="images/levelicon.png"></img>` +"   " + randomExp +'<img class="poke-money-icon" src="images/expicon.png">' +"   " +  randomMoney+ "<img class='poke-money-icon' src='images/pokemoneyicon.png'>"+
                    "<br> <br> Current Stats: <br>" + checkAccountStats("trainerLevel", localStorage.getItem("lastLoggedName"))+ `<img  class="poke-money-icon" src="images/levelicon.png"></img>`+"   " +  checkAccountStats("trainerExp", localStorage.getItem("lastLoggedName"))+ " / " + expChart[playerLevel-1] +`<img  class="poke-money-icon" src="images/expicon.png"></img>` +"   "+ checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon" src="images/pokemoneyicon.png"></img>` 
                    "<br> <br>Do you want to continue?";
                }
                swal({                  
                content: myhtml,
                buttons: ["Run Away", "Continue!"],
                dangerMode: true,
              })
              
              .then((willDelete) => {
                if (willDelete) {
                    spawnNewEnemy();
                    // playerLevel = checkAccountStats("trainerLevel", localStorage.getItem('lastLoggedName'));
                    // playerCurrentExp = checkAccountStats("trainerExp", localStorage.getItem('lastLoggedName'));
                    // neededExp = (expChart[playerLevel-1])-(playerCurrentExp);
                    // console.log(playerLevel);
                    // console.log(playerCurrentExp);
                    // console.log("Exp needed" +neededExp );
                    
                } else {
                  window.location.href = "index.html";
                }
              });
            }, 2000);


        } else {
            $('#heroPokeImg').animate({'opacity': '0'}, 2000);
            $('.health-box-hero').animate({'opacity': '0'}, 2000);
            $('.shield-box-hero').animate({'opacity': '0'}, 2000);
            $('.hero-name').animate({'opacity': '0'}, 2000);
            $('.attack-list').animate({'opacity': '0'}, 2000);
            // setTimeout(function() {
            //       let myhtml = document.createElement("div");
            //       myhtml.innerHTML = '<img class="lose-img" src="images/lose.png">' +
            //       "<br> <br> Current Stats: <br>" + checkAccountStats("trainerLevel", localStorage.getItem("lastLoggedName"))+ `<img  class="poke-money-icon" src="images/levelicon.png"></img>`+"   " +  checkAccountStats("trainerExp", localStorage.getItem("lastLoggedName"))+ " / " + expChart[playerLevel-1] +`<img  class="poke-money-icon" src="images/expicon.png"></img>` +"   "+ checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon" src="images/pokemoneyicon.png"></img> <br> <br>` +
            //       "<br> Do you want to try again?";
            //       swal({                  
            //       html: true,
            //       content: myhtml,
            //       buttons: ["No", "Yes"],
            //       dangerMode: true,
            //     })

            //       .then((willDelete) => {
            //         if (willDelete) {
            //             location.reload();
            //         } else {
            //           window.location.href = "index.html";
            //         }
            //       });
            //     }, 2000);

            let myhtml = document.createElement("div");
            let tempLastPokemon = localStorage.getItem("choosenPokemon")-1;
            myhtml.innerHTML =``;
            for (i=0;i<pokeInventory.length;i++) {
                if(pokeInvHP[i].id!=tempLastPokemon) {
                    if(pokeInvHP[i].hp==0) {
                        myhtml.innerHTML  += `<img class="poke-death-inventory"  src="images/pokegif/${pokedex[pokeInvHP[i].id].id}.webp">`
                    } else {
                        myhtml.innerHTML  += `<img class="poke-death-inventory"  src="images/pokegif/${pokedex[pokeInvHP[i].id].id}.webp">`
                }
            }
            }
            
            $(".poke-death-inventory").click(function () {
                $('.poke-death-inventory').css({ 'transform': 'scale(1)'});
                $(this).css({ 'transform': 'scale(2)'});
                localStorage.setItem("choosenPokemon", this.src.slice(this.src.search('pokegif')).match(/\d+/g).map(Number)[0]);
            });
            swal({                  
                content: myhtml,
                buttons:"Confirm",
                dangerMode: true,
                })
            .then((value) => {
              changePokemon(tempLastPokemon);
            });
        }
        
    }

    function pokemonAttack(attacker, dmg) {
        $("#pokemon-hit-audio").get(0).play();
        if(attacker=="hero") {
            if(enemy.CurrShield>0) {
            if(enemy.CurrShield-dmg>0) {
                enemy.CurrShield-=dmg;
                hitAnimation("hero");
                applyChange("enemy", "shield", enemy.CurrShield);
                $('.attack-list').addClass('disabled');
              

                if(enemy.CurrHealth>0) {
                    setTimeout(function() { 
                        let enemyRandomAttack = enemyAttackList();
                        let dmgMultiplier = checkDmgChange("enemy", enemyRandomAttack[2]);
                        pokemonAttack("enemy", enemyRandomAttack[1]*dmgMultiplier);
                        $('.msg-board').html(`${enemy.Name} has used ${fixAttackName(enemyRandomAttack[0])}`);
                        if(hero.CurrHealth!=0) {
                            $('.attack-list').removeClass('disabled');
                        }
                    }, 3000);
                } else { // hero wins
                    setTimeout(function() { 
                        pokemonDeath("enemy");
                        $('.msg-board').html(`${hero.Name} is the Winner`);
                    }, 3000);
                    
                }
               
            } else {
                enemy.CurrShield-=dmg;
                enemy.CurrHealth+=enemy.CurrShield;
                if(enemy.CurrHealth<0){
                    enemy.CurrHealth=0;
                }
                enemy.CurrShield=0;
                hitAnimation("hero");
                applyChange("enemy", "shield", enemy.CurrShield);
                applyChange("enemy", "health", enemy.CurrHealth);
                $('.attack-list').addClass('disabled');
              
                if(enemy.CurrHealth>0) { 
                    setTimeout(function() { 
                        let enemyRandomAttack = enemyAttackList();
                        let dmgMultiplier = checkDmgChange("enemy", enemyRandomAttack[2]);
                        pokemonAttack("enemy", enemyRandomAttack[1]*dmgMultiplier);
                        $('.msg-board').html(`${enemy.Name} has used ${fixAttackName(enemyRandomAttack[0])}`);
                        if(hero.CurrHealth!=0) {
                            $('.attack-list').removeClass('disabled');
                        }
                    }, 3000);
                } else { // hero wins
                    setTimeout(function() { 
                        pokemonDeath("enemy");
                        $('.msg-board').html(`${hero.Name} is the Winner`);
                    }, 3000);
                }
            }    

            } else {
                enemy.CurrHealth-=dmg;
                    if(enemy.CurrHealth<0) { //hero wins
                        enemy.CurrHealth=0;          
                        setTimeout(function() { 
                            pokemonDeath("enemy");
                            $('.msg-board').html(`${hero.Name} is the Winner`);
                        }, 3000);
                    }
                hitAnimation("hero");
                applyChange("enemy", "health", enemy.CurrHealth);
                $('.attack-list').addClass('disabled');
          

                if(enemy.CurrHealth>0) { 
                    setTimeout(function() { 
                        let enemyRandomAttack = enemyAttackList();
                        let dmgMultiplier = checkDmgChange("enemy", enemyRandomAttack[2]);
                        pokemonAttack("enemy", enemyRandomAttack[1]*dmgMultiplier);
                        $('.msg-board').html(`${enemy.Name} has used ${fixAttackName(enemyRandomAttack[0])}`);
                        if(hero.CurrHealth!=0) {
                            $('.attack-list').removeClass('disabled');
                        }
                    }, 3000);
                } else { // hero wins
                    setTimeout(function() { 
                        pokemonDeath("enemy");
                        $('.msg-board').html(`${hero.Name} is the Winner`);
                    }, 3000);
                }
            }
            
        } else { // attacker = enemy
            if(hero.CurrShield>0) {
                if(hero.CurrShield-dmg>0) {
                    hero.CurrShield-=dmg;
                    applyChange("hero", "shield", hero.CurrShield);
                    hitAnimation("enemy");

                    if(hero.CurrHealth==0) { // enemy win
                        setTimeout(function() { 
                            pokemonDeath("hero");
                            $('.msg-board').html(`${enemy.Name} is the Winner`);
                        }, 3000);
                    }
                } else {
                    hero.CurrShield-=dmg;
                    hero.CurrHealth+=hero.CurrShield;
                    hero.CurrShield=0;
                    if(hero.CurrHealth<0){
                        hero.CurrHealth=0;
                    }
                    applyChange("hero", "shield", hero.CurrShield);
                    applyChange("hero", "health", hero.CurrHealth);
                    hitAnimation("enemy");

                    if(hero.CurrHealth==0) { // enemy win
                        setTimeout(function() { 
                            pokemonDeath("hero");
                            $('.msg-board').html(`${enemy.Name} is the Winner`);
                        }, 3000);
                    }
                }
            } else {
                if(hero.CurrHealth-dmg<0) {
                    hero.CurrHealth=0;
                } else {
                    hero.CurrHealth-=dmg;
                }
                applyChange("hero", "health", hero.CurrHealth);
                hitAnimation("enemy");

                if(hero.CurrHealth==0) { // enemy win
                    setTimeout(function() { 
                        pokemonDeath("hero");
                        $('.msg-board').html(`${enemy.Name} is the Winner`);
                    }, 3000);
                }
            }
        }
        
    }


    
    function applyChange() {

    }

    function applyChange(attacked, stat, newValue) {
        if(attacked=="enemy") {
            if(stat=="health") {
                let a = newValue;
                $(".health-box-enemy .health-bar-red").animate({width: a + "%"}, 700);
                $(".health-box-enemy .health-bar").animate({width: a + "%"}, 500);
                $(".health-box-enemy .health-bar-text").html(a + "/" + enemy.MaxHealth);
            } 
            if(stat=="shield") {
                let a = newValue;
                $(".shield-box-enemy .shield-bar-red").animate({width: a + "%"}, 700);
                $(".shield-box-enemy .shield-bar").animate({width: a + "%"}, 500);
                $(".shield-box-enemy .shield-bar-text").html(a + "/" + enemy.MaxShield);
            }
        } else { // attacker = hero
            if(stat=="health") {
                let a = newValue;
                $(".health-box-hero .health-bar-red").animate({width: a + "%"}, 700);
                $(".health-box-hero .health-bar").animate({width: a + "%"}, 500);
                $(".health-box-hero .health-bar-text").html(a + "/" + hero.MaxHealth);
            } 
            if(stat=="shield") {
                let a = newValue;
                $(".shield-box-hero .shield-bar-red").animate({width: a + "%"}, 700);
                $(".shield-box-hero .shield-bar").animate({width: a + "%"}, 500);
                $(".shield-box-hero .shield-bar-text").html(a + "/" + hero.MaxShield);
            }
        }
    }



    function enemyAttackList() {
        let enemyMove = returnPokeMoves("enemy");
        let randomAttack = Math.floor((Math.random()*4));
        let finalAttack = ["", 0, 0];
        finalAttack[0] = enemyMove[randomAttack].name;
        finalAttack[1] = enemyMove[randomAttack].power;
        finalAttack[2] = enemyMove[randomAttack].type;
        return finalAttack;
    }


    function heroAttackList() {
        $('.attack-list').html("");
        let tempMove = returnPokeMoves("hero");
        for(i=0;i<4;i++) {
            maxPP[i] = tempMove[i].pp;
            currPP[i] = maxPP[i];
            $('.attack-list').append(`<li class="Move${i}" data-toggle="tooltip" data-placement="top" title="Type: ${fixAttackName(tempMove[i].type)}, Power: ${tempMove[i].power}"><p class="attack-name"><strong> ${tempMove[i].name} </strong></p><p class="attack-count">${tempMove[i].pp}  / ${tempMove[i].pp}</p></li>`);
            }
    
            $(".Move0").click(function() {
                let dmgMultiplier = checkDmgChange("hero", tempMove[0].type);
                pokemonAttack("hero", tempMove[0].power*dmgMultiplier);
                currPP[0]-=1;
                $(".Move0 .attack-count").html(`<small> ${currPP[0]} / ${maxPP[0]} </small>`);
                $('.msg-board').html(`${hero.Name} has used ${fixAttackName(tempMove[0].name)}`);
            }
            );
        
            $(".Move1").click(function() {
                let dmgMultiplier = checkDmgChange("hero", tempMove[1].type);
                pokemonAttack("hero", tempMove[1].power*dmgMultiplier);
                currPP[1]-=1;
                $(".Move1 .attack-count").html(`<small> ${currPP[1]} / ${maxPP[1]} </small>`);
                $('.msg-board').html(`${hero.Name} has used ${fixAttackName(tempMove[1].name)}`);
            }
            );
        
            $(".Move2").click(function() {
                let dmgMultiplier = checkDmgChange("hero", tempMove[2].type);
                pokemonAttack("hero", tempMove[2].power*dmgMultiplier);
                currPP[2]-=1;
                $(".Move2 .attack-count").html(`<small>${currPP[2]} / ${maxPP[2]} </small>`);
                $('.msg-board').html(`${hero.Name} has used ${fixAttackName(tempMove[2].name)}`);
            }
            );
        
            $(".Move3").click(function() {
                let dmgMultiplier = checkDmgChange("hero", tempMove[3].type);
                pokemonAttack("hero", (tempMove[3].power*dmgMultiplier));
                currPP[3]-=1;
                $(".Move3 .attack-count").html(`<small> ${currPP[3]} / ${maxPP[3]} </small>`);
                $('.msg-board').html(`${hero.Name} has used ${fixAttackName(tempMove[3].name)}`);
            }
            );
    
    }

    //  attack list hero
   
        $('[data-toggle="tooltip"]').tooltip();

        }, 3000);

        //  attack list hero



        // pokemon info
        $("#heroSpawn").hover(function() {
            pokemonInfo('hero');
        },
        function() {
            closePokemonInfo('hero');
        }
        );

        $("#enemySpawn").hover(function() {
            pokemonInfo('enemy');
        },
        function() {
            closePokemonInfo('enemy');
        }
        );
        // pokemon info
         




