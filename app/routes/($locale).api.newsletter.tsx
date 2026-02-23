import {type ActionFunctionArgs, json} from '@shopify/remix-oxygen';

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function action({request, context}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({error: 'Please enter a valid email address.'}, {status: 400});
  }

  try {
    const {customerCreate} = await context.storefront.mutate(
      CUSTOMER_CREATE_MUTATION,
      {
        variables: {
          input: {
            email,
            acceptsMarketing: true,
            password: crypto.randomUUID(),
          },
        },
      },
    );

    const errors = customerCreate?.customerUserErrors;

    if (errors?.length) {
      const alreadyExists = errors.some(
        (e: {code: string}) => e.code === 'TAKEN' || e.code === 'CUSTOMER_DISABLED',
      );

      if (alreadyExists) {
        return json({
          success: true,
          message: "You're already subscribed! Stay tuned for updates.",
        });
      }

      return json(
        {error: errors[0].message || 'Something went wrong. Please try again.'},
        {status: 400},
      );
    }

    return json({
      success: true,
      message: "You're in! Check your inbox for a welcome gift.",
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500},
    );
  }
}
