import { shopifyFetch } from "@/lib/shopifyapi";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { Testimonials } from "@/components/landing/Testimonials";

export default async function Home() {
  const { body } = await shopifyFetch({
    query: `
      query GetProducts {
        products(first: 10) {
          nodes {
            id
            title
            handle
            descriptionHtml
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    variables: {},
  });

  const products = body.data.products.nodes;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <HeroCarousel />
      <ProductGrid products={products} />
      <Testimonials />

      {/* Newsletter Section */}
      <section className="bg-neutral-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
          <p className="text-neutral-400">Subscribe for exclusive offers, new arrivals, and fashion inspiration.</p>
          <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-neutral-800 border-none rounded-md px-4 py-3 focus:ring-1 focus:ring-white outline-none"
            />
            <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-neutral-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
