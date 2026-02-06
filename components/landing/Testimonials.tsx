import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    content:
      "The quality of the fabric is absolutely stunning. I've never felt more confident in a dress before. Highly recommended for anyone looking for premium fashion.",
    author: "Sarah Mitchell",
    role: "Fashion Blogger",
    avatar: "SM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    content:
      "Customer service was exceptional, and the delivery was faster than expected. The minimalist design fits perfectly with my wardrobe staples.",
    author: "David Chen",
    role: "Architect",
    avatar: "DC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    content:
      "I love how sustainable their materials are without compromising on style. A brand that truly cares about the future of fashion.",
    author: "Emily Watson",
    role: "Sustainability Advocate",
    avatar: "EW",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  },
];

export function Testimonials() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Clients Say</h2>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-none bg-background/50 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-6 p-8">
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed">"{testimonial.content}"</blockquote>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
