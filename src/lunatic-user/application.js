import React, { useState, useEffect } from "react";
import LoadStore from "./load-stores";
import getStoreInfo from "./get-store-info";
import { createOchestrateur } from "../lunatic";

const ochestrateur = createOchestrateur(getStoreInfo);

function Application({ jsonLunatic }) {
  const [components, setComponents] = useState(undefined);

  useEffect(
    function () {
      if (jsonLunatic) {
        setComponents(ochestrateur(jsonLunatic));
      }
    },
    [jsonLunatic]
  );

  return (
    <div className="application-cliente-de-lunatic">
      <h1>Simulation intégration Lunatic</h1>
      <h2>Fonctionnalité de chargement du store</h2>
      <LoadStore jsonLunatic={jsonLunatic} />
      <h2>Formulaire lunatic</h2>
      {components}
    </div>
  );
}

export default Application;
