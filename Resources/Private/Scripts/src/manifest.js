import manifest from "@neos-project/neos-ui-extensibility";
import ArrayInfoEditor from "./ArrayInfoEditor";

manifest('UpAssist.Neos.Editors.ArrayInfoEditor', {}, (globalRegistry) => {
	const editorsRegistry = globalRegistry.get('inspector').get('editors');
	editorsRegistry.set("UpAssist.Neos.Editors/Inspector/Editors/ArrayInfoEditor", {
		component: ArrayInfoEditor,
	});
});
