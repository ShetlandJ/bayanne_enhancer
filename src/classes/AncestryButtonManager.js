const AncestryButtonManager = (function() {
  const buttonId = 'ancestry-button';
  
  function addCopyButtonToUserPage() {
    // Check if this is an Ancestry person page
    if (!window.location.href.includes('ancestry.co.uk/family-tree/person/tree/')) {
      return;
    }
    
    // Find the death event line
    const deathEventLine = document.querySelector('.deathEvent');
    if (!deathEventLine) {
      return;
    }
    
    // Check if we already added a button
    if (deathEventLine.querySelector('.ancestry-copy-button')) {
      return;
    }
    
    // Get the death date
    const deathDateElement = deathEventLine.querySelector('.deathDate');
    const deathDate = deathDateElement ? deathDateElement.textContent.trim() : '';
    
    // Create copy button
    const copyButton = document.createElement('span');
    copyButton.className = 'ancestry-copy-button';
    copyButton.innerHTML = '📋'; // clipboard icon
    copyButton.title = 'Copy URL and death date';
    copyButton.style.cursor = 'pointer';
    copyButton.style.marginLeft = '10px';
    copyButton.style.fontSize = '16px';
    
    // Add click handler
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get URL and death date
      const url = window.location.href;
      const copyText = `${url}\nDeath date: ${deathDate}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(copyText).then(() => {
        // Show feedback
        copyButton.innerHTML = '✓';
        copyButton.style.color = 'green';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
          copyButton.innerHTML = '📋';
          copyButton.style.color = '';
        }, 1500);
      });
    });
    
    // Add the button to the DOM
    deathEventLine.appendChild(copyButton);
  }
  
  function getBirthDeathYears() {
    const spans = document.getElementsByClassName('normal');
    if (spans && spans.length > 1) {
        const birthDeathString = spans[1].textContent.trim();
        const bdSplit = birthDeathString.split(' ');
        
        const birthYear = bdSplit[0] && bdSplit[0].length === 4 ? bdSplit[0] : '';
        const deathYear = bdSplit[2] && bdSplit[2].length === 4 ? bdSplit[2] : '';
        
        return { birthYear, deathYear };
    }
    
    return { birthYear: '', deathYear: '' };
  }

  function addAncestryButton() {
    const nameHeader = document.getElementById('nameheader');
    if (!nameHeader) return;

    const existingButton = document.getElementById(buttonId);
    if (existingButton) return;
    
    let fullName = '';
    const nameSpan = nameHeader.querySelector('span');
    
    if (nameSpan) {
      fullName = nameSpan.textContent.trim();
    } else {
      fullName = nameHeader.textContent.trim();
    }
    
    if (!fullName) return;
    
    const nameObj = NameUtils.getNormalNameParts(fullName);
    const firstName = nameObj.firstName;
    const middleNames = nameObj.middleNames;
    const surname = nameObj.surname;

    const { birthYear, deathYear } = getBirthDeathYears();

    const bnaButton = document.getElementById('bna-button');
    let containerDiv;
    
    if (bnaButton && bnaButton.parentElement) {
      containerDiv = bnaButton.parentElement;
    } else {
      containerDiv = document.createElement('div');
      containerDiv.style.display = 'flex';
      containerDiv.style.alignItems = 'center';
      const nameSpan = document.createElement('span');
      nameSpan.textContent = fullName;
      nameSpan.style.marginRight = '10px';
      containerDiv.appendChild(nameSpan);
      
      nameHeader.innerHTML = '';
      nameHeader.appendChild(containerDiv);
    }

    const ancestryButton = document.createElement('a');
    ancestryButton.id = buttonId;
    ancestryButton.textContent = 'A';
    ancestryButton.style.fontSize = '14px';
    ancestryButton.style.padding = '3px 8px';
    ancestryButton.style.backgroundColor = '#28a745';
    ancestryButton.style.color = 'white';
    ancestryButton.style.borderRadius = '3px';
    ancestryButton.style.textDecoration = 'none';
    ancestryButton.style.display = 'inline-block';
    ancestryButton.style.marginLeft = '5px';
    
    let nameParam;
    if (middleNames) {
      nameParam = `${firstName}+${middleNames.replace(/\s+/g, '+')}_${surname}`;
    } else {
      nameParam = `${firstName}_${surname}`;
    }
    
    let url = `https://www.ancestry.co.uk/search/categories/42/?name=${nameParam}&searchMode=advanced`;
    
    if (birthYear) {
      url += `&birth=${birthYear}`;
    }
    if (deathYear) {
      url += `&death=${deathYear}`;
    }
    
    ancestryButton.href = url;
    ancestryButton.target = '_blank';
    
    containerDiv.appendChild(ancestryButton);
  }
  
  // Function to initialize both Ancestry-related features
  function initialize() {
    addAncestryButton();
    // For the copy button on Ancestry pages, we need to run this on load
    // and also set up a MutationObserver to catch dynamic page loads
    if (window.location.href.includes('ancestry.co.uk')) {
      // Add copy button if we're already on a person page
      addCopyButtonToUserPage();
      
      // Set up observer for SPA navigation
      const observer = new MutationObserver((mutations) => {
       
        if (window.location.href.includes('/family-tree/person/tree/')) {        
          addCopyButtonToUserPage();
        }
      });
      
      // Start observing the document body for DOM changes
      observer.observe(document.body, { 
        childList: true,
        subtree: true 
      });
    }
  }
  
  return {
    addAncestryButton: addAncestryButton,
    addCopyButtonToUserPage: addCopyButtonToUserPage,
    initialize: initialize
  };
})();
