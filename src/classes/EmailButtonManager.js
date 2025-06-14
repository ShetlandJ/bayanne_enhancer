const EmailButtonManager = (function() {
  const submitButton = document.getElementById('submitbtn');

  function generateUrl(id) {
    return `https://www.bayanne.info/Shetland/getperson.php?personID=${id}&tree=ID1`;
  }

  function createEmailButton() {
    const emailButton = document.createElement('button');
    emailButton.textContent = 'Send to SHFS';
    emailButton.style.marginLeft = '10px';
    emailButton.type = 'button';

    emailButton.addEventListener('click', handleEmailButtonClick);
    return emailButton;
  }

  function handleEmailButtonClick() {
    const personID = document.querySelector('input[name="personID"]')?.value;
    const description = document.querySelector('textarea')?.value;

    if (description && personID) {
      const to = 'database@shetland-fhs.org.uk';
      const subject = encodeURIComponent(`Bayanne update from James`);

      const body = encodeURIComponent(
        `Hello,\n\n` +
        `This is a (semi) auto-generated update from James from Bayanne.\n\n` +
        `Link to user: ${generateUrl(personID)}\n\n` +
        `Suggestion: ${description}\n\n` +
        `Cheers,\n` +
        `James`
      );

      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
    }
  }

  function init() {
    if (!submitButton) return;
    const emailButton = createEmailButton();
    submitButton.parentNode.insertBefore(emailButton, submitButton.nextSibling);
  }

  init();

  return {};
})();
