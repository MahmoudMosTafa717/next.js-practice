import Image from "next/image";
export default function ProductDetails({ product }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex md:gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.thumbnail || product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            width={400}
            height={300}
            className="h-72 w-full rounded-xl object-contain"
          />
        </div>

        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5 md:mt-0 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-green-600">
            ${product.price}
          </p>

          <button className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : [];

  const paths = products.map((product) => ({
    params: {
      id: product.id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  if (!product || product.message === "Product not found") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },

    revalidate: 60,
  };
}
