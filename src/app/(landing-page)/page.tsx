'use client';

import { useEffect, useState } from 'react';
import { ChevronRight,Menu, X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900 font-sans selection:bg-red-500 selection:text-white overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/85 backdrop-blur-lg border-b border-slate-200/70 shadow-sm py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-slate-900">
            <div className="bg-red-500 p-1.5 rounded-lg shadow-lg shadow-red-500/30">
              <Logo className="w-6 h-6 text-white" />
            </div>
            <span>
              Guard<span className="text-red-500">M</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-slate-900 transition-colors">
              Tính năng
            </Link>
            <Link href="#security" className="hover:text-slate-900 transition-colors">
              Bảo mật
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm" className="shadow-lg shadow-red-500/20">
              <a href={APP_URL + "/dashboard"} className="flex items-center gap-2">
                Mở App <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden text-slate-900 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <Card className="md:hidden absolute top-full left-0 w-full rounded-none border-slate-200 bg-white">
            <CardContent className="p-6 flex flex-col gap-4">
              <Button asChild className="w-full">
                <a href={APP_URL + "/dashboard"}>Mở App</a>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đóng
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <HeroSection appUrl={APP_URL + "/dashboard"} />
      <StatsSection />
      <FeaturesSection />
      <SecuritySection />
      <LandingFooter />
    </div>
  );
}
