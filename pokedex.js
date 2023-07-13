let currentPokemon;



async function loadPokemon() {
  for (let i = 1; i < 10; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded pokemon', currentPokemon);
    renderPokemonInfo(i);
  }
  chart();
}

//bilder und name wird angezeigt
function renderPokemonInfo(i) {
  let images = document.getElementById('pokedex');
  images.innerHTML += `<div class="pokemonCard" id="pokemonName">
  ${currentPokemon['id']}
  ${currentPokemon['name']}


<div class="pokemonimages">
<img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
</div>
</div>

<div class="ContainerAll">

<div class="container">

<h2>About</h2>
<p>Height ${currentPokemon['height']} m</p>
<p>Weight ${currentPokemon['weight']} kg<p>
<p>Base Experience ${currentPokemon['base_experience']}<p>

</div>

<div class="baseStatsContainer">
   <h2>Base Stats</h2>
   
<div class="barChart">
<canvas id="myChart${i}"></canvas>
</div>
   </div> 
   

<div class="moveContainer">
<h2> Moves </h2>
 </div> 
   
  </div>
  </div>`;
}



function chart(i) {
  for (let i = 1; i < 10; i++) {
  const ctx = document.getElementById(`myChart${i}`);


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
      datasets: [{
       
        data: [12, 19, 3, 5, 2, 3],
        
        backgroundColor: '#91d3d3',
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
}

function loadDate(){






}