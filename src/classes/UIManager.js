const UIManager = (function() {
  return {
    initialize: function() {
      BNAButtonManager.addBNAButton();
      FGButtonManager.initialize();
      AncestryButtonManager.initialize();
      GoogleButtonManager.addGoogleButton();
      ScotlandsPeopleButtonManager.initialize();
      SuggestTabManager.addSuggestTab();
    }
  };
})();