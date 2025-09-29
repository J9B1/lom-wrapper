# LOM Electron Wrapper

This is a lightweight Electron wrapper for [Legend of Mushroom](https://lom.joynetgame.com/). It provides a fixed-size, frameless, and rounded window while keeping user login persistent and preventing disconnects when the window loses focus. Making it cleaner and nicer to look at, whilst adding functionality that Bluestacks and other emulators can't provide.

## Features

- Fixed window size: 512x911
- Frameless and transparent with slightly rounded corners
- Persistent login/session across restarts
- Forces the game to think the window is always focused
- Optional remote debugging (`--debug`)
- Packaged installer for easy setup [Latest Release](https://github.com/J9B1/lom-wrapper/releases)
- Discord Rich Presence integration

## Safety & Privacy

- This wrapper **does not modify or access your account data** beyond what your browser session normally allows.  
- All login information is stored locally by Electron in a secure, persistent session.  
- No data is sent to third parties or external servers.  
- The source code is fully open on GitHub so anyone can review it.  
- Remote debugging is optional and **disabled by default** (`--debug`).

## Installation

1. Download the [Latest Release](https://github.com/J9B1/lom-wrapper/releases)
2. Run the Setup.exe
3. Windows might show a warning, this is because it's an unknown source
4. Follow the prompts to install the wrapper.
5. Launch the app from your Start Menu or Desktop shortcut.