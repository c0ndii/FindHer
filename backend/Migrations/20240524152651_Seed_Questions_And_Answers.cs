using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Questions_And_Answers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
             SET IDENTITY_INSERT Questions ON;

            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (1, 'Jak spędzasz zazwyczaj swój wolny czas?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (2, 'Jak opisujesz swoje preferencje dotyczące randkowania?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (3, 'Jakie miejsce wybierasz na pierwszą randkę?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (4, 'Jak reagujesz na niespodziewane zaproszenie na imprezę?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (5, 'Co uważasz za idealną randkę?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (6, 'Jak najczęściej spędzasz weekendy?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (7, 'Jak często potrzebujesz czasu dla siebie?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (8, 'Jak reagujesz na zaproszenie na wspólną podróż?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (9, 'Jakie jest Twoje podejście do zdobywania nowych znajomości?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (10, 'Jak oceniasz swoją zdolność do rozmowy z nieznajomymi?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (11, 'Co zazwyczaj robisz w czasie imprez?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (12, 'Jakie jest Twoje podejście do publicznego wyrażania uczuć?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (13, 'Jak najchętniej spędzasz czas z bliską osobą?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (14, 'Co jest dla Ciebie ważne w związku?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (15, 'Jakie jest Twoje podejście do pierwszego pocałunku?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (16, 'Jak reagujesz na sytuacje konfliktowe w związku?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (17, 'Jakie jest Twoje podejście do planowania przyszłości w związku?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (18, 'Jak często potrzebujesz przestrzeni w związku?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (19, 'Jak oceniasz swoją gotowość do poznawania nowych osób?');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (20, 'Jak opisujesz swoje podejście do romantycznych gestów?');

            SET IDENTITY_INSERT Questions OFF;

            SET IDENTITY_INSERT Answers ON;

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (1, 'Czytam książki lub oglądam filmy sam(a)', 'A', -10, 1);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (2, 'Spotykam się z przyjaciółmi na kawę lub herbatę', 'B', -5, 1);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (3, 'Preferuję indywidualne zajęcia, takie jak spacery', 'C', 5, 1);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (4, 'Wychodzę na imprezy lub wydarzenia społeczne', 'D', 10, 1);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (5, 'Wolę spokojne i kameralne spotkania', 'A', -10, 2);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (6, 'Lubię spontaniczne randki w kawiarniach lub restauracjach', 'B', -5, 2);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (7, 'Czuje się najlepiej, gdy jestem na dwóch, z dala od tłumów', 'C', 5, 2);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (8, 'Uwielbiam duże spotkania towarzyskie i imprezy', 'D', 10, 2);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (9, 'Mała kawiarnia z cichą atmosferą', 'A', -10, 3);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (10, 'Nowa restauracja w centrum miasta', 'B', -5, 3);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (11, 'Park lub miejsce na świeżym powietrzu', 'C', 5, 3);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (12, 'Popularne miejsce z dużą ilością ludzi', 'D', 10, 3);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (13, 'Prawdopodobnie odmówię i wolę zostać w domu', 'A', -10, 4);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (14, 'Zastanowiłbym/am się, ale mogę się pojawić', 'B', -5, 4);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (15, 'Sprawdzę, czy mogę zabrać ze sobą znajomego/znajomą', 'C', 5, 4);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (16, 'Z przyjemnością wezmę udział i przygotuję się do dobrej zabawy', 'D', 10, 4);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (17, 'Ciche spotkanie przy świecach w domu', 'A', -10, 5);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (18, 'Kolacja w restauracji z dobrym jedzeniem', 'B', -5, 5);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (19, 'Spacer w parku lub wzdłuż plaży o zachodzie słońca', 'C', 5, 5);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (20, 'Impreza taneczna lub koncert', 'D', 10, 5);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (21, 'Czytam, maluję, czy robię coś kreatywnego w domu', 'A', -10, 6);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (22, 'Spotykam się z przyjaciółmi na imprezy', 'B', -5, 6);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (23, 'Eksploruję okoliczne miejsca w pojedynkę', 'C', 5, 6);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (24, 'Biorę udział w różnych wydarzeniach społecznych', 'D', 10, 6);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (25, 'Bardzo często, potrzebuję samotności', 'A', -10, 7);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (26, 'Czasami, ale lubię być w towarzystwie', 'B', -5, 7);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (27, 'Spędzam dużo czasu sam(a), ale zdarza się spotykać z ludźmi', 'C', 5, 7);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (28, 'Rzadko, zawsze jestem otwarty/a na towarzystwo', 'D', 10, 7);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (29, 'Potrzebuję czasu na zastanowienie się, ale prawdopodobnie odmówię', 'A', -10, 8);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (30, 'Zastanowiłbym/am się, ale mogę się zgodzić', 'B', -5, 8);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (31, 'Cieszyłbym/am się, ale preferuję podróże solo', 'C', 5, 8);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (32, 'Z przyjemnością się zgadzam, uwielbiam podróże z innymi', 'D', 10, 8);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (33, 'Wolę zostać w cieniu i pozwolić innym się zbliżyć', 'A', -10, 9);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (34, 'Inicjuję rozmowy, ale lubię, gdy ktoś podejdzie do mnie', 'B', -5, 9);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (35, 'Otwarty/a na nowe znajomości, ale nie inicjuję zbyt często', 'C', 5, 9);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (36, 'Bez problemu nawiązuję nowe znajomości, jestem bardzo otwarty/a', 'D', 10, 9);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (37, 'Nie jestem zbyt komunikatywny/a', 'A', -10, 10);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (38, 'Potrafię się otworzyć po pewnym czasie', 'B', -5, 10);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (39, 'Zależy od sytuacji, czasem jestem otwarty/a, czasem nie', 'C', 5, 10);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (40, 'Bardzo łatwo nawiązuję nowe kontakty', 'D', 10, 10);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (41, 'Zbieram się w jednym miejscu z niewielką grupą', 'A', -10, 11);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (42, 'Rozmawiam z różnymi osobami, ale niekoniecznie tańczę', 'B', -5, 11);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (43, 'Raczej unikam dużych zgromadzeń', 'C', 5, 11);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (44, 'Jestem duszą towarzystwa, tańczę i rozmawiam z wieloma osobami', 'D', 10, 11);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (45, 'Trzymam emocje dla siebie', 'A', -10, 12);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (46, 'Wyrażam uczucia w odpowiednich sytuacjach', 'B', -5, 12);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (47, 'Okazuję uczucia w prywatności, ale nie publicznie', 'C', 5, 12);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (48, 'Jawnie wyrażam swoje emocje w każdej sytuacji', 'D', 10, 12);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (49, 'W domowym zaciszu, tylko we dwoje', 'A', -10, 13);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (50, 'Na wspólnych spacerach lub w restauracjach', 'B', -5, 13);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (51, 'Zazwyczaj preferuję indywidualne spotkania', 'C', 5, 13);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (52, 'Na dużych imprezach i wydarzeniach społecznych', 'D', 10, 13);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (53, 'Prywatność i spokój', 'A', -10, 14);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (54, 'Spontaniczność i aktywność', 'B', -5, 14);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (55, 'Wzajemne zrozumienie i szacunek', 'C', 5, 14);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (56, 'Wspólne doświadczenia i aktywności społeczne', 'D', 10, 14);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (57, 'Oczekuję, że partner zainicjuje pierwszy krok', 'A', -10, 15);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (58, 'Zależy od sytuacji, ale mogę zrobić pierwszy krok', 'B', -5, 15);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (59, 'Czekam na odpowiedni moment', 'C', 5, 15);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (60, 'Nie waham się zainicjować pierwszego pocałunku', 'D', 10, 15);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (61, 'Wycofuję się i potrzebuję czasu na przemyślenie', 'A', -10, 16);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (62, 'Staram się rozwiązać konflikt poprzez rozmowę', 'B', -5, 16);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (63, 'Unikam konfliktów, ale staram się unikać sporów', 'C', 5, 16);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (64, 'Jawnie wyrażam swoje uczucia i staram się rozwiązać sytuację', 'D', 10, 16);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (65, 'Wolę żyć chwilą, nie myślę zbyt wiele o przyszłości', 'A', -10, 17);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (66, 'Planuję przyszłość, ale z elastycznością', 'B', -5, 17);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (67, 'Czasami myślę o przyszłości, ale nie planuję z góry', 'C', 5, 17);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (68, 'Planuję szczegółowo przyszłość i cele związane z związkiem', 'D', 10, 17);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (69, 'Często, potrzebuję dużo czasu dla siebie', 'A', -10, 18);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (70, 'Czasami, ale lubię też być z partnerem', 'B', -5, 18);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (71, 'Rzadko, ale doceniam czas sam na sam z partnerem', 'C', 5, 18);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (72, 'Rzadko, preferuję spędzanie czasu z partnerem', 'D', 10, 18);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (73, 'Nie jestem zbyt otwarty/a na nowe znajomości', 'A', -10, 19);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (74, 'Jestem otwarty/a, ale z pewnym wahaniem', 'B', -5, 19);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (75, 'Jawnie wyrażam chęć poznawania nowych osób', 'C', 5, 19);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (76, 'Jestem bardzo otwarty/a na nowe znajomości', 'D', 10, 19);

            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (77, 'Bardziej skłonny/a do subtelnych gestów w cztery oczy', 'A', -10, 20);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (78, 'Lubię romantyczne gesty, ale bez przesady', 'B', -5, 20);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (79, 'Rzadko angażuję się w romantyczne gesty', 'C', 5, 20);
            INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (80, 'Uwielbiam romantyczne gesty i uwielbiam je publicznie', 'D', 10, 20);

            SET IDENTITY_INSERT Answers OFF;
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
