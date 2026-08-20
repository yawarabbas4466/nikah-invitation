# Nikah Ceremony Invitation — Yawar & Rubeena

A lightweight, mobile-first wedding invitation website. Pure HTML, CSS,
and vanilla JavaScript — no build step, no frameworks, no paid services.

```
nikah-invitation/
├── index.html          ← all content lives here
├── style.css            ← all styling
├── script.js             ← countdown, animations, music toggle
├── assets/
│   ├── og-image.jpg      ← WhatsApp/Facebook share preview image (placeholder)
│   ├── pattern.png        ← subtle background geometric motif
│   └── music.mp3          ← NOT included — add your own (optional, see below)
└── README.md
```

---

## 1. Before you launch — things to check

- [ ] **RSVP numbers** — confirm `+92 312 2050280` (Hassan Abbas) and
      `+92 315 4649504` (Azhar Abbas) are correct in `index.html` (search
      for `wa.me` and `tel:`).
- [ ] **Google Maps link** — the "Get Directions" buttons use the link you
      gave me. The embedded map on the Venue section uses a text search
      for "Muhammad Ayoub House Ithan Sikandarabad" since your link is a
      shortened `maps.app.goo.gl` URL that can't be embedded directly. If
      the embedded map doesn't pinpoint the exact house, open your full
      Google Maps link, click **Share → Embed a map**, copy the `src="..."`
      URL, and paste it into the `<iframe src="...">` in the **Venue**
      section of `index.html`.
- [ ] **Countdown time zone** — already set to 31 August 2026, 3:00 PM
      Pakistan Standard Time (UTC+5). No changes needed unless the time
      changes.

## 2. Replacing the share preview image (`og-image.jpg`)

I generated a simple placeholder (ivory background, gold frame, your
names in green) at `assets/og-image.jpg`, sized 1200×630px — the
standard size WhatsApp/Facebook expect.

**To replace it with your own design or photo:**

1. Design or export an image at **1200×630px** (JPG or PNG).
2. Name it exactly `og-image.jpg` (or update the filename in the two
   `<meta property="og:image" ...>` / `<meta name="twitter:image" ...>`
   tags near the top of `index.html` if you use a different name).
3. Drop it into the `assets/` folder, replacing the existing file.
4. **Important:** WhatsApp caches link previews aggressively. After
   changing the image and re-deploying, test with a fresh URL parameter
   the first time, e.g. `https://yoursite.com/?v=2`, or use
   [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/)
   to force-refresh the cached preview.

## 3. Adding background music (optional)

The play/pause button in the bottom-right corner is already wired up —
it just needs an audio file:

1. Choose a nasheed or instrumental track you have the rights to use
   (no vocals-only copyrighted songs without permission).
2. Export it as an MP3, ideally under 3–4MB so it loads quickly on
   mobile data.
3. Name it `music.mp3` and place it in `assets/`.
4. That's it — the button will automatically become active. If no file
   is found, the button hides itself instead of showing a broken control.

Music never autoplays with sound (most phone browsers block this
anyway) — guests must tap the button themselves.

## 4. Testing locally

You don't need to install anything complicated. Any of these work:

**Option A — just double-click `index.html`**
This opens it directly in your browser. Almost everything works, but
some browsers restrict things like the map iframe when opened as a
local file. Good for a quick look, not final testing.

**Option B — a tiny local server (recommended)**
If you have Python installed (most Mac/Linux computers do, and it's a
free download for Windows):

```bash
cd nikah-invitation
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Press `Ctrl+C` in
the terminal to stop the server when you're done.

---

## 5. Deploying for free

### Option 1 (easiest): GitHub Pages

**Step 1 — Create the project folder**
You already have it: `nikah-invitation/` with the files above inside.

**Step 2 — Save each file**
Make sure `index.html`, `style.css`, `script.js`, `README.md`, and the
`assets/` folder (with `og-image.jpg` and `pattern.png` inside) are all
saved in that one `nikah-invitation` folder on your computer.

**Step 3 — Test it locally**
Follow section 4 above and confirm everything looks right on your own
phone (see step 8 below for how).

**Step 4 — Create a GitHub account**
Go to [github.com](https://github.com) → **Sign up** → follow the
prompts (free). If you already have an account, just log in.

**Step 5 — Create a new repository**
- Click the **+** icon (top-right) → **New repository**.
- Name it something like `nikah-invitation`.
- Set it to **Public** (required for free GitHub Pages).
- Leave "Add a README" unchecked (you already have one).
- Click **Create repository**.

**Step 6 — Upload your website files**
- On your new repository's page, click **uploading an existing file**
  (or **Add file → Upload files**).
- Drag in `index.html`, `style.css`, `script.js`, `README.md`, and the
  entire `assets` folder.
- Scroll down, click **Commit changes**.

**Step 7 — Enable GitHub Pages**
- In your repository, go to **Settings → Pages** (left sidebar).
- Under "Build and deployment" → **Source**, choose **Deploy from a
  branch**.
- Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
- Wait 1–2 minutes.

**Step 8 — Get your public URL**
- Refresh the **Settings → Pages** screen. You'll see a message like:
  *"Your site is live at `https://yourusername.github.io/nikah-invitation/`"*
- That's your shareable link!

**Step 9 — Test on your phone**
- Open that URL in Safari (iPhone) or Chrome (Android).
- Check: countdown is ticking, buttons are easy to tap, no sideways
  scrolling, "Get Directions" opens Google Maps, and the WhatsApp RSVP
  buttons open a chat with a pre-filled message.

**Step 10 — Share via WhatsApp**
- Paste the link into any WhatsApp chat.
- Wait a moment — WhatsApp will fetch the page and show a preview card
  with your `og-image.jpg` and the title "Nikah Ceremony — Yawar &
  Rubeena". (If the preview looks stale after you update the image, see
  the caching note in section 2.)

**Step 11 — Custom domain later (optional)**
- Buy a domain from any registrar (e.g. Namecheap, GoDaddy — this part
  isn't free, typically $10–15/year).
- In your registrar's DNS settings, add a **CNAME** record pointing to
  `yourusername.github.io`.
- Back in **Settings → Pages** on GitHub, enter your custom domain under
  **Custom domain** and save. GitHub will handle HTTPS automatically
  after a short verification period.

### Option 2 (alternative): Netlify

1. Go to [netlify.com](https://www.netlify.com) → sign up (free).
2. From your dashboard, choose **Add new site → Deploy manually**.
3. Drag and drop your entire `nikah-invitation` folder onto the upload
   area.
4. Netlify instantly gives you a live URL like
   `https://random-name-123.netlify.app`.
5. Optional: click **Site settings → Change site name** to pick a nicer
   subdomain, e.g. `yawar-rubeena-nikah.netlify.app`.
6. A custom domain can be added later under **Domain settings** the same
   way as GitHub Pages.

Netlify also supports drag-and-drop re-uploads any time you want to
update content — no need to touch GitHub at all if you'd rather not.

---

## 6. Making quick edits later

Everything guest-facing lives in plain text inside `index.html` —
open it in any text editor (Notepad, TextEdit, VS Code) and search for
the words you want to change (e.g. search for `Sikandarabad` or
`Hassan Abbas`). Save the file, re-upload it (GitHub: "Add file → Upload
files" again with the same filename; Netlify: drag the folder back in),
and the live site updates within a minute.
