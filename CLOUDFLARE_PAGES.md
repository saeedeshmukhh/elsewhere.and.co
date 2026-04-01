# Deploy to Cloudflare Pages (Git)

## 1. Push this repo to GitHub or GitLab

This project already has a local `main` branch with an initial commit. You only need a remote and a push:

1. Create a new **empty** repository on [GitHub](https://github.com/new) or GitLab (no README, `.gitignore`, or license so you avoid merge conflicts).
2. From this project folder:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

Replace the URL with your repository URL (HTTPS or SSH). If `git remote add` fails because `origin` exists, use `git remote set-url origin <url>` instead.

## 2. Connect Cloudflare Pages

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub/GitLab and select this repository.
4. **Set up builds:**

| Setting | Value |
|--------|--------|
| Framework preset | None (or Vite — either is fine) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (leave empty or `/` unless the app lives in a subfolder) |

5. **Environment variables** (production):

| Variable name | Value |
|---------------|--------|
| `NODE_VERSION` | `22` |

6. Save and **Deploy**.

## 3. After deploy

- Your site will be on a URL like `https://your-project.pages.dev`.
- **Custom domain:** project → **Custom domains** → add your domain and follow DNS instructions.

## Notes

- `public/_redirects` is copied into `dist` so React Router routes work on refresh.
- `.node-version` is set to `22` for local/CI; Cloudflare still needs `NODE_VERSION` in the dashboard for predictable builds.
