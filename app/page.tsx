import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";
import MobileSearchAndFilters from "./components/MobileSearchAndFilters";
import { filterProducts } from "./utils/filterProducts";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = params.category === "all" ? undefined : (params.category as string | undefined);
  
  const filtered = filterProducts(products, {
    category,
    search: params.search as string | undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice as string) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice as string) : undefined,
  });

  return (
    <>
      <MobileSearchAndFilters />
      <main className="flex gap-4 md:gap-6 xl:gap-10 p-4 md:p-6 lg:p-8">
        <div className="hidden lg:block">
          <Filters />
        </div>

      <section className="flex-1 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Product Listing</h1>
        
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
    </>
  );
}
