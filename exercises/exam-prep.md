# Mock exam for PG6301 Web Development and API design, 2025

The exam for PG6301 is a practical test where you should demonstrate your mastery of the technologies and concepts that have been thought in the course: React, Hono, Heroku, Mongodb, Open ID Connect and testing. The fact that this is a practical exam means that you are evaluated on the functionality of the running code that you deliver, rather
than your theoretical mastery of the subjects

## The task: Create a bed-and-breakfast website

You should create a website where people can create and update bed-and-breakfast locations. In addition to the listings, the users should be able to create reviews for each listing. You can use the `sample_airbnb` database that comes with [MongoDB Atlas](https://cloud.mongodb.com) or you can use your own.

Here is an interface that shows the data structurwe in `sample_airbnb`

```typescript
interface AirbnbListing {
  name: string;
  summary: string;
  description: string;
  price: number;
  address: {
    street: string;
    market: string; // City or similar
    country: string;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
  };

  reviews?: Review[];
}

export interface Review {
  date: string;
  reviewer_id: string;
  reviewer_name: string;
  comments: string;
}
```

The application should have tests that can be run with npm. It should be deployed on Heroku.

## Test your application

I suggest that you ask another student to check your application on Heroku and GitHub. When you evaluate your own or your team's application you can do as follows:

1. Go to the GitHub page of the solution
2. Check that `npm test` runs
3. Check that GitHub links to the deployed app on Heroku
4. Verify that you can log in to the app
5. Verify that you can add data
6. Verify that you can see the data you added

If you're smart, you construct the code of your app so that everything that has to do with movies can easily be replaced
with something else. Then you can reuse the code directly on the exam. This is especially relevant for
the `package.json`-files, `index.html` and `main.jsx`, login code, and `server.js`.

## Checklist of technologies you should include in your application

- [ ] Logon with Google
- [ ] Vitest tests
  - [ ] Test React code
  - [ ] Test Hono code
- [ ] Deployment to Heroku
- [ ] Mongodb
- [ ] Navigating in the application using React Router
- [ ] Reading data from the server (remember error handling)
- [ ] Writing data to the server

## Guidance (in Norwegian)

### Viktig:

- Eksamen må besvares i Github Classroom
- Du mister tilgang til GitHub på innleveringsdagen på eksamen, kl 09:00
- Lever en ZIP-fil (ikke RAR, 7z eller tilsvarende). Den beste måten er å utvikle på Github og velge "Code" > "Download ZIP" i ditt repository på github.com,
- README-fila på Github og i ZIP-fila må inneholde link to Github repository og Heroku-applikasjonen
- Genererte filer som `node_modules` og `dist` må ikke være sjekket inn på Github eller i ZIP-fila
- Les oppgavebeskrivelsen grundig og sjekk at du ikke har oversett noen funksjonelle krav
- Du trenger ikke å løse alle krav for å få en ok karakter, prioriter hvilke krav du vil løse og dokumenter eventuelle forenklinger du har utført i README.md

### Samarbeid under eksamen:

Du kan be andre om hjelp under eksamen, men du må angi i README.md kode du ikke har skrevet eller du har delt med andre om det ikke skal regnes som plagiat. Du vil bli evaluert på egen kode du leverer og bør angi hvilken kode du ikke selv har utviklet

### _Må_-krav til teknisk løsning

- [ ] Besvarelsen skal inneholde en README-fil med link til Heroku og GitHub
- [ ] `npm run dev` skal starte server og klient. Concurrently og vite anbefales
- [ ] `npm test` skal kjøre tester. Testene skal ikke feile
- [ ] Koden skal ha konsistent formattering. Prettier og Husky anbefales
- [ ] Nettsidene skal ha god layout med CSS Grid og horisontal navigasjonsmeny. Brukeren må kunne navigere overalt uten å bruke "back" eller redigere URL
- [ ] Serveren validerer at brukeren er logget inn
- [ ] Innleveringen skal være i form av en ZIP-fil. Maks størrelse på fila er 5MB
- [ ] Applikasjonsdata skal lagres i MongoDB
- [ ] Applikasjonen skal deployes til Heroku
- [ ] Applikasjonen skal ha tester for visning og brukerhandlinger i React og for API i Express
- [ ] Det anbefales at du bruker TypeScript, Husky og Prettier for å sikre at koden din er korrekt og ryddig
