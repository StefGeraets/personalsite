export function id(id, doc = document) {
  return doc.getElementById(id)
}

export function className(className, doc = document) {
  return doc.getElementsByClassName(className)
}

export function query(sel, doc = document) {
  return doc.querySelector(sel)
}