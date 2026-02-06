"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Globe, Heart, Leaf, Truck, Users, ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";

import { useLanguage } from "@/lib/i18n/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Fashion",
      description: "We believe fashion is more than clothing—it's self-expression, confidence, and art.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Practices",
      description: "Committed to ethical sourcing and eco-friendly materials for a better tomorrow.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality First",
      description: "Every piece is carefully curated to ensure the highest standards of craftsmanship.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connecting fashion lovers worldwide with unique, timeless pieces.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Countries" },
    { number: "5★", label: "Average Rating" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      bio: "With 15 years in fashion, Sarah brings her passion for sustainable design to every collection.",
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Michael's innovative approach blends contemporary aesthetics with timeless elegance.",
    },
    {
      name: "Emma Williams",
      role: "Sustainability Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      bio: "Emma ensures every piece meets our strict ethical and environmental standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-white mb-6">
            {t.aboutPage.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t.aboutPage.description}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Fashion with a Purpose</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2015, FASHION began with a simple vision: to create beautiful, sustainable clothing that
              empowers individuals to express their unique style while respecting our planet.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Today, we're proud to be a global community of fashion enthusiasts who believe that style and
              sustainability can coexist. Every piece in our collection tells a story of craftsmanship, ethics, and
              timeless design.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="gap-2 rounded-full px-8"
              >
                Explore Our Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
                alt="Fashion Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-zinc-950 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-zinc-950 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate people behind FASHION
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden group"
              >
                <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-950">
              <img
                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop"
                alt="Sustainability"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Committed to Sustainability</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">Eco-Friendly Materials</h3>
                  <p className="leading-relaxed">
                    We use organic cotton, recycled fabrics, and sustainable materials in 80% of our products.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">Fair Trade Practices</h3>
                  <p className="leading-relaxed">
                    All our partners adhere to fair labor practices, ensuring ethical production at every step.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">Carbon-Neutral Shipping</h3>
                  <p className="leading-relaxed">
                    We offset 100% of our shipping emissions and use recyclable packaging materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Follow us on social media for style inspiration, behind-the-scenes content, and exclusive offers.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-8 bg-white text-black hover:bg-gray-100"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
