import { LunaticIDBSuggester } from "lunatic-suggester";

/**
 * getStoreInfo : une fonction, fourni par l'intégrateur lunatique. Elle permet à l'ochestrateur d'indiquer au suggester
 * les quelques éléments nécessaires à son instanciation et spécifique à l'application.
 * @param {*} getStoreInfo
 * @returns
 */
function create(getStoreInfo) {
  return function (json) {
    const { components } = json;
    if (components) {
      return components.reduce(function (a, component, index) {
        const { componentType } = component;
        if (componentType === "IdbSuggester") {
          const { storeName } = component;
          const { optionRenderer, labelRenderer } = getStoreInfo(storeName);
          console.log(storeName);
          return [
            ...a,
            <LunaticIDBSuggester
              key={`orchestrateur-${index + 1}`}
              storeName={storeName}
              optionRenderer={optionRenderer}
              labelRenderer={labelRenderer}
            />,
          ];
        }
        return a;
      }, []);
    }
    return [];
  };
}

export default create;
