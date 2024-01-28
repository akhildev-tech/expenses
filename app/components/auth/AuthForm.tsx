import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { ReactNode } from 'react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const validationErrors = useActionData() as unknown as ReactNode;

  const authMode = searchParams.get('mode') || 'login';
  const isLoginMode = authMode === 'login';
  const submitButtonText = isLoginMode ? 'Login' : 'Create User';
  const toggleButtonText = isLoginMode
    ? 'Create a new user'
    : 'Login with exising user';

  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form method='POST' className='form' id='auth-form'>
      <div className='icon-img'>
        {isLoginMode ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor='email'>Email Address</label>
        <input type='email' id='email' name='email' required />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' minLength={8} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitButtonText}
        </button>
        <Link to={isLoginMode ? '?mode=signup' : '?mode=login'}>
          {toggleButtonText}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
