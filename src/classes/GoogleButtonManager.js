const GoogleButtonManager = (function() {
  const buttonId = 'google-button';
  
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

  function addGoogleButton() {
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
    const optimalSurname = NameUtils.getOptimalSurname(nameObj.surname);

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

    const googleButton = document.createElement('a');
    googleButton.id = buttonId;
    googleButton.textContent = 'G';
    googleButton.style.fontSize = '14px';
    googleButton.style.padding = '3px 8px';
    googleButton.style.backgroundColor = '#db4437';
    googleButton.style.color = 'white';
    googleButton.style.borderRadius = '3px';
    googleButton.style.textDecoration = 'none';
    googleButton.style.display = 'inline-block';
    googleButton.style.marginLeft = '5px';
    
    let searchName;
    if (middleNames) {
      searchName = `${firstName} ${middleNames} ${optimalSurname}`;
    } else {
      searchName = `${firstName} ${optimalSurname}`;
    }
    
    let searchQuery = `"${searchName}"`;
    
    if (birthYear || deathYear) {
      if (birthYear && deathYear) {
        searchQuery += ` ${birthYear}-${deathYear}`;
      } else if (birthYear) {
        searchQuery += ` born ${birthYear}`;
      } else if (deathYear) {
        searchQuery += ` died ${deathYear}`;
      }
    }
    
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://www.google.com/search?q=${encodedQuery}`;
    
    googleButton.href = url;
    googleButton.target = '_blank';
    
    containerDiv.appendChild(googleButton);
  }
  
  return {
    addGoogleButton: addGoogleButton
  };
})();
