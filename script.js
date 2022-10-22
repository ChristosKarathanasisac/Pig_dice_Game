'use strict';
const atribute_player_0 = document.querySelector('.player--0');
const atribute_player_1 = document.querySelector('.player--1');

const atribute_score_0 = document.querySelector('#score--0');
const atribute_score_1 = document.querySelector('#score--1');
let scores = [0, 0];

const atribute_current_score_0 = document.querySelector('#current--0');
const atribute_current_score_1 = document.querySelector('#current--1');
let current_score = 0;

const atribute_btn_roll = document.querySelector('.btn--roll');
const atribute_btn_hold = document.querySelector('.btn--hold');
const atribute_btn_new = document.querySelector('.btn--new');

const dice = document.querySelector('.dice');

let turn = 0;
let flag = true;

atribute_btn_new.addEventListener('click', function roll_btn_click() {
  setNewGame();
});
atribute_btn_roll.addEventListener('click', function roll_btn_click() {
  if (!flag) {
    return;
  }
  const random_number = randomNumber(1, 6);
  dice.src = `dice-${random_number}.png`;
  if (random_number === 1) {
    changePlayerGeneralJobs();
    return;
  } else {
    current_score += random_number;
    document.querySelector(`#current--${turn}`).textContent = current_score;
    if (current_score > 100) {
      document
        .querySelector(`.player--${turn}`)
        .classList.add('player--winner');
      flag = false;
    }
  }
});

atribute_btn_hold.addEventListener('click', function hold_btn_click() {
  if (!flag) {
    return;
  }
  scores[turn] += current_score;
  document.querySelector(`#score--${turn}`).textContent = scores[turn];
  if (scores[turn] > 100) {
    document.querySelector(`.player--${turn}`).classList.add('player--winner');
    flag = false;
    //setNewGame();
  }
  changePlayerGeneralJobs();
});

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function changePlayerGeneralJobs() {
  current_score = 0;
  document.querySelector(`#current--${turn}`).textContent = current_score;
  document.querySelector(`.player--${turn}`).classList.toggle('player--active');
  turn === 0 ? (turn = 1) : (turn = 0);
  document.querySelector(`.player--${turn}`).classList.toggle('player--active');
}

function setNewGame() {
  current_score = 0;
  scores = [0, 0];
  document.querySelector(`.player--${turn}`).classList.toggle('player--active');
  turn === 0 ? (turn = 1) : (turn = 0);
  document.querySelector(`.player--${turn}`).classList.toggle('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  atribute_current_score_0.textContent =
    atribute_current_score_1.textContent = 0;
  atribute_score_0.textContent = atribute_score_1.textContent = 0;
  document.querySelector(`#name--0`).textContent = 'Player 1';
  document.querySelector(`#name--1`).textContent = 'Player 2';
  flag = true;
}
