import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { redirect, useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { requireUserSession } from '~/data/auth.server';
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from '~/data/expense.server';
import { validateExpenseInput } from '~/data/validation.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const meta: MetaFunction = ({ data }) => {
  const title =
    `Update ${(data as ExpenseInterface)?.title} Expense` || 'Update Expense';

  return [{ title }];
};

export default function ExpensesPage() {
  const navigate = useNavigate();
  const closeHandler = () => navigate('..');

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs): Promise<ExpenseInterface | null> => {
  const userId = await requireUserSession(request);

  const expense = await getExpense(params.id as string, userId);
  return expense;
};

export const action: ActionFunction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const userId = await requireUserSession(request);

  const id = params.id as string;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(
      formData
    ) as unknown as ExpenseInterface;

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(id, userId, expenseData);
  } else if (request.method === 'DELETE') {
    await deleteExpense(id, userId);
  }

  return redirect('/expenses');
};
