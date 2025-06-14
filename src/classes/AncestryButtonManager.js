const AncestryButtonManager = (function() {
  const buttonId = 'ancestry-button';
  
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
    
    let url = `https://www.ancestry.co.uk/search/?name=${nameParam}&searchMode=advanced`;
    
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
  
  return {
    addAncestryButton: addAncestryButton
  };
})();
