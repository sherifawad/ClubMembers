import React, { useState } from "react";
import { capitalize } from "../Data/utils";

const withEditableResources = (Component, resourceName) => {
	// eslint-disable-next-line react/display-name
	return props => {
		const [originalData, setOriginalData] = useState(null);
		const [data, setData] = useState(null);

		const onChange = changes => {
			setData({ ...data, ...changes });
		};

		const onSave = () => {
			let result;
			setOriginalData(result);
			setData(result);
		};

		const onReset = () => {
			setData(originalData);
		};

		const resourceProps = {
			[resourceName]: data,
			[`onChange${capitalize(resourceName)}`]: onChange,
			[`onSave${capitalize(resourceName)}`]: onSave,
			[`onReset${capitalize(resourceName)}`]: onReset
		};

		return <Component {...props} {...resourceProps} />;
	};
};

withEditableResources.displayName = "withEditableResources";
export default withEditableResources;
