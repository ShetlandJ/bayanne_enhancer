const generateUrl = (id) => {
  return `https://www.bayanne.info/Shetland/getperson.php?personID=${id}&tree=ID1`;
}

function addBNAButton() {
  const nameHeader = document.getElementById('nameheader');
  if (!nameHeader) return;
  
  const fullName = nameHeader.textContent.trim();
  if (!fullName) return;

  // don't if button already exists
  const existingButton = document.getElementById('bna-button');
  if (existingButton) {
    return;
  }
  
  // Create a container div for the header content and button
  const containerDiv = document.createElement('div');
  containerDiv.style.display = 'flex';
  containerDiv.style.alignItems = 'center';
  
  // Create a span to hold the original header text
  const nameSpan = document.createElement('span');
  nameSpan.textContent = fullName;
  nameSpan.style.marginRight = '10px';
  
  // Create the BNA button
  const bnaButton = document.createElement('a');
  bnaButton.id = 'bna-button';
  bnaButton.textContent = 'BNA';
  bnaButton.style.fontSize = '14px';
  bnaButton.style.padding = '3px 8px';
  bnaButton.style.backgroundColor = '#4285f4';
  bnaButton.style.color = 'white';
  bnaButton.style.borderRadius = '3px';
  bnaButton.style.textDecoration = 'none';
  bnaButton.style.display = 'inline-block';
  
  const searchQuery = encodeURIComponent(`"${fullName}"`);
  bnaButton.href = `https://www.britishnewspaperarchive.co.uk/search/results?basicsearch=${searchQuery}&exactsearch=false&county=shetland%2c%20scotland&retrievecountrycounts=false&mostspecificlocation=shetland%2c%20scotland`;
  bnaButton.target = '_blank';
  
  // Add both elements to the container
  containerDiv.appendChild(nameSpan);
  containerDiv.appendChild(bnaButton);
  
  // Clear the original header and add our new container
  nameHeader.innerHTML = '';
  nameHeader.appendChild(containerDiv);
  
  console.log("Added BNA search button");
}

function initialize() {
  console.log("Initializing content script");
  setup();
  addSuggestTab();
  addBNAButton();
}

console.log("Content script executed");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function addSuggestTab() {
  const navMenu = document.getElementById('tngnav');
  if (navMenu) {
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
      const editTab = Array.from(navMenu.querySelectorAll('li a')).find(a => a.textContent.includes('Edit'));
      if (editTab) {
        navMenu.insertBefore(suggestLi, editTab.parentNode);
      } else {
        navMenu.appendChild(suggestLi);
      }
      
      console.log("Added Suggest tab to navigation");
    }
  }
}

function setup() {
  const submitButton = document.getElementById('submitbtn');
  if (!submitButton) return;

  // Create the new test button
  const testButton = document.createElement('button');
  testButton.textContent = 'Send to Susan';
  testButton.style.marginLeft = '10px'; // move it slightly to the right
  testButton.type = 'button'; // don't submit the form
  
  // Add click handler
  testButton.addEventListener('click', () => {
    console.log("Test button clicked");
    
    const personID = document.querySelector('input[name="personID"]')?.value;
    const description = document.querySelector('textarea')?.value; // select the textarea directly

    if (description && personID) {
      const to = 'database@shetland-fhs.org.uk';
      const subject = encodeURIComponent(`Bayanne update from James`);

      const body = encodeURIComponent(
        `Hello,\n\n` +
        `This is a (semi) auto-generated update from James from Bayanne.\n\n` +
        `Link to user: ${generateUrl(personID)}\n\n` +
        `Suggestion: ${description}\n\n` +
        `Cheers,\n` +
        `James`
      );

      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
    } else {
      console.log("Missing description or personID");
    }
  });

  // Insert the button after the submit button
  submitButton.parentNode.insertBefore(testButton, submitButton.nextSibling);
}

console.log("Content script executed");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', setup);
} else {
  setup();
}
