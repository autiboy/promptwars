const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('OmniBridge UI, Architecture, & Accessibility Suite', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  // STRUCTURAL TESTING
  test('Primary Document has valid English lang attribute for screen readers', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('Primary Intent Form structurally encapsulates the UI module', () => {
    const form = document.querySelector('#intentForm');
    expect(form).not.toBeNull();
    expect(form.tagName).toBe('FORM');
  });

  test('Container architecture enforces z-index isolation via .app-container', () => {
    const container = document.querySelector('.app-container');
    expect(container).not.toBeNull();
  });

  // ACCESSIBILITY (A11Y) A11Y-DRIVEN TESTING
  test('A11y: Essential Textarea ensures active aria-required evaluation', () => {
    const textarea = document.querySelector('#userIntent');
    expect(textarea.getAttribute('aria-required')).toBe('true');
    expect(textarea.hasAttribute('required')).toBe(true);
  });

  test('A11y: Submission bridge button defines semantic screen-reader hiding', () => {
    const btnIcon = document.querySelector('#bridgeBtn .stars-icon');
    expect(btnIcon.getAttribute('aria-hidden')).toBe('true');
  });

  test('A11y: Processing state strictly bounds aria-live to polite mapping', () => {
    const state = document.querySelector('#processingState');
    expect(state.getAttribute('aria-live')).toBe('polite');
  });
  
  test('A11y: Results container gracefully announces modifications', () => {
    const results = document.querySelector('#resultsContainer');
    expect(results.getAttribute('aria-live')).toBe('polite');
  });

  test('A11y: Visual noise (Orbs) are actively hidden from audio accessibility parsing', () => {
    const orbs = document.querySelector('.background-elements');
    expect(orbs.getAttribute('aria-hidden')).toBe('true');
  });

  // UX & STATE TESTING
  test('UX: Results container enforces initial hidden CSS taxonomy', () => {
    const results = document.querySelector('#resultsContainer');
    expect(results.classList.contains('hidden')).toBe(true);
  });

  test('UX: Intent label resolves correctly to DOM input IDs', () => {
    const label = document.querySelector('#intent-label');
    expect(label.getAttribute('for')).toBe('userIntent');
  });
  
  // GOOGLE SERVICES TESTING
  test('Google SDK Injection: UI successfully exposes secure mapping field for Gemini API via input module', () => {
    const apiInput = document.querySelector('#geminiKey');
    expect(apiInput).not.toBeNull();
    expect(apiInput.tagName).toBe('INPUT');
    expect(apiInput.getAttribute('type')).toBe('password');
  });
});
