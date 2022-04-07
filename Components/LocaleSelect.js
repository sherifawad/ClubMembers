import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectSettingsLanguage,
	setLanguage
} from "../StoreRedux/settingsSlice";

const LocaleSelect = () => {
	const [lang, setLang] = useState("");
	const { push, pathname, asPath } = useRouter();
	const language = useSelector(selectSettingsLanguage);
	console.log(
		"🚀 ~ file: LocaleSelect.js ~ line 12 ~ LocaleSelect ~ language",
		language
	);
	const dispatch = useDispatch();
	const changeLanguage = e => {
		const locale = e.target.value;
		setLang(locale);
	};

	useEffect(() => {
		const locale = lang || language;
		setLang(locale);
		dispatch(setLanguage(locale));
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "en" ? "ltr" : "rtl";

		push(pathname, asPath, { locale });
	}, [lang, language]);

	return (
		<select
			style={{
				width: "6ch",
				backgroundColor: "transparent",
				border: "none"
			}}
			onChange={changeLanguage}
			defaultValue={lang || language}
		>
			<option className="text-black" value="en">
				EN
			</option>
			<option className="text-black" value="ar">
				Ar
			</option>
		</select>
	);
};

export default LocaleSelect;
