import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import { ReactNode } from 'react';
import sharedStyles from '~/styles/shared.css';
import Error from './components/util/Error';
import { HandleInterface } from './shared/interfaces';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: sharedStyles },
];

const Document = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const matches = useMatches();
  const disableJS = matches.some(
    (match) => (match.handle as HandleInterface)?.disableJS
  );

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <Links />
        {title && <title>{title}</title>}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document title='Home'>
      <Outlet />
    </Document>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  let title: string, message: string;

  if (isRouteErrorResponse(error)) {
    title = error?.statusText;
    message = error?.data?.message;
  } else {
    title = 'An error occured';
    message = (error as Error)?.message;
  }

  return (
    <Document title={title}>
      <main>
        <Error title={title}>
          <p>{message || 'Something went wrong!'}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
};
