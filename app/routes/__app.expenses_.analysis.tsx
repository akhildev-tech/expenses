import {
  LoaderFunctionArgs,
  json,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import Chart from '~/components/expenses/Chart';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expense.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const meta: MetaFunction = () => [{ title: 'Expenses Analysis' }];

export default function ExpensesAnalysisPage() {
  const expenses: ExpenseInterface[] = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<ExpenseInterface[]> => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'No expenses found for the requested analysis' },
      { status: 404, statusText: 'No expenses found' }
    );
  }

  return expenses;
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  let title: string, message: string;

  if (isRouteErrorResponse(error)) {
    title = error?.statusText;
    message = error?.data?.message;
  } else {
    title = 'An error occured';
    message = (error as Error)?.message;
  }

  return (
    <main>
      <Error title={title}>
        <p>{message || 'Something went wrong!'}</p>
      </Error>
    </main>
  );
};
