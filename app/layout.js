import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "MyStore",
  description: "A simple ecommerce store",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
