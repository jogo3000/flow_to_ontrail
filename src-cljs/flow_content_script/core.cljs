(ns flow-content-script.core
  "This is injected to the flow.polar.com site's training analysis page. The background script requests the exercise data
  from the page when user clicks the page action button"
  (:require [clojure.string :as str]
            [dom]))

(defn parse-int [s]
  (js/parseInt s 10))

(def str->js-month
  "These are used in JS Dates, where months start from zero

  Both Finnish and English translations are packed to the same map"
  {"Tammi" 0
   "Helmi" 1
   "Maalis" 2
   "Huhti" 3
   "Touko" 4
   "Kesä" 5
   "Heinä" 6
   "Elo" 7
   "Syys" 8
   "Loka" 9
   "Marras" 10
   "Joulu" 11
   "Jan" 0
   "Feb" 1
   "Mar" 2
   "Apr" 3
   "May" 4
   "Jun" 5
   "Jul" 6
   "Aug" 7
   "Sep" 8
   "Oct" 9
   "Nov" 10
   "Dec" 11})


(defn read-heart-rate
  "Returns the average heart rate from an excercise page"
  []
  (if-let [el (dom/element-by-id "BDPHrAvg")]
    (.-innerText el)
    ""))

(defn read-exercise-type
  "Returns the exercise type, e.g. Running, Orienteering from the exercise page"
  []
  (-> (dom/element-title "sport-icon-image") str/trim))

(defn read-date
  "Changes Polar date format into JSON timestamp format

  In flow.polar.com Finnish site s looks like this Lauantai, Marras 19, 2016 06:50 |
  In the English site all else is the same but month name has been translated"
  []
  (let [[_ month day year hour minute]
        (-> (.. (dom/element-by-query "#sportHeading > br")
                -nextSibling
                -textContent)
            str/trim
            (str/replace #"[,:|]" " ")
            (str/split #"\s+"))]
    (.. (js/Date. (parse-int year) (str->js-month month) (parse-int day) (parse-int hour) (parse-int minute))
        (toJSON))))

(defn read-ascent
  "Returns ascent information from the exercise page"
  []
  ;; This query selector has been crafted with developer tools. If it stops working use it to create another one
  (if-let [el (dom/element-by-query "#trainingDetailsContainerBox > div > div.col-md-8.col-md-push-4.exercise-statistics-wrapper > fieldset > div > div > aside.col-md-4.col-sm-4.col-xs-12.clearfix.ASCENT > div.basic-data-panel__value > span.basic-data-panel__value-container")]
    (.-innerText el)
    ""))

(defn read-exercise [_ _ send-response]
  (.. js/console (log "read-exercise from flow"))
  (send-response #js {:duration (dom/element-value "preciseDuration")
                      :distance (dom/element-value "preciseDistanceStr")
                      :avgheartrate (read-heart-rate)
                      :extype (read-exercise-type)
                      :timestamp (read-date)
                      :ascent (read-ascent)}))

(.. js/browser
    -runtime
    -onMessage
    (addListener read-exercise))
