import data from './data.js';

const kb = document.createElement('div');
function createLayout() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const h = document.createElement('h1');
  h.className = 'h';
  h.innerText = 'Virtual-keyboard';
  wrapper.append(h);

  const form = document.createElement('form');
  form.className = 'form';
  const input = document.createElement('textarea');
  input.cols = 67;
  input.rows = 15;
  input.className = 'input';

  window.onload = function focus() {
    input.focus();

    input.onblur = function focusOnBlur() {
      input.focus();
    };
  };

  form.append(input);
  wrapper.append(form);

  kb.className = 'kb';
  kb.innerHTML += Object.values(data);
  wrapper.append(kb);
  const { body } = document;
  body.append(wrapper);

  const os = document.createElement('h5');
  os.innerText = 'The keyboard was created in OS "Windows"';
  wrapper.append(os);
  const h5 = document.createElement('h5');
  h5.innerText = 'Use Shift+Alt combination to switch layout';
  wrapper.append(h5);
}

function generateKeys(str) {
  const fill = document.querySelectorAll('.ch');
  for (let i = 0; i < str.length; i += 1) {
    fill[i].innerText = str[i];
  }
}

export { createLayout, generateKeys };
