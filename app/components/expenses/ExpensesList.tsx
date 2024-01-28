import { ExpenseListInterface } from '~/shared/interfaces';
import ExpenseListItem from './ExpenseListItem';

export default function ExpensesList({ expenses }: ExpenseListInterface) {
  return (
    <ol id='expenses-list'>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}
