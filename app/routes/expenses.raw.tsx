import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expense.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<ExpenseInterface[]> => {
  const userId = await requireUserSession(request);

  return getExpenses(userId);
};
