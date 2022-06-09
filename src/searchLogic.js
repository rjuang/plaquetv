
import allPlaques from "./plaques.json"

export function searchPlaques(searchTerm) {
  let result=[];

  if (searchTerm == null || searchTerm.length === 0) {
    return result;
  }

  searchTerm=searchTerm.toLowerCase();
  const idSearch=searchTerm.includes("_");

  if (idSearch) {
    result=allPlaques.filter(p=>p.id.toLowerCase()===searchTerm)
  } else {
    result=allPlaques.filter(p=>p.searchable && (p.benefiary.toLowerCase()===searchTerm || p.requester.toLowerCase()===searchTerm))
  }

  return result;
}

export default searchPlaques;