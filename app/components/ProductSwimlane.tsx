import type {HomepageFeaturedProductsQuery} from 'storefrontapi.generated';
import {Section} from '~/components/Text';
import {ProductCard} from '~/components/ProductCard';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

type ProductSwimlaneProps = HomepageFeaturedProductsQuery & {
  title?: string;
  count?: number;
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}: ProductSwimlaneProps) {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Recommended</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{title}</h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.nodes.slice(0, 8).map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              quickAdd
            />
          ))}
        </div>
      </div>
    </section>
  );
}
