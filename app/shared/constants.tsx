import { FaHandshake, FaTrophy } from 'react-icons/fa';
import { ExpenseInterface, PricingInterface } from './interfaces';

export const DUMMY_EXPENSES: ExpenseInterface[] = [
  {
    id: 'e1',
    title: 'iPhone',
    amount: 100000,
    date: new Date(),
    dateAdded: new Date(),
  },
  {
    id: 'e2',
    title: 'Airpods',
    amount: 20000,
    date: new Date(),
    dateAdded: new Date(),
  },
];

export const PRICING_PLANS: PricingInterface[] = [
  {
    id: 'p1',
    title: 'Basic',
    price: 'Free forever',
    perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
    icon: FaHandshake,
  },
  {
    id: 'p2',
    title: 'Pro',
    price: '$9.99/month',
    perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
    icon: FaTrophy,
  },
];
