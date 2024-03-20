import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      pl: {
        translation: {
          welcome: {
            header: {
              text: 'Masz już konto?',
              button: 'Zaloguj się',
            },
            heroBanner: {
              text: 'Szukaj drugiej połówki z ',
              findher: 'Find(h)er',
              button: 'Załóż konto',
            },
          },
          signUp: {
            validation: {
              email: 'Niepoprawny adres email',
              password: 'Hasło musi zawierać co najmniej 8 znaków',
              confirmPassword: 'Hasła nie są takie same',
            },
            successMessage: 'Konto zostało zarejestrowane pomyślnie',
            confirmRequest: 'Aby się zalogować, potwierdź adres email',
            loginButtonText: 'Zaloguj',
            form: {
              title: 'Zarejestruj się',
              email: 'Adres email',
              password: 'Hasło',
              confirmPassword: 'Powtórz hasło',
              button: {
                signUp: 'Zarejestruj',
                signIn: 'Mam już konto',
              },
            },
          },
          signIn: {
            form: {
              title: 'Zaloguj się',
              button: {
                signIn: 'Zaloguj',
                signUp: 'Załóż konto',
              },
            },
          },
          sidebar: {
            home: 'Strona główna',
            account: 'Konto',
            preferences: 'Preferencje',
            interests: 'Zainteresowania',
            matchForm: 'Formularz matchowania',
            settings: 'Ustawienia',
            chat: 'Czat',
          },
          home: {
            age: 'Wiek: ',
            gender: 'Płeć: ',
            details: 'Szczegóły',
            fetchFailMessage: 'Nie udało się pobrać profili',
          },
          account: {
            fetchIdFailMessage: 'Nie udało się pobrać id',
            name: 'Imię',
            age: 'Wiek',
            gender: 'Płeć',
            editButton: 'Edytuj profil',
            editForm: {
              title: 'Edytuj profil',
              name: 'Imię:',
              age: 'Wiek:',
              description: 'Opis',
              gender: 'Płeć:',
              picture: 'Obraz',
              button: 'Zatwierdź',
            },
          },
          preferences: {
            title: 'Preferencje',
            cardTitle: {
              culinary: 'Kulinaria',
              culture: 'Kultura',
              personal: 'Osobiste',
            },
          },
          interests: {
            title: 'Zainteresowania',
            cardTitle: {
              entertainment: 'Rozrywka',
            },
          },
          matchForm: {
            fetchFailMessage: 'Nie udało się pobrać pytań',
            answerFieldPlaceholder: 'Odpowiedź',
            confirmAnswersText: 'Czy jesteś pewny/a swoich odpowiedzi?',
            button: {
              back: 'Wróć',
              next: 'Dalej',
              submit: 'Wyślij',
            },
            category1: {
              title: 'Kategoria 1',
              question1: {
                text: 'Jak zazwyczaj spędzasz wolny czas?',
                answer1: 'Czytam książki lub oglądam filmy samotnie',
                answer2: 'Spotykam się z przyjaciółmi na kawę lub herbatę',
                answer3: 'Preferuję indywidualne zajęcia takie jak spacery',
                answer4: 'Wychodzę na imprezy lub wydarzenia społeczne',
              },
              question2: {
                text: 'Jak opisujesz swoje preferencje dotyczące randkowania?',
                answer1: 'Wolę spokojne i kameralne spotkania',
                answer2:
                  'Lubię spontaniczne randki w kawiarniach lub restauracjach',
                answer3:
                  'Czuję się najlepiej gdy jesteśmy tylko we dwoje, z dala od tłumów',
                answer4: 'Uwielbiam duże spotkania towarzyskie i imprezy',
              },
              question3: {
                text: 'Jakie miejsce wybierasz na pierwszą randkę?',
                answer1: 'Mała kawiarnia z ciszą i spokojem',
                answer2: 'Nowa restauracja w centrum miasta',
                answer3: 'Park lub miejsce na świeżym powietrzu',
                answer4: 'Popularne miejsce z dużą ilością ludzi',
              },
              question4: {
                text: 'Jak reagujesz na niespodziewane zaproszenie na imprezę?',
                answer1: 'Prawdobodobnie odmówię i zostanę w domu',
                answer2: 'Zastanowiłbym/abym się nad pójściem',
                answer3:
                  'Przyjmę je, jeżeli mogę zabrać ze sobą kogoś bliskiego',
                answer4:
                  'Z przyjemnością przyjmę zaproszenie i przygotuję się do dobrej zabawy',
              },
              question5: {
                text: 'Co uważasz za idealną randkę?',
                answer1: 'Ciche spotkanie przy świecach w domu',
                answer2: 'Kolacja w restauracji z dobrym jedzeniem',
                answer3: 'Spacer w parku lub wzdłuż plaży o zachodzie słońca',
                answer4: 'Impreza taneczna lub koncert',
              },
            },
            category2: {
              title: 'Kategoria 2',
              question1: {
                text: 'Jak najczęściej spędzasz weekendy?',
                answer1: 'Czytam, maluję, robię coś kreatywnego w domu',
                answer2: 'Spotykam się z przyjaciółmi na imprezach',
                answer3: 'Ekspolurję okolicę w pojedynkę',
                answer4: 'Biorę udział w wydarzeniach społecznych',
              },
              question2: {
                text: 'Jak często potrzebujesz czasu dla siebie?',
                answer1: 'Bardzo często, potrzebuję samotności',
                answer2: 'Czasami, ale lubię spędzać czas z innymi',
                answer3:
                  'Spędzam dużo czasu sam/a, ale lubię spotykać się z przyjaciółmi',
                answer4: 'Rzadko, zawsze jest otwarty/a na towarzystwo',
              },
              question3: {
                text: 'Jak reagujesz na zaproszenie na wspólną podróż?',
                answer1:
                  'Potrzebuję czasu na zastanowienie się, ale prawdopodobnie odmówię',
                answer2: 'Zastanowiłbym/abym się nad przyjęciem zaproszenia',
                answer3: 'Ucieszyłbym/abym się, ale preferuję samotne podróże',
                answer4:
                  'Z przyjemnością się zgadzam, podróże zawsze są lepsze w towarzystwie',
              },
              question4: {
                text: 'Jakie jest Twoje podejście do zawierania nowych znajomości?',
                answer1: 'Wolę pozostać w swoim gronie znajomych',
                answer2:
                  'Inicjuję rozmowy, ale wolę gdy to inni podejmują inicjatywę',
                answer3:
                  'Jestem otwart/a na nowe znajomości, ale nie zawsze inicjuję rozmowy',
                answer4:
                  'Bez problemu nawiązuję nowe znajomości, jestem bardzo otwarty/a na innych ludzi',
              },
              question5: {
                text: 'Jak oceniasz swoją zdolność do rozmów z nieznajomymi?',
                answer1: 'Nie jestem zbyt komunikatywny/a',
                answer2: 'Potrafię się otworzyć po pewnym czasie',
                answer3:
                  'Zależy od sytuacji, ale zazwyczaj jestem w stanie nawiązać rozmowę',
                answer4: 'Bardzo łatwo inicjuję rozmowy z nieznajomymi',
              },
            },
            category3: {
              title: 'Kategoria 3',
              question1: {
                text: 'Co zazwyczaj robisz na imprezach?',
                answer1: 'Zbieram się w grupie znajomych i rozmawiamy',
                answer2:
                  'Rozmawiam z różnymi ludźmi, ale nie jestem zbyt otwarty/a',
                answer3: 'Raczej unikam dużych zgromadzeń',
                answer4:
                  'Jestem duszą towarzystwa, tańczę i rozmawiam z każdym',
              },
              question2: {
                text: 'Co sądzisz o publicznym okazywaniu uczuć?',
                answer1: 'Trzymam swoje uczucia dla siebie',
                answer2: 'Wyrażam uczucia w odpowiednich sytuacjach',
                answer3: 'Okazuję uczucia tylko w prywatności',
                answer4: 'Jawnie wyrażam swoje emocje w każdej sytuacji',
              },
              question3: {
                text: 'Jak najchętniej spędzasz czas z bliską osobą?',
                answer1: 'W domowym zaciszu, tylko we dwoje',
                answer2: 'Na spacerze lub w restauracji',
                answer3: 'Preferuję indywidualne spotkania',
                answer4: 'Na dużych imprezach i wydarzeniach społecznych',
              },
              question4: {
                text: 'Co jest dla Ciebie ważne w związku?',
                answer1: 'Prywatność i spokój',
                answer2: 'Spontaniczność i aktywność',
                answer3: 'Wzajemne zrozumienie i wsparcie',
                answer4: 'Wspólne wyjścia i imprezy',
              },
              question5: {
                text: 'Jakie jest Twoje podejście do pierwszego pocałunku?',
                answer1: 'Oczekuję, że druga osoba podejmie inicjatywę',
                answer2:
                  'Zależy od sytuacji, ale zazwyczaj to ja inicjuję pocałunek',
                answer3:
                  'Czekam na odpowiedni moment, ale jestem otwarty/a na inicjatywę',
                answer4: 'Nie waham się zainicjować pierwszego pocałunku',
              },
            },
          },
          settings: {
            title: 'Ustawienia',
            theme: {
              title: 'Motyw',
              button: {
                light: 'Jasny',
                dark: 'Ciemny',
              },
            },
            language: {
              title: 'Język',
              button: {
                pl: 'Polski',
                en: 'Angielski',
              },
            },
            font: {
              title: 'Czcionka',
              button: {
                small: 'Mała',
                large: 'Duża',
              },
            },
          },
          chat: {
            loadFailMessage: 'Nie udało się załadować danych czatu',
            messagePlaceholder: 'Wpisz wiadomość...',
            sendButton: 'Wyślij',
          },
        },
      },
      en: {
        translation: {
          welcome: {
            header: {
              text: 'Already have an account?',
              button: 'Sign in',
            },
            heroBanner: {
              text: 'Find your match with ',
              findher: 'Find(h)er',
              button: 'Sign up',
            },
          },
          signUp: {
            validation: {
              email: 'Invalid email address',
              password: 'Password must contain at least 8 characters',
              confirmPassword: 'Passwords do not match',
            },
            successMessage: 'Account has been registered successfully',
            confirmRequest: 'To log in, confirm your email address',
            loginButtonText: 'Sign in',
            form: {
              title: 'Sign up',
              email: 'Email',
              password: 'Password',
              confirmPassword: 'Confirm password',
              button: {
                signUp: 'Sign up',
                signIn: 'I already have an account',
              },
            },
          },
          signIn: {
            form: {
              title: 'Sign in',
              button: {
                signIn: 'Sign in',
                signUp: 'Sign up',
              },
            },
          },
          sidebar: {
            home: 'Home',
            account: 'Account',
            preferences: 'Preferences',
            interests: 'Interests',
            matchForm: 'Match form',
            settings: 'Settings',
            chat: 'Chat',
          },
          home: {
            age: 'Age:',
            gender: 'Gender:',
            details: 'Details',
            fetchFailMessage: 'Failed to fetch profiles',
          },
          account: {
            fetchIdFailMessage: 'Failed to fetch id',
            name: 'Name',
            age: 'Age',
            gender: 'Gender',
            editButton: 'Edit profile',
            editForm: {
              title: 'Edit profile',
              name: 'Name:',
              age: 'Age:',
              description: 'Description:',
              gender: 'Gender:',
              picture: 'Picture:',
              button: 'Submit',
            },
          },
          preferences: {
            title: 'Preferences',
            cardTitle: {
              culinary: 'Culinary',
              culture: 'Culture',
              personal: 'Personal',
            },
          },
          interests: {
            title: 'Interests',
            cardTitle: {
              entertainment: 'Entertainment',
            },
          },
          matchForm: {
            fetchFailMessage: 'Failed to fetch questions',
            answerFieldPlaceholder: 'Answer',
            confirmAnswersText: 'Are you sure about your answers?',
            button: {
              back: 'Back',
              next: 'Next',
              submit: 'Submit',
            },
            category1: {
              title: 'Category 1',
              question1: {
                text: 'How do you usually spend your free time?',
                answer1: 'I read books or watch movies alone',
                answer2: 'I meet friends for coffee or tea',
                answer3: 'I prefer individual activities such as walks',
                answer4: 'I go to parties or social events',
              },
              question2: {
                text: 'How would you describe your dating preferences?',
                answer1: 'I prefer quiet and intimate meetings',
                answer2: 'I like spontaneous dates in cafes or restaurants',
                answer3: 'I feel best when we are alone, away from crowds',
                answer4: 'I love big social gatherings and parties',
              },
              question3: {
                text: 'What place do you choose for a first date?',
                answer1: 'A small cafe with peace and quiet',
                answer2: 'A new restaurant in the city center',
                answer3: 'Park or outdoor place',
                answer4: 'Popular place with a lot of people',
              },
              question4: {
                text: 'How do you react to an unexpected party invitation?',
                answer1: 'I will probably refuse and stay at home',
                answer2: 'I would consider going',
                answer3:
                  'I will accept it if I can bring someone close with me',
                answer4:
                  'I will gladly accept the invitation and prepare for a good time',
              },
              question5: {
                text: 'What do you consider an ideal date?',
                answer1: 'Quiet meeting by candlelight at home',
                answer2: 'Dinner in a restaurant with good food',
                answer3: 'A walk in the park or along the beach at sunset',
                answer4: 'Dance party or concert',
              },
            },
            category2: {
              title: 'Category 2',
              question1: {
                text: 'How do you usually spend your weekends?',
                answer1: 'I read, paint, do something creative at home',
                answer2: 'I meet friends at parties',
                answer3: 'I explore the area alone',
                answer4: 'I take part in social events',
              },
              question2: {
                text: 'How often do you need time for yourself?',
                answer1: 'Very often, I need solitude',
                answer2: 'Sometimes, but I like to spend time with others',
                answer3:
                  'I spend a lot of time alone, but I like to meet friends',
                answer4: 'Rarely, I am always open to company',
              },
              question3: {
                text: 'How do you react to an invitation to travel together?',
                answer1: 'I need time to think, but I will probably refuse',
                answer2: 'I would consider accepting the invitation',
                answer3: 'I would be happy, but I prefer to travel alone',
                answer4:
                  'I would be happy to agree, traveling is always better in company',
              },
              question4: {
                text: 'What is your approach to making new acquaintances?',
                answer1: 'I prefer to stay in my circle of friends',
                answer2:
                  'I initiate conversations, but I prefer when others take the initiative',
                answer3:
                  'I am open to new acquaintances, but I do not always initiate conversations',
                answer4:
                  'I have no problem making new acquaintances, I am very open to other people',
              },
              question5: {
                text: 'How do you rate your ability to talk to strangers?',
                answer1: 'I am not very communicative',
                answer2: 'I can open up after some time',
                answer3:
                  'It depends on the situation, but I am usually able to start a conversation',
                answer4: 'I easily initiate conversations with strangers',
              },
            },
            category3: {
              title: 'Category 3',
              question1: {
                text: 'What do you usually do at parties?',
                answer1: 'I gather in a group of friends and talk',
                answer2: 'I talk to different people, but I am not very open',
                answer3: 'I tend to avoid large gatherings',
                answer4:
                  'I am the life of the party, I dance and talk to everyone',
              },
              question2: {
                text: 'What do you think about public displays of affection?',
                answer1: 'I keep my feelings to myself',
                answer2: 'I express feelings in appropriate situations',
                answer3: 'I show affection only in private',
                answer4: 'I openly express my emotions in any situation',
              },
              question3: {
                text: 'How do you prefer to spend time with a close person?',
                answer1: 'In the comfort of home, just the two of us',
                answer2: 'On a walk or in a restaurant',
                answer3: 'I prefer individual meetings',
                answer4: 'At large parties and social events',
              },
              question4: {
                text: 'What is important to you in a relationship?',
                answer1: 'Privacy and peace',
                answer2: 'Spontaneity and activity',
                answer3: 'Mutual understanding and support',
                answer4: 'Joint outings and parties',
              },
              question5: {
                text: 'What is your approach to the first kiss?',
                answer1: 'I expect the other person to take the initiative',
                answer2:
                  'It depends on the situation, but I usually initiate the kiss',
                answer3:
                  'I wait for the right moment, but I am open to the initiative',
                answer4: 'I do not hesitate to initiate the first kiss',
              },
            },
          },
          settings: {
            title: 'Settings',
            theme: {
              title: 'Theme',
              button: {
                light: 'Light',
                dark: 'Dark',
              },
            },
            language: {
              title: 'Language',
              button: {
                pl: 'Polish',
                en: 'English',
              },
            },
            font: {
              title: 'Font',
              button: {
                small: 'Small',
                large: 'Large',
              },
            },
          },
          chat: {
            loadFailMessage: 'Failed to load chat data',
            messagePlaceholder: 'Type a message...',
            sendButton: 'Send',
          },
        },
      },
    },
  })

export default i18n
