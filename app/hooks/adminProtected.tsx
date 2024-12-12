'use client';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
interface ProtectedProps {
  children: ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const user = useSelector((state: any) => state.auth.user);
  if (user.role !== 'admin'|| !user) {
    redirect('/');
  }
  return <>{children}</>;
}
