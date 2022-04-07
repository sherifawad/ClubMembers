import { Provider, useSelector } from "react-redux";
import MainLayout from "../layout/mainlayout";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";
import { useStore } from "../StoreRedux/store";
import { NextIntlProvider } from "next-intl";
import { selectSettingsLanguage } from "../StoreRedux/settingsSlice";
import { IntlProvider } from "../hooks/intl";

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const persister = persistStore(store, {}, function () {
		persister.persist();
	});
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<NextIntlProvider messages={pageProps.messages}>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</NextIntlProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
