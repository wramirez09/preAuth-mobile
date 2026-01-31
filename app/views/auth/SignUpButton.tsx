import { createApiUrl } from '@/app/utils';
import { Button, ButtonText } from '@gluestack-ui/themed';
import * as React from 'react';
import { Linking } from 'react-native';


interface SubscribeButtonProps {
  email: string;
  name: string;
  disabled: boolean;
}

export function SubscribeButton({ email, disabled, name }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubscribe = async () => {
    if (isLoading) return;

    setIsLoading(true);
    console.log({url: createApiUrl('/api/stripe/create-checkout-session')})
    try {
      const res = await fetch(createApiUrl('api/stripe/create-checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flatPriceId: process.env.NEXT_PUBLIC_STRIPE_FLAT_PRICE_ID,
          meteredPriceId: process.env.NEXT_PUBLIC_STRIPE_METERED_PRICE_ID,
          email,
          name,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.url) {
        await Linking.openURL(data.url);
      } else {
        throw new Error('No URL returned from server');
      }
    } catch (err: unknown) {
      console.error('Subscription error:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onPress={handleSubscribe}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      size="md"
      className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm mb-6"
    >
      <ButtonText>{isLoading ? 'Processing...' : 'Subscribe'}</ButtonText>
    </Button>
  );
}