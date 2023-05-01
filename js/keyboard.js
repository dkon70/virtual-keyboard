import { data } from './data.js';

const kb = document.createElement('div');
function createLayout() {
  const link = document.createElement('link');
  link.type = "image/x-icon";
  link.rel = 'icon';
  link.href = '../assets/ico/favicon.ico';
  document.head.append(link);

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

  window.onload = function() {
    input.focus();
      
    input.onblur = function() {
      input.focus();
    }
  }

  form.append(input);
  wrapper.append(form);

  kb.className = 'kb';
  kb.innerHTML += data;
  wrapper.append(kb);
  const { body } = document;
  body.append(wrapper);

  const os = document.createElement('h5');
  os.innerText = 'The keyboard was created in OS "Windows"'
  wrapper.append(os);
  const h5 = document.createElement('h5');
  h5.innerText = 'Use Shift+Alt combination to switch layout';
  wrapper.append(h5);
}

const dflt = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./";
const shift = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
const caps = '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM.//';
const dfltRu = 'ё1234567890-=йцукенгшщзхъфывапролджэячсмитьбю.';
const shiftRu = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';
const capsRu = 'Ё1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.';
const capsShift = '~!@#$%^&*()_+qwertyuiop{}|asdfghjkl:"zxcvbnm<>?';
const capsShiftRu = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

function generateKeys(str) {
	const fill = document.querySelectorAll('.ch');
	for (let i = 0; i < str.length; i++) {
		fill[i].innerText = str[i];
	}
}

export { createLayout, generateKeys };
