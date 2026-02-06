"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function ShopHeader() {
  const { t } = useLanguage();
  return <h1 className="text-3xl font-normal tracking-tight mb-2 dark:text-white">{t.shopPage.title}</h1>;
}
