"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    title: "Elegance Redefined",
    subtitle: "Discover the new Spring Collection",
    cta: "Shop Collection",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern Minimalist",
    subtitle: "Essentials for the contemporary wardrobe",
    cta: "View Lookbook",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", // Fashion related
  },
  {
    id: 3,
    title: "Urban Sophistication",
    subtitle: "Streetwear meets luxury",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="w-full bg-background">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30 md:bg-black/20" />{" "}
                  {/* Overlay using standard black/opacity */}
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto flex flex-col justify-center items-start px-4 md:px-8 text-white">
                  <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h2 className="text-lg md:text-xl font-medium tracking-widest uppercase">{slide.subtitle}</h2>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">{slide.title}</h1>
                    <Button
                      size="lg"
                      className="rounded-full bg-white text-black hover:bg-neutral-200 mt-4 h-12 px-8 text-base"
                      asChild
                    >
                      <Link href="/shop">
                        {slide.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Arrows - Using absolute positioning to be inside the hero */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-8 text-white border-white/30 bg-black/20 hover:bg-black/40 hover:text-white hover:border-white" />
          <CarouselNext className="right-8 text-white border-white/30 bg-black/20 hover:bg-black/40 hover:text-white hover:border-white" />
        </div>
      </Carousel>
    </div>
  );
}
