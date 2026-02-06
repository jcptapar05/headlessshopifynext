"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Truck, RotateCcw, Globe, Clock, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ShippingPage() {
  const { t } = useLanguage();
  const { delivery, returns } = t.shippingPage.sections;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-foreground">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6">
            {t.shippingPage.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t.shippingPage.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        <div className="grid gap-16 md:gap-24">
          {/* Delivery Section */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif tracking-tight">{delivery.title}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Standard */}
              <Card className="p-8 border-l-4 border-l-gray-200 hover:border-l-black dark:border-l-neutral-800 dark:hover:border-l-white transition-all duration-300">
                <h3 className="text-xl font-semibold mb-2">{delivery.standard.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{delivery.standard.desc}</span>
                </div>
                <p className="text-2xl font-bold">{delivery.standard.price}</p>
              </Card>

              {/* Express */}
              <Card className="p-8 border-l-4 border-l-gray-200 hover:border-l-black dark:border-l-neutral-800 dark:hover:border-l-white transition-all duration-300 bg-gray-50 dark:bg-neutral-900/50">
                <h3 className="text-xl font-semibold mb-2">{delivery.express.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                  <Package className="w-4 h-4" />
                  <span>{delivery.express.desc}</span>
                </div>
                <p className="text-2xl font-bold">{delivery.express.price}</p>
              </Card>

              {/* International */}
              <Card className="p-8 border-l-4 border-l-gray-200 hover:border-l-black dark:border-l-neutral-800 dark:hover:border-l-white transition-all duration-300">
                <h3 className="text-xl font-semibold mb-2">{delivery.international.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                  <Globe className="w-4 h-4" />
                  <span>{delivery.international.desc}</span>
                </div>
                <p className="text-lg font-medium">{delivery.international.price}</p>
              </Card>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-neutral-800" />

          {/* Returns Section */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif tracking-tight">{returns.title}</h2>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{returns.policy}</p>

              <ul className="grid sm:grid-cols-2 gap-4">
                {returns.points.map((point: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
