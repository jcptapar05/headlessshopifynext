"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold tracking-tight">Logo</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://www.facebook.com/jcptapar05"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/jcptapar05"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/jcptapar05"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium mb-4">{t.footer.shop}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.allProducts}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=new"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.newArrivals}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=bestsellers"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.bestSellers}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=accessories"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.accessories}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-medium mb-4">{t.footer.support}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.faqs}
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.shipping}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">{t.footer.stayUpdated}</h4>
            <p className="text-sm text-muted-foreground">{t.footer.stayUpdatedDesc}</p>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <Input
                  type="email"
                  placeholder={t.footer.enterEmail}
                  className="bg-secondary/50 border border-muted-foreground focus-visible:ring-1 pr-12"
                />
                <Button
                  size="icon"
                  type="submit"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
