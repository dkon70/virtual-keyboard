import {
  data, dataRightShift, dataLeftShift, dataCaps, dataCapsLeftShift,
  dataRus, dataRusCaps, dataRusLeftShift, dataRusRightShift
} from './data.js';

const kb = document.createElement('div');
function createLayout() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const h = document.createElement('h1');
  h.className = 'h';
  h.innerText = 'Key';
  wrapper.append(h);

  const form = document.createElement('form');
  form.className = 'form';
  const input = document.createElement('textarea');
  input.cols = 67;
  input.rows = 15;
  input.className = 'input';
  form.append(input);
  wrapper.append(form);

  kb.className = 'kb';
  wrapper.append(kb);
  const { body } = document;
  body.append(wrapper);
}

function generateKeys(type, lang) {
  if (type === 'rightShift') {
    if (lang === 'en') {
      kb.innerHTML = dataRightShift;
    } else {
      kb.innerHTML = dataRusRightShift;
    }
  }
  if (type === 'leftShift') {
    if (lang === 'en') {
      kb.innerHTML = dataLeftShift;
    } else {
      kb.innerHTML = dataRusLeftShift;
    }
  }
  if (type === 'normal') {
    if (lang === 'en') {
      kb.innerHTML = data;
    } else {
      kb.innerHTML = dataRus;
    }
    
  }
  if (type === 'caps') {
    if (lang === 'en') {
      kb.innerHTML = dataCaps;
    } else {
      kb.innerHTML = dataRusCaps;
    }
  }
}

export { createLayout, generateKeys };
