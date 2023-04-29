import { createLayout, generateKeys } from './keyboard.js';

createLayout();
generateKeys('normal');

let capsOn = false;
let rShift = false;
let lShift = false;

const h = document.querySelector('.h');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  h.innerText = '';
  h.innerText = (event.code);
});

const input = document.querySelector('.input');
input.value = '';

function addClicks() {
  const keys = document.querySelectorAll('.keys');

  keys.forEach((key) => {
    key.addEventListener('mousedown', () => {
      h.innerText = '';
      h.innerText = (key.classList[0]);
      if (key.innerHTML !== 'Caps'
        && key.innerHTML !== 'Ctrl'
        && key.innerHTML !== 'Alt'
        && key.innerHTML !== 'Shift'
        && key.innerHTML !== 'Win'
        && key.innerHTML !== '⇄'
        && key.innerHTML !== '⤶'
        && key.innerHTML !== '_____'
        && key.innerHTML !== 'Del') {
        input.value += key.innerText;
      }

      if (key && key.classList[0] !== 'CapsLock'
        && key.classList[0] !== 'ShiftRight'
        && key.classList[0] !== 'ShiftLeft') {
        key.classList.add('pressed');
      } else {
        key.classList.toggle('pressed');
        if (key.classList[0] === 'CapsLock') {
          if (!capsOn) {
            generateKeys('caps');
            addClicks();
            capsOn = true;
          } else {
            generateKeys('normal');
            addClicks();
            capsOn = false;
          }
        }
        if (key.classList[0] === 'ShiftLeft') {
          if (!lShift) {
            generateKeys('leftShift');
            addClicks();
            lShift = true;
          } else {
            generateKeys('normal');
            addClicks();
            lShift = false;
          }
        }
        if (key.classList[0] === 'ShiftRight') {
          if (!rShift) {
            generateKeys('rightShift');
            addClicks();
            rShift = true;
          } else {
            generateKeys('normal');
            addClicks();
            rShift = false;
          }
        }
        console.log(lShift);
        console.log(rShift);
      }
    });
    key.addEventListener('mouseup', (event) => {
      event.preventDefault();
      if (key && key.classList[0] !== 'CapsLock'
          && key.classList[0] !== 'ShiftRight'
          && key.classList[0] !== 'ShiftLeft') {
        key.classList.remove('pressed');
      }
    });
    key.addEventListener('mouseout', (event) => {
      event.preventDefault();
      if (key && key.classList[0] !== 'CapsLock'
        && key.classList[0] !== 'ShiftRight'
        && key.classList[0] !== 'ShiftLeft') {
        key.classList.remove('pressed');
      }
    });
  });
}

addClicks();

function keyDownHandler(event) {
  const key = document.querySelector(`.${event.code}`);
  if (key && event.code !== 'CapsLock') {
    key.classList.add('pressed');
    if (event.code !== 'Backspace'
        && event.code !== 'Tab'
        && event.code !== 'AltLeft'
        && event.code !== 'AltRight'
        && event.code !== 'ControlLeft'
        && event.code !== 'ControlRight'
        && event.code !== 'ShiftLeft'
        && event.code !== 'ShiftRight'
        && event.code !== 'Delete'
        && event.code !== 'Enter'
        && event.code !== 'MetaLeft'
        && event.code !== 'ArrowLeft'
        && event.code !== 'ArrowUp'
        && event.code !== 'ArrowRight'
        && event.code !== 'ArrowDown'
        && event.code !== 'Caps') {
      input.value += event.key;
      console.log(input.value);
    } else if (event.code === 'Backspace') {
      input.value = input.value.slice(0, -1);
      console.log(input.value);
    } else if (event.code === 'Tab') {
      input.value += '    ';
    } else if (event.code === 'Delete') {
      input.value = input.value.replace(input.value[0], '');
      console.log(input.value);
    }
  } else if (event.code === 'CapsLock') {
    if (capsOn === false) {
      generateKeys('caps');
      addClicks();
      key.classList.toggle('pressed');
      capsOn = true;
    } else {
      generateKeys('normal');
      addClicks();
      key.classList.toggle('pressed');
      capsOn = false;
    }
  }
  if (event.code === 'ShiftLeft') {
    generateKeys('leftShift');
    addClicks();
  }
  if (event.code === 'ShiftRight') {
    generateKeys('rightShift');
    addClicks();
  }
}

document.addEventListener('keydown', keyDownHandler);

function keyUpHandler(event) {
  const key = document.querySelector(`.${event.code}`);
  if (key && event.code !== 'CapsLock') {
    key.classList.remove('pressed');
  }
  if (key && event.code === 'ShiftLeft') {
    generateKeys('normal');
    addClicks();
  }
  if (key && event.code === 'ShiftRight') {
    generateKeys('normal');
    addClicks();
  }
}

document.addEventListener('keyup', keyUpHandler);
