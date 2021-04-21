import { LunaticIDBSuggester } from "lunatic-suggester";

function Unmocked() {
  return <div>Composant Lunatic.</div>;
}

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
        return [...a, <Unmocked key={index} />];
      }, []);
    }
    return [];
  };
}

export default create;
