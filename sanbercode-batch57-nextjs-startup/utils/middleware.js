import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = new URL(request.url);
  const isCookiesExist = !!request.Cookies.get('token');
  const isLoginPage = pathname.startsWith('/login');

  if (!isCookiesExist && !isLoginPage) {
    return NextResponse.redirect('/login');
  }
  if (isCookiesExist && isLoginPage) {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}

