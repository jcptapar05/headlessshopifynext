"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Locale } from "@/lib/i18n/dictionaries";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleChange = (value: string) => {
    setLanguage(value as Locale);
  };

  return (
    <div className="flex items-center">
      <Select
        value={language}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[120px] h-9 border-none bg-transparent hover:bg-gray-100 focus:ring-0 gap-2 px-2 text-xs font-medium uppercase tracking-wide">
          <Globe className="w-4 h-4 text-gray-500" />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="w-[150px]"
        >
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="tl">Tagalog</SelectItem>
          <SelectItem value="zh">Chinese</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
