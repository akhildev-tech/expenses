import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

export default function MainHeader() {
  const id = useLoaderData();

  return (
    <header id='main-header'>
      <Logo />
      <nav id='main-nav'>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/pricing'>Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id='cta-nav'>
        <ul>
          <li>
            {id ? (
              <Form method='POST' action='/logout' id='logout-form'>
                <button className='cta-alt'>Logout</button>
              </Form>
            ) : (
              <Link to='/auth?mode=login' className='cta'>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
