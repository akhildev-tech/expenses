import type {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from '~/data/auth.server';
import styles from '~/styles/marketing.css';

export const meta: MetaFunction = () => [{ title: 'Expenses App' }];

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function MarketingLayoutPage() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  return getUserFromSession(request);
};
