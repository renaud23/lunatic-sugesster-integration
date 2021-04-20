import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Loop from "@material-ui/icons/Loop";
import { storeIndex } from "lunatic-suggester";
import Loader from "./loader";

function LoadStore({ store = {}, idbVersion, fetch }) {
  const { name } = store;
  const [disabled, setDisabled] = useState(true);
  const [start, setStart] = useState(false);
  const db = storeIndex.useStoreIndex(store, idbVersion);

  useEffect(
    function () {
      if (db) {
        setDisabled(false);
      }
    },
    [db]
  );

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
      {start ? (
        <Loader key={name} start={start} db={db} store={store} fetch={fetch} />
      ) : undefined}
    </>
  );
}

export default LoadStore;
