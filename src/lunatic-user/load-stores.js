import React, { useState, useEffect, useMemo } from "react";
import getStoreInfo from "./get-store-info";
import Fab from "@material-ui/core/Fab";
import Loop from "@material-ui/icons/Loop";
import { storeIndex } from "lunatic-suggester";
import Loader from "./loader";

function isEnded(map) {
  return Object.values(map).reduce(function (state, s) {
    return state && s;
  }, true);
}

function OpenAndLoad({ store, fetch, start, idbVersion, post }) {
  const db = storeIndex.useStoreIndex(store, idbVersion);
  if (db) {
    return (
      <Loader start={start} db={db} store={store} fetch={fetch} post={post} />
    );
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
          if (storeInfo) {
            return { ...a, [name]: storeInfo };
          }
          console.warn(`Unmanaged suggester ${name}`);
          return a;
        }, {});
        setStores(str);
        setDisabled(false);
      }
    },
    [suggesters]
  );

  const postProcess = useMemo(
    function () {
      if (Array.isArray(suggesters)) {
        const done = suggesters.reduce(
          (a, name) => ({ ...a, [name]: false }),
          {}
        );
        return function (sn) {
          done[sn] = true;
          if (isEnded(done)) {
            setDisabled(false);
            setStart(false);
          }
        };
      }

      return () => null;
    },
    [suggesters]
  );

  if (Array.isArray(suggesters)) {
    if (stores) {
      const content = suggesters.reduce(function (a, name) {
        if (stores[name]) {
          const { store, fetch } = stores[name];

          return [
            ...a,
            <OpenAndLoad
              key={name}
              store={store}
              fetch={fetch}
              start={start}
              idbVersion="1"
              post={postProcess}
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
            onClick={() => {
              setStart(true);
              setDisabled(true);
            }}
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
