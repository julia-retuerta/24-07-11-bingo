// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const bingoCardElement = document.getElementById('bingo-card');
const userCardElement = document.getElementById('user-card');
const pcCardElement = document.getElementById('pc-card');

const bingoRandomNumberElement = document.getElementById('bingo-random-number');
const resultUserElement = document.getElementById('result-user');
const resultPcElement = document.getElementById('result-pc');

const startButtonElement = document.getElementById('start-button');
const restartButtonElement = document.getElementById('restart-button');

// CAMINO CORTO

const numbersToPlay = Array(99)
  .fill(0)
  .map((number, index) => index + 1);

console.log(numbersToPlay);

// CÓDIGO CORREGIDO

const bingoNumbers = [];
let userNumbers = [];
let pcNumbers = [];
let isWinner = false;

let intervalId;

const fillArrayWithBingoNumbers = () => {
  for (let i = 1; i < 100; i++) {
    bingoNumbers.push(i);
  }
};

const generateNumbersOfBoard = () => {
  const numbers = [];
  while (numbers.length < 15) {
    const randomNumber = Math.ceil(Math.random() * 99);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const fillBoard = (numbers, board) => {
  const fragment = document.createDocumentFragment();
  numbers.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.classList.add('number');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    fragment.append(newNumber);
  });

  board.append(fragment);
};

const checkWinner = () => {
  const userBoardChecked = userCardElement.querySelectorAll('.number--user-check');
  const pcBoardChecked = pcCardElement.querySelectorAll('.number--pc-check');

  if (userBoardChecked.length === 15 && pcBoardChecked.length === 15) {
    isWinner = true;
    resultUserElement.textContent = 'DRAW';
    resultPcElement.textContent = 'DRAW';
    return;
  }

  if (userBoardChecked.length === 15) {
    resultUserElement.textContent = 'YOU WIN';
    resultPcElement.textContent = 'PC LOSE';
    isWinner = true;
  }

  if (pcBoardChecked.length === 15) {
    resultPcElement.textContent = 'PC WIN';
    resultUserElement.textContent = 'YOU LOSE';
    isWinner = true;
  }
};

const extractRandomNumbers = () => {
  if (bingoNumbers.length === 0 || isWinner) {
    clearInterval(intervalId);
    return;
  }

  const index = Math.floor(Math.random() * bingoNumbers.length); // Genera un índice aleatorio
  const number = bingoNumbers[index]; // Obtiene el número en ese índice

  bingoNumbers.splice(index, 1); // Elimina ese número del array para que no se repita en futuras extracciones

  bingoCardElement.querySelector(`[data-number='${number}']`).classList.add('number--check');
  bingoRandomNumberElement.textContent = `Número ${number}`;

  if (userNumbers.includes(number)) {
    userCardElement.querySelector(`[data-number='${number}']`).classList.add('number--user-check');
  }

  if (pcNumbers.includes(number)) {
    pcCardElement.querySelector(`[data-number='${number}']`).classList.add('number--pc-check');
  }

  checkWinner();
};

const startGame = () => {
  intervalId = setInterval(extractRandomNumbers, 100);
  startButtonElement.classList.add('hidden');
  restartButtonElement.classList.remove('hidden');
};

const initializeGame = () => {
  fillArrayWithBingoNumbers();
  userNumbers = generateNumbersOfBoard();
  pcNumbers = generateNumbersOfBoard();
  fillBoard(userNumbers, userCardElement);
  fillBoard(bingoNumbers, bingoCardElement);
  fillBoard(pcNumbers, pcCardElement);
};

startButtonElement.addEventListener('click', startGame);

