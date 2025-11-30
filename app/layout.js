import './globals.css'

export const metadata = {
  title: 'Cab Crew - Your Ride, Your Way',
  description: 'Book cabs in Pune with transparent pricing and instant confirmation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}