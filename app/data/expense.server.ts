import { ExpenseInterface } from '~/shared/interfaces';
import { prisma } from './database.server';

export const addExpense = async (expense: ExpenseInterface, userId: string) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expense.title,
        amount: Number(expense.amount),
        date: new Date(expense.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error adding expense ${expense.title}`);
  }
};

export const getExpenses = async (
  userId: string
): Promise<ExpenseInterface[]> => {
  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting expenses`);
  }
};

export const getExpense = async (
  id: string,
  userId: string
): Promise<ExpenseInterface | null> => {
  try {
    return await prisma.expense.findFirst({ where: { id, userId } });
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting expense ${id}`);
  }
};

export const updateExpense = async (
  id: string,
  userId: string,
  expense: ExpenseInterface
): Promise<void> => {
  try {
    await prisma.expense.update({
      where: { id, userId },
      data: {
        title: expense.title,
        amount: Number(expense.amount),
        date: new Date(expense.date),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating expense ${id}`);
  }
};

export const deleteExpense = async (
  id: string,
  userId: string
): Promise<void> => {
  try {
    await prisma.expense.delete({ where: { id, userId } });
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting expense ${id}`);
  }
};
