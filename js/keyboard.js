import {
  data, dataRightShift, dataLeftShift, dataCaps, dataCapsLeftShift,
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

function generateKeys(type) {
  if (type === 'rightShift') {
    kb.innerHTML = dataRightShift;
  }
  if (type === 'leftShift') {
    kb.innerHTML = dataLeftShift;
  }
  if (type === 'normal') {
    kb.innerHTML = data;
  }
  if (type === 'caps') {
    kb.innerHTML = dataCaps;
  }
  if (type === 'leftShiftCaps') {
    kb.innerHTML = dataCapsLeftShift;
  }
}

export { createLayout, generateKeys };
