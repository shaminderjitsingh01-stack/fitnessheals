import {useFetcher, useLocation, useRouteLoaderData} from '@remix-run/react';
import {useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import clsx from 'clsx';
import type {CartBuyerIdentityInput} from '@shopify/hydrogen/storefront-api-types';
import {CartForm} from '@shopify/hydrogen';

import {IconCheck} from '~/components/Icon';
import type {Localizations, Locale} from '~/lib/type';
import {DEFAULT_LOCALE} from '~/lib/utils';
import type {RootLoader} from '~/root';

export function CountrySelector() {
  const fetcher = useFetcher();
  const closeRef = useRef<HTMLDetailsElement>(null);
  const rootData = useRouteLoaderData<RootLoader>('root');
  const selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  const {pathname, search} = useLocation();
  const pathWithoutLocale = `${pathname.replace(
    selectedLocale.pathPrefix,
    '',
  )}${search}`;

  const countries = (fetcher.data ?? {}) as Localizations;
  const defaultLocale = countries?.['default'];
  const defaultLocalePrefix = defaultLocale
    ? `${defaultLocale?.language}-${defaultLocale?.country}`
    : '';

  const {ref, inView} = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const observerRef = useRef(null);
  useEffect(() => {
    ref(observerRef.current);
  }, [ref, observerRef]);

  // Get available countries list when in view
  useEffect(() => {
    if (!inView || fetcher.data || fetcher.state === 'loading') return;
    fetcher.load('/api/countries');
  }, [inView, fetcher]);

  const closeDropdown = useCallback(() => {
    closeRef.current?.removeAttribute('open');
  }, []);

  return (
    <div
      ref={observerRef}
      className="relative"
      onMouseLeave={closeDropdown}
    >
      <details
        className="group"
        ref={closeRef}
      >
        <summary className="flex items-center gap-2 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors border border-white/20 list-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-300 whitespace-nowrap">{selectedLocale.label}</span>
          <svg className="w-3 h-3 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="absolute right-0 bottom-full mb-2 w-56 max-h-64 overflow-auto bg-gray-900 border border-gray-600 rounded-lg shadow-xl z-50">
          {countries &&
            Object.keys(countries).map((countryPath) => {
              const countryLocale = countries[countryPath];
              const isSelected =
                countryLocale.language === selectedLocale.language &&
                countryLocale.country === selectedLocale.country;

              const countryUrlPath = getCountryUrlPath({
                countryLocale,
                defaultLocalePrefix,
                pathWithoutLocale,
              });

              return (
                <Country
                  key={countryPath}
                  closeDropdown={closeDropdown}
                  countryUrlPath={countryUrlPath}
                  isSelected={isSelected}
                  countryLocale={countryLocale}
                />
              );
            })}
        </div>
      </details>
    </div>
  );
}

function Country({
  closeDropdown,
  countryLocale,
  countryUrlPath,
  isSelected,
}: {
  closeDropdown: () => void;
  countryLocale: Locale;
  countryUrlPath: string;
  isSelected: boolean;
}) {
  return (
    <ChangeLocaleForm
      key={countryLocale.country}
      redirectTo={countryUrlPath}
      buyerIdentity={{
        countryCode: countryLocale.country,
      }}
    >
      <button
        type="submit"
        onClick={closeDropdown}
        className={clsx(
          'w-full px-4 py-2 text-left text-sm flex items-center justify-between transition-colors',
          isSelected
            ? 'bg-brand-red/20 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        )}
      >
        <span>{countryLocale.label}</span>
        {isSelected && (
          <IconCheck className="w-4 h-4 text-brand-red" />
        )}
      </button>
    </ChangeLocaleForm>
  );
}

function ChangeLocaleForm({
  children,
  buyerIdentity,
  redirectTo,
}: {
  children: React.ReactNode;
  buyerIdentity: CartBuyerIdentityInput;
  redirectTo: string;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.BuyerIdentityUpdate}
      inputs={{
        buyerIdentity,
      }}
    >
      <>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        {children}
      </>
    </CartForm>
  );
}

function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = '';
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;

  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}
