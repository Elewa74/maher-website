import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LocaleRedirect() {
  const requestHeaders = await headers();
  const preferred = requestHeaders.get('accept-language')?.toLowerCase() ?? '';
  redirect(preferred.startsWith('ar') ? '/ar' : '/en');
}
