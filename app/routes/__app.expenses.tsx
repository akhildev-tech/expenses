import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expense.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const meta: MetaFunction = () => [{ title: 'Expenses' }];

export default function ExpensesLayoutPage() {
  const expenses: ExpenseInterface[] = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id='expenses-actions'>
          <Link to='add'>
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href='/expenses/raw' target='_blank'>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id='no-expenses'>
            <h1>No expenses found</h1>
            <p>
              Start <Link to='add'>adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<ExpenseInterface[]> => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return expenses;
};
