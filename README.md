# SolGuard

🛡️ **SolGuard** - A browser extension designed to protect users from attacks on the Solana blockchain.

## Overview

SolGuard is a security-focused browser extension built with React and Vite that helps protect Solana users from various types of attacks and malicious activities. The extension monitors blockchain interactions and provides real-time protection while browsing Solana-related websites and applications.

## Features

- 🔒 Real-time protection against Solana-based attacks
- 🚨 Malicious transaction detection
- 🛡️ Wallet security monitoring
- ⚡ Fast and lightweight performance
- 🎯 User-friendly interface

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Chrome browser

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/joelvarghese6/SolGuard.git
   cd SolGuard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```
   This will create a `dist` folder containing the built extension files.

4. **Load the extension in Chrome**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle switch in the top right)
   - Click **Load unpacked**
   - Select the `dist` folder from your project directory
   - The SolGuard extension should now appear in your extensions list

5. **Start using SolGuard**
   - The extension icon should appear in your Chrome toolbar
   - Click on it to access the extension's features
   - Browse Solana applications with enhanced security

## Development


### Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **TypeScript** - Type safety (if applicable)
- **Chrome Extension APIs** - Browser extension functionality

## Usage

Once installed, SolGuard will:

1. Monitor your Solana blockchain interactions
2. Alert you to potentially malicious transactions
3. Provide security recommendations
4. Block known malicious websites and contracts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

**Stay safe on Solana with SolGuard! 🛡️**
