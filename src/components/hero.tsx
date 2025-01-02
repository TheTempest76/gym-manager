import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Dumbbell } from 'lucide-react'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function Hero() {

  return (
    
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&h=1080&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
      </div>

      {/* Content */}
      <ClerkProvider>
        <div className="absolute top-4 right-4">
          <SignedOut>
        <SignInButton >
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 active:scale-100"
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </Button>
        </SignInButton>
          </SignedOut>
          <SignedIn>
        <UserButton />
          </SignedIn>
        </div>
      </ClerkProvider>
      <div className="relative container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Welcome to Gym Management
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Streamline operations and grow your fitness business with our all-in-one solution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 animate-fade-up">
            <Link href="/get-started">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 active:scale-100"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                variant="outline"
                className="group bg-background/10 hover:bg-background/20 border-white/10 text-white transition-transform hover:scale-105 active:scale-100 backdrop-blur-sm"
              >
                <Dumbbell className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent" />
    </div>
  )
}

