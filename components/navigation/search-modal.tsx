"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLanguage } from "@/lib/i18n/language-context";
import { Search, TrendingUp, Shirt, Watch, ShoppingBag } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = React.useState("");

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  const handleSearch = () => {
    if (query) {
      runCommand(() => router.push(`/shop?q=${encodeURIComponent(query)}`));
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <CommandInput
        placeholder={t.search.placeholder}
        value={query}
        onValueChange={setQuery}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <CommandList>
        <CommandEmpty>
          {query ? (
            <div
              className="flex flex-col items-center justify-center py-6 text-center text-sm text-muted-foreground cursor-pointer"
              onClick={handleSearch}
            >
              <p>{t.search.noResults}</p>
              <button className="mt-2 text-primary hover:underline font-medium">
                {t.search.viewAll} &quot;{query}&quot;
              </button>
            </div>
          ) : null}
        </CommandEmpty>

        {!query && (
          <>
            <CommandGroup heading={t.search.trending}>
              <CommandItem onSelect={() => runCommand(() => router.push("/shop?category=new"))}>
                <TrendingUp className="mr-2 h-4 w-4" />
                <span>{t.footer.newArrivals}</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/shop?category=bestsellers"))}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>{t.footer.bestSellers}</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t.search.collections}>
              <CommandItem onSelect={() => runCommand(() => router.push("/shop"))}>
                <Shirt className="mr-2 h-4 w-4" />
                <span>{t.footer.allProducts}</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/shop?category=accessories"))}>
                <Watch className="mr-2 h-4 w-4" />
                <span>{t.footer.accessories}</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {query && (
          <CommandGroup heading={t.search.products}>
            <CommandItem
              onSelect={handleSearch}
              value={query}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>
                {t.search.viewAll} &quot;{query}&quot;
              </span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
