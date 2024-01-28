import { createCookieSessionStorage, redirect } from '@remix-run/node';
import bcrypt from 'bcryptjs';
import { UnauthorizedError, UnprocessableEntityError } from '~/shared/errors';
import { UserInterface } from '~/shared/interfaces';
import { prisma } from './database.server';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET as string],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

const createUserSession = async (id: string, redirectPath: string) => {
  const session = await sessionStorage.getSession();
  session.set('id', id);

  return redirect(redirectPath, {
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
  });
};

export const getUserFromSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);

  const id = session.get('id');
  return id || null;
};

export const destroyUserSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);

  return redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) },
  });
};

export const requireUserSession = async (request: Request) => {
  const id = await getUserFromSession(request);
  if (!id) throw redirect('/auth?mode=login');

  return id;
};

export const signup = async ({ email, password }: UserInterface) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new UnprocessableEntityError(
      `A user with email id ${email} already exists`
    );
  }

  // Hashing the user password
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });

  return createUserSession(user.id, '/expenses');
};
export const login = async ({ email, password }: UserInterface) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    throw new UnauthorizedError('Login failed! Please check your email');
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Login failed! Please check your password');
  }

  return createUserSession(existingUser.id, '/expenses');
};
