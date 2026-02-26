# SEO Setup Checklist — New Client Sites

> Reusable checklist for every new client website built by TheKhan Agency.
> Copy this file into the client project and check off items as you go.

---

## 1. Title Tags

- [ ] Every page has a unique `<title>` tag
- [ ] Format: `Primary Keyword | Brand Name` (e.g. "Landscaping Deerfield IL | Clean & Green")
- [ ] Keep under 60 characters
- [ ] Include location keywords for local businesses
- [ ] Homepage title includes the main business category + location

**Example:**
```html
<title>Power Washing Deerfield IL | Clean & Green</title>
```

---

## 2. Meta Descriptions

- [ ] Every page has a unique `<meta name="description">`
- [ ] 150-160 characters max
- [ ] Include primary keyword + location + CTA
- [ ] Make it compelling — this shows in Google search results

**Example:**
```html
<meta name="description" content="Professional power washing in Deerfield, Highland Park & North Shore IL. House, concrete, deck cleaning. 10+ years experience. Free quotes!">
```

---

## 3. Canonical Tags

- [ ] Every page has `<link rel="canonical" href="...">`
- [ ] URL matches the preferred version (www vs non-www — pick one, be consistent)
- [ ] Use absolute URLs (full https://...)
- [ ] Prevents duplicate content issues

**Example:**
```html
<link rel="canonical" href="https://www.cleangreenproperty.com/services/power-washing.html">
```

---

## 4. Open Graph Tags

- [ ] Every page has all required OG tags:
  - [ ] `og:title` — page-specific
  - [ ] `og:description` — page-specific
  - [ ] `og:type` — usually "website"
  - [ ] `og:url` — matches canonical
  - [ ] `og:image` — at least 1200x630px, absolute URL
- [ ] Optional but recommended:
  - [ ] `og:site_name`
  - [ ] `og:locale` (e.g. "en_US")
  - [ ] `og:image:width` and `og:image:height`
- [ ] Twitter Card tags (optional, enhances Twitter/X sharing):
  - [ ] `twitter:card` — "summary_large_image"
  - [ ] `twitter:title`
  - [ ] `twitter:description`
  - [ ] `twitter:image`

**Example:**
```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.example.com/">
<meta property="og:title" content="Page Title | Brand">
<meta property="og:description" content="Page description here.">
<meta property="og:image" content="https://www.example.com/images/og-image.jpg">
```

---

## 5. sitemap.xml

- [ ] Created at `/sitemap.xml` (or `/public/sitemap.xml` for static sites)
- [ ] Includes ALL indexable pages
- [ ] Excludes noindex pages (landing pages, thank you pages)
- [ ] Each URL has `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
- [ ] Homepage priority: 1.0, main pages: 0.8, secondary: 0.6-0.7
- [ ] Events/blog pages: `changefreq` set to "weekly"
- [ ] URLs match canonical format (www vs non-www)

**Template:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-02-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 6. robots.txt

- [ ] Created at `/robots.txt` (or `/public/robots.txt`)
- [ ] Allows all crawlers: `User-agent: *` + `Allow: /`
- [ ] References sitemap with full URL
- [ ] Block admin/staging pages if needed with `Disallow:`

**Template:**
```
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

---

## 7. Schema Markup (Structured Data)

- [ ] Homepage has primary business schema (pick the right `@type`)
- [ ] All pages have schema — at minimum the org/business schema
- [ ] Service pages have `Service` schema with `serviceType`
- [ ] Event pages have `Event` schema with dates/locations
- [ ] Contact pages include full address + opening hours
- [ ] Validate at https://validator.schema.org/ or Google Rich Results Test

### Common Schema Types by Business

| Business Type | Schema @type |
|---|---|
| Marketing agency | `MarketingAgency` |
| Property maintenance | `HomeAndConstructionBusiness` |
| Home care | `HomeHealthCareService` |
| Nonprofit | `NonprofitOrganization` |
| Restaurant | `Restaurant` |
| Law firm | `LegalService` |
| Dental | `Dentist` |
| Generic local | `LocalBusiness` |

### Required Schema Fields

- [ ] `name` — business name
- [ ] `url` — website URL
- [ ] `logo` — absolute URL to logo
- [ ] `telephone` — in +1-xxx-xxx-xxxx format
- [ ] `email` — business email
- [ ] `address` — full PostalAddress object
- [ ] `areaServed` — cities or regions served (important for local SEO)

### Recommended Schema Fields

- [ ] `geo` — latitude/longitude coordinates
- [ ] `priceRange` — e.g. "$$"
- [ ] `openingHours` or `openingHoursSpecification`
- [ ] `sameAs` — array of social media profile URLs
- [ ] `aggregateRating` — if Google reviews exist
- [ ] `serviceType` — array of services offered
- [ ] `foundingDate`
- [ ] `hasOfferCatalog` — detailed service offerings

**Template:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/images/logo.png",
  "telephone": "+1-847-555-1234",
  "email": "info@example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Deerfield",
    "addressRegion": "IL",
    "postalCode": "60015",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Deerfield"},
    {"@type": "City", "name": "Highland Park"}
  ],
  "sameAs": [
    "https://instagram.com/business",
    "https://facebook.com/business"
  ]
}
</script>
```

---

## 8. Additional SEO Essentials

### HTML Fundamentals
- [ ] `<html lang="en">` set on every page
- [ ] `<meta charset="UTF-8">` present
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present
- [ ] Favicon configured (`<link rel="icon">`)
- [ ] Apple touch icon (`<link rel="apple-touch-icon">`)

### Content & Headings
- [ ] One `<h1>` per page (unique, includes primary keyword)
- [ ] Logical heading hierarchy (h1 > h2 > h3)
- [ ] All images have descriptive `alt` text with keywords where natural
- [ ] Internal links between related pages

### Performance
- [ ] Images optimized (compressed, proper format)
- [ ] Google Fonts preconnected:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
- [ ] CSS/JS minified in production

### Analytics & Tracking
- [ ] Google Analytics 4 installed on ALL pages
- [ ] Google Ads conversion tracking (if running ads)
- [ ] Verify GA is firing: check Real-Time report in GA dashboard

### Landing Pages (Google Ads / Campaign Pages)
- [ ] Add `<meta name="robots" content="noindex, nofollow">`
- [ ] Exclude from sitemap.xml
- [ ] Still include GA + conversion tracking
- [ ] Include schema markup (still helps with page quality)

---

## 9. Post-Launch SEO

- [ ] Submit sitemap to Google Search Console
  - Go to https://search.google.com/search-console
  - Add property → enter domain
  - Verify via DNS TXT record (Cloudflare DNS)
  - Submit sitemap URL under Sitemaps section
- [ ] Submit sitemap to Bing Webmaster Tools (optional)
- [ ] Test all pages with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Test OG tags with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Verify mobile responsiveness: https://search.google.com/test/mobile-friendly
- [ ] Check page speed: https://pagespeed.web.dev/
- [ ] Set up Google Business Profile (if local business)
- [ ] Ensure GBP website link points to correct URL

---

## 10. Deployment Notes (TheKhan Agency Stack)

- **Hosting**: Cloudflare Workers (`wrangler deploy`)
- **DNS**: Cloudflare (custom domains configured in `wrangler.jsonc`)
- **Git**: GitHub (org: TheKhanAgency, all repos private)
- **Dev workflow**: Edit locally → test with `python3 -m http.server 8000` → deploy
- **After deploy**: Always `git push` immediately after `wrangler deploy`
- **React sites**: Run `bun run build` before `wrangler deploy`

---

## Quick Copy-Paste Head Template

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="DESCRIPTION HERE (150-160 chars)">
    <title>PAGE TITLE | BRAND NAME</title>
    <link rel="canonical" href="https://www.DOMAIN.com/PAGE">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.DOMAIN.com/PAGE">
    <meta property="og:title" content="PAGE TITLE | BRAND NAME">
    <meta property="og:description" content="DESCRIPTION HERE">
    <meta property="og:image" content="https://www.DOMAIN.com/images/og-image.jpg">

    <link rel="icon" type="image/png" href="images/favicon.png">
    <link rel="stylesheet" href="css/styles.css">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BUSINESS NAME",
      "url": "https://www.DOMAIN.com",
      "telephone": "+1-XXX-XXX-XXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ADDRESS",
        "addressLocality": "CITY",
        "addressRegion": "IL",
        "postalCode": "XXXXX",
        "addressCountry": "US"
      }
    }
    </script>
</head>
```
