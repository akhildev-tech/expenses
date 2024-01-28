import {
  type ActionFunction,
  type ActionFunctionArgs,
  type LinksFunction,
  type MetaFunction,
} from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
import { validateUserInput } from '~/data/validation.server';
import { UnauthorizedError, UnprocessableEntityError } from '~/shared/errors';
import { UserInterface } from '~/shared/interfaces';
import styles from '~/styles/auth.css';

export const meta: MetaFunction = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const authMode = queryParams.get('mode');
  const title = authMode === 'login' ? 'Login' : 'Signup';

  return [{ title }];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function AuthPage() {
  return <AuthForm />;
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const user = Object.fromEntries(formData) as unknown as UserInterface;

  try {
    validateUserInput(user);
  } catch (error) {
    console.error(error);
    return error;
  }

  try {
    return authMode === 'login' ? login(user) : signup(user);
  } catch (error) {
    if (error instanceof UnprocessableEntityError) {
      return { message: error.message };
    } else if (error instanceof UnauthorizedError) {
      return { message: error.message };
    }

    console.error(error);
    throw error;
  }
};
