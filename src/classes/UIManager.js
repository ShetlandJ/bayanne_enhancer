const UIManager = (function() {
  return {
    initialize: function() {
      BNAButtonManager.addBNAButton();
      FGButtonManager.addFGButton();
      AncestryButtonManager.addAncestryButton();
      GoogleButtonManager.addGoogleButton();
      SuggestTabManager.addSuggestTab();
    }
  };
})();