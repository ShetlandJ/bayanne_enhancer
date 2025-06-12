const FGButtonManager = (function() {
  const buttonId = 'fg-button';

  function getSurnameFirstNameParts(name) {
    const splitName = name.split(' ');
  
    const surname = splitName[splitName.length - 1];
    const firstName = splitName[0];
    const middleNames = splitName.slice(1, splitName.length - 1).join(' ');
  
    return {
      firstName,
      middleNames,
      surname,
    };
  }
  
  function getNormalNameParts(name) {
    const splitName = name.split(' ');

    const firstName = splitName[0];
    const surname = splitName[splitName.length - 1];

    splitName.shift();
    splitName.pop();

    const middleNames = splitName.join(' ');

    return {
        firstName,
        middleNames,
        surname,
    }
  }

  function getHtmlElement(linkUrl) {
    const anchors = document.querySelectorAll('a');
    let element = '';

    Array.from(anchors).forEach(a => {
        if (a.href === linkUrl) {
            element = a.parentElement;
        }
    });

    return element;
  }

  function getPersonPopover(element) {
    const children = element.children;
    let popover = null;
    
    Array.from(children).forEach(c => {
        if (c.classList.value === 'person-img') {
            popover = c
        }
    });

    return popover;
  }

  function getBDMString(popover) {
    if (popover) {
        if (popover.children[0]) {
            if (popover.children[0].children[0]) {
                if (popover.children[0].children[0].children[2]) {
                    return popover.children[0].children[0].children[2].textContent.trim()
                }
            }
        }
    }

    return false;
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
    
    const nameObj = getNormalNameParts(fullName);
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
  return {
    addFGButton: addFGButton
  };
})();