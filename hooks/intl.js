import { useMemo } from "react";
import { useRouter } from "next/router";
import { NextIntlProvider } from "next-intl";

import { useSelector } from "react-redux";
import { selectSettingsLanguage } from "../StoreRedux/settingsSlice";
import allMessages from "../translations";

export function IntlProvider(props) {
	const language = useSelector(selectSettingsLanguage);
	const messages = useMemo(() => allMessages[language], [language]);

	return (
		<NextIntlProvider locale={language} messages={messages} {...props} />
	);
}
