import React from "react";
import LoadStore from "./load-store";
import getStoreInfo from "./get-store-info";

function LoadStores({ jsonLunatic = {} }) {
  const { suggesters } = jsonLunatic;
  if (Array.isArray(suggesters)) {
    const content = suggesters.map(function (name) {
      const storeInfo = getStoreInfo(name);

      if (storeInfo) {
        const { store, fetch } = storeInfo;
        const { name } = store;
        return (
          <LoadStore
            key={`idb-loader-${name}`}
            store={store}
            idbVersion="1"
            fetch={fetch}
          />
        );
      }
      return undefined;
    });
    return <>{content}</>;
  }
  return <></>;
}

export default LoadStores;
