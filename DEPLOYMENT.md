# Deployment Guide for Tesseract Integrations Website

## 🚀 Production Deployment Checklist

### Prerequisites Completed ✅
- [x] Google OAuth configured with production URLs
- [x] `.env.production` file created with production settings
- [x] Dynamic URL configuration in `layout.tsx`
- [x] Environment files secured in `.gitignore`

### Manual Steps Required for Deployment

## 1. Deployment Platform Setup (Choose One)

### Option A: Vercel (Recommended)
1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `main` branch for production

2. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   GOOGLE_CLIENT_ID=(your-google-client-id-from-env-production-file)
   GOOGLE_CLIENT_SECRET=(your-google-client-secret-from-env-production-file)
   NEXTAUTH_URL=https://www.tesseractintegrations.com
   NEXTAUTH_SECRET=(your-nextauth-secret-from-env-production-file)
   AIRTABLE_API_KEY=(your-airtable-api-key-from-env-production-file)
   AIRTABLE_BASE_ID=(your-airtable-base-id-from-env-production-file)
   AIRTABLE_TABLE_NAME=Customers
   N8N_WEBHOOK_URL=(your-n8n-webhook-url-from-env-production-file)
   ```
   
   **Important:** Copy the actual values from your `.env.production` file (not committed to git)

3. **Domain Configuration**
   - Add custom domain: `tesseractintegrations.com`
   - Vercel will handle SSL automatically

### Option B: Netlify
1. **Connect Repository**
   - Import from GitHub
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all variables from above

3. **Domain Setup**
   - Add custom domain in Domain Settings
   - SSL handled automatically

### Option C: Railway/Render
Similar process - add environment variables and connect GitHub repository.

## 2. DNS Configuration

Point your domain to your hosting platform:

### For Vercel:
- Add CNAME record: `www` → `cname.vercel-dns.com`
- Add A record: `@` → `76.76.21.21`

### For Netlify:
- Follow Netlify's DNS instructions in domain settings

## 3. Post-Deployment Verification

### Test Authentication Flow:
1. Visit `https://www.tesseractintegrations.com`
2. Click "Login" button
3. Sign in with Google
4. Verify user appears in Airtable Customers table
5. Test chatbot functionality
6. Test logout functionality

### Security Verification:
- [ ] HTTPS is working (check for padlock icon)
- [ ] OAuth redirects to correct domain
- [ ] Environment variables are not exposed in browser
- [ ] .env files are NOT in repository

## 4. Monitoring Setup

### Recommended Services:
1. **Vercel Analytics** (built-in if using Vercel)
2. **Google Analytics** (optional)
3. **Sentry** for error tracking (optional)

## 🔒 Security Notes

1. **NEVER commit `.env` files** - They contain sensitive keys
2. **Rotate secrets periodically** - Especially `NEXTAUTH_SECRET`
3. **Use HTTPS only** - Never allow HTTP in production
4. **Monitor Airtable usage** - Check API limits regularly
5. **Review OAuth app permissions** - Keep minimal scopes

## 📝 Environment Variable Reference

| Variable | Purpose | Security Level |
|----------|---------|---------------|
| `GOOGLE_CLIENT_ID` | OAuth client identifier | Public |
| `GOOGLE_CLIENT_SECRET` | OAuth authentication | SECRET |
| `NEXTAUTH_URL` | Production URL | Public |
| `NEXTAUTH_SECRET` | Session encryption | SECRET |
| `AIRTABLE_API_KEY` | Database access | SECRET |
| `AIRTABLE_BASE_ID` | Database identifier | Semi-public |
| `N8N_WEBHOOK_URL` | Chat webhook | Semi-public |

## 🚨 Troubleshooting

### OAuth Not Working:
- Verify Google Console has `https://www.tesseractintegrations.com/api/auth/callback/google`
- Check `NEXTAUTH_URL` matches exactly (including https and www)
- Ensure `NEXTAUTH_SECRET` is the same in production

### Airtable Connection Issues:
- Verify API key is correct
- Check base ID and table name
- Ensure Customers table has all required fields

### Image Loading Issues:
- Google profile pictures should work (configured in next.config.ts)
- Check browser console for specific errors

## 📞 Support Contacts

For deployment issues:
- Vercel Support: support.vercel.com
- Netlify Support: answers.netlify.com
- Google OAuth Issues: console.cloud.google.com/support

## Last Updated
December 5, 2024 - Ready for production deployment