import { IconType } from 'react-icons/lib';

export interface ExpenseInterface {
  id: string;
  title: string;
  amount: number;
  date: Date | string;
  dateAdded: Date | string;
}

export interface ExpenseListInterface {
  expenses: ExpenseInterface[];
}

export interface PricingInterface {
  id: string;
  title: string;
  price: string;
  perks: string[];
  icon: IconType;
}

export interface ModalInterface {
  children: JSX.Element;
  onClose: () => void;
}

export interface UserInterface {
  email: string;
  password: string;
}

export interface HandleInterface {
  disableJS: boolean;
}
