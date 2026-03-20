const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('OmniBridge UI & Accessibility Testing Suite', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('Primary Intent Form exists and is structurally valid', () => {
    const form = document.querySelector('#intentForm');
    expect(form).not.toBeNull();
  });

  test('A11y: Form textarea has proper aria-required attribute', () => {
    const textarea = document.querySelector('#userIntent');
    expect(textarea.getAttribute('aria-required')).toBe('true');
  });

  test('Results container respects initial DOM encapsulation', () => {
    const results = document.querySelector('#resultsContainer');
    expect(results.classList.contains('hidden')).toBe(true);
  });

  test('Processing state has polite aria-live polite injection', () => {
    const state = document.querySelector('#processingState');
    expect(state.getAttribute('aria-live')).toBe('polite');
  });
});
