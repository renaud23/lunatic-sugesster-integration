/**
 * les composants de rendu des options et du label ne peuvent pas être véhiculés par le json lunatic.
 * On doit donc proposer des élèments supplémentaire spécifique pour chaque suggester. Autant déporter toutes ces infos endehors du json.
 * On peut
 *  - intégrer ces éléments à Lunatic (pas top car spécifique Insee)
 *  - laisser les clients lunatic integrer directement ces élèments en documentant en et fournissant des snipettes.
 * Perso je pense qu'il vaudrais mieux laisser le soin à chaque intégrateur de proposer ses propres implèmentations.
 *
 */
import cog from "./cog";
import nafRev2 from "./naf-rev2";

const STORES = {
  [cog.store.name]: cog,
  [nafRev2.store.name]: nafRev2,
};

function getStoreInfo(name) {
  if (name in STORES) {
    return STORES[name];
  }
  return undefined;
}

export default getStoreInfo;
