"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface FilterSidebarProps {
  categories: string[];
  vendors: string[];
  sizes: string[];
  genders: string[];
  priceRanges: { label: string; min: number; max: number }[];
}

export function FilterSidebar({ categories, vendors, sizes, genders, priceRanges }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to update params
  const createQueryString = useCallback(
    (name: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      // Reset pagination when filtering
      params.delete("cursor");
      params.delete("direction");

      const current = params.getAll(name);

      if (checked) {
        if (!current.includes(value)) {
          params.append(name, value);
        }
      } else {
        params.delete(name);
        current.filter((v) => v !== value).forEach((v) => params.append(name, v));
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    router.push(pathname + "?" + createQueryString(name, value, checked), { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const isChecked = (name: string, value: string) => {
    return searchParams.getAll(name).includes(value);
  };

  return (
    <div className="sticky top-24 pr-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <h3 className="font-medium text-sm uppercase tracking-wide">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-auto p-0 text-xs text-gray-500 hover:text-black hover:bg-transparent"
        >
          Reset
        </Button>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h4 className="font-medium text-sm mb-4">Category</h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center space-x-3 group"
              >
                <Checkbox
                  id={`category-${category}`}
                  checked={isChecked("category", category)}
                  onCheckedChange={(c) => handleCheckboxChange("category", category, c as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-600 font-normal cursor-pointer group-hover:text-black transition-colors"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gender */}
      {genders.length > 0 && (
        <div className="mb-8">
          <h4 className="font-medium text-sm mb-4">Gender</h4>
          <div className="space-y-3">
            {genders.map((gender) => (
              <div
                key={gender}
                className="flex items-center space-x-3 group"
              >
                <Checkbox
                  id={`gender-${gender}`}
                  checked={isChecked("gender", gender)}
                  onCheckedChange={(c) => handleCheckboxChange("gender", gender, c as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label
                  htmlFor={`gender-${gender}`}
                  className="text-sm text-gray-600 font-normal cursor-pointer capitalize group-hover:text-black transition-colors"
                >
                  {gender}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div className="mb-8">
          <h4 className="font-medium text-sm mb-4">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div
                key={size}
                className={`
                    cursor-pointer text-xs border px-3 py-1 min-w-[3rem] text-center transition-all
                    ${
                      isChecked("size", size)
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }
                `}
                onClick={() => handleCheckboxChange("size", size, !isChecked("size", size))}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-sm mb-4">Price</h4>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div
              key={range.label}
              className="flex items-center space-x-3 group"
            >
              <Checkbox
                id={`price-${range.label}`}
                checked={isChecked("price", range.label)}
                onCheckedChange={(c) => handleCheckboxChange("price", range.label, c as boolean)}
                className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label
                htmlFor={`price-${range.label}`}
                className="text-sm text-gray-600 font-normal cursor-pointer group-hover:text-black transition-colors"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      {vendors.length > 0 && (
        <div className="mb-8">
          <h4 className="font-medium text-sm mb-4">Brand</h4>
          <div className="space-y-3">
            {vendors.map((vendor) => (
              <div
                key={vendor}
                className="flex items-center space-x-3 group"
              >
                <Checkbox
                  id={`vendor-${vendor}`}
                  checked={isChecked("vendor", vendor)}
                  onCheckedChange={(c) => handleCheckboxChange("vendor", vendor, c as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label
                  htmlFor={`vendor-${vendor}`}
                  className="text-sm text-gray-600 font-normal cursor-pointer group-hover:text-black transition-colors"
                >
                  {vendor}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
