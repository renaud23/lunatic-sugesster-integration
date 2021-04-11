import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Fab from "@material-ui/core/Fab";
import Loop from "@material-ui/icons/Loop";
import "./index.css";
import App from "./App";
import { LunaticIDBSuggester, storeIndex } from "lunatic-suggester";
import { storeCog } from "./stores-info";
import reportWebVitals from "./reportWebVitals";
import fetchCOG from "./fetch-cog";
import Loader from "./loader";

const { name: storeCogName } = storeCog;

function Store({ store = {}, idbVersion, fetch }) {
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
        <Loader key={name} start={start} db={undefined} store={store} />
      ) : undefined}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Store store={storeCog} idbVersion="1" fetch={fetchCOG} />
    <label id="label-suggester-cog" htmlFor="suggest-communes">
      Label for Suggester COG
    </label>
    <LunaticIDBSuggester
      id="suggest-communes"
      labelledBy="label-suggester-cog"
      className="custom-theme"
      storeName={storeCogName}
      version="1"
      onChange={(...args) => console.log(args)}
      onSelect={(...args) => console.log(args)}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
