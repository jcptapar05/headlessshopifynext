"use server";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT!;
const key = process.env.NEXT_PUBLIC_KEY!;

export async function shopifyFetch({ query, variables }: { query: string; variables: any }) {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
    });

    // console.log(result);

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    // console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}
