import AppWrapper from "components/AppWrapper/AppWrapper";

import ApiServer from "api/requests/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { LOACLES } from "constants/GlobalParams";

export function generateStaticParams() {
  return LOACLES.map((locale) => ({ locale }));
}
async function init(lang = "he") {
  const payload = { lang };
  const res = await ApiServer.init({ payload });
  const json = await res.json();

  return json;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const json = await init(locale);
  const body = json.body;

  return (
    <AppWrapper color="site" data={body} className="rtl">
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
