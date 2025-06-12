# Bayanne Enhancer

## Project Overview
The Bayanne Enhancer is a browser extension designed to enhance the user experience on the Bayanne website. It provides additional functionalities such as searching for names in the British Newspaper Archive, suggesting entries, and facilitating email communications.

## File Structure
```
bayanne_enhancer
├── src
│   ├── content.js               # Main entry point for the content script
│   └── classes
│       ├── BNAButtonManager.js   # Manages the BNA button functionality
│       ├── SuggestTabManager.js   # Manages the Suggest tab functionality
│       ├── EmailButtonManager.js   # Manages the email button functionality
│       └── UIManager.js           # General UI management
├── manifest.json                 # Metadata for the browser extension
└── README.md                     # Documentation for the project
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd bayanne_enhancer
   ```

2. **Load the Extension**
   - Open your browser and navigate to the extensions page (e.g., `chrome://extensions`).
   - Enable "Developer mode".
   - Click on "Load unpacked" and select the `bayanne_enhancer` directory.

## Usage
- Once the extension is loaded, navigate to the Bayanne website.
- The extension will automatically enhance the page by adding the BNA button, Suggest tab, and email functionalities.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.