class UIManager {
  constructor() {
    this.bnaButtonManager = new BNAButtonManager();
    this.suggestTabManager = new SuggestTabManager();
    this.emailButtonManager = new EmailButtonManager();
  }

  initialize() {
    console.log("Initializing UI components");
    this.bnaButtonManager.addBNAButton();
    this.suggestTabManager.addSuggestTab();
    this.emailButtonManager.setup();
  }
}

export default UIManager;