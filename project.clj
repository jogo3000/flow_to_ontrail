;; TODO
;; 1. browser connected REPL
;; 4. copy resource files to build
;; 5. update manifest in build with the correct version number
;; 6. production build
;; 7. package for firefox in production build

(defproject flow-to-ontrail "1.7"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]]
  :plugins [[lein-cljsbuild "1.1.7"]]
  :jvm-opts ["-Dfile.encoding UTF-8"]
  :resource-paths ["resources/"]
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :compiler {:modules {:background {:entries #{background.core}
                                                          :output-to "build/background.js"}
                                             :flow_content_script.js {:entries #{flow-content-script.core}
                                                                      :output-to "build/flow_content_script.js"}
                                             :ontrail_addex_contentscript.js {:entries #{ontrail-addex-contentscript.core}
                                                                              :output-to "build/ontrail_addex_contentscript.js"}}
                                   :output-dir "build"
                                   :asset-path "build/"
                                   :optimizations :simple
                                   :verbose true
                                   :pretty-print true}}]})
