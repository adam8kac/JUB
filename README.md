# JUB (Job Hub)

## Opis sistema in namen

**JUB (Job Hub)** je mikrostoritveni sistem za izdelavo in javno objavo življenjepisov (CV) ter povezovanje kandidatov s podjetji. Kandidati v spletni aplikaciji ustvarijo CV iz predlog, ga objavijo na JUB (javni hub) in delijo povezavo. Podjetja lahko na hubu brskajo po objavljenih CV-jih ter kandidatom pošljejo zanimanje ali sporočilo, kandidati pa ta sporočila prejmejo v svoj inbox.

## Osnovna funkcionalnost

- Ustvarjanje, urejanje in objava CV-ja.
- Javni prikaz objavljenih CV-jev na JUB (hub) za delodajalce.
- Registracija in prijava za kandidate (USER) in podjetja (COMPANY).
- Inbox/obvestila za kontakt podjetij s kandidati.

## Uporabniki sistema

- **Kandidat (USER):** želi hitro ustvariti profesionalen CV, ga objaviti na JUB in prejemati sporočila podjetij.
- **Podjetje (COMPANY):** želi iskati kandidate na JUB, pregledovati CV-je in stopiti v stik.
- _(opcijsko)_ **Administrator (ADMIN):** moderacija vsebin in upravljanje uporabnikov.

## Komponente in komunikacija

JUB sestavljajo tri mikrostoritve in spletna aplikacija:

- **web-app (UI):** uporabniški vmesnik; komunicira z mikrostoritvami prek **REST API**.
- **auth-service:** registracija/prijava in izdaja avtentikacijskih žetonov (npr. JWT).
- **cv-builder-service:** upravljanje podatkov CV-ja (kreiranje, urejanje, objava).
- **hub-service:** javni hub (JUB), brskanje podjetij, upravljanje inbox sporočil.

Za asinhrono obveščanje (npr. _CV objavljen_, _podjetje poslalo sporočilo_) sistem uporablja **message broker** (npr. RabbitMQ/Kafka), kjer storitve objavljajo in porabljajo dogodke za inbox/obvestila.
