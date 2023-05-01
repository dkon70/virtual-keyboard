import { createLayout, generateKeys } from './keyboard.js';

const dflt = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./";
const shift = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
const caps = '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM.//';
const dfltRu = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.';
const shiftRu = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';
const capsRu = 'Ё1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.';
const capsShift = '~!@#$%^&*()_+qwertyuiop{}|asdfghjkl:"zxcvbnm<>?';
const capsShiftRu = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

let lang = 'en';

window.addEventListener('load', getLocalStorage);
window.addEventListener('unload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
    } else {
      lang = 'en';
    }

    if (lang === 'en') {
      generateKeys(dflt);
    } else if (lang === 'ru') {
      generateKeys(dfltRu);
    }
}

function setLocalStorage() {
    localStorage.setItem('lang', lang);
}

createLayout();

let capsOn = false;
let rShift = false;
let lShift = false;

let altPressed = false;
let shiftPressed = false;

const h = document.querySelector('.h');

const input = document.querySelector('.input');
input.value = '';

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  console.log(capsOn)

  const { selectionStart, selectionEnd } = input;
  
  if (event.key === 'Backspace') {
    if (selectionStart !== selectionEnd) {
      input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionEnd);
      input.selectionStart = input.selectionEnd = selectionStart;
    } else if (selectionStart > 0) {
      input.value = input.value.slice(0, selectionStart - 1) + input.value.slice(selectionStart);
      input.selectionStart = input.selectionEnd = selectionStart - 1;
    } else if (selectionStart === 0) {
      event.preventDefault();
    }
  } else if (event.key === 'Delete') {
    if (selectionStart !== selectionEnd) {
      input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionEnd);
      input.selectionStart = input.selectionEnd = selectionStart;
    } else {
      input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionStart + 1);
      input.selectionStart = input.selectionEnd = selectionStart;
    }
  }

  if (event.key === 'Enter') {
    const { selectionStart, selectionEnd, value } = input;
    input.value = value.slice(0, selectionStart) + '\n' + value.slice(selectionEnd);
    input.selectionStart = input.selectionEnd = selectionStart + 1;
    event.preventDefault();
  }

  if (event.code === 'AltLeft') {
    altPressed = true;
  }
  if (event.code === 'ShiftLeft') {
    shiftPressed = true;
  }
  if (altPressed && shiftPressed) {
    shiftPressed = false;
    altPressed = false;
    if (lang === 'en') {
      lang = 'ru';
      generateKeys(dfltRu);
    } else {
      lang = 'en';
      generateKeys(dflt);
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

function addClicks() {
  const keys = document.querySelectorAll('.keys');

  keys.forEach((key) => {
    const lShiftButton = document.querySelector('.ShiftLeft');
    key.addEventListener('mousedown', () => {
      if (key.innerHTML !== 'Caps'
        && key.innerHTML !== 'Ctrl'
        && key.innerHTML !== 'Alt'
        && key.innerHTML !== 'Shift'
        && key.innerHTML !== 'Win'
        && key.innerHTML !== '⇄'
        && key.innerHTML !== '⤶'
        && key.innerHTML !== '_____'
        && key.innerHTML !== 'Del'
        && key.classList[0] !== 'Backspace') {
        input.value += key.innerText;
        if (lShiftButton.classList[2] === 'pressed') {
          lShiftButton.classList.remove('pressed');
          lShift = false;
          if (lang === 'en') {
            generateKeys(dflt);
          } else {
            generateKeys(dfltRu);
          }
        }
      }
      if (key && key.classList[0] !== 'CapsLock'
        && key.classList[0] !== 'ShiftRight'
        && key.classList[0] !== 'ShiftLeft') {
        key.classList.add('pressed');
      } else {
        key.classList.toggle('pressed');
        if (key.classList[0] === 'CapsLock') {
          if (!capsOn) {
            if (lang === 'en') {
              generateKeys(caps);
            } else {
              generateKeys(capsRu);
            }
            capsOn = true;
          } else {
            if (lang === 'en') {
              generateKeys(dflt);
            } else {
              generateKeys(dfltRu);
            }
            capsOn = false;
          }
        }
        if (key.classList[0] === 'ShiftLeft') {
          if (!lShift) {
            if (lang === 'en') {
              generateKeys(shift);
            } else {
              generateKeys(shiftRu)
            }
            
            lShift = true;
            key.classList.add('pressed');
          } else {
            if (lang === 'en') {
              generateKeys(dflt);
            } else {
              generateKeys(dfltRu)
            }
            lShift = false;
            rShift = false;
            key.classList.remove('pressed');
          }
        }
        if (key.classList[0] === 'ShiftRight') {
          if (!rShift) {
            if (lang === 'en') {
              generateKeys(shift);
            } else {
              generateKeys(shiftRu)
            }
            rShift = true;
          } else {
            if (lang === 'en') {
              generateKeys(dflt);
            } else {
              generateKeys(dfltRu)
            }
            rShift = false;
            lShift = false;
          }
        }
      }
      if (key.classList[0] === 'AltLeft') {
        altPressed = true;
      }
      if (key.classList[0] === 'ShiftLeft') {
        shiftPressed = true;
      }
      if (altPressed && shiftPressed) {
        shiftPressed = false;
        altPressed = false;
        if (lang === 'en') {
          lang = 'ru';
          getLocalStorage()
          generateKeys(dfltRu);
          altPressed = false;
          shiftPressed = false;
        } else {
          lang = 'en';
          getLocalStorage()
          generateKeys(dflt);
          altPressed = false;
          shiftPressed = false;
        }
        if (lShiftButton.classList[2] === 'pressed') {
          lShift = true;
          if (lang === 'en') {
            generateKeys(shift);
          } else {
            generateKeys(shiftRu);
          }
        }
      }
      const { selectionStart, selectionEnd } = input;
      if (key.classList[0] === 'Backspace') {
        if (selectionStart !== selectionEnd) {
          input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionEnd);
          input.selectionStart = input.selectionEnd = selectionStart;
        } else if (selectionStart > 0) {
          input.value = input.value.slice(0, selectionStart - 1) + input.value.slice(selectionStart);
          input.selectionStart = input.selectionEnd = selectionStart - 1;
        } else if (selectionStart === 0) {
        }
      } else if (key.classList[0] === 'Delete') {
        if (selectionStart !== selectionEnd) {
          input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionEnd);
          input.selectionStart = input.selectionEnd = selectionStart;
        } else {
          input.value = input.value.slice(0, selectionStart) + input.value.slice(selectionStart + 1);
          input.selectionStart = input.selectionEnd = selectionStart;
        }
      }
    
      if (key.classList[0] === 'Enter') {
        const { selectionStart, selectionEnd, value } = input;
        input.value = value.slice(0, selectionStart) + '\n' + value.slice(selectionEnd);
        input.selectionStart = input.selectionEnd = selectionStart + 1;
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
        && event.code !== 'Caps'
        && event.code !== 'Space') {
      input.value += key.innerText;
    } else if (event.code === 'Tab') {
      input.value += '    ';
    } else if (event.code === 'Space') {
      input.value += ' ';
    }
  } else if (event.code === 'CapsLock') {
    if (capsOn === false) {
      if (lang === 'en') {
        generateKeys(caps);
      } else {
        generateKeys(capsRu)
      }
      key.classList.toggle('pressed');
      capsOn = true;
    } else {
      if (lang === 'en') {
        generateKeys(dflt);
      } else {
        generateKeys(dfltRu)
      }
      key.classList.toggle('pressed');
      capsOn = false;
    }
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (!capsOn) {
      if (lang === 'en') {
        generateKeys(shift);
      } else {
        generateKeys(shiftRu);
      }
    } else {
      if (lang === 'en') {
        generateKeys(capsShift);
      } else {
        generateKeys(capsShiftRu);
      }
    }

  }
}

document.addEventListener('keydown', keyDownHandler);

function keyUpHandler(event) {
  const key = document.querySelector(`.${event.code}`);
  if (key && event.code !== 'CapsLock') {
    key.classList.remove('pressed');
  }
  if (key && event.code === 'ShiftLeft') {
    if (!capsOn) {
      if (lang === 'en') {
        generateKeys(dflt);
      } else {
        generateKeys(dfltRu);
      }
    } else {
      if (lang === 'en') {
        generateKeys(caps);
      } else {
        generateKeys(capsRu);
      }
    }

  }
  if (key && event.code === 'ShiftRight') {
    if (!capsOn) {
      if (lang === 'en') {
        generateKeys(dflt);
      } else {
        generateKeys(dfltRu);
      }
    } else {
      if (lang === 'en') {
        generateKeys(caps);
      } else {
        generateKeys(capsRu);
      }
    }
  }
}

document.addEventListener('keyup', keyUpHandler);
