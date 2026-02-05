# FitnessHeals - Hydrogen Store

**Tech Stack:** Hydrogen + Oxygen + Metaobjects
**Status:** Development

---

## Store Requirements

- Sports articles (blog)
- Newsletter signup
- YouTube channel embeds
- Apparel (e-commerce)
- Gear (e-commerce)
- Filter by: sport, color, size, price, type

---

## Sports Covered (11)

| Sport | Slug |
|-------|------|
| Cricket | `cricket` |
| Baseball | `baseball` |
| Pickleball | `pickleball` |
| Padel | `padel` |
| Soccer | `soccer` |
| Basketball | `basketball` |
| Hockey | `hockey` |
| Running | `running` |
| Swimming | `swimming` |
| Muay Thai | `muay-thai` |
| Triathlon | `triathlon` |

---

## Site Map

```
fitnessheals.com/
├── / (Homepage)
├── /articles
│   └── /articles/[handle]
├── /videos
├── /shop
│   ├── /shop/apparel
│   └── /shop/gear
├── /sports
│   └── /sports/[handle] (11 sport pages)
├── /about
├── /contact
└── /newsletter
```

---

## Metaobject Schemas

### 1. Hero Section
**API ID:** `hero_section`

| Field | Type | Description |
|-------|------|-------------|
| title | single_line_text | Main headline |
| subtitle | single_line_text | Subheadline |
| background_image | file_reference | Hero background |
| video_url | url | Optional video |
| cta_text | single_line_text | Button text |
| cta_link | url | Button URL |

---

### 2. Article
**API ID:** `article`

| Field | Type | Description |
|-------|------|-------------|
| title | single_line_text | Article title |
| handle | single_line_text | URL slug |
| excerpt | multi_line_text | Short description |
| content | rich_text | Full article body |
| featured_image | file_reference | Main image |
| sport | metaobject_reference | Link to sport |
| author | single_line_text | Author name |
| publish_date | date | Publication date |
| featured | boolean | Show on homepage |

---

### 3. Sport
**API ID:** `sport`

| Field | Type | Description |
|-------|------|-------------|
| name | single_line_text | Sport name |
| handle | single_line_text | URL slug |
| description | multi_line_text | Sport description |
| icon | file_reference | Sport icon |
| cover_image | file_reference | Hero image |
| featured | boolean | Show on homepage |

---

### 4. YouTube Video
**API ID:** `youtube_video`

| Field | Type | Description |
|-------|------|-------------|
| title | single_line_text | Video title |
| video_id | single_line_text | YouTube video ID |
| thumbnail | file_reference | Custom thumbnail |
| sport | metaobject_reference | Link to sport |
| featured | boolean | Show on homepage |
| publish_date | date | Publication date |

---

### 5. Newsletter Section
**API ID:** `newsletter_section`

| Field | Type | Description |
|-------|------|-------------|
| headline | single_line_text | Section title |
| description | multi_line_text | Description |
| button_text | single_line_text | CTA button |
| background_image | file_reference | Optional background |

---

### 6. About Page
**API ID:** `about_page`

| Field | Type | Description |
|-------|------|-------------|
| title | single_line_text | Page title |
| content | rich_text | Main content |
| team_image | file_reference | Team photo |
| mission | multi_line_text | Mission statement |

---

## Product Collections

| Collection | Handle | Description |
|------------|--------|-------------|
| All Products | `all` | Everything |
| Apparel | `apparel` | Clothing |
| Gear | `gear` | Equipment |
| Cricket | `cricket` | Cricket products |
| Baseball | `baseball` | Baseball products |
| Pickleball | `pickleball` | Pickleball products |
| Padel | `padel` | Padel products |
| Soccer | `soccer` | Soccer products |
| Basketball | `basketball` | Basketball products |
| Hockey | `hockey` | Hockey products |
| Running | `running` | Running products |
| Swimming | `swimming` | Swimming products |
| Muay Thai | `muay-thai` | Muay Thai products |
| Triathlon | `triathlon` | Triathlon products |

---

## Product Setup

Each product should have:

**Options:**
- Color (variants)
- Size (variants)

**Tags:**
- Sport name (for filtering)
- Product type (apparel/gear)

**Metafields:**
- `custom.sport` - Sport reference

---

## Development

### Prerequisites
- Node.js 20+
- Shopify Partners account
- Dev store created

### Setup

1. Create Shopify dev store
2. Get Storefront API token
3. Update `.env` with credentials
4. Run `npm install`
5. Run `npm run dev`

### Environment Variables

```
SESSION_SECRET=your-session-secret
PUBLIC_STOREFRONT_API_TOKEN=your-token
PUBLIC_STORE_DOMAIN=fitnessheals.myshopify.com
```

---

## Deployment

1. Connect GitHub repo to Oxygen
2. Configure environment variables
3. Deploy to Oxygen
4. Transfer store to client when ready

---

## Newsletter Integration

Using Shopify Email (free):
- Built into Shopify admin
- 10,000 emails/month free
- No additional integration needed

---

## To Do

- [ ] Create Shopify dev store
- [ ] Set up Storefront API token
- [ ] Create metaobject definitions in Shopify
- [ ] Build homepage
- [ ] Build articles section
- [ ] Build videos section
- [ ] Build shop with filters
- [ ] Build sport pages
- [ ] Set up newsletter
- [ ] Add sample content
- [ ] Test & deploy
