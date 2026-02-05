import type {SyntheticEvent} from 'react';
import {useMemo, useState} from 'react';
import {Menu, Disclosure} from '@headlessui/react';
import type {Location} from '@remix-run/react';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from '@remix-run/react';
import useDebounce from 'react-use/esm/useDebounce';
import type {
  Filter,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';

import {Heading, Text} from '~/components/Text';
import {IconFilters, IconCaret, IconXMark} from '~/components/Icon';

export type AppliedFilter = {
  label: string;
  filter: ProductFilter;
};

export type SortParam =
  | 'price-low-high'
  | 'price-high-low'
  | 'best-selling'
  | 'newest'
  | 'featured';

type Props = {
  filters: Filter[];
  appliedFilters?: AppliedFilter[];
  children: React.ReactNode;
  collections?: Array<{handle: string; title: string}>;
};
export const FILTER_URL_PREFIX = 'filter.';

export function SortFilter({
  filters,
  appliedFilters = [],
  children,
  collections = [],
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center gap-2 w-full px-4 py-3 bg-white rounded-lg border border-gray-200 mb-4"
        >
          <IconFilters />
          <span className="font-semibold">Filters</span>
          <IconCaret direction={isOpen ? 'up' : 'down'} />
        </button>

        {/* Filter Content */}
        <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              {appliedFilters.length > 0 && (
                <Link
                  to={useLocation().pathname}
                  className="text-sm text-brand-red hover:underline"
                >
                  Clear all
                </Link>
              )}
            </div>

            {/* Applied Filters */}
            {appliedFilters.length > 0 && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-500 mb-3">Active Filters</p>
                <div className="flex flex-wrap gap-2">
                  <AppliedFilters filters={appliedFilters} />
                </div>
              </div>
            )}

            {/* Filter Groups */}
            <FiltersDrawer filters={filters} appliedFilters={appliedFilters} />
          </div>
        </div>
      </div>

      {/* Products Area */}
      <div className="flex-1">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing products
          </p>
          <SortMenu />
        </div>
        {children}
      </div>
    </div>
  );
}

