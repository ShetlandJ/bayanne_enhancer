const ScotlandsPeopleButtonManager = (function() {
  const buttonId = 'scotlandspeople-button';
  
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

  function addScotlandsPeopleButton() {
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

    const scotlandsPeopleButton = document.createElement('a');
    scotlandsPeopleButton.id = buttonId;
    scotlandsPeopleButton.textContent = 'SP';
    scotlandsPeopleButton.style.fontSize = '14px';
    scotlandsPeopleButton.style.padding = '3px 8px';
    scotlandsPeopleButton.style.backgroundColor = '#6f42c1';
    scotlandsPeopleButton.style.color = 'white';
    scotlandsPeopleButton.style.borderRadius = '3px';
    scotlandsPeopleButton.style.textDecoration = 'none';
    scotlandsPeopleButton.style.display = 'inline-block';
    scotlandsPeopleButton.style.marginLeft = '5px';
    
    let url = 'https://www.scotlandspeople.gov.uk/search-records/statutory-records/stat_deaths';
    const params = new URLSearchParams();
    
    let forenames = firstName;
    if (middleNames) {
      forenames = `${firstName} ${middleNames}`;
    }
    
    params.append('forename', forenames);
    params.append('surname', surname);
    
    if (birthYear) {
      params.append('birth_year', birthYear);
    }
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    scotlandsPeopleButton.href = url;
    scotlandsPeopleButton.target = '_blank';
    
    containerDiv.appendChild(scotlandsPeopleButton);
  }
  
  function autoFillSearchForm() {
    // Only run on ScotlandsPeople website
    if (!window.location.href.includes('scotlandspeople.gov.uk')) {
      return;
    }
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const forename = urlParams.get('forename');
    const surname = urlParams.get('surname');
    const birthYear = urlParams.get('birth_year');
    
    // If no relevant parameters, exit
    if (!forename && !surname && !birthYear) {
      return;
    }
    
    // Function to fill the form fields
    function fillFormFields() {
      // Fill forename field
      if (forename) {
        const forenameInput = document.getElementById('edit-search-params-nrs-forename');
        if (forenameInput) {
          forenameInput.value = forename;
          forenameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      // Fill surname field
      if (surname) {
        const surnameInput = document.getElementById('edit-search-params-nrs-surname');
        if (surnameInput) {
          surnameInput.value = surname;
          surnameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      // Fill birth year field if available
      if (birthYear) {
        const birthYearInput = document.getElementById('edit-search-params-nrs-dob');
        if (birthYearInput) {
          birthYearInput.value = birthYear;
          birthYearInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      // Click the search button after filling the form
      setTimeout(() => {
        const searchButton = document.getElementById('edit-actions-submit');
        if (searchButton) {
          searchButton.click();
        }
      }, 600); // Give a short delay to ensure form fields are properly filled and validated
    }
    
    // Function to check for form elements and retry
    function checkAndFill(retryCount = 0) {
      const formElements = document.querySelectorAll('input[type="text"]');
      
      if (formElements.length > 0) {
        fillFormFields();
      } else if (retryCount < 10) {
        // Retry a few times with increasing delay
        setTimeout(() => checkAndFill(retryCount + 1), 500 + (retryCount * 200));
      }
    }
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(checkAndFill, 500));
    } else {
      // DOM already loaded, try after a short delay to let scripts run
      setTimeout(checkAndFill, 500);
    }
  }
  
  return {
    addScotlandsPeopleButton: addScotlandsPeopleButton,
    autoFillSearchForm: autoFillSearchForm
  };
})();
