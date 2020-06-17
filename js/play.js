let getFromJS = JSON.parse(localStorage.getItem('pokedexJSON'));
let pokedex = JSON.parse(getFromJS);
let pokeInventory = checkAccountStats("pokeInventory", localStorage.getItem('lastLoggedName'));


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


for (x of pokeInventory) {
$("#choose-pokemon-for-battle").append (` 
<img class="pokemons-inventory"  src="images/pokegif/${pokedex[x].id}.webp">
`);
}

$(".pokemons-inventory").click(function () {
    $('.pokemons-inventory').css({ 'transform': 'scale(1)'});
    $(this).css({ 'transform': 'scale(2)'});
    localStorage.setItem("choosenPokemon", this.src.slice(this.src.search('pokegif')).match(/\d+/g).map(Number)[0]);
});






