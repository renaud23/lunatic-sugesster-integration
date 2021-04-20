import React, { useEffect, useState } from "react";
import { storeIndex } from "lunatic-suggester";
import Progress from "./progress";

function Loader({ start, db, store, idbVersion = "1", fetch }) {
  const [progress, setProgress] = useState(0);
  const [entities, setEntities] = useState(undefined);
  const { name, fields } = store;

  useEffect(
    function () {
      async function load() {
        if (typeof fetch === "function" && start) {
          const e = await fetch();
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

      async function go(store) {
        try {
          if (entities && db) {
            storeIndex.clearData(db);
            await start(entities);
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
    [name, fields, db, entities, idbVersion]
  );

  return (
    <>
      <span style={{ position: "absolute", top: 0 }}>{name}</span>
      <Progress value={progress} display={true} />
    </>
  );
}

export default Loader;
