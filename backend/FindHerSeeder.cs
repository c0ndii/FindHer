using Azure;
using Find_H_er.Entities;
using System.Net;

namespace Find_H_er
{
#pragma warning disable IDE1006 // Style nazewnictwa
    public class FindHerSeeder
#pragma warning restore IDE1006 // Style nazewnictwa
    {
        private readonly AppDbContext _context;
        public void Seed()
        {
            if (_context.Database.CanConnect())
            {
                if (!_context.Roles.Any())
                {
                    var roles = GetRoles();
                    _context.Roles.AddRange(roles);
                    _context.SaveChanges();
                }
                if (!_context.MatchForms.Any())
                {
                    var questions = GetMatchform();
                    _context.MatchForms.AddRange(questions);
                    _context.SaveChanges();
                }
            }
            
            
        }
        public FindHerSeeder(AppDbContext context)
        {
            _context = context;
        }
        private static IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"
                },
                new Role()
                {
                    Name = "Admin"
                },
            };
            return roles;
        }
        private static IEnumerable<MatchForm> GetMatchform()
        {
            var questions = new List<Question>()
            {
                new Question()
                {
                    QuestionContent = "Jak spędzasz zazwyczaj swój wolny czas?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Czytam książki lub oglądam filmy sam(a)",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Spotykam się z przyjaciółmi na kawę lub herbatę",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Preferuję indywidualne zajęcia, takie jak spacery",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Wychodzę na imprezy lub wydarzenia społeczne",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak opisujesz swoje preferencje dotyczące randkowania?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Wolę spokojne i kameralne spotkania",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Lubię spontaniczne randki w kawiarniach lub restauracjach",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Czuje się najlepiej, gdy jestem na dwóch, z dala od tłumów",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Uwielbiam duże spotkania towarzyskie i imprezy",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jakie miejsce wybierasz na pierwszą randkę?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Mała kawiarnia z cichą atmosferą",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Nowa restauracja w centrum miasta",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Park lub miejsce na świeżym powietrzu",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Popularne miejsce z dużą ilością ludzi",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak reagujesz na niespodziewane zaproszenie na imprezę?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Prawdopodobnie odmówię i wolę zostać w domu",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Zastanowiłbym/am się, ale mogę się pojawić",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Sprawdzę, czy mogę zabrać ze sobą znajomego/znajomą",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Z przyjemnością wezmę udział i przygotuję się do dobrej zabawy",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Co uważasz za idealną randkę?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Ciche spotkanie przy świecach w domu",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Kolacja w restauracji z dobrym jedzeniem",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Spacer w parku lub wzdłuż plaży o zachodzie słońca",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Impreza taneczna lub koncert",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak najczęściej spędzasz weekendy?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Czytam, maluję, czy robię coś kreatywnego w domu",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Spotykam się z przyjaciółmi na imprezy",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Eksploruję okoliczne miejsca w pojedynkę",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Biorę udział w różnych wydarzeniach społecznych",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak często potrzebujesz czasu dla siebie?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Bardzo często, potrzebuję samotności",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Czasami, ale lubię być w towarzystwie",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Spędzam dużo czasu sam(a), ale zdarza się spotykać z ludźmi",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko, zawsze jestem otwarty/a na towarzystwo",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak reagujesz na zaproszenie na wspólną podróż?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Potrzebuję czasu na zastanowienie się, ale prawdopodobnie odmówię",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Zastanowiłbym/am się, ale mogę się zgodzić",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Cieszyłbym/am się, ale preferuję podróże solo",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Z przyjemnością się zgadzam, uwielbiam podróże z innymi",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jakie jest Twoje podejście do zdobywania nowych znajomości?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Wolę zostać w cieniu i pozwolić innym się zbliżyć",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Inicjuję rozmowy, ale lubię, gdy ktoś podejdzie do mnie",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Otwarty/a na nowe znajomości, ale nie inicjuję zbyt często",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Bez problemu nawiązuję nowe znajomości, jestem bardzo otwarty/a",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak oceniasz swoją zdolność do rozmowy z nieznajomymi?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Nie jestem zbyt komunikatywny/a",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Potrafię się otworzyć po pewnym czasie",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Zależy od sytuacji, czasem jestem otwarty/a, czasem nie",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Bardzo łatwo nawiązuję nowe kontakty",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Co zazwyczaj robisz w czasie imprez?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Zbieram się w jednym miejscu z niewielką grupą",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Rozmawiam z różnymi osobami, ale niekoniecznie tańczę",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Raczej unikam dużych zgromadzeń",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem duszą towarzystwa, tańczę i rozmawiam z wieloma osobami",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jakie jest Twoje podejście do publicznego wyrażania uczuć?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Trzymam emocje dla siebie",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Wyrażam uczucia w odpowiednich sytuacjach",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Okazuję uczucia w prywatności, ale nie publicznie",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam swoje emocje w każdej sytuacji",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak najchętniej spędzasz czas z bliską osobą?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "W domowym zaciszu, tylko we dwoje",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Na wspólnych spacerach lub w restauracjach",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Zazwyczaj preferuję indywidualne spotkania",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Na dużych imprezach i wydarzeniach społecznych",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Co jest dla Ciebie ważne w związku?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Prywatność i spokój",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Spontaniczność i aktywność",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Wzajemne zrozumienie i szacunek",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Wspólne doświadczenia i aktywności społeczne",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jakie jest Twoje podejście do pierwszego pocałunku?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Oczekuję, że partner zainicjuje pierwszy krok",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Zależy od sytuacji, ale mogę zrobić pierwszy krok",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Czekam na odpowiedni moment",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Nie waham się zainicjować pierwszego pocałunku",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak reagujesz na sytuacje konfliktowe w związku?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Wycofuję się i potrzebuję czasu na przemyślenie",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Staram się rozwiązać konflikt poprzez rozmowę",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Unikam konfliktów, ale staram się unikać sporów",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam swoje uczucia i staram się rozwiązać sytuację",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jakie jest Twoje podejście do planowania przyszłości w związku?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Wolę żyć chwilą, nie myślę zbyt wiele o przyszłości",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Planuję przyszłość, ale z elastycznością",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Czasami myślę o przyszłości, ale nie planuję z góry",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Planuję szczegółowo przyszłość i cele związane z związkiem",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak często potrzebujesz przestrzeni w związku?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Często, potrzebuję dużo czasu dla siebie",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Czasami, ale lubię też być z partnerem",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko, ale doceniam czas sam na sam z partnerem",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko, preferuję spędzanie czasu z partnerem",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak oceniasz swoją gotowość do poznawania nowych osób?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Nie jestem zbyt otwarty/a na nowe znajomości",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem otwarty/a, ale z pewnym wahaniem",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam chęć poznawania nowych osób",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem bardzo otwarty/a na nowe znajomości",
                            AnswerLetter = "D",
                        },
                    }
                },
                new Question()
                {
                    QuestionContent = "Jak opisujesz swoje podejście do romantycznych gestów?",
                    Answers = new List<Answer>()
                    {
                        new Answer()
                        {
                            AnswerContent = "Bardziej skłonny/a do subtelnych gestów w cztery oczy",
                            AnswerLetter = "A",
                        },
                        new Answer()
                        {
                            AnswerContent = "Lubię romantyczne gesty, ale bez przesady",
                            AnswerLetter = "B",
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko angażuję się w romantyczne gesty",
                            AnswerLetter = "C",
                        },
                        new Answer()
                        {
                            AnswerContent = "Uwielbiam romantyczne gesty i uwielbiam je publicznie",
                            AnswerLetter = "D",
                        },
                    }
                },
            };
            var matchform = new MatchForm()
            {
                Questions = questions
            };
            yield return matchform;
        }

    }
}
