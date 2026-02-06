"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Product {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 space-y-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Collection</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Explore our latest arrivals, crafted with premium materials and designed for the modern lifestyle.
        </p>
      </div>

      <div className="container mx-auto px-8 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/4"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="group h-full block"
                >
                  <Card className="h-full border-none shadow-none bg-transparent overflow-hidden rounded-none">
                    <CardContent className="p-0 relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      {product.featuredImage ? (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <Button
                          className="w-full rounded-full shadow-lg"
                          size="sm"
                        >
                          Quick View
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start pt-4 px-0 pb-0 gap-1">
                      <div className="flex justify-between w-full items-start">
                        <h3 className="font-medium text-base group-hover:underline decoration-1 underline-offset-4 line-clamp-1">
                          {product.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: product.priceRange.minVariantPrice.currencyCode,
                        }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:-left-4" />
          <CarouselNext className="right-0 md:-right-4" />
        </Carousel>
      </div>

      <div className="flex justify-center pt-8">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8"
          asChild
        >
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
