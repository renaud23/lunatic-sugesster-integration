import React, { useEffect, useState, useCallback } from "react";
import { storeIndex } from "lunatic-suggester";
import Progress from "./progress";

function Loader({ start, db, store }) {
  const [progress, setProgress] = useState(0);
  const [abort, setAbort] = useState(undefined);
  const { name } = store;

  const indexPage = useCallback(async function (results, pagination, store) {
    if (Array.isArray(results)) {
      const { percent } = pagination;
      const { name, fields } = store;
      const [start, _abort] = storeIndex.createAppendTask(
        name,
        "1",
        fields,
        ({ message }) => null
      );
      setAbort(_abort);
      await start(results, function () {
        setProgress(percent);
        setAbort(undefined);
      });
    }
  }, []);

  useEffect(
    function () {
      async function go() {
        try {
          if (start && db) {
            storeIndex.clearData(db);
          }
        } catch (e) {
          console.log(e);
        }
      }

      go();
    },
    [start, store, db, indexPage]
  );

  useEffect(
    function () {
      return function () {
        if (abort) {
          abort();
        }
      };
    },
    [abort]
  );

  return (
    <>
      <span style={{ position: "absolute", top: 0 }}>{name}</span>
      <Progress value={progress} display={true} />
    </>
  );
}

export default Loader;
