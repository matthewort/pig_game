'use strict';

//Seleziono gli elementi
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //uso il # perché è un id
const score1El = document.getElementById('score--1'); //posso richiamare l'id anche in questa maniera
const current0El = document.getElementById('current--0'); //current--0 è la classe del punteggio corrente del primo giocatore, la metto quindi in una variabile
const current1El = document.getElementById('current--1'); //current--1 è la classe del punteggio corrente del secondo giocatore

//Creiamo le variabili per il dado e per i bottoni:
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //dichiariamo fuori le variabili senza dichiararle in modo da poterle utilizzarle nella funzione init

//Seleziono le condizioni
const init = function () {
  scores = [0, 0]; //lo 0 di sinistra in posizione 0 è il giocatore 1, lo 0 di destra in posizione 1 è il giocatore 2
  currentScore = 0; //imposto lo score di partenza a 0
  activePlayer = 0;
  playing = true; //metto il true per rendere possibile giocare

  score0El.textContent = 0; //anche se stiamo scrivendo 0 sotto forma di numero, JS ce lo converte in automatico in string. Mettiamo queste due variabili a 0 per far partire da 0 il gioco
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); //aggiungo l'hidden a diceEl
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //toggle è un comando che rimuove o aggiunge automaticamente una classe se c'era già prima la classe o meno, in questo caso stiamo aggiungendo la classe CSS per mettere il colore di background
  player1El.classList.toggle('player--active');
};

//Funzionalità per tiro dadi
// BOTTONE ROLL
btnRoll.addEventListener('click', function () {
  if (playing) {
    //se è possibile giocare === true
    // 1. Generare roll random tra 1 e 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Mostrare dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //collego la variabile diceEl a src per modificare la stringa dell'immagine stessa, uso un template literal con la variabile dice creata prima in modo da far coincidere dinamicamente il numero random che viene fuori con il numero presente nel nome dell'immagine
    // 3. Controllare se è venuto fuori 1
    if (dice !== 1) {
      currentScore = currentScore + dice; //aumento lo score con il numero del dice
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; //aumento lo score al giocatore 1 dinamicamente
    } else {
      //   4. Se true, switchare al secondo giocatore
      switchPlayer();
    }
  }
});

// BOTTONE HOLD
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Aggiungo lo score al player active
    scores[activePlayer] += currentScore; //se l'activePlayer corrisponde a 1 corrisponderà a scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Controllo se il player's score è >=100
    if (scores[activePlayer] >= 100) {
      //Finisco il gioco
      playing = false; //metto il false per togliere la possibilità di continuare a giocare
      diceEl.classList.add('hidden'); //nascondo il dado
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switcha l'altro giocatore
      switchPlayer();
    }
  }
});

// BOTTONE NEW GAME
btnNew.addEventListener('click', init);
