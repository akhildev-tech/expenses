import type { LoaderFunction } from '@remix-run/node';
import { getExpenses } from '~/data/expense.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const loader: LoaderFunction = async (): Promise<ExpenseInterface[]> => {
  const expenses = await getExpenses();

  if (!expenses || !expenses.length === 0) return json;

  return expenses;
};
