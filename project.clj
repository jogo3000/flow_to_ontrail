;; TODO
;; 1. browser connected REPL
;; 2. fix sport selector
;; 3. modules -> if you can load multiple scripts with manifest, that is the way
;; 4. copy resource files to build
;; 5. update manifest in build with the correct version number
;; 6. production build
;; 7. package for firefox in production build

(defproject flow-to-ontrail "1.7"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]]
  :plugins [[lein-cljsbuild "1.1.7"]]
  :jvm-opts ["-Dfile.encoding UTF-8"]
  :cljsbuild {:builds [{:source-paths ["src-cljs/background"]
                        :compiler {:output-to "build/background.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}
                       {:source-paths ["src-cljs/flow_content_script"]
                        :compiler {:output-to "build/flow_content_script.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}
                       {:source-paths ["src-cljs/ontrail_addex_contentscript"]
                        :compiler {:output-to "build/ontrail_addex_contentscript.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}]})
