$('#sidebar').toggleClass('active');
$('#poke-money-shop-show').html("Poke Money Balance:<br> " +checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon-balance" src="images/pokemoneyicon.png"></img>`);



let playerLevel = checkAccountStats("trainerLevel", localStorage.getItem('lastLoggedName'));
let shopJSON2 = JSON.parse(localStorage.getItem('shopJSON'));
let shopJSON = JSON.parse(shopJSON2);
let canBuyArr = [false, 1];

function addMoney(amount) {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldMoney = accounts2[accID].pokeMoney;
        let newMoney = oldMoney + amount;
        accounts2[accID].pokeMoney = newMoney;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
        $('#poke-money-shop-show').html("Poke Money Balance: " +checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon-balance" src="images/pokemoneyicon.png"></img>`);
}


function freeMoney() {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldMoney = accounts2[accID].pokeMoney;
        let newMoney = oldMoney + 5000;
        accounts2[accID].pokeMoney = newMoney;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
        $('#poke-money-shop-show').html("Poke Money Balance: " +checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon-balance" src="images/pokemoneyicon.png"></img>`);
}

function reduceMoney (amount) {
        let accID = localStorage.getItem('loggedAccID')-1;
        let oldMoney = accounts2[accID].pokeMoney;
        let newMoney = oldMoney - amount;
        accounts2[accID].pokeMoney = newMoney;
        localStorage.setItem('accounts', JSON.stringify(accounts2));
        $('#poke-money-shop-show').html("Poke Money Balance: " +checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"))+`<img  class="poke-money-icon-balance" src="images/pokemoneyicon.png"></img>`);
}



function checkAccountStats(stat, name) {
    let temp = localStorage.getItem('accounts');
    let arr4 = JSON.parse(temp);
    let statValue;
    for(x of arr4) {
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
let accounts = localStorage.getItem('accounts');
let accounts2 = JSON.parse(accounts);
let pokeInventory = checkAccountStats("pokeInventory", localStorage.getItem('lastLoggedName'));
let temp = JSON.parse(localStorage.getItem('pokedexJSON'));
let arr = JSON.parse(temp);
let evolutionJSON2 = JSON.parse(localStorage.getItem('evolutionJSON'));
let evolutionJSON = JSON.parse(evolutionJSON2);

function canBuy(pokeNum) {
        let okayToBuy = false;
        let reqLevel = 1;
        switch(shopJSON[pokeNum-1]) {
          case 250:
                  if(playerLevel>=1) {
                          okayToBuy = true;
                
                  }
          break;
          case 500:
                  if(playerLevel>=10) {
                          okayToBuy = true;
                  } else {
                          reqLevel = 10;
                  }
          break;
          case 1000:
                  if(playerLevel>=20) {
                          okayToBuy = true;
                  } else {
                          reqLevel = 20;
                  }
          break;
          case 2000:
                  if(playerLevel>=30) {
                          okayToBuy = true;
                  } else {
                          reqLevel = 30;
                  }
          break;
         }
canBuyArr[0] = okayToBuy;
canBuyArr[1] = reqLevel;
}

// function removePokemon(pokeNum) {
//         let accID = localStorage.getItem('loggedAccID')-1;
//         let oldInventory = accounts2[accID].pokeInventory;
//         let newInventory = oldInventory;
//         let index = newInventory.indexOf(pokeNum);
//         if (index > -1) {
//            newInventory.splice(index, 1);
//         }
//         accounts2[accID].pokeInventory = newInventory;
//         localStorage.setItem('accounts', JSON.stringify(accounts2));
// }




function buyPokemon(pokeNum) {
        // if(shopJSON[pokeNum]>250) {
        //         if(evolutionJSON[pokeNum].prevEvo[0]===undefined) {

        //         } else {
        //                 if(evolutionJSON[pokeNum].prevEvo[1]==undefined) {
        //                         removePokemon((evolutionJSON[pokeNum].prevEvo[0].Number)-1);
        //                 } else {
        //                         removePokemon((evolutionJSON[pokeNum].prevEvo[1].Number)-1);
        //                 }
        //         }
        // }
                let currMoney = checkAccountStats("pokeMoney", localStorage.getItem("lastLoggedName"));
                if(currMoney>=shopJSON[pokeNum]) {
                        let accID = localStorage.getItem('loggedAccID')-1;
                        let oldInventory = accounts2[accID].pokeInventory;
                        let newInventory = oldInventory;
                        newInventory.push(pokeNum);
                        accounts2[accID].pokeInventory = newInventory;
                        localStorage.setItem('accounts', JSON.stringify(accounts2));
                        reduceMoney(shopJSON[pokeNum]);
                        swal({                  
                                title: "Sweet!",
                                text: `You have purchased ${arr[pokeNum].name.english}`,
                        buttons: "OK",
                        dangerMode: true,
                        })
                        .then((willDelete) => {
                                if (willDelete) {
                                        window.location.href = "index.html";
                                }
                        });
                } else {
                        swal({                  
                                title: "Not enough Poke Money!",
                                text: `You are missing ${shopJSON[pokeNum]-currMoney} to buy ${arr[pokeNum].name.english}`,
                        buttons: "OK",
                        dangerMode: true,
                        });

                }
        
}


    let i=1;
    for(x of arr) {
        canBuy(i);
        


      if(pokeInventory.includes(x.id-1)==true) {

        if(checkType(x.type)==true) { // 2types
                $('.card-group').append(`
                        
        
                <div class="flip-card cardNum${i}">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
              
                    <div class="card">
                    <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${x.name.english}</h5>
                </div>
              </div>
        
        
              </div>
              <div class="flip-card-back">
        
              <div class="container">
              <h1> <button class="owned-pokemon-button"> OWNED </button> </h1>  
              <div class="row">
              <div class="col-4">
              <p>Type: </p>
              </div>
              <div class="col-8">
              <img src="images/type/${x.type[0]}.gif">
              <img src="images/type/${x.type[1]}.gif">
              </div>
              </div>
        
              <div class="row">
              <div class="col-4">
                      <p>HP: </p> 
              </div>
        
              <div class="col-8">
                      <div class="progress" style="height: 25px;">
                              <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                            </div>
                  </div>
        
          </div>
        
          <div class="row">
                  <div class="col-4">
                          <p>Attack: </p>
                  </div>
                  <div class="col-8">
                          <div class="progress" style="height: 25px;">
                                  <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                </div>
                      </div>
          </div>
        
        
          <div class="row">
                  <div class="col-4">
                          <p>Defense:</p>
                  </div>
                  <div class="col-8">
                          <div class="progress" style="height: 25px;">
                                  <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                </div>
                      </div>
          </div>
        
        
        
          <div class="row">
                  <div class="col-4">
                          <p>Speed:</p>
                  </div>
                  <div class="col-8">
                          <div class="progress" style="height: 25px;">
                                  <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                </div>
                      </div>
          </div>
        
        
        
        </div> 
        
        
                
              </div>
            </div>
          </div>
          `)
        
                  i++;
        


                
              } else {
                    $('.card-group').append(`
                        
        
                    <div class="flip-card cardNum${i}">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                  
                        <div class="card">
                        <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${x.name.english}</h5>
                    </div>
                  </div>
        
        
                  </div>
                  <div class="flip-card-back">
        
                  <div class="container">
                  <h1> <button class="owned-pokemon-button"> OWNED </button> </h1>          
                  <div class="row">
                  <div class="col-4">
                  <p>Type: </p>
                  </div>
                  <div class="col-8">
                  <img src="images/type/${x.type[0]}.gif">
                  </div>
                  </div>
        
        
              <div class="row">
                  <div class="col-4">
                          <p>HP: </p> 
                  </div>
        
                  <div class="col-8">
                          <div class="progress" style="height: 25px;">
                                  <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                                </div>
                      </div>
        
              </div>
        
              <div class="row">
                      <div class="col-4">
                              <p>Attack: </p>
                      </div>
                      <div class="col-8">
                              <div class="progress" style="height: 25px;">
                                      <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                    </div>
                          </div>
              </div>
        
        
              <div class="row">
                      <div class="col-4">
                              <p>Defense:</p>
                      </div>
                      <div class="col-8">
                              <div class="progress" style="height: 25px;">
                                      <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                    </div>
                          </div>
              </div>
        
        
        
              <div class="row">
                      <div class="col-4">
                              <p>Speed:</p>
                      </div>
                      <div class="col-8">
                              <div class="progress" style="height: 25px;">
                                      <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                    </div>
                          </div>
              </div>
        
        
        
          </div> 
        
        
                    
                  </div>
                </div>
              </div>
              `)
        
                      i++;
                        
        
                }   











      }   else {
        if(canBuyArr[0]== true) { //can buy
          if(checkType(x.type)==true) { // 2types
                $('.card-group').append(`
                        

                <div class="flip-card cardNum${i}">
                <div class="flip-card-inner">
                <div class="flip-card-front">
        
                <div class="card">
                <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                <div class="card-body">
                <h5 class="card-title">${x.name.english}</h5>
                </div>
        </div>


        </div>
        <div class="flip-card-back">

        <div class="container">
        <h1> <button class="pokemon-buy-button" onclick="buyPokemon(${x.id-1})">  <span class="pokemon-buy-text"> ${shopJSON[i-1]} <img class="poke-money-icon-shop" src="images/pokemoneyicon.png"> </span> </button> </h1>  
        <div class="row">
        <div class="col-4">
        <p>Type: </p>
        </div>
        <div class="col-8">
        <img src="images/type/${x.type[0]}.gif">
        <img src="images/type/${x.type[1]}.gif">
        </div>
        </div>

        <div class="row">
        <div class="col-4">
                <p>HP: </p> 
        </div>

        <div class="col-8">
                <div class="progress" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                        </div>
                </div>

        </div>

        <div class="row">
                <div class="col-4">
                        <p>Attack: </p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                </div>
                </div>
        </div>


        <div class="row">
                <div class="col-4">
                        <p>Defense:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                </div>
                </div>
        </div>



        <div class="row">
                <div class="col-4">
                        <p>Speed:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                </div>
                </div>
        </div>



        </div> 


                
        </div>
        </div>
        </div>
        `)

                i++;

        
        } else {
                $('.card-group').append(`
                        

                <div class="flip-card cardNum${i}">
                <div class="flip-card-inner">
                <div class="flip-card-front">
                
                        <div class="card">
                        <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${x.name.english}</h5>
                </div>
                </div>


                </div>
                <div class="flip-card-back">

                <div class="container">
        <h1> <button class="pokemon-buy-button" onclick="buyPokemon(${x.id-1})">  <span class="pokemon-buy-text"> ${shopJSON[i-1]} <img class="poke-money-icon-shop" src="images/pokemoneyicon.png"> </span> </button> </h1>  

                <div class="row">
                <div class="col-4">
                <p>Type: </p>
                </div>
                <div class="col-8">
                <img src="images/type/${x.type[0]}.gif">
                </div>
                </div>


        <div class="row">
                <div class="col-4">
                        <p>HP: </p> 
                </div>

                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                                </div>
                </div>

        </div>

        <div class="row">
                <div class="col-4">
                        <p>Attack: </p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                </div>
                        </div>
        </div>


        <div class="row">
                <div class="col-4">
                        <p>Defense:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                </div>
                        </div>
        </div>



        <div class="row">
                <div class="col-4">
                        <p>Speed:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                </div>
                        </div>
        </div>



        </div> 


                
                </div>
                </div>
        </div>
        `)

                i++;
                        

                }   
      
      } else { // can't buy
        if(checkType(x.type)==true) { // 2types
                $('.card-group').append(`
                        

                <div class="flip-card cardNum${i}">
                <div class="flip-card-inner">
                <div class="flip-card-front">

                <div class="card">
                <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                <div class="card-body">
                <h5 class="card-title">${x.name.english}</h5>
                </div>
        </div>


        </div>
        <div class="flip-card-back">

        <div class="container">
        <h1> <button class="req-pokemon-button"> Level ${canBuyArr[1]} Required </button> </h1>  
        <div class="row">
        <div class="col-4">
        <p>Type: </p>
        </div>
        <div class="col-8">
        <img src="images/type/${x.type[0]}.gif">
        <img src="images/type/${x.type[1]}.gif">
        </div>
        </div>

        <div class="row">
        <div class="col-4">
                <p>HP: </p> 
        </div>

        <div class="col-8">
                <div class="progress" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                        </div>
                </div>

        </div>

        <div class="row">
                <div class="col-4">
                        <p>Attack: </p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                </div>
                </div>
        </div>


        <div class="row">
                <div class="col-4">
                        <p>Defense:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                </div>
                </div>
        </div>



        <div class="row">
                <div class="col-4">
                        <p>Speed:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                </div>
                </div>
        </div>



        </div> 


                
        </div>
        </div>
        </div>
        `)

                i++;


        } else {
                $('.card-group').append(`
                        

                <div class="flip-card cardNum${i}">
                <div class="flip-card-inner">
                <div class="flip-card-front">
                
                        <div class="card">
                        <img src="images/pokemons/${i}.webp" class="card-img-top m-auto" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${x.name.english}</h5>
                </div>
                </div>


                </div>
                <div class="flip-card-back">

                <div class="container">
                <h1> <button class="req-pokemon-button"> Level ${canBuyArr[1]} Required </button> </h1>  

                <div class="row">
                <div class="col-4">
                <p>Type: </p>
                </div>
                <div class="col-8">
                <img src="images/type/${x.type[0]}.gif">
                </div>
                </div>


        <div class="row">
                <div class="col-4">
                        <p>HP: </p> 
                </div>

                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${x.base.HP}%" aria-valuenow="${x.base.HP}" aria-valuemin="0" aria-valuemax="250">${x.base.HP}</div>
                                </div>
                </div>

        </div>

        <div class="row">
                <div class="col-4">
                        <p>Attack: </p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${x.base.Attack}%" aria-valuenow="${x.base.Attack}" aria-valuemin="0" aria-valuemax="250">${x.base.Attack}</div>
                                </div>
                        </div>
        </div>


        <div class="row">
                <div class="col-4">
                        <p>Defense:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${x.base.Defense}%" aria-valuenow="${x.base.Defense}" aria-valuemin="0" aria-valuemax="250">${x.base.Defense}</div>
                                </div>
                        </div>
        </div>



        <div class="row">
                <div class="col-4">
                        <p>Speed:</p>
                </div>
                <div class="col-8">
                        <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${x.base.Speed}%" aria-valuenow="${x.base.Speed}" aria-valuemin="0" aria-valuemax="250">${x.base.Speed}</div>
                                </div>
                        </div>
        </div>



        </div> 


                
                </div>
                </div>
        </div>
        `)

                i++;
                        

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

function checkType(arr) {
if(arr[1]!=undefined) {
return true; //2 types
} else {
return false; // 1 type
}
}

function searchPokemon() { 
        let i = 1;
        let input = $('#searchbar').val().toLowerCase();
        for(x of arr) {
                if (!x.name.english.toLowerCase().includes(input)) { 
                        $(`.cardNum${i}`).fadeOut();
                    } else {
                        $(`.cardNum${i}`).fadeIn();
                    }
                i++;    
        }

} 


$("#pokeType").change(function() {
        var abc = $('option:selected',this).data("value");
        sortByType(abc);
      });

function sortByType(randomType) {
        let i = 1;
        for(x of arr) {
                if(randomType!="none") {
                        if(checkType(x.type)==true) { // 2 types
                                let type1 = x.type[0];
                                let type2 = x.type[1];
                        
                                if (type1.toLowerCase()!=randomType && type2.toLowerCase()!=randomType) { 
                                        $(`.cardNum${i}`).fadeOut();
                                } else {
                                        $(`.cardNum${i}`).fadeIn();
                                        }
                        
                        } else { //1 type   
                                let type1 = x.type[0];
                                if (type1.toLowerCase()!=randomType) { 
                                        $(`.cardNum${i}`).fadeOut();
                                } else {
                                        $(`.cardNum${i}`).fadeIn();
                                }
                        }
                i++;  
                } else {
                        $(`.cardNum${i}`).fadeIn();  
                        i++;       
                }    
        }  
        
}

        
        
    
    

//     function searchPokemon() { 
//         let input = document.getElementById('searchbar').value 
//         input=input.toLowerCase(); 
//         let x = document.getElementsByClassName('animals'); 
          
//         for (i = 0; i < x.length; i++) {  
//             if (!x[i].innerHTML.toLowerCase().includes(input)) { 
//                 x[i].style.display="none"; 
//             } 
//             else { 
//                 x[i].style.display="list-item";                  
//             } 
//         } 
//     } 




   

    
