import type { MetaFunction } from '@remix-run/node';
import PricingPlan from '~/components/marketing/PricingPlan';
import { PRICING_PLANS } from '~/shared/constants';
import { HandleInterface } from '~/shared/interfaces';

export const meta: MetaFunction = () => [{ title: 'Pricing' }];

export default function PricingPage() {
  return (
    <main id='pricing'>
      <h2>Great Product, Simple Pricing</h2>
      <ol id='pricing-plans'>
        {PRICING_PLANS.map((plan) => (
          <li key={plan.id} className='plan'>
            <PricingPlan
              id={plan.id}
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </main>
  );
}

export const handle: HandleInterface = { disableJS: true };
