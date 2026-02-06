"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const { privacyPage } = t;

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold tracking-tight mb-4">{privacyPage.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {privacyPage.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-12">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 border-l-4 border-black dark:border-white pl-6">
            {privacyPage.intro}
          </p>

          <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-semibold mb-4">{privacyPage.sections.collect.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{privacyPage.sections.collect.content}</p>
          </Card>

          <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-semibold mb-4">{privacyPage.sections.use.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{privacyPage.sections.use.content}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
