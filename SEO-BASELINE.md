# SEO Baseline — rebootyourcomputer.com.au

Captured 2026-08-17 from the live WordPress site, before the Astro rebuild.
Purpose: preserve the homepage ranking for "computer repairs brisbane".

---

## The ranking page is the HOMEPAGE

Google Search Console, 90 days (2026-05-19 → 2026-08-17), query "computer repairs brisbane":

| Page | Position | Impressions | Clicks | CTR |
|---|---|---|---|---|
| https://www.rebootyourcomputer.com.au/ | **8.7** | 1,090 | 5 | 0.46% |
| https://rebootyourcomputer.com.au/ (non-www) | 10.2 | 26 | 0 | 0% |

The separate page `/computer-repairs-brisbane/` (post ID 1598) does **not** rank for this
query. Do not confuse the two. The page to protect is the front page, WordPress post ID 37,
slug `reboot-computer-repairs-brisbane`.

Homepage totals, same 90 days: 34 clicks, 6,929 impressions, 0.49% average CTR.

---

## Exact metadata to carry across

Rank Math has **no per-page SEO set** on the homepage — every value below is generated
from site-wide templates (`%title% %sep% %sitename%`, separator `-`). Reproduce the
*output*, not the template.

**Title** (58 chars)
```
Reboot Computer Repairs Brisbane - Reboot Computer Repairs
```

**Meta description** (291 chars — longer than Google displays, but this is the current state)
```
Computer Repairs Brisbane - On-site, expert and affordable solutions for your PC, Mac & laptop repair needs. We provide quick and reliable repairs and services anywhere in Brisbane. We are open everyday from 7 AM to 10 PM even on holidays. Give us a call at (07) 3155 2002 with no call out fees!
```

**Canonical**
```
https://www.rebootyourcomputer.com.au/
```

**H1** (exactly one on the page — keep it that way)
```
Computer Repairs Brisbane
```

**og:title / og:description** — currently identical to the title and meta description above.

**robots**
```
index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large
```

**Schema types currently emitted:** WebSite, SearchAction, ImageObject, WebPage, Person, Article

Site name: `Reboot Computer Repairs`
Tagline: `Expert and Affordable Computer Repairs in Brisbane`

---

## Real business facts (these were guessed wrong in the first draft — use these)

**Pricing** — as it stood on the WordPress site. **Superseded 2026-08-17:** rates
were raised to $150/hr, with the increment scaled to $37.50 per 15 minutes. Current
values live in `src/config/business.ts`; the figures below are the historical record
of what the ranking page said, not current prices.
- Workshop repairs — $120/hr
- On-site service — $120 first hour, then $25 per 15 minutes
- Remote service — $25 per 15 minutes

Every tier: no call-out fees, no hidden charges, no fix no fee, most repairs done in 1 hour.

**Hours:** 7 AM to 10 PM every day, including weekends, public holidays and late nights,
with no extra surcharges.

**Phone:** (07) 3155 2002 — diverts straight to a technician's mobile.

**Service area:** Greater Brisbane, plus Logan, Ipswich, Moreton and Redland Bay.
Not currently servicing the Sunshine Coast.

**Section headings on the live page:**
- Computer Repairs Brisbane (H1)
- Providing professional computer repair service in the Greater Brisbane Area…
- OUR MEDIA APPEARANCE (Channel 9 interview about slow internet speeds)
- We're flexible, you choose the time and date!
- WE'RE HAPPY TO PROVIDE YOU COMPUTER REPAIR SERVICE ON WEEKENDS, PUBLIC HOLIDAYS AND LATE NIGHTS
- WITH NO EXTRA SURCHARGES!
- WE'RE COMPETITIVE ON OUR PRICING!
- WORKSHOP REPAIRS / ON SITE SERVICE / REMOTE SERVICE
- Laptop Hardware / Mac Hardware Problems

---

## Queries the homepage ranks for — protect these

Top 20 by impressions, 90 days:

| Query | Position | Impressions | Clicks |
|---|---|---|---|
| computer repairs near me | 20.3 | 1,468 | 4 |
| computer repairs brisbane | 8.7 | 1,090 | 5 |
| computer repair near me | 18.6 | 1,069 | 1 |
| computer repair brisbane | 9.3 | 612 | 2 |
| pc repair near me | 16.6 | 448 | 4 |
| pc repair brisbane | 8.3 | 409 | 1 |
| laptop repairs brisbane | 10.0 | 404 | 2 |
| laptop repair brisbane | 9.9 | 394 | 1 |
| pc repair | 17.8 | 362 | 2 |
| brisbane computer repairs | 10.0 | 218 | 1 |
| affordable laptop repair | 16.2 | 93 | 0 |
| asrock motherboard repairs near me | 56.9 | 63 | 0 |
| affordable computer repairs | 11.6 | 41 | 0 |
| best computer repair service brisbane | 8.0 | 28 | 0 |
| 24 hour laptop repair | 20.0 | 24 | 0 |
| best computer repairs near me | 15.7 | 22 | 0 |

Themes the copy must keep covering: **brisbane**, **near me**, **pc / laptop / computer
repair**, **affordable**, **24 hour / after hours**, **on-site / at home**, and brand
terms (**asus**, **hp**, **lenovo**, **macbook**, **asrock**).

---

## Problems on the live page — fix in the rebuild, don't copy

1. **Injected gambling spam — 5 instances.** "Ironfish recommends best online pokies"
   linking to `au.trustpilot.com/review/aussiepokies.net`, inside `et_pb_code` blocks.
   Three sit in `<div style="display:none;">` — cloaked links, a Google spam signal that
   may be actively suppressing this page. **Do not port. Strip entirely.**
2. **`og:locale` is `en_US`** — should be `en_AU`.
3. **Knowledge-graph type is `Person`** — a local business should emit `LocalBusiness`
   with address, opening hours and service area, not `Person`.
4. **No LocalBusiness schema** anywhere despite being a local service business.
5. **Title duplicates the brand** — "Reboot Computer Repairs Brisbane - Reboot Computer
   Repairs". Wastes pixels in the SERP.
6. **CTR is 0.46% at position 8.7**, well under the ~2% typical for that position.
   The title/description are not earning the click.
7. **Non-www serves separately** (26 impressions at position 10.2) — needs a 301 to www.
8. **`/computer-repairs-brisbane/` has no H1 at all**, and its content overlaps the
   homepage — a cannibalisation risk.
9. **Footer copyright reads 2017.**

---

## Migration rules

- Keep the URL exactly `https://www.rebootyourcomputer.com.au/` — same canonical, same slug.
- Keep the single H1 as "Computer Repairs Brisbane".
- Keep the real pricing, hours and service area verbatim; they are the page's substance.
- 301 every old URL that changes. There are 108 published pages, ~100 of them suburb pages.
- Do not launch until the redirect map is written.
