import Link from "next/link";
import Image from "next/image";
export default function Products({ products }) {
  const items = Array.isArray(products) ? products : [];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <Image
              src={
                product.thumbnail || product.images?.[0] || "/placeholder.png"
              }
              alt={product.title}
              width={300}
              height={200}
              className="h-40 mx-auto object-contain rounded-md"
            />

            <div className="mt-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
              <h2 className="font-bold text-lg text-gray-800">
                {product.title}
              </h2>

              <p className="text-green-600 font-semibold mt-2">
                ${product.price}
              </p>

              <Link
                href={`/products/${product.id}`}
                className="mt-3 inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : [];

  return {
    props: {
      products,
    },
  };
}
