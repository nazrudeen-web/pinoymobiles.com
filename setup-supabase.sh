#!/bin/bash

# Supabase Setup Script for Pinoymobiles
# This script helps you quickly set up your environment

echo "🚀 Pinoymobiles Supabase Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local already exists"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping environment setup..."
    else
        rm .env.local
    fi
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    echo ""
    read -p "Enter your Supabase Project URL: " SUPABASE_URL
    read -p "Enter your Supabase Anon Key: " SUPABASE_ANON_KEY
    
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF
    
    echo "✅ .env.local created successfully!"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
fi

# Display next steps
echo ""
echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Set up Row Level Security in Supabase (see SUPABASE_SETUP.md)"
echo "2. Run the seed script: supabase-seed.sql"
echo "3. Start the dev server: npm run dev"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: SUPABASE_SETUP.md"
echo "- Migration Guide: SUPABASE_MIGRATION.md"
echo ""
echo "Happy coding! 🎉"
