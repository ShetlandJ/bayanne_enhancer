class BNAButtonManager {
  constructor() {
    this.buttonId = 'bna-button';
  }

  generateUrl(id) {
    return `https://www.bayanne.info/Shetland/getperson.php?personID=${id}&tree=ID1`;
  }

  addBNAButton() {
    const nameHeader = document.getElementById('nameheader');
    if (!nameHeader) return;

    const fullName = nameHeader.textContent.trim();
    if (!fullName) return;

    // don't if button already exists
    const existingButton = document.getElementById(this.buttonId);
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
    bnaButton.id = this.buttonId;
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
}

export default BNAButtonManager;