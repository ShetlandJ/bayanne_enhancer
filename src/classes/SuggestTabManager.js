const SuggestTabManager = (function() {
  const navMenu = document.getElementById('tngnav');

  function addSuggestTab() {
    if (navMenu) {
      const existingSuggestTab = document.getElementById('aSuggest');
      if (existingSuggestTab) {
        return;
      }
      
      const currentUrl = window.location.href;
      const match = currentUrl.match(/personID=([^&]+)/);
      
      if (match && match[1]) {
        const personID = match[1];
        const treeMatch = currentUrl.match(/tree=([^&]+)/);
        const treeID = treeMatch ? treeMatch[1] : 'ID1';
        const suggestLi = document.createElement('li');
        const suggestLink = document.createElement('a');
        suggestLink.href = `suggest.php?enttype=I&ID=${personID}&tree=${treeID}`;
        suggestLink.id = 'aSuggest';
        
        const icon = document.createElement('span');
        icon.className = 'tngsmallicon2';
        icon.id = 'sugg-smicon';
        
        suggestLink.appendChild(icon);
        suggestLink.appendChild(document.createTextNode('Suggest'));
        suggestLi.appendChild(suggestLink);
        
        const editTab = Array.from(navMenu.querySelectorAll('li a')).find(a => a.textContent.includes('Edit'));
        if (editTab) {
          navMenu.insertBefore(suggestLi, editTab.parentNode);
        } else {
          navMenu.appendChild(suggestLi);
        }
      }
    }
  }

  return {
    addSuggestTab: addSuggestTab
  };
})();