restartButtonElement.addEventListener('click', () => {
  clearInterval(intervalId); // Detener el intervalo actual

  // Reiniciar el contenido de las cards
  bingoCardElement.innerHTML = '';
  userCardElement.innerHTML = '';
  pcCardElement.innerHTML = '';
  resultUserElement.textContent = '';
  resultPcElement.textContent = '';
  bingoRandomNumberElement.textContent = '';

  // Reiniciar los arrays y variables
  bingoNumbers.length = 0;
  userNumbers = [];
  pcNumbers = [];
  isWinner = false;

  // Inicializar el juego de nuevo
  initializeGame();

  // Empezar el juego automáticamente
  startGame();
});

initializeGame();

// MI CÓDIGO

// rellenar cartón de bingo con números del 1 al 99

// const allBingoNumbers = [];

// const printAllBingoNumbers = () => {
//   for (let i = 1; i < 100; i++) {
//     allBingoNumbers.push(i);
//   }

//   const fragment = document.createDocumentFragment();

//   allBingoNumbers.forEach(number => {
//     const spanBingoNumber = document.createElement('span');
//     spanBingoNumber.classList.add('bingo-number');
//     spanBingoNumber.textContent = number;
//     fragment.append(spanBingoNumber);
//   });

//   bingoCardElement.append(fragment);
// };

// printAllBingoNumbers();

// // rellenar cartón de user con números aleatorios

// const allUserNumbers = [];

// const printAllUserNumbers = () => {
//   while (allUserNumbers.length < 15) {
//     const randomNumber = Math.ceil(Math.random() * 99);
//     if (!allUserNumbers.includes(randomNumber)) {
//       allUserNumbers.push(randomNumber);
//     }
//   }

//   const fragment = document.createDocumentFragment();

//   allUserNumbers.forEach(number => {
//     const spanUserNumber = document.createElement('span');
//     spanUserNumber.classList.add('user-number');
//     spanUserNumber.textContent = number;
//     fragment.append(spanUserNumber);
//   });

//   userCardElement.append(fragment);
// };

// printAllUserNumbers();

// // rellenar cartón de pc con números aleatorios

// const allPcNumbers = [];

// const printAllPcNumbers = () => {
//   while (allPcNumbers.length < 15) {
//     const randomNumber = Math.ceil(Math.random() * 99);
//     if (!allPcNumbers.includes(randomNumber)) {
//       allPcNumbers.push(randomNumber);
//     }
//   }

//   const fragment = document.createDocumentFragment();

//   allPcNumbers.forEach(number => {
//     const spanPcNumber = document.createElement('span');
//     spanPcNumber.classList.add('pc-number');
//     spanPcNumber.textContent = number;
//     fragment.append(spanPcNumber);
//   });

//   pcCardElement.append(fragment);
// };

// printAllPcNumbers();

// // Sacar número aleatorio del bingo

// const selectedNumbers = [];
// // let intervalId; // Para guardar el ID del intervalo

// const getBingoRandomNumber = () => {
//   if (selectedNumbers.length === allBingoNumbers.length) {
//     // Para detener el intervalo cuando ya hayan sido seleccionados todos los números
//     clearInterval(intervalId);
//     return; // Salir de la función
//   }

//   let randomNumber = Math.ceil(Math.random() * 99);

//   while (selectedNumbers.includes(randomNumber)) {
//     randomNumber = Math.ceil(Math.random() * 99);
//   }

//   selectedNumbers.push(randomNumber);
//   bingoRandomNumberElement.textContent = `Número ${randomNumber}`;

//   const bingoNumberBox = bingoCardElement.querySelectorAll('.bingo-number');

//   // bingoNumberBox.forEach(spanBingoNumber => {
//   //   const spanNumber = Number(spanBingoNumber.textContent);

//   //   if (spanNumber === randomNumber) {
//   //     spanBingoNumber.classList.add('selected-numbers');
//   //   }
//   // });
// };

// startButtonElement.addEventListener('click', () => {
//   if (intervalId) {
//     clearInterval(intervalId); // Para detener cualquier intervalo en ejecución y que así no haya varios ejecutándose a la vez
//   }

//   // Iniciar el intervalo
//   intervalId = setInterval(getBingoRandomNumber, 200);
// });
