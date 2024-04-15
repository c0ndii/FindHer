using Azure;
using Find_H_er.Entities;
using System.Net;
using Find_H_er.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Find_H_er.Exceptions;

namespace Find_H_er
{
#pragma warning disable IDE1006 // Style nazewnictwa
    public class FindHerSeeder
#pragma warning restore IDE1006 // Style nazewnictwa
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAccountService _accountService;

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
                if (!_context.Questions.Any())
                {
                    var questions = GetQuestions();
                    _context.Questions.AddRange(questions);
                    _context.SaveChanges();
                }
                if (!_context.Users.Any())
                {
                    _context.Users.Add(GetAdmin());
                    _context.SaveChanges();
                    PrepareUsers();
                }
            }      
        }
        public FindHerSeeder(AppDbContext context, IPasswordHasher<User> passwordHasher, IAccountService accountService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _accountService = accountService;
        }

        private User GetAdmin()
        {
            var adminRole = _context.Roles.SingleOrDefault(x => x.Name == "Admin");
            var user = new User()
            {
                Email = "admin@admin.com",
                Role = adminRole,
            };

            var passwordHash = _passwordHasher.HashPassword(user, "Admin123..");
            user.PasswordHash = passwordHash;
            return user;
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
                new Role()
                {
                    Name = "Unconfirmed"
                },
                new Role()
                {
                    Name = "Banned"
                }
            };
            return roles;
        }
        private async Task PrepareUsers()
        {
            var userRole = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "User");
            var user = new User()
            {
                Email = "user1@wp.pl",
                Name = "Adam",
                VerificationToken = _accountService.CreateRandomToken(),
            };
            var hashedPassword = _passwordHasher.HashPassword(user, "test12345");
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "User");
            user.PasswordHash = hashedPassword;
            await _context.Users.AddAsync(user);
            var matchForm = new MatchForm()
            {
                Questions = await _context.Questions.ToListAsync(),
                UserId = user.UserId,
                User = user,
            };
            await _context.MatchForms.AddAsync(matchForm);
            user.MatchForm = matchForm;
            await _context.SaveChangesAsync();

            var user2 = new User()
            {
                Email = "user2@wp.pl",
                Name = "Andrzej",
                VerificationToken = _accountService.CreateRandomToken(),
            };
            var hashedPassword2 = _passwordHasher.HashPassword(user2, "test12345");
            user2.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "Unconfirmed");
            user2.PasswordHash = hashedPassword;
            await _context.Users.AddAsync(user2);
            var matchForm2 = new MatchForm()
            {
                Questions = await _context.Questions.ToListAsync(),
                UserId = user2.UserId,
                User = user2,
            };
            await _context.MatchForms.AddAsync(matchForm2);
            user2.MatchForm = matchForm2;
            await _context.SaveChangesAsync();

            var token1 = await _context.Users.SingleOrDefaultAsync(x => x.Email == "user1@wp.pl");
            var token2 = await _context.Users.SingleOrDefaultAsync(x => x.Email == "user2@wp.pl");

            await _accountService.VerifyEmail(token1.VerificationToken);
            await _accountService.VerifyEmail(token2.VerificationToken);

            var match = await _context.Matches.SingleOrDefaultAsync(x => (x.ViewerId == user.UserId && x.ViewedId == user2.UserId && x.Cancelled == false));

            match.Matched = true;
            var pair = new Pair()
            {
                SenderId = user2.UserId,
                ReceiverId = user.UserId,
            };
            await _context.AddAsync(pair);

            _context.Matches.Update(match);
            await _context.SaveChangesAsync();
        }
        private static IEnumerable<Question> GetQuestions()
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Spotykam się z przyjaciółmi na kawę lub herbatę",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Preferuję indywidualne zajęcia, takie jak spacery",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Wychodzę na imprezy lub wydarzenia społeczne",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Lubię spontaniczne randki w kawiarniach lub restauracjach",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Czuje się najlepiej, gdy jestem na dwóch, z dala od tłumów",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Uwielbiam duże spotkania towarzyskie i imprezy",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer() 
                        { 
                            AnswerContent = "Nowa restauracja w centrum miasta", 
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Park lub miejsce na świeżym powietrzu", 
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Popularne miejsce z dużą ilością ludzi", 
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Zastanowiłbym/am się, ale mogę się pojawić",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Sprawdzę, czy mogę zabrać ze sobą znajomego/znajomą",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Z przyjemnością wezmę udział i przygotuję się do dobrej zabawy",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Kolacja w restauracji z dobrym jedzeniem", 
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Spacer w parku lub wzdłuż plaży o zachodzie słońca",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Impreza taneczna lub koncert", 
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Spotykam się z przyjaciółmi na imprezy",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Eksploruję okoliczne miejsca w pojedynkę",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Biorę udział w różnych wydarzeniach społecznych",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Czasami, ale lubię być w towarzystwie", 
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        }, 
                        new Answer()
                        { 
                            AnswerContent = "Spędzam dużo czasu sam(a), ale zdarza się spotykać z ludźmi", 
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        }, 
                        new Answer() 
                        { 
                            AnswerContent = "Rzadko, zawsze jestem otwarty/a na towarzystwo", 
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Zastanowiłbym/am się, ale mogę się zgodzić",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Cieszyłbym/am się, ale preferuję podróże solo",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Z przyjemnością się zgadzam, uwielbiam podróże z innymi",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Inicjuję rozmowy, ale lubię, gdy ktoś podejdzie do mnie",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Otwarty/a na nowe znajomości, ale nie inicjuję zbyt często",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Bez problemu nawiązuję nowe znajomości, jestem bardzo otwarty/a",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Potrafię się otworzyć po pewnym czasie",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Zależy od sytuacji, czasem jestem otwarty/a, czasem nie",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Bardzo łatwo nawiązuję nowe kontakty",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Rozmawiam z różnymi osobami, ale niekoniecznie tańczę",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Raczej unikam dużych zgromadzeń",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem duszą towarzystwa, tańczę i rozmawiam z wieloma osobami",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Wyrażam uczucia w odpowiednich sytuacjach",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Okazuję uczucia w prywatności, ale nie publicznie",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam swoje emocje w każdej sytuacji",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Na wspólnych spacerach lub w restauracjach",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Zazwyczaj preferuję indywidualne spotkania",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Na dużych imprezach i wydarzeniach społecznych",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Spontaniczność i aktywność",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Wzajemne zrozumienie i szacunek",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Wspólne doświadczenia i aktywności społeczne",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Zależy od sytuacji, ale mogę zrobić pierwszy krok",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Czekam na odpowiedni moment",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Nie waham się zainicjować pierwszego pocałunku",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Staram się rozwiązać konflikt poprzez rozmowę",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Unikam konfliktów, ale staram się unikać sporów",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam swoje uczucia i staram się rozwiązać sytuację",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Planuję przyszłość, ale z elastycznością",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Czasami myślę o przyszłości, ale nie planuję z góry",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Planuję szczegółowo przyszłość i cele związane z związkiem",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Czasami, ale lubię też być z partnerem",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko, ale doceniam czas sam na sam z partnerem",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko, preferuję spędzanie czasu z partnerem",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem otwarty/a, ale z pewnym wahaniem",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jawnie wyrażam chęć poznawania nowych osób",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Jestem bardzo otwarty/a na nowe znajomości",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
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
                            AnswerLetter = 'A',
                            AnswerWeight = -10,
                        },
                        new Answer()
                        {
                            AnswerContent = "Lubię romantyczne gesty, ale bez przesady",
                            AnswerLetter = 'B',
                            AnswerWeight = -5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Rzadko angażuję się w romantyczne gesty",
                            AnswerLetter = 'C',
                            AnswerWeight = 5,
                        },
                        new Answer()
                        {
                            AnswerContent = "Uwielbiam romantyczne gesty i uwielbiam je publicznie",
                            AnswerLetter = 'D',
                            AnswerWeight = 10,
                        },
                    }
                },
            };
            return questions;
        }

    }
}
