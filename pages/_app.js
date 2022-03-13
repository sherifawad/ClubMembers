import { Provider } from "react-redux";
import MainLayout from "../layout/mainlayout";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";
import { useStore } from "../StoreRedux/store";

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const persister = persistStore(store, {}, function () {
		persister.persist();
	});
	return (
		<Provider store={store}>
			<PersistGate loading={<div>loading</div>} persistor={persister}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
