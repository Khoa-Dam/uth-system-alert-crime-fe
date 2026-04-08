'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

import { HeroSection } from './components/hero';
import { StatsSection } from './components/stats';
import { FeaturesSection } from './components/features';
import { SecuritySection } from './components/security';
import { LandingFooter } from './components/footer';
import { env } from '@/lib/env';
import { Logo } from '@/components/icons';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const APP_URL = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060a14] text-white selection:bg-[#00d4ff] selection:text-[#060a14] overflow-x-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.8) 2px, rgba(0,212,255,0.8) 3px)', backgroundSize: '100% 3px' }} />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(6,10,20,0.92)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)] py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative p-1.5 rounded bg-[rgba(255,59,59,0.15)] border border-[rgba(255,59,59,0.3)]">
              <Logo className="w-5 h-5 text-[#ff3b3b]" />
            </div>
            <span className="font-mono font-bold text-lg tracking-wider">
              GUARD<span className="text-[#ff3b3b]">M</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            {[{ label: 'Tính năng', href: '#features' }, { label: 'Bảo mật', href: '#security' }].map(item => (
              <Link key={item.href} href={item.href}
                className="text-[#8899aa] hover:text-[#00d4ff] transition-colors duration-200 relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00d4ff] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href={APP_URL + '/dashboard'}
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border border-[rgba(255,59,59,0.4)] bg-[rgba(255,59,59,0.1)] text-[#ff3b3b] hover:bg-[rgba(255,59,59,0.2)] hover:text-white transition-all duration-200">
              Mở App <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-[#8899aa] hover:text-[#00d4ff] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(0,212,255,0.1)] bg-[rgba(6,10,20,0.98)] backdrop-blur-xl">
            <div className="px-6 py-5 flex flex-col gap-4">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs tracking-widest uppercase text-[#8899aa] hover:text-[#00d4ff] transition-colors">
                Tính năng
              </Link>
              <Link href="#security" onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs tracking-widest uppercase text-[#8899aa] hover:text-[#00d4ff] transition-colors">
                Bảo mật
              </Link>
              <Link href={APP_URL + '/dashboard'}
                className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest uppercase px-4 py-3 rounded border border-[rgba(255,59,59,0.4)] bg-[rgba(255,59,59,0.1)] text-[#ff3b3b]">
                Mở App <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <HeroSection appUrl={APP_URL + '/dashboard'} />
      <StatsSection />
      <FeaturesSection />
      <SecuritySection />
      <LandingFooter />
    </div>
  );
}