export function FiltersDrawer({
  filters = [],
  appliedFilters = [],
}: Omit<Props, 'children'>) {
  const [params] = useSearchParams();
  const location = useLocation();

  const filterMarkup = (filter: Filter, option: Filter['values'][0]) => {
    switch (filter.type) {
      case 'PRICE_RANGE':
        const priceFilter = params.get(`${FILTER_URL_PREFIX}price`);
        const price = priceFilter
          ? (JSON.parse(priceFilter) as ProductFilter['price'])
          : undefined;
        const min = isNaN(Number(price?.min)) ? undefined : Number(price?.min);
        const max = isNaN(Number(price?.max)) ? undefined : Number(price?.max);

        return <PriceRangeFilter min={min} max={max} />;

      default:
        const to = getFilterLink(option.input as string, params, location);
        const isActive = appliedFilters.some(
          (af) => JSON.stringify(af.filter) === option.input
        );
        return (
          <Link
            className={`flex items-center gap-2 text-sm py-1.5 transition-colors ${
              isActive
                ? 'text-brand-red font-semibold'
                : 'text-gray-700 hover:text-brand-red'
            }`}
            prefetch="intent"
            to={to}
          >
            <span className={`w-4 h-4 rounded border flex items-center justify-center ${
              isActive ? 'bg-brand-red border-brand-red' : 'border-gray-300'
            }`}>
              {isActive && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span className="text-gray-400 text-xs">({option.count})</span>
            )}
          </Link>
        );
    }
  };

  return (
    <div className="space-y-1">
      {filters.map((filter: Filter) => (
        <Disclosure as="div" key={filter.id} defaultOpen={true}>
          {({open}) => (
            <>
              <Disclosure.Button className="flex justify-between items-center w-full py-3 text-left">
                <span className="font-semibold text-gray-900">{filter.label}</span>
                <IconCaret direction={open ? 'up' : 'down'} />
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="pb-4 space-y-1">
                  {filter.values?.map((option) => (
                    <div key={option.id}>
                      {filterMarkup(filter, option)}
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

function AppliedFilters({filters = []}: {filters: AppliedFilter[]}) {
  const [params] = useSearchParams();
  const location = useLocation();
  return (
    <>
      {filters.map((filter: AppliedFilter) => {
        return (
          <Link
            to={getAppliedFilterLink(filter, params, location)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-brand-red/10 text-brand-red text-sm rounded-full hover:bg-brand-red/20 transition-colors"
            key={`${filter.label}-${JSON.stringify(filter.filter)}`}
          >
            <span>{filter.label}</span>
            <IconXMark className="w-3 h-3" />
          </Link>
        );
      })}
    </>
  );
}

function getAppliedFilterLink(
  filter: AppliedFilter,
  params: URLSearchParams,
  location: Location,
) {
  const paramsClone = new URLSearchParams(params);
  Object.entries(filter.filter).forEach(([key, value]) => {
    const fullKey = FILTER_URL_PREFIX + key;
    paramsClone.delete(fullKey, JSON.stringify(value));
  });
  paramsClone.delete('cursor');
  paramsClone.delete('direction');
  return `${location.pathname}?${paramsClone.toString()}`;
}

function getSortLink(
  sort: SortParam,
  params: URLSearchParams,
  location: Location,
) {
  params.set('sort', sort);
  params.delete('cursor');
  params.delete('direction');
  return `${location.pathname}?${params.toString()}`;
}

function getFilterLink(
  rawInput: string | ProductFilter,
  params: URLSearchParams,
  location: ReturnType<typeof useLocation>,
) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(rawInput, paramsClone);
  newParams.delete('cursor');
  newParams.delete('direction');
  return `${location.pathname}?${newParams.toString()}`;
}

const PRICE_RANGE_FILTER_DEBOUNCE = 500;

function PriceRangeFilter({max, min}: {max?: number; min?: number}) {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useDebounce(
    () => {
      if (minPrice === undefined && maxPrice === undefined) {
        params.delete(`${FILTER_URL_PREFIX}price`);
        navigate(`${location.pathname}?${params.toString()}`);
        return;
      }

      const price = {
        ...(minPrice === undefined ? {} : {min: minPrice}),
        ...(maxPrice === undefined ? {} : {max: maxPrice}),
      };
      const newParams = filterInputToParams({price}, params);
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice],
  );

  const onChangeMax = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const newMaxPrice = Number.isNaN(parseFloat(value))
      ? undefined
      : parseFloat(value);
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const newMinPrice = Number.isNaN(parseFloat(value))
      ? undefined
      : parseFloat(value);
    setMinPrice(newMinPrice);
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 w-12">Min</label>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            name="minPrice"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
            type="number"
            value={minPrice ?? ''}
            placeholder="0"
            onChange={onChangeMin}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 w-12">Max</label>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            name="maxPrice"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
            type="number"
            value={maxPrice ?? ''}
            placeholder="999"
            onChange={onChangeMax}
          />
        </div>
      </div>
    </div>
  );
}

function filterInputToParams(
  rawInput: string | ProductFilter,
  params: URLSearchParams,
) {
  const input =
    typeof rawInput === 'string'
      ? (JSON.parse(rawInput) as ProductFilter)
      : rawInput;

  Object.entries(input).forEach(([key, value]) => {
    if (params.has(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value))) {
      return;
    }
    if (key === 'price') {
      // For price, we want to overwrite
      params.set(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    } else {
      params.append(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    }
  });

  return params;
}

export default function SortMenu() {
  const items: {label: string; key: SortParam}[] = [
    {label: 'Featured', key: 'featured'},
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get('sort'));

  return (
    <Menu as="div" className="relative z-40">
      <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
        <span className="text-sm">
          <span className="text-gray-500">Sort:</span>{' '}
          <span className="font-medium text-gray-900">{(activeItem || items[0]).label}</span>
        </span>
        <IconCaret />
      </Menu.Button>

      <Menu.Items
        as="nav"
        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            {({active}) => (
              <Link
                className={`block px-4 py-2 text-sm ${
                  activeItem?.key === item.key
                    ? 'bg-brand-red/10 text-brand-red font-semibold'
                    : active
                      ? 'bg-gray-50 text-gray-900'
                      : 'text-gray-700'
                }`}
                to={getSortLink(item.key, params, location)}
              >
                {item.label}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
