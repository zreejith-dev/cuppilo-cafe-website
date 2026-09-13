# CUPPILO (കപ്പിലോ) — Pre-Launch Co-Creation Platform

> "കപ്പിലോ? In the cup, of course." — A modern artisanal café concept in Kerala.

## Overview

CUPPILO is a gamified, interactive web application deployed before the physical café launches. It replaces boardroom guesswork with real crowdsourced data from the Kerala community.

## Features

- **Interactive Menu Ballot** — Vote on signature brews and plates (max 5 votes)
- **Ambiance Moodboard Poll** — Choose the café's architectural vibe
- **Fair Pricing Discovery** — Community-driven price sliders
- **Dream Wishlist** — Submit what Kerala cafés are missing
- **Digital Founding Patron Pass** — Earn vouchers and wall inscriptions
- **Suggest a Menu Item** — Submit new items for others to vote on
- **Founding Wall** — Searchable directory of co-creators

## Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend:** Supabase (PostgreSQL + REST API)
- **Design:** Custom "Earthy Elegance meets Modern Kerala" design system
- **Fonts:** Plus Jakarta Sans, Newsreader, Material Symbols

## Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#A93B2B` | Terracotta — CTAs, active states |
| Cream | `#F7F4EB` | Background canvas |
| Charcoal | `#231F20` | Text |
| Brass | `#C89D5C` | Premium accents |
| Muted Latte | `#E8E2D2` | Borders, dividers |

## Database Schema

- `ballots` — Stores co-creation voting data (menu votes, vibe, prices, wishlist)
- `participants` — User info, patron passes, DPDP consent

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Welcome & onboarding |
| Menu Ballot | `menu-ballot.html` | Interactive food/drink voting |
| Ambiance | `ambiance.html` | Interior design poll |
| Pricing | `pricing.html` | Price discovery & patron pass |
| Founding Wall | `founding-wall.html` | Patron directory & inscription |

## Getting Started

1. Open `index.html` in a browser
2. Or serve with any static file server:
   ```bash
   npx serve .
   ```

## Supabase Configuration

- **Project ID:** `wnkejaidmbdcmbksefaf`
- **URL:** `https://wnkejaidmbdcmbksefaf.supabase.co`
- **Region:** ap-south-1 (Mumbai)

## License

Private — CUPPILO Café 2026
