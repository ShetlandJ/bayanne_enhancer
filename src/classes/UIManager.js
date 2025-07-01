const UIManager = (function() {
  return {
    initialize: function() {
      BNAButtonManager.addBNAButton();
      FGButtonManager.addFGButton();
      AncestryButtonManager.addAncestryButton();
      GoogleButtonManager.addGoogleButton();
      ScotlandsPeopleButtonManager.addScotlandsPeopleButton();
      ScotlandsPeopleButtonManager.autoFillSearchForm();
      SuggestTabManager.addSuggestTab();
    }
  };
})();