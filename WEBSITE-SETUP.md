# Bryan Martinez’s portfolio website

This is a standalone GitHub Pages website inspired by the reference portfolio’s sidebar, warm colors, portrait, and project sections. Its code and copy are written for Bryan’s actual labs. Existing lab files stay unchanged.

## Preview locally

Open docs/index.html in a browser, or run:

```sh
python3 -m http.server 4173 --directory docs
```

Then visit http://localhost:4173.

## Publish from the review branch (no merge required)

1. In the deploy-ad repository, open Settings → Pages.
2. Under Build and deployment, select Deploy from a branch.
3. Choose the portfolio-website branch and /docs folder, then Save.
4. Wait for GitHub’s Pages deployment to finish. The expected URL is:
   https://zkwdh7fy68-collab.github.io/deploy-ad/#intro

Alternatively, review and merge the website pull request, then select main and /docs in Pages settings.

The address above is the expected deployment address, not confirmation that publishing has been enabled. GitHub reports the live URL in Settings → Pages after deployment succeeds.

To use https://zkwdh7fy68-collab.github.io/ without /deploy-ad/, create a repository named zkwdh7fy68-collab.github.io and publish these website files there. This project uses the existing deploy-ad repository so the lab remains the source of truth.

Official GitHub Pages instructions:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Contents

- docs/index.html — portfolio and Active Directory case study; the supplied headshot is stored in headshot.svg for portability.
- docs/headshot.svg — the supplied photograph in an SVG image wrapper.
- docs/styles.css — responsive layout, sidebar, colors, and typography.
- docs/app.js — mobile navigation and active-section navigation.
- docs/.nojekyll — static hosting marker.

No build tools, dependencies, accounts, contact backend, or external fonts are needed. Phone and email use tel: and mailto: links. Screenshot evidence links open the real lab files on GitHub.

## Source and accuracy

Main case study: https://github.com/zkwdh7fy68-collab/deploy-ad (README reviewed October 15, 2026).
Related labs: configure-ad, create-users-ad, group-policy-ad, and configure-account-ad in the same GitHub account.
Profile, headshot, email, phone, and LinkedIn came from Bryan’s repository or direct instructions.
No unverified work history, degree, certification, location, or résumé is included. PowerShell script use is credited; pending evidence remains described as pending.
