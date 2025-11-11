#!/bin/bash

# Vercel Deployment Script for React Account Manager
echo "🚀 Starting Vercel Deployment Process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Build the project to ensure everything works
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    echo "🎉 Deployment completed!"
    echo "Check your Vercel dashboard for the deployment URL."
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi
