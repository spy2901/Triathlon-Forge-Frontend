# TriathlonForge (Frontend)

**Forge Your Best Performance – Track, Analyze, Improve.**

TriathlonForge je aplikacija za trkače i triatlonce koja omogućava praćenje i analizu fizičkih aktivnosti koristeći podatke sa **STRAVA** ili **Garmin** profila. Cilj je unapređenje treninga kroz detaljne analize i personalizovane preporuke.  

TriathlonForge se fokusira na ono što je najvažnije – **praćenje performansi bez nepotrebne komplikacije.**

---

## 📌 Svrha aplikacije
- Centralizovano praćenje i analiza treninga.  
- Personalizovani izveštaji i preporuke.  
- Pregled napretka kroz grafikone i statistike.  
- Planiranje i motivacija kroz kalendar i notifikacije.  

---

## 👥 Kome je aplikacija namenjena
- Trkačima (rekreativnim i profesionalnim).  
- Triatloncima koji žele detaljan pregled treninga.  
- Sportistima koji žele predloge za poboljšanje i recovery.  

---

## 📝 Kako funkcioniše aplikacija
1. **Unos podataka** – korisnik se registruje i povezuje Strava ili Garmin nalog (link ka profilu).  
2. **Login** – proverava se preko API-ja da li se kredencijali poklapaju sa Strava/Garmin bazom.  
3. **Pregled aktivnosti** – prikazuje se lista aktivnosti korisnika sa podacima:  
   - distanca,  
   - prosečan pace,  
   - vreme trajanja aktivnosti,  
   - potrošene kalorije,  
   - prosečni otkucaji srca.  
4. **Obrada podataka** – aplikacija kreira mesečne i godišnje izveštaje, grafikone i preporuke.  
5. **Rezultati obrade** – pregled napretka, AI predlozi treninga (druga faza), notifikacije i deljenje na društvenim mrežama.  
6. **Privatnost** – podaci se koriste isključivo za potrebe aplikacije, mogu se deliti samo ako korisnik želi.  
7. **Profili korisnika** – svaki korisnik ima svoj profil sa osnovnim podacima i analizama aktivnosti.  

---

## 🚀 Funkcionalnosti – Faza 1
1. **Login / Register**  
2. **Home Page** – prikaz aktivnosti korisnika (tekstualno iz API-ja).  
3. **Calculators Page** – pace & BMI kalkulator (na istoj stranici).  
   - `time = pace × distance`  
   - `distance = time / pace`  
   - `pace = time / distance`  
   - `speed = distance / time`  
4. **Profile Page** – ime, prezime, godište, prosečan HR tokom aktivnosti, broj aktivnosti + grafikoni (pace, speed, puls).  
5. **Calendar Page** – unos i pregled aktivnosti sa tipom aktivnosti + notifikacija dan pre treninga.  
6. **Chat Page** – komunikacija između korisnika.  

---

## 📊 Izveštaji i analize
- **Mesečni izveštaji** – pređena distanca, napredak (brži/sporiji), varijacije pulsa, pace-a, kadence.  
- **Godišnji izveštaji** – pregled ukupnog napretka.  
- **Predlozi aktivnosti** – recovery, novi treninzi.  
- **Grafikoni** – koriste se spline chart za vizuelizaciju.  

---

## 🔔 Dodatne funkcionalnosti
- Dodavanje plana treninga sa notifikacijama.  
- Deljenje aktivnosti na društvenim mrežama.  
- Automatsko povezivanje aktivnosti sa kalendarom.  

---

## 🤖 Funkcionalnosti – Faza 2
- **Progress prediction** – prognoza gde će korisnik biti za 3 meseca ako nastavi istim tempom.  
- **AI preporuke treninga** – personalizovane preporuke na osnovu dosadašnjih aktivnosti.  
- **Automatsko povezivanje aktivnosti i kalendara.**  
- **Recap godine** – krajem decembra rezime svih aktivnosti korisnika.  

---

## 🛠️ Tehnologije
- **Frontend**: React Native  
- **Backend/API**: Python (Flask)  
- **Integracije**: Strava API
