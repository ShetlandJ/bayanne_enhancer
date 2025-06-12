// filepath: /bayanne_enhancer/bayanne_enhancer/src/content.js
import BNAButtonManager from './classes/BNAButtonManager.js';
import SuggestTabManager from './classes/SuggestTabManager.js';
import EmailButtonManager from './classes/EmailButtonManager.js';

function initialize() {
  console.log("Initializing content script");

  const bnaButtonManager = new BNAButtonManager();
  bnaButtonManager.addBNAButton();

  const suggestTabManager = new SuggestTabManager();
  suggestTabManager.addSuggestTab();

  const emailButtonManager = new EmailButtonManager();
  emailButtonManager.setup();
}

console.log("Content script executed");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}