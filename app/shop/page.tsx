import { shopifyFetch } from "@/lib/shopifyapi";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { ShopHeader } from "@/components/shop/shop-header";

import { Pagination } from "@/components/shop/pagination";

export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const { category, vendor, size, gender, price, cursor, direction, q } = searchParams;

  const isPrev = direction === "prev";
  const limit = 12;

  // Build Query for Filtered Products
  const queryParts: string[] = [];

  // Search query
  if (typeof q === "string" && q.length > 0) {
    queryParts.push(q);
  }

  const getArray = (val: string | string[] | undefined) => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  const categories = getArray(category);
  if (categories.length) queryParts.push(`(${categories.map((c) => `product_type:'${c}'`).join(" OR ")})`);

  const vendors = getArray(vendor);
  if (vendors.length) queryParts.push(`(${vendors.map((v) => `vendor:'${v}'`).join(" OR ")})`);

  const genders = getArray(gender);
  if (genders.length) queryParts.push(`(${genders.map((g) => `tag:'${g}'`).join(" OR ")})`);

  const sizes = getArray(size);
  if (sizes.length) queryParts.push(`(${sizes.map((s) => `tag:'${s}' OR variant_title:'${s}'`).join(" OR ")})`);

  const prices = getArray(price);
  if (prices.length) {
    const ranges = [
      { label: "Under $50", min: 0, max: 50 },
      { label: "$50 - $100", min: 50, max: 100 },
      { label: "$100 - $200", min: 100, max: 200 },
      { label: "Over $200", min: 200, max: 999999 },
    ];
    const priceQs = prices
      .map((label) => {
        const range = ranges.find((r) => r.label === label);
        if (!range) return null;
        return `(price:>=${range.min} AND price:<=${range.max})`;
      })
      .filter(Boolean);
    if (priceQs.length) queryParts.push(`(${priceQs.join(" OR ")})`);
  }

  const queryString = queryParts.join(" AND ");

  // Parallel Fetch:
  // 1. Filtered Products (for the grid)
  // 2. All Products (for the sidebar facets to remain persistent)
  const [productsRes, facetsRes] = await Promise.all([
    shopifyFetch({
      query: `
        query GetProducts($first: Int, $last: Int, $after: String, $before: String, $query: String) {
            products(first: $first, last: $last, after: $after, before: $before, query: $query) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            nodes {
                id
                title
                handle
                productType
                tags
                vendor
                images(first: 2) {
                    nodes {
                        url
                        altText
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
            }
            }
        }
        `,
      variables: {
        first: isPrev ? null : limit,
        last: isPrev ? limit : null,
        after: isPrev ? null : cursor,
        before: isPrev ? cursor : null,
        query: queryString || null,
      },
    }),
    shopifyFetch({
      query: `
        query GetAllFacetData {
            products(first: 250) {
                nodes {
                    productType
                    vendor
                    tags
                    variants(first: 20) {
                        nodes {
                            selectedOptions {
                                name
                                value
                            }
                        }
                    }
                }
            }
        }
        `,
      variables: {},
    }),
  ]);

  const productData = productsRes.body?.data?.products;
  const products = productData?.nodes || [];
  const pageInfo = productData?.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  };

  const facetProducts = facetsRes.body?.data?.products?.nodes || [];

  // Derive Filters from ALL products (facetProducts), keeping sidebar stable
  const allCategories = [...new Set(facetProducts.map((p: any) => p.productType).filter(Boolean))] as string[];
  const allVendors = [...new Set(facetProducts.map((p: any) => p.vendor).filter(Boolean))] as string[];

  const allOptions = facetProducts.flatMap((p: any) => p.variants.nodes.flatMap((v: any) => v.selectedOptions));
  const allSizes = [
    ...new Set(allOptions.filter((opt: any) => opt.name.toLowerCase() === "size").map((opt: any) => opt.value)),
  ].sort() as string[];

  const allGenders = [
    ...new Set(
      facetProducts.flatMap((p: any) =>
        p.tags.filter((tag: string) => ["men", "women", "unisex", "male", "female"].includes(tag.toLowerCase())),
      ),
    ),
  ] as string[];

  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: 999999 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Products Grid with Filters */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col mb-12"></div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar
              categories={allCategories}
              vendors={allVendors}
              sizes={allSizes}
              genders={allGenders}
              priceRanges={priceRanges}
            />
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-24 text-gray-500 font-light dark:text-gray-400">
                  No products found.
                </div>
              ) : (
                products.map((product: any) => {
                  const firstImage = product.images?.nodes[0];
                  const secondImage = product.images?.nodes[1];

                  return (
                    <Link
                      href={`/products/${product.handle}`}
                      key={product.id}
                    >
                      <Card className="group border-0 shadow-none bg-transparent">
                        <CardContent className="p-0 mb-4">
                          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                            {firstImage ? (
                              <>
                                <Image
                                  src={firstImage.url}
                                  alt={firstImage.altText || product.title}
                                  fill
                                  className={`object-cover transition-all duration-700 ${secondImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {secondImage && (
                                  <Image
                                    src={secondImage.url}
                                    alt={secondImage.altText || product.title}
                                    fill
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  />
                                )}
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                No Image
                              </div>
                            )}
                          </div>
                        </CardContent>

                        <CardFooter className="flex flex-col items-start p-0 space-y-1">
                          <h3 className="font-medium text-base text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
                            {product.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product.priceRange.minVariantPrice.currencyCode === "PHP" && "P"}
                              {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                            </span>
                            {product.priceRange.minVariantPrice.amount !==
                              product.priceRange.maxVariantPrice.amount && (
                              <span className="text-sm text-gray-400">+</span>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>

            <Pagination pageInfo={pageInfo} />
          </div>
        </div>
      </section>
    </div>
  );
}
