import React, { useEffect, useState } from "react";
import { storeIndex } from "lunatic-suggester";
import Progress from "./progress";

const ENV_PATH = process.env.REACT_APP_BASE_PATH;

function postLoad() {}

function Loader({
  start,
  db,
  store,
  idbVersion = "1",
  fetch,
  post = postLoad,
}) {
  const [progress, setProgress] = useState(0);
  const [entities, setEntities] = useState(undefined);
  const { name, fields } = store;

  useEffect(
    function () {
      async function load() {
        if (typeof fetch === "function" && start) {
          const e = await fetch(ENV_PATH);
          setEntities(e);
        }
      }
      load();
    },
    [fetch, start]
  );

  function log({ message }) {
    console.log(message);
    const { type, percent } = message;
    if (type === "bulk-insert/complete") {
      setProgress(percent);
    }
  }

  useEffect(
    function () {
      const [start, abort] = storeIndex.createAppendTask(
        name,
        idbVersion,
        fields,
        log
      );

      async function go() {
        try {
          if (entities && db) {
            storeIndex.clearData(db);
            await start(entities);
            post(name);
          }
        } catch (e) {
          console.log(e);
        }
      }

      go();

      return function () {
        abort();
      };
    },
    [name, fields, db, entities, idbVersion, post]
  );

  return (
    <span style={{ position: "relative" }}>
      <span style={{ position: "absolute", top: 0 }}>{name}</span>
      <Progress value={progress} display={true} />
    </span>
  );
}

export default Loader;
