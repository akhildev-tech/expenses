import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useParams,
} from '@remix-run/react';
import { ReactNode } from 'react';
import { ExpenseInterface } from '~/shared/interfaces';

export default function ExpenseForm() {
  const navigation = useNavigation();
  const params = useParams();
  const expense: ExpenseInterface = useLoaderData();
  const validationErrors = useActionData() as unknown as ReactNode;

  const today = new Date().toISOString().slice(0, 10);
  const isSubmitting = navigation.state !== 'idle';
  if (params.id && !expense) return <p>Invalid expense id.</p>;

  return (
    <Form
      method={expense ? 'PATCH' : 'POST'}
      className='form'
      id='expense-form'
    >
      <p>
        <label htmlFor='title'>Expense Title</label>
        <input
          type='text'
          id='title'
          name='title'
          required
          maxLength={30}
          defaultValue={expense?.title || ''}
        />
      </p>

      <div className='form-row'>
        <p>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            id='amount'
            name='amount'
            min='0'
            step='0.01'
            required
            defaultValue={expense?.amount || ''}
          />
        </p>
        <p>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            name='date'
            max={today}
            required
            defaultValue={
              expense?.date ? (expense.date as string).slice(0, 10) : ''
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to='..'>Cancel</Link>
      </div>
    </Form>
  );
}
