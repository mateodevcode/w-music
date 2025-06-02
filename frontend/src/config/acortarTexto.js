export function acortarTexto(texto, maxLength) {
  if (texto === null || texto === undefined) {
    return "";
  }

  if (texto.length <= maxLength) {
    return texto;
  }
  return texto.slice(0, maxLength) + "...";
}
