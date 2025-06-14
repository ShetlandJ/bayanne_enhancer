const NameUtils = (function() {
  function getNormalNameParts(name) {
    const titles = ['Doctor', 'Dr', 'Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Lady', 'Lord', 'Rev', 'Reverend', 'Captain', 'Major', 'Colonel', 'General'];
    
    let splitName = name.split(' ');
    
    if (splitName.length > 1 && titles.includes(splitName[0])) {
      splitName.shift();
    }
    
    const firstName = splitName[0];
    const surname = splitName[splitName.length - 1];
    splitName.shift();
    splitName.pop();
    const middleNames = splitName.join(' ');
    return {
      firstName,
      middleNames,
      surname,
    };
  }

  function isWoman() {
    const spans = document.getElementsByClassName('normal');
    if (spans && spans.length > 1) {
      const genderSpan = spans[1];
      const femaleImg = genderSpan.querySelector('img[src*="tng_female.gif"]');
      return !!femaleImg;
    }
    return false;
  }

  function getMarriedSurname() {
    const familyCells = document.querySelectorAll('td[id*="famF"] .fieldname');
    if (!familyCells.length) return null;

    let highestFamilyNumber = 0;
    let highestFamilyCell = null;

    familyCells.forEach(cell => {
      const familyText = cell.textContent.trim();
      if (familyText === 'Family') {
        highestFamilyNumber = 1;
        highestFamilyCell = cell;
      } else if (familyText.startsWith('Family ')) {
        const number = parseInt(familyText.replace('Family ', ''));
        if (number > highestFamilyNumber) {
          highestFamilyNumber = number;
          highestFamilyCell = cell;
        }
      }
    });

    if (!highestFamilyCell) return null;

    const familyRow = highestFamilyCell.closest('tr');
    if (!familyRow) return null;

    const dataCell = familyRow.querySelector('td.databack');
    if (!dataCell) return null;

    const husbandLink = dataCell.querySelector('a[href*="getperson.php"]');
    if (!husbandLink) return null;

    const husbandName = husbandLink.textContent.trim();
    const nameParts = husbandName.split(' ');
    return nameParts[nameParts.length - 1];
  }

  function getOptimalSurname(originalSurname) {
    if (isWoman()) {
      const marriedSurname = getMarriedSurname();
      if (marriedSurname) {
        return marriedSurname;
      }
    }
    return originalSurname;
  }

  return {
    getNormalNameParts: getNormalNameParts,
    isWoman: isWoman,
    getMarriedSurname: getMarriedSurname,
    getOptimalSurname: getOptimalSurname
  };
})();
