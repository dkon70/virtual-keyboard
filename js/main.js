import { createLayout, generateKeys } from './keyboard.js';

let lang = 'ru';
createLayout();
generateKeys('normal', lang);

let capsOn = false;
let rShift = false;
let lShift = false;

let altPressed = false;
let shiftPressed = false;

const h = document.querySelector('.h');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  h.innerText = '';
  h.innerText = (event.code);

  if (event.code === 'AltLeft') {
    altPressed = true;
  }
  if (event.code === 'ShiftLeft') {
    shiftPressed = true;
  }
  if (altPressed && shiftPressed) {
    if (lang === 'en') {
      lang = 'ru';
      generateKeys('normal', lang);
      addClicks();
    } else {
      lang = 'en';
      generateKeys('normal', lang);
      addClicks();
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'AltLeft') {
    altPressed = false;
  }
  if (event.code === 'ShiftLeft') {
    shiftPressed = false;
  }
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
            generateKeys('caps', lang);
            addClicks();
            capsOn = true;
          } else {
            generateKeys('normal', lang);
            addClicks();
            capsOn = false;
          }
        }
        if (key.classList[0] === 'ShiftLeft') {
          if (!lShift) {
            generateKeys('leftShift', lang);
            addClicks();
            lShift = true;
          } else {
            generateKeys('normal', lang);
            addClicks();
            lShift = false;
            rShift = false;
          }
        }
        if (key.classList[0] === 'ShiftRight') {
          if (!rShift) {
            generateKeys('rightShift', lang);
            addClicks();
            rShift = true;
          } else {
            generateKeys('normal', lang);
            addClicks();
            rShift = false;
            lShift = false;
          }
        }
        console.log(lShift);
        console.log(rShift);
      }
      if (key.classList[0] === 'AltLeft') {
        altPressed = true;
      }
      if (key.classList[0] === 'ShiftLeft') {
        shiftPressed = true;
      }
      if (altPressed && shiftPressed) {
        if (lang === 'en') {
          lang = 'ru';
          generateKeys('normal', lang);
          addClicks();
          altPressed = false;
          shiftPressed = false;
        } else {
          lang = 'en';
          generateKeys('normal', lang);
          addClicks();
          altPressed = false;
          shiftPressed = false;
        }
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
        && event.code !== 'Caps'
        && event.code !== 'Space') {
      input.value += key.innerText;
      console.log(input.value);
    } else if (event.code === 'Backspace') {
      input.value = input.value.slice(0, -1);
      console.log(input.value);
    } else if (event.code === 'Tab') {
      input.value += '    ';
    } else if (event.code === 'Delete') {
      input.value = input.value.replace(input.value[0], '');
      console.log(input.value);
    } else if (event.code === 'Space') {
      input.value += ' ';
    }
  } else if (event.code === 'CapsLock') {
    if (capsOn === false) {
      generateKeys('caps', lang);
      addClicks();
      key.classList.toggle('pressed');
      capsOn = true;
    } else {
      generateKeys('normal', lang);
      addClicks();
      key.classList.toggle('pressed');
      capsOn = false;
    }
  }
  if (event.code === 'ShiftLeft') {
    generateKeys('leftShift', lang);
    addClicks();
  }
  if (event.code === 'ShiftRight') {
    generateKeys('rightShift', lang);
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
    generateKeys('normal', lang);
    addClicks();
  }
  if (key && event.code === 'ShiftRight') {
    generateKeys('normal', lang);
    addClicks();
  }
}

document.addEventListener('keyup', keyUpHandler);
