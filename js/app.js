$('#sidebar').toggleClass('active');
$('#sign-in').click(signIn);
$('#backwardsSignUp').click(closeSignUpForm);
document.getElementById("audioplayer").volume = 0.1;


// let temp2 = localStorage.getItem('accounts');
// let arr2 = JSON.parse(temp2);
// console.log(arr2);
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

// let test = firebase.database().ref('Moves');
// test.once('value').then(function(snapshot) {
// let test2 = snapshot.val();    
// console.log(test2);
// });



let pokedexTemp2 = JSON.parse(localStorage.getItem('pokedexJSON'));
let pokedexTemp = JSON.parse(pokedexTemp2);


let accounts = [];

if((localStorage.getItem('pokedexJSON'))==null) {
    $.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json',
    function(data) {
    let dataToStore = JSON.stringify(data);
    localStorage.setItem('pokedexJSON', dataToStore);
    } );  
}  

if((localStorage.getItem('evoultionJSON'))==null) {
    $.get('https://raw.githubusercontent.com/totobilbi/test/master/evolutionJS',
    function(data) {
    let dataToStore = JSON.stringify(data);
    localStorage.setItem('evolutionJSON', dataToStore);
    } );  
} 

if((localStorage.getItem('movesJSON'))==null) {
    $.get('https://api.myjson.com/bins/1gdhy8',
    function(data) {
    let dataToStore = JSON.stringify(data);
    localStorage.setItem('movesJSON', dataToStore);
    } );  
} 

if((localStorage.getItem('shopJSON'))==null) {
    $.get('https://raw.githubusercontent.com/totobilbi/test/master/shopValue',
    function(data) {
    let dataToStore = JSON.stringify(data);
    localStorage.setItem('shopJSON', dataToStore);
    } );  
} 



if(localStorage.getItem('accID')==null) {
    localStorage.setItem('accID', 1);
}


let x = localStorage.getItem('checked');
if(x=="true") {
    getIn();
} else {
    localStorage.setItem('isLogged', false);
}

let evolutionJSON2 = JSON.parse(localStorage.getItem('evolutionJSON'));
let evolutionJSON = JSON.parse(evolutionJSON2);



function extractNumFromString (randomString) {
    let temp = randomString.match(/\d+/)[0];
    return temp;
    // alert(extractNumFromString(evolutionJSON[0].baseStamina));

}


function closeSignUpForm() {
    window.onscroll=function(){};
    $('#light').hide();
    $('#fade').hide();
}

function openSignUpForm() {
    $('#light').show();
    $('#fade').show();
    window.scrollTo(0,0);
    window.onscroll = function () { window.scrollTo(0, 0); };
}



function writeUserData(name, pass, email) {
    firebase.database().ref('users/').set({
      username: name,
      password: pass,
      email: email,
    });
  }

//   writeUserData("roei", "hatil", "roei@gmail.com");

function createAccount() {
    let name = $('#nName').val();
    let pass = $('#nPass').val();
    let email = $('#nEmail').val();
    let poke = $('#nPoke').val();
 

        let acc =
        {
        'accID': localStorage.getItem('accID'),
        'userName': name,
        'userPassword': pass,
        'userEmail': email,
        'userPoke': poke,
        'trainerLevel': 1,
        'trainerExp': 0,
        'numberOfPokemons': 0,
        'numberOfBattles': 0,
        'pokeMoney': 0,
        'battlesWon': 0,
        'pokeInventory': [0, 3, 6]
        }

        if(name=="" || pass=="" || email=="" || poke=="") {
            swal({
                title: `Please fill all of the information`,
                icon: "error",
                button: "Okay",
            });
        } else {
            let temp = localStorage.getItem('accounts');
            if(temp==null) {
                let arr = [];
                arr.push(acc);
                localStorage.setItem('accounts', JSON.stringify(arr));
                swal({
                    title: `Welcome ${name}`,
                    text: "Your account has been created successfully!",
                    icon: "success",
                    button: "Okay",
                });
                let temp7 =  localStorage.getItem('accID');
                temp7++;
                localStorage.setItem('accID', temp7);
                closeSignUpForm();
            } else {
                if(checkAccountExist()==false) {
                let arr = JSON.parse(temp);
                arr.push(acc);
                localStorage.setItem('accounts', JSON.stringify(arr));
                swal({
                    title: `Welcome ${name}`,
                    text: "Your account has been created successfully!",
                    icon: "success",
                    button: "Okay",
                });
                let temp7 =  localStorage.getItem('accID');
                temp7++;
                localStorage.setItem('accID', temp7);
                closeSignUpForm();
                }
            }
        }
    }

function mustSignUp() {
    let temp = localStorage.getItem('isLogged');
    if(temp=="true") {
        window.location.href="play.html"
    } else {
        swal({
            title: `Login required`,
            text: "You have to sign-in your account to procced",
            icon: "warning",
            button: "Okay",
          });
    }
}

