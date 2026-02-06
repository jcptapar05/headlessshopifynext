"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6">
            {t.faqPage.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">{t.faqPage.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <div className="space-y-4">
          {t.faqPage.questions.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {faq.q}
                </span>
                <span className="ml-6 flex-shrink-0 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors p-1 bg-gray-50 dark:bg-neutral-800 rounded-full">
                  {openIndex === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed text-base">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
