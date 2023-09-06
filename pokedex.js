let currentPokemon;
let baseStats = [];
let maxPokemon =20;
let lastLoadedPokemon = 0;



// da werden meine pokemons aus der api/daten raus geladen
async function loadPokemon() {
  for (let i =  lastLoadedPokemon +1; i <= maxPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    baseStats.push(currentPokemon);
    renderPokemonInfo(i);
    frontPokemon(i);
  }
  chart();
  lastLoadedPokemon = maxPokemon;
}


function throttle(func,limit){
let inThrottle;
return function(){
  const args = arguments;
  const context = this;
  if (!inThrottle){
    func.apply(context,args);
    inThrottle = true;
    setTimeout(() => inThrottle = false,limit);
  }
}
}

const throttledSrollHandler = throttle(async function(){
if (window.innerHeight + window.scrollY >= document.body.scrollHeight){
maxPokemon += 10;
await loadPokemon(maxPokemon);
}
}, 4000);

window.addEventListener('scroll', throttledSrollHandler);









//bilder und name und daten und überschriften werden angezeigt
function renderPokemonInfo(i) {
  let images = document.getElementById('pokedex');
  images.innerHTML += templateHTML(i,currentPokemon);
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


function templateHTML(i,currentPokemon){
return `<div class="klickContainer d-none" id="klickContainer${i}">
<div class="desginPokemon" id="pokemoncardContainer${i}">
    <div class="pokemonCard" id="backgroundCard${currentPokemon['name']}">
        <div class="Buttonclose">
            <img onclick="closeButton(${i})" class="closebutton" src="img/closeButton.png">
        </div>

        <div class="Buttons">
            <img onclick="backButton(${i})" class="backButton" src="img/back.png">
            <img onclick="nextButton(${i})" class="nextButton" src="img/next.png">
        </div>
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
            <div class="headlineBaseStats" data-index="${i}" onclick="openBaseStats(${i})">
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



            <div class="baseStatsContainer d-none" id="stats${i}">


                <div class="barChart">
                    <canvas id="myChart${i}"></canvas>
                </div>
            </div>



            <div class="moveContainer d-none" id="moves${i}">

            </div>
        </div>
    </div>
</div>`;
}


// das ist das Diagramm
function chart() {
  for (let i =  lastLoadedPokemon +1; i <= maxPokemon; i++) {
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
            'rgb(40, 167, 69)',
            'rgb(220, 53, 69)',
            'rgb(121, 182, 185)',
            'rgb(220, 53, 69)',
            'rgb(121, 182, 185)',
            'rgb(255, 153, 51)',

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
  }
}


// erstellt die moves untereiander
function movesContiner(i) {
  let currentPokedex = baseStats[i - 1]
  for (let j = 1; j < currentPokedex.moves.length; j++) {
    document.getElementById(`moves${i}`).innerHTML += `
<p> ${currentPokedex['moves'][j]['move']['name']}</p>`
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
function frontPokemon(i) {
  let pokemonFront = document.getElementById('front');
  pokemonFront.innerHTML += `<div class="pokemonFront"  onclick="openCard(${i})" id="backgroundFront${currentPokemon['name']}">
<div class="frontPokemonName">
${currentPokemon['name']}
</div>

<div class="pokemonimages">
<div class="pokemonImageContainer">
<img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
</div>
<div id="typefront${currentPokemon['name']}" class="pokemonType"></div>
</div>
</div>
`;
  frontbackgroundTypes(i);
  backgroundfrontCard(i);
}


//kriegt jeder typ eine andere farbe 
function backgroundTypes(i) {
  for (let b = 0; b < baseStats[i - 1]['types'].length; b++) {
    document.getElementById(`type${baseStats[i - 1]['name']}`).innerHTML += `<span class="typespan ${baseStats[i - 1]['types'][b]['type']['name']}">${baseStats[i - 1]['types'][b]['type']['name']}</span> `
  }
}


//fügt die ganzen css hintergründe hinzu(von grass die farbe usw..)
function backgroundCard(i) {
  document.getElementById(`backgroundCard${baseStats[i - 1]['name']}`).classList.add(`${baseStats[i - 1]['types'][0]['type']['name']}`)
}


// fügt der vorderseite den typen die farbe hinzu
function frontbackgroundTypes(i) {
  for (let u = 0; u < baseStats[i - 1]['types'].length; u++) {
    document.getElementById(`typefront${baseStats[i - 1]['name']}`).innerHTML += `<span class="typespan ${baseStats[i - 1]['types'][u]['type']['name']}">${baseStats[i - 1]['types'][u]['type']['name']}</span> `
  }
}


// fügt der  vorderseite vom typen die hintergrund farbe vom typen hinzu
function backgroundfrontCard(i) {
  document.getElementById(`backgroundFront${baseStats[i - 1]['name']}`).classList.add(`${baseStats[i - 1]['types'][0]['type']['name']}`)
}


// öffnet die karte vorne
function openCard(i) {
  document.getElementById(`klickContainer${i}`).classList.remove('d-none');
}


//schließt die karte
function closeButton(i) {
  document.getElementById(`klickContainer${i}`).classList.add('d-none');
}


//geht weiter
function nextButton(i) {
  if (i >=  baseStats.length) {
    closeButton(i);
    openCard(1);
  } else {
    i++
    closeButton(i-1);// um das vorherige pokemon zu schließen 
    openCard(i);
  }
}


//geht zurück 
function backButton(i) {
  if (i < 1) {
  } else {
      i--
      closeButton(i+1);// um das nächste Pokemon zu öffnen
      openCard(i);
  }
}