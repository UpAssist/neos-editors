import manifest from "@neos-project/neos-ui-extensibility";
import ArrayInfoEditor from "./ArrayInfoEditor";

manifest('UpAssist.ArrayInfoEditor', {}, (globalRegistry) => {
	const editorsRegistry = globalRegistry.get('inspector').get('editors');
	editorsRegistry.set("UpAssist/ArrayInfoEditor", {
		component: ArrayInfoEditor,
	});
});
