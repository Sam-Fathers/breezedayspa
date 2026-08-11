# Publishing this site on GitHub Pages

Written for someone who does not use GitHub daily. Follow it in order.

---

## Part 1 — Create the repository

1. Sign in at **github.com**.
2. Top right, click **+** → **New repository**.
3. **Repository name:** this becomes part of your web address, so keep it
   lowercase with hyphens and no spaces. `meander-myrtle` gives you
   `https://yourname.github.io/meander-myrtle/`.
4. **Description:** optional.
5. **Public.** GitHub Pages is only free on public repositories. Public means
   anyone can read the code. That is normal for a website — the same files are
   already sent to every visitor's browser. Do not put anything private in it.
6. Leave **Add a README**, **.gitignore** and **licence** all **unticked**. You
   want an empty repository so nothing collides with the site's own files.
7. Click **Create repository**.

You land on a "quick setup" page. Leave it open.

---

## Part 2 — Unzip first

GitHub will not unpack a `.zip` for you. If you upload the zip, visitors get a
download prompt instead of a website.

1. Download `meander-myrtle-site.zip`.
2. Unzip it. You now have a folder containing `index.html`, `sw.js`,
   `manifest.webmanifest`, `offline.html`, the `.md` files, and an **`assets`**
   folder.
3. **Open that folder.** Everything you upload comes from inside it. Do not
   upload the folder itself, or your site ends up one level too deep.

---

## Part 3 — Upload, keeping the structure

On the quick setup page, click **uploading an existing file**.

Now select **everything inside** the unzipped folder — the loose files **and
the `assets` folder itself** — and drag the whole selection onto the upload
area in one go.

This is the part that went wrong last time. Two rules:

- **Drag the `assets` folder as a folder.** Do not open it and drag
  `style.css`, `app.js` and the icons out loose. GitHub's uploader understands
  folders and will rebuild `assets/css/`, `assets/js/` and `assets/icons/`
  correctly. It only gets flattened if you flatten it first.
- **Do not rename anything.** Paths are case-sensitive on GitHub's servers.
  `Assets` is not `assets`, and `Style.css` is not `style.css`.

Type a commit message such as `Add site`, then click **Commit changes**.

---

## Part 4 — Add the hidden file

`.nojekyll` starts with a dot, so macOS and Windows hide it. GitHub's uploader
will skip it without telling you. Check the repository file list — if you
cannot see `.nojekyll`, add it by hand:

1. **Add file** → **Create new file**.
2. Name it exactly `.nojekyll`
3. Leave the contents completely empty.
4. **Commit changes**.

Without it, GitHub runs the file through Jekyll, a blog engine that can
interfere with folders and filenames.

---

## Part 5 — Turn Pages on

1. In the repository, click **Settings** (top row, right side).
2. Left sidebar, **Pages**.
3. **Source:** `Deploy from a branch`
4. **Branch:** `main` — and next to it the folder dropdown must say **`/ (root)`**,
   not `/docs`.
5. **Save.**

Go to the **Actions** tab. A job runs for about a minute. When it shows a green
tick, return to Settings → Pages and your live address is displayed at the top.

---

## Part 6 — Check it worked

Open the address on your phone, not just your laptop. You should see the dark
green hero and a floating menu bar at the bottom.

**If a brown bar appears across the top**, it names the exact file that failed
to load. Compare that path against the tree below.

Your repository file list should look exactly like this, with nothing nested
inside a wrapper folder:

```
.nojekyll
DEPLOY.md
README.md
index.html
manifest.webmanifest
offline.html
sw.js
assets/
```

Click into `assets` and you should see three folders: `css`, `icons`, `js`.

---

## Uploading one file at a time

Sometimes you only want to change a single file. GitHub has a trick that
creates folders for you — you never make a folder separately.

**Add file** → **Create new file**, then type the *full path* as the filename:

```
assets/css/style.css
```

The moment you type the `/`, GitHub turns `assets` into a folder and moves the
cursor along. Paste the file contents underneath, then commit. Same for
`assets/js/app.js`, `assets/js/data.js`, and so on.

Where each file belongs:

| File | Path in the repository |
|---|---|
| index.html | `index.html` |
| offline.html | `offline.html` |
| sw.js | `sw.js` |
| manifest.webmanifest | `manifest.webmanifest` |
| .nojekyll | `.nojekyll` |
| style.css | `assets/css/style.css` |
| data.js | `assets/js/data.js` |
| app.js | `assets/js/app.js` |
| icon.svg | `assets/icons/icon.svg` |
| icon-192.png | `assets/icons/icon-192.png` |
| icon-512.png | `assets/icons/icon-512.png` |
| maskable-512.png | `assets/icons/maskable-512.png` |

Note that the four icons are images. They cannot be created this way — images
must be dragged in via **Add file → Upload files** while you are inside the
`assets/icons` folder.

---

## Making changes later

To edit text or prices:

1. Click the file in GitHub, for example `assets/js/data.js`.
2. Click the **pencil** icon.
3. Make your change.
4. **Commit changes** at the bottom.

The site rebuilds automatically within a minute.

### Always bump the cache version

A service worker stores the site on visitors' phones so it works without
signal. That also means returning visitors keep seeing the old version until
you tell it something changed.

Every time you edit content, also open `sw.js` and increase the number:

```js
const VERSION = 'mm-v2';   →   const VERSION = 'mm-v3';
```

Commit both changes together.

### Clearing a stuck version on your own device

If you already loaded a broken copy, your browser is holding onto it:

- **Desktop Chrome/Edge:** F12 → **Application** → **Service Workers** →
  **Unregister** → **Storage** → **Clear site data** → reload.
- **iPhone:** delete the home-screen icon if you added one, then Settings →
  Safari → Advanced → Website Data → remove the site → revisit.
- **Android Chrome:** site settings (padlock icon) → Cookies and site data →
  Delete → reload.

---

## Later: your own domain

When you have a domain such as `meanderandmyrtle.com.au`:

1. Settings → Pages → **Custom domain** → type it → **Save**.
2. At your domain registrar, point the DNS records at GitHub as instructed on
   that same page.
3. Tick **Enforce HTTPS** once it becomes available.

Every path in this site is relative, so nothing inside the code needs editing
when the address changes.
