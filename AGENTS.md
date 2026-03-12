# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a premium D2C healthy snacking website for "Manju Foods" - a static HTML/CSS/JS website with modern design and e-commerce functionality. The site features product catalogs, shopping cart, checkout flow, and premium visual design comparable to brands like Apple, Stripe, and modern food companies.

## Core Architecture

### File Structure
```
/
├── index.html           (570 lines) - Main homepage with hero, products, testimonials
├── shop.html           (141 lines) - Product catalog page
├── product.html        (164 lines) - Individual product details
├── cart.html           (146 lines) - Shopping cart
├── checkout.html       (205 lines) - Checkout flow
├── about.html          (172 lines) - About page
├── offers.html         (135 lines) - Special offers and combos
├── css/
│   ├── style.css       (1259 lines) - Main stylesheet with premium design system
│   └── style-premium.css (824 lines) - Additional premium styles
├── js/
│   └── script.js       (897 lines) - Core functionality, cart, animations
└── images/
    └── products/       - Product images and assets
```

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS (CDN) + custom CSS with design system
- **Typography**: DM Serif Display (headings) + Inter (body text)
- **Icons**: Custom SVG icons (Lucide-style)
- **Build**: No build process - static files served directly

### Design System
The site uses a premium design system with:
- **Colors**: Primary green (#7B9A66), gold accent (#c6a96a), cream backgrounds
- **Shadows**: Soft shadow system (0 4px 12px rgba(0,0,0,0.06) to 0 16px 40px rgba(0,0,0,0.12))
- **Border Radius**: 12px (small), 16px (medium), 20px (large), 999px (pill buttons)
- **Transitions**: 300ms cubic-bezier(0.4, 0, 0.2, 1) for smooth animations
- **Typography**: Consistent heading hierarchy with DM Serif Display

## Development Commands

### No Build Process Required
This is a static website with no build step. Simply open HTML files in browser or serve via HTTP server.

### Local Development
```bash
# Serve locally (Python)
python3 -m http.server 8000

# Serve locally (Node.js)
npx http-server .

# Open in browser
open index.html
```

### File Editing
- Edit HTML files directly for content changes
- Modify `css/style.css` for styling (main stylesheet with design system)
- Update `js/script.js` for functionality changes
- Add images to `images/` or `images/products/` directories

## Core Functionality

### Product Management (js/script.js)
- **PRODUCTS array** (lines 34-155): Contains all product data with id, name, price, rating, etc.
- **OFFERS array** (lines 157-193): Combo/bundle products
- Product cards are dynamically rendered with star ratings and hover effects

### Shopping Cart System
- **Storage**: localStorage with key "manju_foods_cart_v1"
- **Functions**: `addToCart()`, `updateCartCount()`, `getCartItems()`
- Cart state persists across pages
- Real-time cart count updates in navigation

### Animation System
- **Scroll Reveal**: Intersection Observer for fade-up animations on scroll
- **Staggered Animations**: Cards animate with delays for premium feel
- **Hover Effects**: Image zoom (1.04-1.08x), elevation (-6px), icon scaling
- All animations use 300ms cubic-bezier timing

### Page-specific Logic
- **index.html**: Hero section, benefits, product categories, testimonials, Instagram grid
- **shop.html**: Filterable product catalog with category navigation
- **product.html**: Individual product details with add-to-cart
- **cart.html**: Cart management, quantity updates, checkout flow
- **checkout.html**: Order form with validation

## Key Development Patterns

### Adding New Products
1. Add product object to PRODUCTS array in `js/script.js`
2. Include: id, name, price, image, category, rating, description, tags
3. Ensure image exists in `images/products/` directory
4. Product will automatically appear in shop and category grids

### Styling Guidelines
- Use existing CSS custom properties (variables) defined in `:root`
- Follow the established shadow system for consistent depth
- Use `.reveal` class for scroll animations
- Apply `.section` and `.container` classes for consistent spacing
- Buttons should use `.btn`, `.btn-primary`, `.btn-secondary` classes

### Animation Implementation
- Add `.reveal` class to elements that should animate on scroll
- Use `.container` wrapper inside `.section` for proper reveal timing
- Staggered card animations use `.product-card`, `.category-card`, etc.
- Hover effects are CSS-only for performance

## Content Management

### Images
- Product images: `images/products/[name].jpg`
- Hero/marketing images: `images/[name].png` or `.jpg`
- Maintain consistent aspect ratios for product images
- Use `loading="lazy"` for all images

### Text Content
- Product names, descriptions, and tags in PRODUCTS array
- Page content directly in HTML files
- Maintain brand voice: premium, health-focused, natural

### SEO & Meta
- Each HTML page has appropriate title and meta description
- Semantic HTML structure with proper heading hierarchy
- Alt text for all images

## Testing

### Browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Verify mobile responsiveness (breakpoints: 480px, 768px, 1024px)
- Check animations run at 60fps
- Ensure backdrop-blur effects have fallbacks

### Functionality Testing
- Add/remove items from cart across pages
- Cart count persistence after page refresh
- Product filtering and search (shop.html)
- Form validation (checkout.html)
- Scroll animations trigger correctly

### Performance Testing
- Verify lazy loading works for images
- Check for console errors
- Test on mobile devices for touch interactions
- Ensure 300ms transitions feel smooth

## Common Modifications

### Adding New Pages
1. Create new HTML file using existing page structure
2. Include same header/navigation and footer
3. Add appropriate CSS classes for consistency
4. Update navigation links in all pages

### Modifying Product Cards
- Update product rendering functions in `js/script.js`
- Maintain star rating display and hover effects
- Ensure responsive grid layouts

### Updating Design System
- Modify CSS custom properties in `:root` selector
- Update shadow, color, or typography variables
- Changes will automatically apply across all components

### E-commerce Integration
- Cart functionality is client-side only (localStorage)
- To integrate with backend: replace localStorage with API calls
- Checkout form requires backend integration for order processing
- Payment integration would need additional scripts/services

## Documentation References
- `IMPLEMENTATION_GUIDE.md` - Detailed implementation notes
- `PREMIUM_UPGRADE_SUMMARY.md` - Design upgrade overview  
- `VISUAL_IMPROVEMENTS.md` - Before/after visual changes
- `QUICK_REFERENCE.md` - Quick development reference