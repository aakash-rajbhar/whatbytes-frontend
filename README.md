# E-Commerce Store - Whatbytes Frontend Assignment

A fully responsive e-commerce web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project demonstrates modern frontend development practices including client-side state management, URL-based filtering, dynamic routing, and persistent cart functionality.

## 🚀 Live Demo

Open [whatbytes-ecommerce-frontend](https://whatbytes-ecommerce-frontend.vercel.app/) to view the application in your browser.

## ✨ Features

### 1. Home Page (/) - Product Listing
- **Header Navigation**
  - Logo with link to homepage
  - Centralized search bar (desktop) with real-time filtering
  - Cart icon with item count badge
  - Fully responsive design

- **Sidebar Filters** (Desktop)
  - Category filter (Electronics, Clothing, Home)
  - Dual-thumb price range slider ($0 - $1000)
  - Sticky positioning for better UX

- **Mobile Search & Filters**
  - Dedicated search bar for mobile/tablet devices
  - Slide-in filter drawer with overlay
  - Filter toggle button for easy access

- **Product Grid**
  - Responsive layout: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
  - Product cards featuring:
    - High-quality product images
    - Product title and price
    - Star rating display
    - Quick "Add to Cart" button
  - Empty state message when no products match filters

- **Footer**
  - Copyright information
  - Social media links (Facebook, Twitter, Instagram)

### 2. Product Detail Page (/product/[id])
- **Image Section**
  - Large product image display
  - Responsive sizing

- **Product Details**
  - Product title and pricing
  - Detailed description
  - Category badge
  - Star rating display
  - Quantity selector with increment/decrement controls
  - Add to Cart button with quantity support
  - 404 handling for invalid product IDs

### 3. Shopping Cart Page (/cart)
- List of all added products with images
- Quantity update controls (increase/decrease)
- Remove item functionality
- Real-time price calculation
- Order summary with:
  - Subtotal
  - Shipping information
  - Total price
- Empty cart state with call-to-action
- Continue shopping link

## 🛠️ Technical Implementation


### Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts)
- **Image Optimization**: Next.js Image component with Unsplash CDN

## 📁 Project Structure

```
app/
├── cart/
│   ├── CartContext.tsx       # Global cart state management
│   └── page.tsx               # Shopping cart page
├── components/
│   ├── CartItem.tsx           # Individual cart item component
│   ├── Filters.tsx            # Desktop sidebar filters
│   ├── Footer.tsx             # Footer component
│   ├── Header.tsx             # Header with navigation
│   ├── MobileSearchAndFilters.tsx  # Mobile filter drawer
│   └── ProductCard.tsx        # Product grid card
├── data/
│   └── products.ts            # Product data source
├── product/[id]/
│   └── page.tsx               # Dynamic product detail page
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   ├── filterProducts.ts     # Filtering logic
│   └── renderRating.tsx      # Reusable rating component
├── globals.css                # Global styles & custom CSS
├── layout.tsx                 # Root layout with providers
└── page.tsx                   # Home page
```

## 🎨 Design Features
- Clean, modern UI with blue color scheme (#0758a8)
- Smooth transitions and hover effects
- Sticky header and sidebar for easy navigation
- Shadow elevations for depth
- Rounded corners for modern aesthetic
- Consistent spacing and typography
- Accessible form controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whatbytes-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

## 🎯 Key Features Implemented

### Filtering System
- Real-time category selection
- Dual-thumb price range slider with live preview
- Search query matching
- URL state synchronization
- Filter combination support

### Cart Management
- Add/remove products
- Quantity adjustment
- Persistent storage (localStorage)
- Real-time count updates
- Total price calculation

### User Experience
- Responsive across all devices
- Loading states with Suspense
- Empty states with helpful messages
- Smooth page transitions
- Optimized images with lazy loading

## 🔧 Configuration

### Next.js Config
Images are configured to load from Unsplash:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**'
    }
  ]
}
```

