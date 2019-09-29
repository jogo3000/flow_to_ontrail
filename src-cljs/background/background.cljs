(ns background)

(defn query-active-tab []
  (.. js/browser
      -tabs
      (query #js {:active true :currentWindow true})))

(defn request-prefill! [exercise-info]
  (fn [_]
    (.. js/console (log "request-prefill!"))
    (.. (query-active-tab)
        (then (fn [tabs]
                (let [ontrail-tab (aget tabs 0)
                      ontrail-tab-id (.-id ontrail-tab)]
                  (.. js/console (log "tab" ontrail-tab))
                  (.. js/browser
                      -tabs
                      (sendMessage ontrail-tab-id exercise-info nil nil))))))))

(defn load-content-script! [exercise-info]
  (.. js/console (log "load-content-script!"))
  (fn [_]
    (.. js/browser
        -tabs
        (executeScript nil #js {:file "ontrail_addex_contentscript.js"}
                       (request-prefill! exercise-info)))))

(defn open-ontrail! [exercise-info]
  (.. js/console (log "open-ontrail!"))
  (.. js/browser
      -tabs
      (create #js {:url "http://beta.ontrail.net/#addex"})
      (then (load-content-script! exercise-info))))

(defn request-exercise-info [tabs]
  (.. js/console (log "request-exercise-info"))
  (let [flow-tab-id (-> tabs (aget 0) .-id)
        empty-js #js {}]
    (.. js/browser
        -tabs
        (sendMessage flow-tab-id empty-js empty-js)
        (then open-ontrail!))))

(defn copy-data-to-ontrail! [tab]
  (.. js/console (log "copy-data-to-ontrail!"))
  (.. (query-active-tab)
      (then request-exercise-info)))

(.. js/browser
    -pageAction
    -onClicked
    (addListener copy-data-to-ontrail!))
