---
title: Shell Script Site Generator with GitHub Pages

tag:
- howto
- software
- programming
---

A while ago, I wrote a site generator with a shell script. The script generates a catalog for my [wallpapers project](https://github.com/DaringCuteSeal/wallpapers). I love shell scripts so much that the possibility is now endless, which is absolutely cool!

Back then, I have absolutely no idea on how to deploy the generated page. But I did know that [GitHub Actions](https://github.com/features/actions) and my future self can probably figure out how to deploy the page. And so yesterday came and I finally wrote a working action that generates my catalog and deploys it to my site.

I didn't know how to start at first. A shell script site generator? Sounds unusual. I tried looking the GitHub Marketplace for GitHub Pages-related actions but none of them worked. And after further reading, I finally found [the proper workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

Basically, here's how the deployment works:
1. Checkout your repository
2. (Optional) build static files, usually through a website builder
3. Upload the site artifact
4. Deploy the previously uploaded artifact

The only step I need to customize to suit my need is the static file building part. Instead of using a website builder command, I have to run my shell script that I wrote.

So here's the complete action:
```yaml
name: Deploy generated catalog page
on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["gh-pages"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Build
        run: bash catalog/generate-catalog.sh ./output
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
         path: output
         name: wallpaper-catalog

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
        with:
           artifact_name: wallpaper-catalog
```
