class EmailButtonManager {
  constructor() {
    this.submitButton = document.getElementById('submitbtn');
    this.init();
  }

  init() {
    if (!this.submitButton) return;

    const emailButton = this.createEmailButton();
    this.submitButton.parentNode.insertBefore(emailButton, this.submitButton.nextSibling);
  }

  createEmailButton() {
    const emailButton = document.createElement('button');
    emailButton.textContent = 'Send to Susan';
    emailButton.style.marginLeft = '10px';
    emailButton.type = 'button';

    emailButton.addEventListener('click', () => this.handleEmailButtonClick());

    return emailButton;
  }

  handleEmailButtonClick() {
    const personID = document.querySelector('input[name="personID"]')?.value;
    const description = document.querySelector('textarea')?.value;

    if (description && personID) {
      const to = 'database@shetland-fhs.org.uk';
      const subject = encodeURIComponent(`Bayanne update from James`);

      const body = encodeURIComponent(
        `Hello,\n\n` +
        `This is a (semi) auto-generated update from James from Bayanne.\n\n` +
        `Link to user: ${this.generateUrl(personID)}\n\n` +
        `Suggestion: ${description}\n\n` +
        `Cheers,\n` +
        `James`
      );

      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
    } else {
      console.log("Missing description or personID");
    }
  }

  generateUrl(id) {
    return `https://www.bayanne.info/Shetland/getperson.php?personID=${id}&tree=ID1`;
  }
}

export default EmailButtonManager;