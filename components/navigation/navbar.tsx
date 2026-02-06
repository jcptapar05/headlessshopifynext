"use client";

import { shopifyFetch } from "@/lib/shopifyapi";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/lib/i18n/language-context";
import { SearchModal } from "./search-modal";

function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { t } = useLanguage();

  const menu = [
    { id: "1", title: t.nav.home, url: "/" },
    { id: "2", title: t.nav.shop, url: "/shop" },
    { id: "3", title: t.nav.about, url: "/about" },
    { id: "4", title: t.nav.contact, url: "/contact" },
  ];

  // Load cart count
  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const cartId = localStorage.getItem("shopify_cart_id");
        if (!cartId) {
          setCartCount(0);
          return;
        }

        const { body } = await shopifyFetch({
          query: `
            query GetCart($cartId: ID!) {
              cart(id: $cartId) {
                lines(first: 100) {
                  edges {
                    node {
                      quantity
                    }
                  }
                }
              }
            }
          `,
          variables: { cartId },
        });

        if (body?.data?.cart?.lines?.edges) {
          const total = body.data.cart.lines.edges.reduce((sum: number, edge: any) => sum + edge.node.quantity, 0);
          setCartCount(total);
        }
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCartCount(0);
      }
    };

    loadCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-xs sm:text-sm">
        <p>{t.nav.topBanner}</p>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-wider hover:opacity-80 transition-opacity"
          >
            Logo
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8 text-sm tracking-wide uppercase">
            {menu.map((item) => {
              const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));

              return (
                <li
                  key={item.id}
                  className="relative group"
                >
                  <Link
                    href={item.url}
                    className={`
                      relative py-2 block transition-colors duration-200
                      ${isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"}
                    `}
                  >
                    {item.title}
                    {/* Active Indicator */}
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <button
              className="hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              aria-label={t.common.search}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/account"
              className="hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg hidden sm:block"
              aria-label={t.nav.account}
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="hover:text-gray-600 transition-colors relative p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-in zoom-in-50 duration-200">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden fixed inset-0 top-[104px] bg-white z-40 transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="h-full overflow-y-auto">
          <ul className="px-4 py-6 space-y-1">
            {menu.map((item) => {
              const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));

              return (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className={`
                      block px-4 py-3 rounded-lg text-base tracking-wide uppercase transition-colors
                      ${isActive ? "bg-black text-white font-medium" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Account Link */}
            <li className="pt-4 border-t border-gray-200 mt-4">
              <Link
                href="/account"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors
                  ${pathname === "/account" ? "bg-black text-white font-medium" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <User className="w-5 h-5" />
                {t.nav.account}
              </Link>
            </li>

            {/* Mobile Language Switcher */}
            <li className="pt-4 border-t border-gray-200 mt-4 px-4">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[104px] bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <SearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
      />
    </header>
  );
}

export default Navbar;
