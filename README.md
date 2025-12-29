# 📱 Pinoymobiles.com

Pinoymobiles is the Philippines' trusted platform for finding the best mobile phone deals. Explore the latest smartphones, compare prices from verified stores, and make informed buying decisions.

## ✨ Features

- 🔍 **Advanced Search & Filtering** - Find phones by brand, price, specs, and more
- 💰 **Price Comparison** - Compare prices across multiple authorized stores
- ⭐ **Expert Reviews** - Detailed ratings on camera, battery, performance, and display
- 📊 **Detailed Specifications** - Complete technical specs for every device
- 🎨 **Modern UI/UX** - Clean, responsive design built with Next.js 13+ and Tailwind CSS
- 🗃️ **Supabase Backend** - Real-time data from PostgreSQL database

## 🚀 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pinoymobiles.com.git
   cd pinoymobiles.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up Supabase database**
   - Run the SQL scripts in your Supabase SQL Editor
   - Enable Row Level Security (see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))
   - Optionally seed with sample data using `supabase-seed.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📚 Documentation

- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Complete Supabase setup guide
- **[SUPABASE_MIGRATION.md](SUPABASE_MIGRATION.md)** - Migration from dummy data to Supabase
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference for common operations
- **[supabase-seed.sql](supabase-seed.sql)** - Sample data for testing

## 🗂️ Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── page.js            # Home page
│   ├── phones/            # Phone listing & details
│   ├── compare/           # Comparison tool
│   ├── blogs/             # Blog posts
│   └── about/             # About page
├── components/            # React components
│   ├── header/           # Header & navigation
│   ├── home/             # Home page sections
│   ├── phones/           # Phone-related components
│   ├── blogs/            # Blog components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── supabase.js       # Supabase client
│   ├── supabase-queries.js # Database queries
│   ├── data-adapter.js   # Data transformation
│   ├── format.js         # Formatting utilities
│   └── data/             # Legacy data files
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── styles/                # Global styles
```

## 🔍 Key Features Explained

### Product Listing
- Advanced filtering by brand, price, specs
- Multiple sorting options
- Pagination support
- Mobile-optimized grid layout

### Product Details
- Complete specifications grouped by category
- Expert ratings with detailed scores
- Price comparison from multiple stores
- Color and storage variants
- Related products suggestions

### Search
- Real-time search across products and brands
- Search by name, model, or brand

### Price Comparison
- Compare prices from multiple verified stores
- Stock availability status
- Official vs authorized sellers
- Affiliate link support

## 🎨 Customization

### Styling
- Tailwind CSS configuration in `tailwind.config.js`
- Design system tokens in `lib/design-system.js`
- Global styles in `app/globals.css`

### Data
- Query functions in `lib/supabase-queries.js`
- Data transformers in `lib/data-adapter.js`
- Add new queries as needed

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Ensure you set the environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📊 Database Schema

Your Supabase database includes:

- **brands** - Phone manufacturers
- **products** - Phone models
- **product_images** - Product photos
- **product_colors** - Available colors
- **product_variants** - Storage/color combinations
- **specifications** - Detailed specs
- **key_specifications** - Highlighted specs
- **expert_ratings** - Review scores
- **prices** - Pricing from stores
- **stores** - Retail stores
- **related_products** - Product relationships
- **variant_color_mapping** - Variant-color links

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the utility-first styling
- The open-source community

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation files
- Review the Supabase dashboard for data issues

---

**Made with ❤️ for the Filipino tech community**
