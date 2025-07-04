const FGButtonManager = (function() {
  const buttonId = 'fg-button';
  
  function addCopyButtonToFGPage() {
    // Check if we're on a Find A Grave memorial page
    if (!window.location.href.match(/findagrave\.com\/memorial\/\d+/)) {
      return;
    }
    
    // Find the death date element - try both formats
    const deathDateElement = document.getElementById('deathDateLabel') || 
                           document.querySelector('.deathDate');
    if (!deathDateElement) {
      return;
    }
    
    // Check if we've already added a button
    if (document.querySelector('.fg-copy-button')) {
      return;
    }
    
    // Get death date text
    const deathDate = deathDateElement.textContent.trim();
    
    // Create copy button
    const copyButton = document.createElement('span');
    copyButton.className = 'fg-copy-button';
    copyButton.innerHTML = ' 📋'; // clipboard icon with space before
    copyButton.title = 'Copy URL, death date and location';
    copyButton.style.cursor = 'pointer';
    copyButton.style.marginLeft = '8px';
    copyButton.style.fontSize = '16px';
    
    // Add click handler
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get death location at the time of clicking - try multiple possible selectors
      let deathLocation = '';
      
      // Try standard location ID first - this is a DIV with id="deathLocationLabel" and class="place"
      const deathLocationElement = document.getElementById('deathLocationLabel');
      
      if (deathLocationElement) {
        deathLocation = deathLocationElement.textContent.trim();
      } 
      // Try the deathPlace span class if the first attempt failed
      else {
        const deathPlaceSpan = document.querySelector('.deathPlace');
        
        if (deathPlaceSpan) {
          deathLocation = deathPlaceSpan.textContent.trim();
        }
      }
      
      // Get URL and death info
      const url = window.location.href;
      let copyText = `${url}\nDeath date: ${deathDate}`;
      
      // Add location if available
      if (deathLocation) {
        copyText += `\nLocation: ${deathLocation}`;
      } else {
        // Last resort - try multiple specific structures
        let deathPlaceElement = null;
        
        // Try various selectors that might contain the death location
        const selectors = [
          'div#deathLocationLabel.place',          // Main structure in your example
          'span.info span.deathPlace',             // Alternative structure
          'dd .deathPlace',                        // Another possible structure
          'dd div.place[itemprop="deathPlace"]',   // Based on your HTML structure
          'div[itemprop="deathPlace"]'             // Generic itemprop selector
        ];
        
        // Try each selector until we find something
        for (const selector of selectors) {
          deathPlaceElement = document.querySelector(selector);
          if (deathPlaceElement) {
            deathLocation = deathPlaceElement.textContent.trim();
            break;
          }
        }
        
        if (deathLocation) {
          copyText += `\nLocation: ${deathLocation}`;
        }
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(copyText).then(() => {
        // Show feedback
        copyButton.innerHTML = ' ✓';
        copyButton.style.color = 'green';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
          copyButton.innerHTML = ' 📋';
          copyButton.style.color = '';
        }, 1500);
      });
      
      return false;
    });
    
    // Add the button after the death date
    // If it's an element where we can append a child directly (like the deathDateLabel)
    if (deathDateElement.tagName && 
        (deathDateElement.tagName.toLowerCase() === 'span' || 
         deathDateElement.tagName.toLowerCase() === 'div')) {
      deathDateElement.appendChild(copyButton);
    } 
    // If it's a more complex element structure (like with the .deathDate class)
    else {
      // Find the parent that we can append to
      const parentElement = deathDateElement.parentElement;
      if (parentElement) {
        parentElement.appendChild(copyButton);
      }
    }
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

  function addFGButton() {
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
    const surname = NameUtils.getOptimalSurname(nameObj.surname);

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

    const fgButton = document.createElement('a');
    fgButton.id = buttonId;
    fgButton.textContent = 'FG';
    fgButton.style.fontSize = '14px';
    fgButton.style.padding = '3px 8px';
    fgButton.style.backgroundColor = '#6c757d'; 
    fgButton.style.color = 'white';
    fgButton.style.borderRadius = '3px';
    fgButton.style.textDecoration = 'none';
    fgButton.style.display = 'inline-block';
    fgButton.style.marginLeft = '5px';
    
    
    const http = 'https://www.findagrave.com/memorial/search?';
    const fn = `firstname=${encodeURIComponent(firstName)}`;
    const mn = `middlename=${encodeURIComponent(middleNames)}`;
    const sn = `lastname=${encodeURIComponent(surname)}`;
    const by = `birthyear=${birthYear}&birthyearfilter=`;
    const dy = `deathyear=${deathYear}&deathyearfilter=`;
    const end = 'location=&locationId=&memorialid=&mcid=&linkedToName=&datefilter=&orderby=';
    const url = `${http}${fn}&${mn}&${sn}&${by}&${dy}&${end}`;
    
    fgButton.href = url;
    fgButton.target = '_blank';
    
    containerDiv.appendChild(fgButton);
  }
  // Function to initialize both FG-related features
  function initialize() {
    addFGButton();
    
    // For the copy button on Find A Grave pages
    if (window.location.href.includes('findagrave.com')) {
      // Add copy button if we're already on a memorial page
      addCopyButtonToFGPage();
      
      // Set up observer for dynamic content or navigation
      const observer = new MutationObserver((mutations) => {
        // Check if we're on a memorial page
        if (window.location.href.match(/findagrave\.com\/memorial\/\d+/)) {
          // Look for specific elements that indicate we should add the button
          for (const mutation of mutations) {
            // If death date or location elements were added
            if (mutation.addedNodes.length && 
                (document.getElementById('deathDateLabel') || 
                 document.querySelector('.deathDate'))) {
              addCopyButtonToFGPage();
              break;
            }
          }
          
          // Also periodically check if button needs to be added (as fallback)
          // This helps with SPA navigation where mutations might not catch everything
          if (!document.querySelector('.fg-copy-button') && 
              (document.getElementById('deathDateLabel') || 
               document.querySelector('.deathDate'))) {
            addCopyButtonToFGPage();
          }
        }
      });
      
      // Start observing document for changes with options for better SPA detection
      observer.observe(document, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true
      });
      
      // Set up a URL change detector for SPA navigation
      let lastUrl = location.href;
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          // URL changed - check if we need to add the button
          if (url.match(/findagrave\.com\/memorial\/\d+/)) {
            // Small delay to let the page render
            setTimeout(addCopyButtonToFGPage, 500);
          }
        }
      }).observe(document, {subtree: true, childList: true});
    }
  }
  
  return {
    addFGButton: addFGButton,
    addCopyButtonToFGPage: addCopyButtonToFGPage,
    initialize: initialize
  };
})();