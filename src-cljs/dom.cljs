(ns dom)

(defn element-by-id
  "Returns DOM element with the given id"
  [id]
  (.. js/document
      (getElementById id)))

(defn element-value
  "Returns the value of a DOM element with the given id"
  [id]
  (.. (element-by-id id)
      (getAttribute "value")))

(defn element-title
  "Returns the title of a DOM element with the given id"
  [id]
  (.. (element-by-id id)
      (getAttribute "title")))

(defn element-by-query
  "Looks up a DOM element with query selector expression"
  [expr]
  (.. js/document (querySelector expr)))
