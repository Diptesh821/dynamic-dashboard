import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        
        <div className="flex items-center space-x-2">
          
          <Image
            src="/revoeAI-logo.png"
            alt="revoeAI Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold tracking-tight">
            revoeAI
          </span>
        </div>

        {/* Login & Signup Buttons */}
        <div className="space-x-2">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      <Separator />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 py-12 bg-gradient-to-b from-white to-slate-50">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Supercharge Your Data with revoeAI
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          A powerful platform to manage your data with real-time Google Sheets 
          integration, dynamic columns, and secure JWT-based authentication.
        </p>
        <div className="space-x-2">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Log In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <Badge variant="secondary" className="mb-2">Authentication</Badge>
              <h3 className="text-xl font-semibold mb-2">Secure Login & Signup</h3>
              <p className="text-gray-600">
                Easily create an account and access your dashboard with JWT-based 
                authentication. Protected routes keep your data safe.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <Badge variant="secondary" className="mb-2">Real-Time</Badge>
              <h3 className="text-xl font-semibold mb-2">Google Sheets Integration</h3>
              <p className="text-gray-600">
                Fetch data from Google Sheets and display it in a dynamic table. 
                Changes reflect in real-time without excessive API calls.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <Badge variant="secondary" className="mb-2">Flexible</Badge>
              <h3 className="text-xl font-semibold mb-2">Dynamic Columns</h3>
              <p className="text-gray-600">
                Add new columns (Text or Date) on the fly. Keep your dashboard 
                organized without cluttering your original Google Sheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-center py-4 bg-slate-100">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} revoeAI. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
