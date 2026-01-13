# Standalone Distribution Guide

## Creating Standalone Executables (No Docker/Node Required)

Your team can run the app without installing Docker, Node.js, or any dependencies!

### Build Standalone Executables

On your personal machine:

```bash
# Install dependencies
npm install

# Build executable for Windows
npm run package:win

# Build executable for macOS
npm run package:mac

# Build executable for Linux
npm run package:linux

# Or build for all platforms at once
npm run package:all
```

### Find Your Executables

After building, executables will be in the `dist-executable/` folder:
- **Windows**: `SD-Intuition-Windows.exe`
- **macOS**: `SD-Intuition-macOS`
- **Linux**: `SD-Intuition-Linux`

### Share with Team

1. **Upload to shared drive**: Copy the appropriate executable to your company's shared drive
2. **Email/Slack**: Send the executable file directly (may be blocked by some email filters)
3. **Company file sharing**: Use your company's file sharing service (SharePoint, Google Drive, etc.)

### How Team Members Use It

**Windows Users:**
1. Double-click `SD-Intuition-Windows.exe`
2. Windows Defender might show a warning (click "More info" → "Run anyway")
3. Browser opens automatically to http://localhost:3000
4. That's it! No installation needed.

**Mac Users:**
1. Double-click `SD-Intuition-macOS`
2. May need to right-click → Open (first time only for unsigned apps)
3. Browser opens automatically
4. Done!

**Linux Users:**
1. Make executable: `chmod +x SD-Intuition-Linux`
2. Run: `./SD-Intuition-Linux`
3. Browser opens automatically

### Stopping the App

Press `Ctrl+C` in the terminal/command window, or just close the window.

### File Sizes

Each executable is approximately **100-150MB** (includes the entire app + mini web server).

### Troubleshooting

**Port 3000 already in use:**
- Someone else is already running it on that machine
- Stop other apps using port 3000
- Or modify `server.js` to use a different port before building

**Antivirus/Security Warning:**
- Windows Defender and some antivirus tools flag unsigned executables
- This is normal for apps not signed with a Microsoft certificate
- Users can click "More info" → "Run anyway"
- OR get the executable code-signed (requires certificate, costs ~$200/year)

**macOS "Unidentified Developer" Warning:**
- Right-click the file → Open (instead of double-clicking)
- Click "Open" in the dialog
- This is required for apps not signed with an Apple Developer certificate

### Alternative: Simple Zip Distribution

If executables don't work for your environment:

```bash
# Build the app
npm run build

# Create a zip with built files
# Share the 'dist' folder + server.js + package.json
```

Team members would need Node.js installed but can run:
```bash
npm install --production
npm start
```

---

## Docker Option (If Team Has Docker)

See [DEPLOYMENT.md](DEPLOYMENT.md) for Docker containerization instructions.
