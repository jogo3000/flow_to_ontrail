(ns background.core
  (:require [browser]))

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

(defn load-cljs-base! [exercise-info]
  (fn [_]
    (.. js/browser
        -tabs
        (executeScript nil #js {:file "cljs_base.js"}
                       (load-content-script! exercise-info)))))

(defn open-ontrail! [exercise-info]
  (.. js/console (log "open-ontrail!"))
  (.. js/browser
      -tabs
      (create #js {:url "http://beta.ontrail.net/#addex"})
      (then (load-cljs-base! exercise-info))))

(defn request-exercise-info [tabs]
  (.. js/console (log "request-exercise-info"))
  (let [flow-tab-id (-> tabs (aget 0) .-id)]
    (browser/send-message-to-tab flow-tab-id open-ontrail!)))

(defn copy-data-to-ontrail! [tab]
  (.. js/console (log "copy-data-to-ontrail!"))
  (browser/query-active-tab! request-exercise-info))

(defonce init
  (browser/add-page-action-listener! copy-data-to-ontrail!))
