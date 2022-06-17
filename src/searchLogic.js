
import allPlaques from "./plaques.json"

export function searchPlaques(searchTerms) {
  if (searchTerms == null || searchTerms.length === 0) {
    return [];
  }

  searchTerms = searchTerms.map(s => s.toLowerCase());

  let idSearches = searchTerms.filter(s => s.includes("_"));

  const idSearchResults = allPlaques.filter(
      p => idSearches.includes(p.id.toLowerCase()));

  const nameSearchResults = allPlaques.filter(
      p => p.searchable &&
        (searchTerms.includes(p.benefiary.toLowerCase()) || searchTerms.includes(p.requester.toLowerCase())));

  const result=Array.from(
    new Set(idSearchResults.concat(nameSearchResults)));
  return result;
}

export default searchPlaques;