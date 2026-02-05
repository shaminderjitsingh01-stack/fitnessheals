import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';

import type {ProductCardFragment} from 'storefrontapi.generated';
import {Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {isDiscounted} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
}) {
  let cardLabel;

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  const isOnSale = isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2);

  if (label) {
    cardLabel = label;
  } else if (isOnSale) {
    cardLabel = 'Sale';
  }

  return (
    <div className="group flex flex-col">
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="viewport"
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <div className={clsx(
          'relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4',
          'transition-all duration-300 group-hover:shadow-xl',
          className
        )}>
          {image ? (
            <Image
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              aspectRatio="1/1"
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center p-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-xs text-gray-400 font-medium">No Image</span>
              </div>
            </div>
          )}

          {/* Sale Badge */}
          {cardLabel && (
            <div className="absolute top-3 left-3">
              <span className={clsx(
                'inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full',
                cardLabel === 'Sale'
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-900 text-white'
              )}>
                {cardLabel}
              </span>
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              View Product
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1 flex-grow">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-brand-red transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mt-auto pt-1">
            {isOnSale ? (
              <>
                <span className="font-bold text-brand-red">
                  <Money withoutTrailingZeros data={price!} />
                </span>
                <span className="text-gray-400 line-through text-sm">
                  <Money withoutTrailingZeros data={compareAtPrice as MoneyV2} />
                </span>
              </>
            ) : (
              <span className="font-bold text-gray-900">
                <Money withoutTrailingZeros data={price!} />
              </span>
            )}
          </div>
        </div>
      </Link>

      {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-3 w-full py-2 rounded-full bg-gray-900 text-white hover:bg-brand-red transition-colors text-sm font-semibold"
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-3 w-full py-2 rounded-full text-sm" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )}
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
