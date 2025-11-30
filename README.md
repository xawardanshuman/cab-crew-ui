# 🚖 Cab Crew - Modern Cab Booking System

A production-ready cab booking platform for Pune with dynamic pricing, real-time fare calculation, and comprehensive admin dashboard.

## ✨ Features

- **User Features:**
  - Modern, Apple-inspired UI design
  - Real-time fare calculation using Google Distance Matrix API
  - Dynamic pricing with night charges and peak hour multipliers
  - Instant booking confirmation
  - 20 pre-configured Pune locations
  - 3 vehicle types (Hatchback, Sedan, SUV)
  - 4 service types (Local, Outstation, Airport, Hourly)

- **Admin Features:**
  - Secure JWT-based authentication
  - View all bookings with detailed information
  - Update pricing for all vehicle types
  - Real-time data synchronization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Google Cloud account (for Distance Matrix API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xawardanshuman/cab-crew-ui.git
cd cab-crew-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `GOOGLE_DISTANCE_MATRIX_API_KEY`: Your Google API key
- `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. Set up Supabase database:
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the migration script from `supabase-migration.sql`

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xawardanshuman/cab-crew-ui)

Or manually:

```bash
npm install -g vercel
vercel login
vercel --prod
```

Don't forget to add environment variables in Vercel dashboard!

## 🔑 Default Admin Credentials

- Email: `admin@cabcrew.com`
- Password: `admin123`

**⚠️ Change these credentials after first login in production!**

## 📚 Tech Stack

- **Frontend:** Next.js 14, React 18
- **Backend:** Next.js API Routes (Serverless)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** JWT with bcrypt
- **APIs:** Google Distance Matrix API
- **Deployment:** Vercel

## 🗂️ Project Structure

```
cab-crew-ui/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   ├── booking/          # Booking page
│   ├── layout.js         # Root layout
│   ├── page.js           # Home page
│   └── globals.css       # Global styles
├── lib/                  # Utility functions
├── public/               # Static assets
└── package.json
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for Pune cab services