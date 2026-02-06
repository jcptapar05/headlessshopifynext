"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  const { t } = useLanguage();
  const { termsPage } = t;

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold tracking-tight mb-4">{termsPage.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {termsPage.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-12">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 border-l-4 border-black dark:border-white pl-6">
            {termsPage.intro}
          </p>

          <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-semibold mb-4">{termsPage.sections.service.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{termsPage.sections.service.content}</p>
          </Card>

          <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-semibold mb-4">{termsPage.sections.conditions.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{termsPage.sections.conditions.content}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
