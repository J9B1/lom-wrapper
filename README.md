# LOM Electron Wrapper

This is a lightweight Electron wrapper for [Legend of Mushroom](https://lom.joynetgame.com/). It provides a fixed-size, frameless, and rounded window while keeping user login persistent and preventing disconnects when the window loses focus.

## Features

- Fixed window size: 512x911
- Frameless and transparent with slightly rounded corners
- Persistent login/session across restarts
- Forces the game to think the window is always focused
- Optional remote debugging (`config.json`)
- Custom taskbar icon
- Packaged installer for easy setup (`installer/setup.exe`)

## Safety & Privacy

- This wrapper **does not modify or access your account data** beyond what your browser session normally allows.  
- All login information is stored locally by Electron in a secure, persistent session.  
- No data is sent to third parties or external servers.  
- The source code is fully open on GitHub so anyone can review it.  
- Remote debugging is optional and **disabled by default** (`config.json`).

## Installation

1. Run the installer at: installer/setup.exe
2. Follow the prompts to install the wrapper.
3. Launch the app from your Start Menu or Desktop shortcut.