"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Tag, Loader2, Shield, Truck, RefreshCw } from "lucide-react";
import { shopifyFetch } from "@/lib/shopifyapi";
import { toast } from "sonner";

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      // Get cart ID from localStorage
      let cartId = typeof window !== "undefined" ? localStorage.getItem("shopify_cart_id") : null;

      if (!cartId) {
        // Create new cart if none exists
        const { body } = await shopifyFetch({
          query: `
            mutation {
              cartCreate {
                cart {
                  id
                  checkoutUrl
                  lines(first: 10) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            product {
                              title
                              handle
                            }
                            image {
                              url
                              altText
                            }
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
                    }
                  }
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                    totalTaxAmount {
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

        if (body?.data?.cartCreate?.cart) {
          cartId = body.data.cartCreate.cart.id;
          if (typeof window !== "undefined") {
            localStorage.setItem("shopify_cart_id", cartId || "");
          }
          setCart(body.data.cartCreate.cart);
        }
      } else {
        // Fetch existing cart
        const { body } = await shopifyFetch({
          query: `
            query GetCart($cartId: ID!) {
              cart(id: $cartId) {
                id
                checkoutUrl
                lines(first: 50) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          product {
                            title
                            handle
                          }
                          image {
                            url
                            altText
                          }
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
                  }
                }
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          `,
          variables: { cartId },
        });

        if (body?.data?.cart) {
          setCart(body.data.cart);
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 1 || quantity > 10) return;

    setUpdating(lineId);
    try {
      const { body } = await shopifyFetch({
        query: `
        mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              lines(first: 50) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                          handle
                        }
                        image {
                          url
                          altText
                        }
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
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
        variables: {
          cartId: cart?.id,
          lines: [{ id: lineId, quantity }],
        },
      });

      if (body?.data?.cartLinesUpdate?.cart) {
        setCart(body.data.cartLinesUpdate.cart);

        // Dispatch event to update cart count in navbar
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cartUpdated"));
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (lineId: string) => {
    setUpdating(lineId);
    try {
      const { body } = await shopifyFetch({
        query: `
        mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              checkoutUrl
              lines(first: 50) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                          handle
                        }
                        image {
                          url
                          altText
                        }
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
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
        variables: {
          cartId: cart?.id,
          lineIds: [lineId],
        },
      });

      if (body?.data?.cartLinesRemove?.cart) {
        setCart(body.data.cartLinesRemove.cart);

        // Dispatch event to update cart count in navbar
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cartUpdated"));
        }
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdating(null);
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const { body } = await shopifyFetch({
        query: `
          mutation ApplyDiscount($cartId: ID!, $discountCodes: [String!]!) {
            cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
              cart {
                id
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        `,
        variables: {
          cartId: cart?.id,
          discountCodes: [promoCode.trim()],
        },
      });

      if (body?.data?.cartDiscountCodesUpdate?.cart) {
        toast.success(`Promo code "${promoCode.toUpperCase()}" applied!`);
        loadCart();
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      toast.error("Invalid promo code");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const cartLines = cart?.lines?.edges?.map((edge) => edge.node) || [];

  if (cartLines.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-block p-6 bg-gray-100 dark:bg-zinc-900 rounded-full">
            <ShoppingBag
              className="w-16 h-16 text-gray-400"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Discover our collection and find something you love</p>
          <Link href="/shop">
            <Button
              size="lg"
              className="gap-2 rounded-full px-8"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || "0");
  const tax = parseFloat(cart?.cost?.totalTaxAmount?.amount || "0");
  const total = parseFloat(cart?.cost?.totalAmount?.amount || "0");
  const currency = cart?.cost?.totalAmount?.currencyCode || "USD";

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-7xl">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {cartLines.length} {cartLines.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {cartLines.map((line) => {
              const { merchandise } = line;
              const size = merchandise.selectedOptions.find((opt) => opt.name.toLowerCase() === "size")?.value;
              const color = merchandise.selectedOptions.find((opt) => opt.name.toLowerCase() === "color")?.value;

              return (
                <Card
                  key={line.id}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex gap-4 md:gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/products/${merchandise.product.handle}`}
                        className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900"
                      >
                        {merchandise.image ? (
                          <Image
                            src={merchandise.image.url}
                            alt={merchandise.image.altText || merchandise.product.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 96px, 128px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${merchandise.product.handle}`}
                              className="hover:underline"
                            >
                              <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                                {merchandise.product.title}
                              </h3>
                            </Link>
                            {merchandise.title !== "Default Title" && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{merchandise.title}</p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(line.id)}
                            disabled={updating === line.id}
                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            {updating === line.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <X className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Variant Options */}
                        {(size || color) && (
                          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {size && <span>Size: {size}</span>}
                            {color && <span>Color: {color}</span>}
                          </div>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between gap-4 mt-4">
                          {/* Quantity Counter */}
                          <div className="flex items-center gap-2 md:gap-3">
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              disabled={line.quantity <= 1 || updating === line.id}
                              className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <span className="text-base md:text-lg font-semibold min-w-[2rem] text-center">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              disabled={line.quantity >= 10 || updating === line.id}
                              className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg md:text-xl font-semibold">
                              {formatCurrency(parseFloat(merchandise.priceV2.amount) * line.quantity)}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {formatCurrency(parseFloat(merchandise.priceV2.amount))} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6 md:p-8 bg-gray-50 dark:bg-zinc-900">
                <h2 className="text-2xl font-serif tracking-tight mb-6">Order Summary</h2>

                {/* Promo Code */}
                {/* <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => e.key === "Enter" && applyPromoCode()}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      className="gap-2 flex-shrink-0"
                    >
                      <Tag className="w-4 h-4" />
                      Apply
                    </Button>
                  </div>
                </div> */}

                <Separator className="my-2" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {tax > 0 && (
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">
                      {subtotal >= 100 ? (
                        <span className="text-green-600 dark:text-green-400">FREE</span>
                      ) : (
                        "Calculated at checkout"
                      )}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Total */}
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg md:text-xl font-semibold">Total</span>
                  <span className="text-2xl md:text-3xl font-bold">{formatCurrency(total)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="w-full rounded-full text-base md:text-lg mb-4"
                  onClick={() => {
                    if (cart?.checkoutUrl) {
                      window.location.href = cart.checkoutUrl;
                    }
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Link
                  href="/shop"
                  className="block"
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-sm"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                {/* Free Shipping Progress */}
                {subtotal < 100 && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                      Add <strong>{formatCurrency(100 - subtotal)}</strong> more for free shipping!
                    </p>
                    <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure checkout
                  </p>
                  <p className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Free shipping over $100
                  </p>
                  <p className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    30-day returns
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
