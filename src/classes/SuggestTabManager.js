class SuggestTabManager {
  constructor() {
    this.navMenu = document.getElementById('tngnav');
  }

  addSuggestTab() {
    if (this.navMenu) {
      const currentUrl = window.location.href;
      const match = currentUrl.match(/personID=([^&]+)/);
      
      if (match && match[1]) {
        const personID = match[1];
        const treeMatch = currentUrl.match(/tree=([^&]+)/);
        const treeID = treeMatch ? treeMatch[1] : 'ID1';
        
        // Create new list item for the suggest tab
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
        
        // Insert the new tab before the Edit tab if it exists, or at the end
        const editTab = Array.from(this.navMenu.querySelectorAll('li a')).find(a => a.textContent.includes('Edit'));
        if (editTab) {
          this.navMenu.insertBefore(suggestLi, editTab.parentNode);
        } else {
          this.navMenu.appendChild(suggestLi);
        }
        
        console.log("Added Suggest tab to navigation");
      }
    }
  }
}

export default SuggestTabManager;