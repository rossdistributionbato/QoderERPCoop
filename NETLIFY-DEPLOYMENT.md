# 🚀 Netlify Deployment Guide for RiceMillOS

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Supabase Project**: Ensure your remote Supabase project is configured

## Deployment Steps

### 1. Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Deploy: Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify

1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub** and select your repository
4. Configure build settings:
   - **Branch to deploy**: `main`
   - **Build command**: `chmod +x build.sh && ./build.sh`
   - **Publish directory**: `apps/web/out`

### 3. Environment Variables

In Netlify site settings > Environment variables, add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://rwwubiimzkxmeqpwtsjn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3ViaWltemt4bWVxcHd0c2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTY4MzMsImV4cCI6MjA2NTI5MjgzM30.kJCMNLsscsd8g6XUdsvGADLSSLHvE-0M1N9AUNGVi2s
NEXT_PUBLIC_APP_NAME=RiceMillOS
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 4. Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (~3-5 minutes)
3. Your site will be available at: `https://[random-name].netlify.app`

## Build Configuration

The deployment uses these files:
- `netlify.toml` - Netlify configuration
- `build.sh` - Custom build script
- `apps/web/next.config.js` - Next.js static export config

## Key Features

✅ **Static Export**: Optimized for static hosting
✅ **Security Headers**: CSP, X-Frame-Options, etc.
✅ **Performance**: Cached assets and optimized builds
✅ **PWA Ready**: Service worker and offline support
✅ **Supabase Integration**: Connected to remote database

## Post-Deployment Steps

1. **Test Authentication**: Verify login/register flows
2. **Check Database**: Ensure Supabase connection works
3. **Update Domain**: Configure custom domain if needed
4. **Monitor Performance**: Check Netlify analytics

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Ensure all dependencies are in package.json

### Authentication Issues
- Verify Supabase URL and keys
- Check Supabase dashboard for errors
- Update allowed origins in Supabase settings

### Static Export Issues
- Ensure no server-side functions in components
- Check for dynamic imports or server components
- Review Next.js static export limitations

## Commands for Local Testing

```bash
# Test static export locally
cd apps/web
npm run build
npx serve out

# Test production build
NODE_ENV=production npm run build
```

## Automatic Deployments

Once connected, Netlify will automatically deploy when you:
1. Push to the main branch
2. Merge pull requests
3. Create new releases

## Support

- **Netlify Docs**: [netlify.com/docs](https://docs.netlify.com)
- **Next.js Static Export**: [nextjs.org/docs/app/building-your-application/deploying/static-exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)

---

🎉 **Your RiceMillOS application is now ready for production deployment!**