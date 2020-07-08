export function getUrlParam(variable) {
  if (typeof window === 'undefined') return false;
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      let result;
      try {
        result = decodeURIComponent(pair[1])
      } catch{
        result = pair[1];
      } finally {
        return result;
      }
    }
  }
  return (false);
}