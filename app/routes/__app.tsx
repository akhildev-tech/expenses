import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import styles from '~/styles/expenses.css';

export const meta: MetaFunction = () => [{ title: 'Expenses App Layout Page' }];

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function ExpensesAppLayoutPage() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