function mustSignUp2() {
    let temp = localStorage.getItem('isLogged');
    if(temp=="true") {
        window.location.href="Pokedex.html"
    } else {
        swal({
            title: `Login required`,
            text: "You have to sign-in your account to procced",
            icon: "warning",
            button: "Okay",
          });
    }
}

function checkAccountExist() {
    let name = $('#nName').val();
    let email = $('#nEmail').val();
    let temp = localStorage.getItem('accounts');
    let arr = JSON.parse(temp);
    for(x of arr) {
        if(name==x.userName) {
            swal({
                title: `User name is already taken`,
                icon: "error",
                button: "Okay",
              });
            return true;
        } else if (email==x.userEmail) {
            swal({
                title: `Email is already taken`,
                icon: "error",
                button: "Okay",
              });
            return true;
        }
    }
    return false;
}

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


function getIn() {
    let temp = localStorage.getItem('lastLoggedName');
    let trainerLevel = checkAccountStats("trainerLevel", temp);
    let trainerExp = checkAccountStats("trainerExp", temp);
    let numberOfPokemons = checkAccountStats("numberOfPokemons", temp);
    let numberOfBattles = checkAccountStats("numberOfBattles", temp);
    let pokeMoney =  checkAccountStats("pokeMoney", temp);
    let battlesWon = checkAccountStats("battlesWon", temp);
    let pokeInventory = checkAccountStats("pokeInventory", temp);
    let expChart =  [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550];
    let playerLevel = checkAccountStats("trainerLevel", localStorage.getItem('lastLoggedName'));
    localStorage.setItem('isLogged', true);
    $('#login').hide();
    $('.sign-container').hide();
    $('#login2').addClass('col-6');
    $('#login2').html(`<p class="mainForms">Welcome ${temp},</p> <p>Your pokemons have missed you!</p><br> <br> `);
    for (x of pokeInventory) {
    $('#login2').append(`<img class="pokemons-inventory"  src="images/pokegif/${pokedexTemp[x].id}.webp">`);
    }
    $('#login2').append(`<br> <br> <br> <br> <br> <div class="press press-lg press-deeppurple press-pill" onclick="signOut()">Sign Out</div>`);
    $('#sign-out').css("visibility", "visible"); 
    $('#login3').addClass('col-6');
    $('#login3').html(`<br> <br> <p class="trainer-info-title"> Trainer Information: </p> <br> <p class="trainer-details"> Trainer Level: ${trainerLevel}<img class="poke-money-icon" src="images/levelicon.png"> </p> <p class="trainer-details"> Trainer Exp: ${trainerExp}  / `+ expChart[playerLevel-1] +` <img class="poke-money-icon" src="images/expicon.png"> </p>  <p class="trainer-details"> Number of Pokemons: ${numberOfPokemons} <img class="poke-money-icon" src="images/pokeicon.png"> </p>  <p class="trainer-details"> Number of Battles: ${numberOfBattles} <img class="poke-money-icon" src="images/numbattle.png"> </p>  <p class="trainer-details"> Battles Won: ${battlesWon} <img class="poke-money-icon" src="images/numwon.png">  </p>  <p class="trainer-details"> Poke Money: ${pokeMoney} <img class="poke-money-icon" src="images/pokemoneyicon.png"> </p>`);
} 



function signIn() {
    let c = 0;
    let name = $('#mName').val();
    let pass = $('#mPass').val();
    let temp = localStorage.getItem('accounts');
    if(temp==null) {
        swal({
            title: `Account doesn't exist`,
            text: "Your username or password are incorrect",
            icon: "error",
            button: "Okay",
        });
    } else {
        let arr = JSON.parse(temp);   
        let checkBox = $('#mCheckBox').is(':checked');
        if(checkBox==true) {
            localStorage.setItem('checked', "true");
        } else {
            localStorage.setItem('checked', "false");
        }
        for(x of arr) {
            if(name==x.userName && pass==x.userPassword) {
                localStorage.setItem('lastLoggedName', x.userName);
                localStorage.setItem('loggedAccID', x.accID);
                getIn();
            } else {
                c++;
            }   
        }
        if(c==arr.length) {
            swal({
                title: `Account doesn't exist`,
                text: "Your username or password are incorrect",
                icon: "error",
                button: "Okay",
            });
        }
    }
    
}


function signOut() {
    $('#login').show();
    $('.sign-container').show();
    $('#sign-out').css("visibility", "hidden");
    $('#login2').html("");
    $('#login2').removeClass('col-6');
    $('#login3').html("");
    $('#login3').removeClass('col-6');
    localStorage.setItem('checked', false);
    localStorage.setItem('isLogged', false);
    localStorage.setItem('loggedAccID', "null");
}







// must convert the object to string
// let obj = {"one": 1, "two": 2, "three": 3};
// let str = JSON.stringify(obj);

// save 
// localStorage.setItem('obj', str);

// get the object back
// localStorage.getItem('obj');






