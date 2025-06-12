const UIManager = (function() {
  return {
    initialize: function() {
      BNAButtonManager.addBNAButton();
      FGButtonManager.addFGButton();
      SuggestTabManager.addSuggestTab();
    }
  };
})();