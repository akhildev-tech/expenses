import { Link, useFetcher } from '@remix-run/react';
import { ExpenseInterface } from '~/shared/interfaces';

export default function ExpenseListItem({
  id,
  title,
  amount,
}: Partial<ExpenseInterface>) {
  const fetcher = useFetcher();

  const deleteExpenseItemHandler = () => {
    const proceed = confirm('Are you sure you want to delete this item?');
    if (!proceed) return;

    fetcher.submit(null, { method: 'DELETE', action: `/expenses/${id}` });
  };

  if (fetcher.state !== 'idle') {
    return (
      <article className='expense-item locked'>
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className='expense-item'>
      <div>
        <h2 className='expense-title'>{title}</h2>
        <p className='expense-amount'>₹{(amount as number).toFixed(2)}</p>
      </div>
      <menu className='expense-actions'>
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id as string}>Edit</Link>
      </menu>
    </article>
  );
}
