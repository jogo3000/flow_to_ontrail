(ns browser)

(defn add-page-action-listener!
  "Registers a page action listener"
  [f]
  (.. js/browser -pageAction -onClicked (addListener f)))

(defn add-message-listener!
  "Registers a message listener"
  [f]
  (.. js/browser -runtime -onMessage (addListener f)))

(defn query-active-tab!
  "Queries the active tab and calls f with the tabs returned from the query"
  [f]
  (.. js/browser -tabs
      (query #js {:active true :currentWindow true})
      (then f)))

(defn send-message-to-tab!
  "Sends a message to the tab with tab-id and calls f with the results"
  [tab-id f]
  (let [emptys-js #js {}]
    (.. js/browser -tabs
        (sendMessage tab-id empty-js empty-js)
        (then f))))
