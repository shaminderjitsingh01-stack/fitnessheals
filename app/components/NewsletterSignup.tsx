import {useFetcher} from '@remix-run/react';
import {useEffect, useRef} from 'react';

export function NewsletterSignup() {
  const fetcher = useFetcher<{success?: boolean; message?: string; error?: string}>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = fetcher.state !== 'idle';
  const isSuccess = fetcher.data?.success === true;
  const error = fetcher.data?.error;

  useEffect(() => {
    if (isSuccess && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [isSuccess]);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-brand-dark to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
          <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-white/80 text-sm font-medium">Get Exclusive Offers</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Stay in the <span className="text-brand-red">Game</span>
        </h2>
        <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
          Get exclusive deals, training tips, and early access to new gear. No spam, just gains.
        </p>

        {isSuccess ? (
          <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-8 py-6 rounded-2xl inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">{fetcher.data?.message}</span>
          </div>
        ) : (
          <>
            <fetcher.Form
              method="post"
              action="/api/newsletter"
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-red focus:bg-white/15 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-brand-orange transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-brand-red/25 whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </fetcher.Form>
            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}
          </>
        )}

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Unsubscribe Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Early Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
