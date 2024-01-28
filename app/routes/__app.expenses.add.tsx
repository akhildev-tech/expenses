import type {
  ActionFunction,
  ActionFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { redirect, useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { requireUserSession } from '~/data/auth.server';
import { addExpense } from '~/data/expense.server';
import { validateExpenseInput } from '~/data/validation.server';
import { ExpenseInterface } from '~/shared/interfaces';

export const meta: MetaFunction = () => [{ title: 'Add Expense' }];

export default function AddExpensesPage() {
  const navigate = useNavigate();
  const closeHandler = () => navigate('..');

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(
    formData
  ) as unknown as ExpenseInterface;

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/expenses');
};
