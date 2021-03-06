(ns ontrail-addex-contentscript.core
  (:require [clojure.string :as str]
            [browser]
            [dom]))

(def flow-sport->ontrail-sport
  {"Juoksu" "Juoksu"
   "Juoksumatto" "Juoksu"
   "Maastopyöräily" "Maastopyöräily"
   "Muu sisäliikunta" "Muu laji"
   "Muu ulkoliikunta" "Muu laji"
   "Pyöräily" "Pyöräily"
   "Ratajuoksu" "Juoksu"
   "Vesijumppa" "Muu laji"
   "Voimaharjoittelu" "Voimaharjoittelu"
   "Aerobic" "Jumppa"
   "Allasuinti" "Uinti"
   "Alppihiihto" "Muu laji"
   "Amerikkalainen jalkapallo" "Muu laji"
   "Ampumahiihto" "Hiihto"
   "Avovesiuinti" "Uinti"
   "Baletti" "Tanssi"
   "Baseball" "Muu laji"
   "Body&Mind" "Muu laji"
   "Bootcamp" "Muu laji"
   "Core" "Muu laji"
   "Cross-trainer" "Crosstrainer"
   "Crossfit" "Crossfit"
   "Frisbeegolf" "Frisbeegolf"
   "Futsal" "Muu laji"
   "Golf" "Golf"
   "Hiihto" "Hiihto"
   "Hiihtosuunnistus" "Hiihto"
   "Hölkkä" "Juoksu"
   "Jalkapallo" "Jalkapallo"
   "Jazz" "Tanssi"
   "Jooga" "Jooga"
   "Judo" "Kamppailulaji"
   "Jääkiekko" "Jääkiekko"
   "Kajakkimelonta" "Melonta"
   "Kanoottimelonta" "Melonta"
   "Katutanssi" "Tanssi"
   "Kiipeily (sisä)" "Kiipeily"
   "Koripallo" "Koripallo"
   "Kriketti" "Muu laji"
   "Kuntokamppailulajit" "Kamppailulaji"
   "Kuntopiiri" "Kuntopiiri"
   "Kuntotanssi" "Tanssi"
   "Käsipallo" "Muu laji"
   "Kävely" "Kävely"
   "LES MILLS BODYATTACK" "Jumppa"
   "LES MILLS BODYBALANCE" "Jumppa"
   "LES MILLS BODYCOMBAT" "Jumppa"
   "LES MILLS BODYJAM" "Jumppa"
   "LES MILLS BODYPUMP" "Jumppa"
   "LES MILLS BODYSTEP" "Jumppa"
   "LES MILLS BODYVIVE" "Jumppa"
   "LES MILLS CXWORX" "Jumppa"
   "LES MILLS GRIT Cardio" "Jumppa"
   "LES MILLS GRIT Plyo" "Jumppa"
   "LES MILLS GRIT Strength" "Jumppa"
   "LES MILLS RPM" "Jumppa"
   "LES MILLS SH'BAM" "Jumppa"
   "LES MILLS SPRINT" "Jumppa"
   "LES MILLS THE TRIP" "Jumppa"
   "Lainelautailu" "Muu laji"
   "Latinalaistanssit" "Tanssi"
   "Leijalautailu" "Muu laji"
   "Lentopallo" "Lentopallo"
   "Liikkuvuusharjoitus (dynaaminen)" "Venyttely"
   "Liikkuvuusharjoitus (staattinen)" "Venyttely"
   "Luistelu" "Luistelu"
   "Luistelu (talvi)" "Luistelu"
   "Lumikenkäkävely" "Lumikenkäily"
   "Lumilautailu" "Lumilautailu"
   "Maahockey" "Muu laji"
   "Maantiejuoksu" "Juoksu"
   "Maantiepyöräily" "Maantiepyöräily"
   "Maastojuoksu" "Maastojuoksu"
   "Maastopyöräsuunnistus" "Maastopyöräily"
   "Nykytanssi" "Tanssi"
   "Nyrkkeily" "Nyrkkeily"
   "Off-piste-hiihto" "Hiihto"
   "Perinteinen hiihto" "Perinteinen hiihto"
   "Perinteinen rullahiihto" "Rullahiihto"
   "Pesäpallo" "Muu laji"
   "Pilates" "Pilates"
   "Pingis" "Muu laji"
   "Potkunyrkkeily" "Kamppailulaji"
   "Purjehdus" "Muu laji"
   "Purjelautailu" "Muu laji"
   "Pyörätuolikelaus" "Muu laji"
   "Rantalentopallo" "Beach volley"
   "Ratsastus" "Ratsastus"
   "Raviurheilu" "Ratsastus"
   "Rugby" "Muu laji"
   "Rullaluistelu (inline)" "Rullaluistelu"
   "Rullaluistelu (quad)" "Rullaluistelu"
   "Ryhmäliikunta" "Jumppa"
   "Salibandy" "Salibandy"
   "Sauvakävely" "Sauvakävely"
   "Seuratanssit" "Tanssi"
   "Showtanssi" "Tanssi"
   "Sisäpyöräily" "Pyöräily"
   "Sisäsoutu" "Sisäsoutu"
   "Soutu" "Soutu"
   "Spinning" "Spinning"
   "Squash" "Squash"
   "Steplautaharjoittelu" "Jumppa"
   "Sulkapallo" "Sulkapallo"
   "Suunnistus" "Suunnistus"
   "Tanssi" "Tanssi"
   "Telemark-hiihto" "Hiihto"
   "Tennis" "Tennis"
   "Toiminnallinen harjoittelu" "Jumppa"
   "Uinti" "Uinti"
   "Ultrajuoksu" "Juoksu"
   "Vaellus" "Vaellus"
   "Vapaa rullahiihto" "Rullahiihto"
   "Vapaahiihto" "Hiihto"
   "Venyttely" "Venyttely"
   "Vesihiihto" "Muu laji"
   "Vesilautailu" "Muu laji"
   "Voimistelu" "Jumppa"
   "Aqua fitness" "Muu laji"
   "Cycling" "Pyöräily"
   "Mountain biking" "Maastopyöräily"
   "Other indoor" "Muu laji"
   "Other outdoor" "Muu laji"
   "Running" "Juoksu"
   "Strength training" "Voimaharjoittelu"
   "Track&field running" "Juoksu"
   "Treadmill running" "Juoksu"
   "Aerobics" "Jumppa"
   "Backcountry skiing" "Hiihto"
   "Badminton" "Sulkapallo"
   "Ballet" "Tanssi"
   "Ballroom" "Tanssi"
   "Basketball" "Koripallo"
   "Beach volley" "Beach volley"
   "Biathlon" "Hiihto"
   "Boxing" "Nyrkkeily"
   "Canoeing" "Melonta"
   "Circuit training" "Kuntopiiri"
   "Classic XC skiing" "Hiihto"
   "Classic roller skiing" "Rullahiihto"
   "Climbing (indoor)" "Kiipeily"
   "Cricket" "Muu laji"
   "Dancing" "Tanssi"
   "Disc golf" "Frisbeegolf"
   "Downhill skiing" "Muu laji"
   "Field hockey" "Muu laji"
   "Finnish baseball" "Muu laji"
   "Fitness dancing" "Tanssi"
   "Fitness martial arts" "Kamppailulaji"
   "Floorball" "Salibandy"
   "Football" "Jalkapallo"
   "Freestyle XC skiing" "Hiihto"
   "Freestyle roller skiing" "Rullahiihto"
   "Functional training" "Jumppa"
   "Group exercise" "Jumppa"
   "Gymnastics" "Jumppa"
   "Handball" "Muu laji"
   "Hiking" "Vaellus"
   "Ice hockey" "Jääkiekko"
   "Ice skating" "Luistelu"
   "Indoor cycling" "Pyöräily"
   "Indoor rowing" "Sisäsoutu"
   "Inline skating" "Luistelu"
   "Jogging" "Juoksu"
   "Kayaking" "Melonta"
   "Kickboxing" "Kamppailulaji"
   "Kitesurfing" "Muu laji"
   "Latin" "Tanssi"
   "Mobility (dynamic)" "Jumppa"
   "Mobility (static)" "Venyttely"
   "Modern" "Tanssi"
   "Mountain bike orienteering" "Maastopyöräily"
   "Nordic walking" "Sauvakävely"
   "Open water swimming" "Uinti"
   "Orienteering" "Suunnistus"
   "Pool swimming" "Uinti"
   "Riding" "Ratsastus"
   "Road cycling" "Pyöräily"
   "Road running" "Juoksu"
   "Roller skating" "Rullaluistelu"
   "Rowing" "Soutu"
   "Sailing" "Muu laji"
   "Show" "Tanssi"
   "Skating" "Luistelu"
   "Ski orienteering" "Hiihto"
   "Skiing" "Hiihto"
   "Snowboarding" "Lumilautailu"
   "Snowshoe trekking" "Lumikenkäily"
   "Soccer" "Jalkapallo"
   "Step workout" "Jumppa"
   "Street" "Tanssi"
   "Stretching" "Venyttely"
   "Surfing" "Muu laji"
   "Swimming" "Uinti"
   "Table tennis" "Muu laji"
   "Telemark skiing" "Hiihto"
   "Trail running" "Maastojuoksu"
   "Trotting" "Ratsastus"
   "Ultra running" "Juoksu"
   "Volleyball" "Lentopallo"
   "Wakeboarding" "Muu laji"
   "Walking" "Kävely"
   "Water skiing" "Muu laji"
   "Wheelchair racing" "Muu laji"
   "Windsurfing" "Muu laji"
   "Yoga" "Jooga"
   })

