let currentPokemon;
let baseStats = [];


// da werden meine pokemons aus der api/daten raus geladen
async function loadPokemon() {
  for (let i = 1; i < 10; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    let response = await fetch(url);
    currentPokemon = await response.json();
    baseStats.push(currentPokemon);
    console.log('loaded pokemon', currentPokemon);
    renderPokemonInfo(i);

  }
  chart();
  frontPokemon();
 
}

//bilder und name und daten und überschriften werden angezeigt
function renderPokemonInfo(i) {
  let images = document.getElementById('pokedex');
  images.innerHTML += `<div class="desginPokemon">
  <div class="pokemonCard"  onclick="openCard()"  id="backgroundCard${currentPokemon['name']}">
  <div class="frontPokemon">
  ${currentPokemon['name']}
</div>

<div class="pokemonimages">
<div class="pokemonImageContainer">
<img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
</div>
<div id="type${currentPokemon['name']}" class="pokemonType"></div>
</div>
</div>



<div class="ContainerAll">
<div class="headlineContainer">
<div class="containerAbout" data-index="${i}" onclick="openAbout(${i})">
<h2>About</h2>
</div>
<div class="headlineBaseStats"  data-index="${i}" onclick="openBaseStats(${i})">
<h2>Base Stats</h2>
</div>
<div class="headlineMoves" data-index="${i}" onclick="openMoves(${i})">
<h2> Moves </h2>
</div>
</div>


<div class="InfomationsContainer">
<div class="containerAbout d-none" id="about${i}">

<p>Height ${currentPokemon['height']} m</p>
<p>Weight ${currentPokemon['weight']} kg</p>
<p>Base Experience ${currentPokemon['base_experience']}</p>
</div>



<div class="baseStatsContainer d-none"  id="stats${i}">
  
   
<div class="barChart">
<canvas id="myChart${i}"></canvas>
</div>
   </div> 

  

<div class="moveContainer d-none" id="moves${i}">

</div>
  </div>
  </div>`;

  console.log('moves', currentPokemon['moves'][1]['move']);
  movesContiner(i);
  backgroundTypes(i);
  backgroundCard(i);
  let headlineMovesElement = document.querySelector(`[data-index="${i}"]`);
  headlineMovesElement.addEventListener('click', function () {
    openMoves(i);
  });


  let baseStatsElement = document.querySelector(`[data-index="${i}"]`);
  baseStatsElement.addEventListener('click', function () {
    openBaseStats(i);
  });


  let aboutElement = document.querySelector(`[data-index="${i}"]`);
  aboutElement.addEventListener('click', function () {
    openAbout(i);
  });





};



// das ist der Diagramm
function chart() {
  for (let i = 1; i < 10; i++) {
    const ctx = document.getElementById(`myChart${i}`);


    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
        datasets: [{

          data: [baseStats[i - 1]['stats'][0]['base_stat'],
          baseStats[i - 1]['stats'][1]['base_stat'],
          baseStats[i - 1]['stats'][2]['base_stat'],
          baseStats[i - 1]['stats'][3]['base_stat'],
          baseStats[i - 1]['stats'][4]['base_stat'],
          baseStats[i - 1]['stats'][5]['base_stat'],

          ],

          backgroundColor: [
            'rgba(255, 0, 0)',
            'rgba(255, 111, 0)',
            'rgba(255, 238, 0)',
            'rgba(0, 255, 242)',
            'rgba(0, 0, 255)',
            'rgba(255, 0, 255)'

          ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        },

      }
    });
    console.log('baste stats', currentPokemon['stats']);
  }

}
// erstellt die moves untereiander
function movesContiner(i) {
  let currentPokedex = baseStats[i - 1]
  for (let j = 1; j < currentPokedex.moves.length; j++) {
    document.getElementById(`moves${i}`).innerHTML += `
<p> ${currentPokedex['moves'][j]['move']['name']}</p>

`

  }

}
// es zeigt beim drauf klicken die moves an
function openMoves(i) {
  document.getElementById(`moves${i}`).classList.remove('d-none');
  document.getElementById(`stats${i}`).classList.add('d-none');
  document.getElementById(`about${i}`).classList.add('d-none');
}
// es zeigt beim drauf klicken das diagramm an
function openBaseStats(i) {
  document.getElementById(`stats${i}`).classList.remove('d-none');
  document.getElementById(`moves${i}`).classList.add('d-none');
  document.getElementById(`about${i}`).classList.add('d-none');
}
//es zeigt beim drauf klicken about an
function openAbout(i) {
  document.getElementById(`about${i}`).classList.remove('d-none');
  document.getElementById(`stats${i}`).classList.add('d-none');
  document.getElementById(`moves${i}`).classList.add('d-none');
}

// ist die frontseite von der karte mit daten
function frontPokemon() {
  let pokemonFront = document.getElementById('front');
  pokemonFront.innerHTML += `<div class="pokemonCard" id="backgroundFront">
<div class="frontPokemon">
${currentPokemon['name']}
</div>

<div class="pokemonimages">
<div class="pokemonImageContainer">
<img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
</div>
<div class="pokemonType">${currentPokemon['types']['0']['type']['name']}</div>
</div>
</div>


`;

}

//kriegt jeder typ eine andere farbe 
function backgroundTypes(i){
  for (let b = 0; b < baseStats[i-1]['types'].length; b++){
    document.getElementById(`type${baseStats[i-1]['name']}`).innerHTML += `<span class="typespan ${baseStats[i-1]['types'][b]['type']['name']}">${baseStats[i-1]['types'][b]['type']['name']}</span> `
  }
  
}
//fügt die ganzen css hintergründe hinzu(grass..)
function backgroundCard(i){
    document.getElementById(`backgroundCard${baseStats[i-1]['name']}`).classList.add(`${baseStats[i-1]['types'][0]['type']['name']}`)
  }



