# Build Civic Sense — Setup Instructions

## Your project folder contains:
```
civic-sense/
  index.html        ← your app
  manifest.json     ← makes it installable
  service-worker.js ← makes it work offline
  icons/
    icon-48.png     ← small icon
    icon-192.png    ← medium icon (home screen)
    icon-512.png    ← large icon (splash screen)
```

---

## Step 1 — Test it on your computer

1. Open VS Code
2. File → Open Folder → select the `civic-sense` folder
3. Install the "Live Server" extension (click Extensions icon, search "Live Server", click Install)
4. Right-click `index.html` → click "Open with Live Server"
5. Your browser opens at http://127.0.0.1:5500 — you should see the app!

---

## Step 2 — Put it on GitHub

Open Terminal in VS Code (Terminal → New Terminal) and type these commands ONE BY ONE:

```
git init
git add .
git commit -m "first version of civic sense app"
```

Then:
1. Go to https://github.com/new
2. Name it `civic-sense`, click "Create repository"
3. Copy the two lines GitHub shows you (they start with `git remote add...`)
4. Paste them in VS Code terminal and press Enter

---

## Step 3 — Publish on Netlify (free)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Click "GitHub" → choose your `civic-sense` repo
4. Click "Deploy site"
5. Wait 1 minute — you get a free URL like https://civic-sense-abc123.netlify.app

That URL works on any phone! Share it and people can install the app.

---

## Step 4 — Replace the green icons with your logo

1. Go to https://favicon.io/favicon-generator
2. Type "CS", pick green color, download the ZIP
3. Replace the files in the `icons/` folder
4. Commit and push again — Netlify auto-updates

---

## To update the app later:

Make your changes in VS Code, then in terminal:
```
git add .
git commit -m "describe what you changed"
git push
```
Netlify will automatically update the live site!
