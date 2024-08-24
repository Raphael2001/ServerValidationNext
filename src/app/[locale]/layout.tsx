import AppWrapper from "components/AppWrapper/AppWrapper";

import ApiServer from "api/requests/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { LOACLES } from "constants/GlobalParams";

export function generateStaticParams() {
  return LOACLES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <AppWrapper color="site" className="rtl">
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