(defn read-date! []
  (.. (dom/element-by-query "#ex-date") -value))

(defn Date->ontrail-date [d]
  (let [day (.getDate d)
        month (inc (.getMonth d))
        year (.getFullYear d)]
    (str day "." month "." year)))

(defn Date->mozilla-date [d]
  (.. d (toISOString) (split "T") (aget 0)))

(defn fill-text-value! [id value]
  (let [el (dom/element-by-query id)]
    (set! (.-value el) value)
    (.. el (dispatchEvent (js/KeyboardEvent. "keyup")))
    (set! (.. el -previousElementSibling -classList) #js ["active"])))

(defn fill-duration! [val]
  ;; Value is a string with milliseconds. Ontrail recognizes it if time is given as seconds
  (let [seconds (-> val
                    (.split #"\." 1)
                    first)]
    (fill-text-value! "#ex-duration" seconds)))

(defn fill-distance! [val]
  (let [distance (-> (js/parseFloat val) (/ 1000))
        as-km (str (.. distance (toFixed 2) (replace "." ",")) " km")]
    (fill-text-value! "#ex-distance" as-km)))

(defn fill-heart-rate! [val]
  (fill-text-value! "#ex-avghr" val))

(defn fill-date! [val]
  (let [date (js/Date. val)
        ontrail-date (Date->ontrail-date date)]
    (fill-text-value! "#ex-date" ontrail-date)
    ;; Mozilla renders the date control different than Chrome
    ;; check if data was written and try with Mozilla format
    ;; Seems to work with Opera too
    (when (not= (read-date!) ontrail-date)
      (fill-text-value! "#ex-date" (Date->mozilla-date date)))))

(defn fill-ascent! [val]
  (fill-text-value! "#ex-detailElevation" val))

(defn fill-sport!
  "Sets ontrail's sport selector to the given value

  It is a strange picklist where selected flag needs to be set for all the options."
  [val]
  (let [ontrail-sport (get flow-sport->ontrail-sport val val)
        selector (dom/element-by-query "#ex-sport")
        options (.-options selector)]
    (loop [i 0]
      (when (< i (.-length options))
        (let [option (aget options i)]
          (set! (.-selected option) (= (.-value option) ontrail-sport)))
        (recur (inc i))))
    (.. selector (dispatchEvent (js/Event. "change")))))

(defn prefill-ontrail! [data _ _]
  (.. js/console (log "Prefilling ontrail with" data))
  (let [exercise (js->clj data :keywordize-keys true)]
    (doseq [[k f] [[:duration fill-duration!]
                   [:distance fill-distance!]
                   [:avgheartrate fill-heart-rate!]
                   [:timestamp fill-date!]
                   [:extype fill-sport!]
                   [:ascent fill-ascent!]]]
      (try
        (some-> (k exercise) (f))
        (catch :default e
          (.. js/console (log "Error in" k e)))))))

(defonce init
  (browser/add-message-listener! prefill-ontrail!))
