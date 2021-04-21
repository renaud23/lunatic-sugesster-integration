import React, { useState, useEffect } from "react";
import getStoreInfo from "./get-store-info";
import Fab from "@material-ui/core/Fab";
import Loop from "@material-ui/icons/Loop";
import { storeIndex } from "lunatic-suggester";
import Loader from "./loader";

function OpenAndLoad({ store, fetch, start, idbVersion }) {
  const db = storeIndex.useStoreIndex(store, idbVersion);
  if (db) {
    return <Loader start={start} db={db} store={store} fetch={fetch} />;
  }
  return "waiting...";
}

function LoadStores({ jsonLunatic = {} }) {
  const { suggesters } = jsonLunatic;
  const [disabled, setDisabled] = useState(true);
  const [stores, setStores] = useState(undefined);
  const [start, setStart] = useState(false);

  useEffect(
    function () {
      if (Array.isArray(suggesters)) {
        const str = suggesters.reduce(function (a, name) {
          const storeInfo = getStoreInfo(name);
          return { ...a, [name]: storeInfo };
        }, {});
        setStores(str);
        setDisabled(false);
      }
    },
    [suggesters]
  );

  if (Array.isArray(suggesters)) {
    if (stores) {
      const content = suggesters.reduce(function (a, name) {
        if (name in stores) {
          const { store, fetch } = stores[name];

          return [
            ...a,
            <OpenAndLoad
              key={name}
              store={store}
              fetch={fetch}
              start={start}
              idbVersion="1"
            />,
          ];
        }
        return a;
      }, []);

      return (
        <>
          <Fab
            disabled={disabled}
            color="primary"
            aria-label="add"
            onClick={() => setStart(true)}
          >
            <Loop />
          </Fab>
          {content}
        </>
      );
    }
    return <div>Not ready yet!</div>;
  }
  return <div>Rien à charger !</div>;
}

export default LoadStores;
