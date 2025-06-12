const BNAButtonManager = (function() {
  const buttonId = 'bna-button';
  function generateUrl(id) {
    return `https://www.bayanne.info/Shetland/getperson.php?personID=${id}&tree=ID1`;
  }

  function addBNAButton() {
    const nameHeader = document.getElementById('nameheader');
    if (!nameHeader) return;

    const fullName = nameHeader.textContent.trim();
    if (!fullName) return;

    const existingButton = document.getElementById(buttonId);
    if (existingButton) {
      return;
    }

    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'flex';
    containerDiv.style.alignItems = 'center';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = fullName;
    nameSpan.style.marginRight = '10px';
    const bnaButton = document.createElement('a');
    bnaButton.id = buttonId;
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

    containerDiv.appendChild(nameSpan);
    containerDiv.appendChild(bnaButton);

    nameHeader.innerHTML = '';
    nameHeader.appendChild(containerDiv);
  }
  return {
    generateUrl: generateUrl,
    addBNAButton: addBNAButton
  };
})();