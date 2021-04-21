import { LunaticIDBSuggester } from "lunatic-suggester";

function Unmocked() {
  return <div>Composant Lunatic.</div>;
}

function SuggesterWithLabel({ labelId, label, storeInfo, className }) {
  const { optionRenderer, labelRenderer, store } = storeInfo;
  const { name } = store;
  return (
    <>
      <div id={labelId}>{label}</div>
      <LunaticIDBSuggester
        storeName={name}
        optionRenderer={optionRenderer}
        labelRenderer={labelRenderer}
        labelledBy={labelId}
        className={className}
      />
    </>
  );
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
          const { storeName, label, className } = component;
          const storeInfo = getStoreInfo(storeName);
          const labelId = `lunatic-label-${storeName}`;
          return [
            ...a,
            <SuggesterWithLabel
              key={`orchestrateur-IdbSuggester-${storeName}`}
              storeInfo={storeInfo}
              label={label}
              labelId={labelId}
              className={className}
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
