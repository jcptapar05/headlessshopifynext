"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

import { useLanguage } from "@/lib/i18n/language-context";

export default function ContactPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Note: Ensure contact-hero.jpg exists in public folder or replace with valid URL */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-sm md:text-base font-medium tracking-widest text-gray-300 uppercase mb-4 block">
            Get in touch
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-white mb-6">
            {t.contactPage.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t.contactPage.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Column: Contact Info & Map */}
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
            {/* Contact Details */}
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-light tracking-tight">Visit Next Store</h2>
                <p className="text-muted-foreground font-light">
                  Experience our collections in person at our flagship boutique.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary">
                    <MapPin className="w-5 h-5" />
                    <h3 className="font-medium tracking-wide">Address</h3>
                  </div>
                  <p className="text-muted-foreground font-light pl-8 leading-relaxed">
                    123 Fashion Avenue
                    <br />
                    SoHo, New York 10012
                    <br />
                    United States
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary">
                    <Clock className="w-5 h-5" />
                    <h3 className="font-medium tracking-wide">Hours</h3>
                  </div>
                  <p className="text-muted-foreground font-light pl-8 leading-relaxed">
                    Mon - Fri: 10am - 7pm
                    <br />
                    Sat - Sun: 11am - 6pm
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary">
                    <Mail className="w-5 h-5" />
                    <h3 className="font-medium tracking-wide">Email</h3>
                  </div>
                  <p className="text-muted-foreground font-light pl-8">
                    <a
                      href="mailto:hello@nextstore.com"
                      className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                    >
                      hello@nextstore.com
                    </a>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary">
                    <Phone className="w-5 h-5" />
                    <h3 className="font-medium tracking-wide">Phone</h3>
                  </div>
                  <p className="text-muted-foreground font-light pl-8">
                    <a
                      href="tel:+15550000000"
                      className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                    >
                      +1 (555) 000-0000
                    </a>
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t">
                <div className="flex gap-6">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section - Grayscale for elegance */}
            <div className="w-full aspect-video bg-muted rounded-none overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out shadow-sm border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f8906e6bd71b8!2s350%205th%20Ave%2C%20New%20York%2C%20NY%2010118%2C%20USA!5e0!3m2!1sen!2sca!4v1614310234567!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards">
            <div className="sticky top-24">
              <h2 className="text-3xl font-light tracking-tight mb-8">{t.contactPage.formTitle}</h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 gap-10">
                  <div className="group">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      required
                      className="border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg py-6 placeholder:text-muted-foreground/50 transition-colors"
                    />
                  </div>
                  <div className="group">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      className="border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg py-6 placeholder:text-muted-foreground/50 transition-colors"
                    />
                  </div>
                  <div className="group">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows={4}
                      required
                      className="border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg py-6 placeholder:text-muted-foreground/50 resize-none transition-colors min-h-[120px]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-lg font-light tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 rounded-none transition-all duration-300 ease-out group"
                  size="lg"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {success && (
                  <div className="text-green-600 text-sm text-center font-medium animate-in fade-in pt-4">
                    Thank you. Your message has been sent successfully.
                  </div>
                )}

                {error && (
                  <div className="text-destructive text-sm text-center font-medium animate-in fade-in pt-4">
                    Error: {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
