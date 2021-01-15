import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';

export interface PageProps {
  title?: string | string[] | null | undefined
  children: ReactNode
}

export default function Page({ title, children }: PageProps): ReactElement {
  const displayTitle = [
      ...(Array.isArray(title) ? title : [title]), // If the passed page title is an array, join them all
      `Ignite Seattle` // All titles include "Ignite Seattle"
    ]
      .filter(Boolean) // Remove empty elements
      .join(` - `); // Join title parts together

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
      </Head>
      {children}
    </>
  )
}
