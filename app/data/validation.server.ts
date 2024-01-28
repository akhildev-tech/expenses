import { ExpenseInterface, UserInterface } from '~/shared/interfaces';

const isValidTitle = (value: string) => {
  return value && value.trim().length > 0 && value.trim().length <= 30;
};

const isValidAmount = (value: number) => {
  const amount = parseFloat(value.toString());
  return !isNaN(amount) && amount > 0;
};

const isValidDate = (value: string) => {
  return value && new Date(value).getTime() < new Date().getTime();
};

const isValidEmail = (value: string) => {
  return (
    value &&
    value.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
};

const isValidPassword = (value: string) => {
  return (
    value &&
    value.trim().length > 0 &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value.trim())
  );
};

export const validateExpenseInput = (expense: ExpenseInterface) => {
  const validationErrors: { title?: string; amount?: string; date?: string } =
    {};

  if (!isValidTitle(expense.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.';
  }

  if (!isValidAmount(expense.amount)) {
    validationErrors.amount =
      'Invalid amount. Must be a number greater than zero.';
  }

  if (!isValidDate(expense.date as string)) {
    validationErrors.date = 'Invalid date. Must be a date before today.';
  }

  if (Object.keys(validationErrors).length > 0) throw validationErrors;
};

export const validateUserInput = (user: UserInterface) => {
  const validationErrors: { email?: string; passsword?: string } = {};

  if (!isValidEmail(user.email)) {
    validationErrors.email = 'Invalid email address.';
  }

  if (!isValidPassword(user.password)) {
    validationErrors.passsword = 'Invalid password';
  }

  if (Object.keys(validationErrors).length > 0) throw validationErrors;
};
