import Link from "next/link";

import { Logo } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

export function LobbyNavbar() {
  return (
    <header className="mt-3 h-14 px-5 flex justify-center">
      <nav className="container flex h-full items-center justify-between">
        <Link
          href="/landing-page"
          className="flex gap-2 px-4 font-handwriting text-xl [text-shadow:0_2px_0_#e1e1e1] dark:text-shadow-none"
        >
          <Logo size={28} />
          {siteConfig.name}
        </Link>

        <div className="hidden space-x-4 px-5 text-sm font-medium text-muted-foreground md:inline-block">
          <Link
            href="/landing-page#features"
            className="transition-colors hover:text-foreground"
          >
            Tính năng
          </Link>
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Tra cứu
          </Link>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-8 rounded-full px-5 font-semibold transition-all duration-200 hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background sm:inline-flex"
            )}
          >
            Đăng nhập
          </Link>

          <Link
            href="/signup"
            className={cn(
              buttonVariants(),
              "h-8 rounded-full px-3 font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background bg-amber-600 hover:bg-amber-700"
            )}
          >
            Đăng ký
          </Link>
        </div>
      </nav>
    </header>
  );
}
