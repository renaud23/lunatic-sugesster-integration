export const store = {
  name: "cog",
  fields: [
    { name: "libelle", rules: "soft" },
    { name: "nccenr", rules: "soft" },
    { name: "com", rules: "soft" },
  ],
  queryParser: { type: "soft" },
  version: "1",
  display: "libelle",
};

export default store;
