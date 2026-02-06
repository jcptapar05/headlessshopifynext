"use client";

import { shopifyFetch } from "@/lib/shopifyapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart, Truck, RefreshCw, Shield, Share2, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [handle, setHandle] = useState<string>("");
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const resolvedParams = await params;
      setHandle(resolvedParams.handle);

      const { body } = await shopifyFetch({
        query: `
          query GetProduct($handle: String!) {
            product(handle: $handle) {
              id
              title
              handle
              description
              descriptionHtml
              availableForSale
              productType
              vendor
              tags
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    priceV2 {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                name
                values
              }
            }
          }
        `,
        variables: {
          handle: resolvedParams.handle,
        },
      });

      if (!body || !body.data || !body.data.product) {
        notFound();
      }

      const productData = body.data.product;
      setProduct(productData);

      // Set default selections - Prioritize available variant
      const availableVariant =
        productData.variants.edges.find((e: any) => e.node.availableForSale)?.node ||
        productData.variants.edges[0]?.node;

      if (availableVariant) {
        const vSize = availableVariant.selectedOptions.find((opt: any) => opt.name.toLowerCase() === "size")?.value;
        const vColor = availableVariant.selectedOptions.find((opt: any) => opt.name.toLowerCase() === "color")?.value;

        if (vSize) setSelectedSize(vSize);
        if (vColor) setSelectedColor(vColor);
      } else {
        // Fallback if no variants (shouldn't happen for valid products)
        const sizeOpt = productData.options.find((opt: any) => opt.name.toLowerCase() === "size");
        const colorOpt = productData.options.find((opt: any) => opt.name.toLowerCase() === "color");

        if (sizeOpt && sizeOpt.values.length > 0) {
          setSelectedSize(sizeOpt.values[0]);
        }
        if (colorOpt && colorOpt.values.length > 0) {
          setSelectedColor(colorOpt.values[0]);
        }
      }

      // Fetch related products
      const { body: relatedBody } = await shopifyFetch({
        query: `
          query GetRelatedProducts($productType: String!) {
            products(first: 4, query: $productType) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          productType: productData.productType || "",
        },
      });

      if (relatedBody?.data?.products?.edges) {
        const related = relatedBody.data.products.edges
          .map((edge: any) => edge.node)
          .filter((p: any) => p.handle !== resolvedParams.handle);
        setRelatedProducts(related);
      }

      setLoading(false);
    }

    loadProduct();
  }, [params]);

  const handleAddToCart = async () => {
    if (!product) return;

    // Find the selected variant based on size and color
    const selectedVariant = product.variants.edges.find((edge: any) => {
      const variant = edge.node;
      const matchesSize = selectedSize
        ? variant.selectedOptions.some((opt: any) => opt.name.toLowerCase() === "size" && opt.value === selectedSize)
        : true;
      const matchesColor = selectedColor
        ? variant.selectedOptions.some((opt: any) => opt.name.toLowerCase() === "color" && opt.value === selectedColor)
        : true;
      return matchesSize && matchesColor;
    })?.node;

    if (!selectedVariant) {
      toast.error("Please select a valid size and color combination");
      return;
    }

    if (!selectedVariant.availableForSale) {
      toast.error("This variant is currently out of stock");
      return;
    }

    try {
      // Get or create cart ID
      let cartId = typeof window !== "undefined" ? localStorage.getItem("shopify_cart_id") : null;

      if (!cartId) {
        // Create a new cart first
        const { body: createBody } = await shopifyFetch({
          query: `
          mutation {
            cartCreate {
              cart {
                id
                checkoutUrl
              }
            }
          }
        `,
          variables: {},
        });

        cartId = createBody?.data?.cartCreate?.cart?.id;
        if (cartId && typeof window !== "undefined") {
          localStorage.setItem("shopify_cart_id", cartId);
        }
      }

      // Add item to cart
      const { body } = await shopifyFetch({
        query: `
        mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: selectedVariant.id,
              quantity: 1,
            },
          ],
        },
      });

      if (body?.data?.cartLinesAdd?.userErrors?.length > 0) {
        toast.error(body.data.cartLinesAdd.userErrors[0].message);
        return;
      }
      toast.success("Item added to cart!");
      // Dispatch event to update cart count in navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cartUpdated"));
      }

      // Optional: redirect to cart page
      // window.location.href = "/cart";
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product?.title);
    // Implement your wishlist logic here
    toast.success(`Added ${product?.title} to wishlist!`);
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      black: "#000000",
      white: "#FFFFFF",
      red: "#EF4444",
      blue: "#3B82F6",
      green: "#10B981",
      yellow: "#FBBF24",
      pink: "#EC4899",
      purple: "#A855F7",
      gray: "#6B7280",
      grey: "#6B7280",
      brown: "#92400E",
      orange: "#F97316",
      navy: "#1E3A8A",
      beige: "#D4C5B9",
    };

    const colorLower = color.toLowerCase();
    return colorMap[colorLower] || colorLower;
  };

  const isCombinationAvailable = (size: string | null, color: string | null) => {
    if (!product || !product.variants) return false;
    return product.variants.edges.some(({ node }: any) => {
      const vSize = node.selectedOptions.find((o: any) => o.name.toLowerCase() === "size")?.value;
      const vColor = node.selectedOptions.find((o: any) => o.name.toLowerCase() === "color")?.value;

      if (size && vSize !== size) return false;
      if (color && vColor !== color) return false;

      return node.availableForSale;
    });
  };

  // Check if the currently selected combination is available (for the Add to Cart button)
  const isCurrentSelectionAvailable = isCombinationAvailable(selectedSize, selectedColor);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="animate-pulse text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((edge: any) => edge.node);
  const variants = product.variants.edges.map((edge: any) => edge.node);
  const sizeOption = product.options.find((opt: any) => opt.name.toLowerCase() === "size");
  const colorOption = product.options.find((opt: any) => opt.name.toLowerCase() === "color");

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/shop"
            className="hover:text-black dark:hover:text-white"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white truncate">{product.title}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Left: Images Gallery */}
          <div className="space-y-4">
            {/* Main Image - Made smaller and more responsive */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900 max-w-md mx-auto lg:max-w-none">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
              )}
            </div>

            {/* Thumbnail Gallery - Clickable */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto lg:max-w-none">
                {images.slice(0, 4).map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900 transition-all ${
                      selectedImage === index ? "ring-2 ring-black dark:ring-white" : "hover:opacity-75"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 20vw, 10vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-4 md:space-y-6">
            {/* Product Type & Vendor */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.productType && <Badge variant="outline">{product.productType}</Badge>}
              {product.vendor && <span className="text-sm text-gray-600 dark:text-gray-400">by {product.vendor}</span>}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight mb-2">{product.title}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl md:text-3xl font-semibold">
                  {product.priceRange.minVariantPrice.currencyCode === "USD" && "$"}
                  {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </span>
                {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount && (
                  <span className="text-lg md:text-xl text-gray-500">
                    - ${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-gray-500">{product.priceRange.minVariantPrice.currencyCode}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <div
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>

            <Separator />

            {/* Size Selection */}
            {sizeOption && (
              <div>
                <label className="font-semibold mb-3 block">
                  Size: <span className="font-normal text-gray-600">{selectedSize || "Select your size"}</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {sizeOption.values.map((size: string) => {
                    const isAvailable = isCombinationAvailable(size, selectedColor);
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`border rounded-lg py-2 md:py-3 transition-all font-medium text-sm md:text-base relative ${
                          selectedSize === size
                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                            : isAvailable
                              ? "border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-white"
                              : "border-gray-200 dark:border-zinc-800 text-gray-300 dark:text-zinc-600 cursor-not-allowed bg-gray-50 dark:bg-zinc-900"
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-px bg-gray-300 dark:bg-zinc-600 rotate-45 transform scale-x-110" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colorOption && (
              <div>
                <label className="font-semibold mb-3 block">
                  Color: <span className="font-normal text-gray-600">{selectedColor || "Choose a color"}</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                  {colorOption.values.map((color: string) => {
                    const isAvailable = isCombinationAvailable(selectedSize, color);
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        disabled={!isAvailable}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all relative flex items-center justify-center ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-black dark:ring-white"
                            : "ring-2 ring-gray-300 dark:ring-zinc-700 hover:ring-black dark:hover:ring-white"
                        } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={isAvailable ? color : `${color} (Out of Stock)`}
                      >
                        {!isAvailable && <div className="w-full h-0.5 bg-gray-500 rotate-45 transform" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity - Custom Counter */}
            <div>
              <label className="font-semibold mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || !isCurrentSelectionAvailable}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg md:text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full rounded-lg text-sm md:text-base"
                onClick={handleAddToCart}
                disabled={!isCurrentSelectionAvailable}
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {isCurrentSelectionAvailable ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-lg text-sm md:text-base"
                onClick={handleAddToWishlist}
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Free Shipping</p>
                  <p className="text-xs md:text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Easy Returns</p>
                  <p className="text-xs md:text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Secure Payment</p>
                  <p className="text-xs md:text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Share */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share this product
              </Button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="bg-gray-50 dark:bg-zinc-900 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-6 md:mb-8">You May Also Like</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.handle}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-900">
                      {relatedProduct.images.edges[0] ? (
                        <Image
                          src={relatedProduct.images.edges[0].node.url}
                          alt={relatedProduct.images.edges[0].node.altText || relatedProduct.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-medium text-sm md:text-base mb-1 md:mb-2 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-base md:text-lg font-semibold">
                        ${parseFloat(relatedProduct.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">No related products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
