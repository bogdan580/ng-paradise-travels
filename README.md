# NgParadiseTravels

## wymagania
- npm `sudo apt-get install npm`
- git `sudo apt-get install git`

## instalacja

```bash
git clone https://github.com/bogdan580/ng-paradise-travels
cd ng-paradise-travels/
npm install
sudo npm install -g @angular/cli
sudo npm i webpack -g

```

Strona dostępna pod adresem: http://localhost:4200/home

## API

Przekierowanie po udanej rejestracji: http://localhost:4200/login?nowCanLogin=true

Przekierowanie po udanej rezerwacji: http://localhost:4200/profile?reservationSuccess=true

Zatwierdzenie zmian w admin-panelu: http://localhost:4200/admin?changeSave=true

Zatwierdzenie zmian w profilu: http://localhost:4200/profile?changeSave=true

Zabiezpieczenie admin panelu (Jeżeli nie admin to [/admin => /profile]): http://localhost:4200/profile?notAdmin=true
