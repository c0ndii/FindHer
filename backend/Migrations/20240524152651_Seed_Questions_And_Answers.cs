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

            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (1,  'Hobbies');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (2,  'Casual');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (3,  'Cafe');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (4,  'Spontaneous');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (5,  'Romantic');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (6,  'Relaxing');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (7,  'Alone');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (8,  'Excited');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (9,  'Open');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (10, 'Comfortable');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (11, 'Socializing');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (12, 'Reserved');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (13, 'Quality');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (14, 'Trust');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (15, 'Intimate');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (16, 'Calm');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (17, 'Future');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (18, 'Space');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (19, 'Willing');
            INSERT INTO Questions (QuestionId, QuestionContent) VALUES (20, 'Gestures');

            SET IDENTITY_INSERT Questions OFF;

            SET IDENTITY_INSERT Answers ON;

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (1, 'answer1', 'A', -10, 1);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (2, 'answer2', 'B', -5, 1);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (3, 'answer3', 'C', 5, 1);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (4, 'answer4', 'D', 10, 1);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (5, 'answer5', 'A', -10, 2);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (6, 'answer6', 'B', -5, 2);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (7, 'answer7', 'C', 5, 2);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (8, 'answer8', 'D', 10, 2);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (9, 'answer9', 'A', -10, 3);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (10, 'answer10', 'B', -5, 3);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (11, 'answer11', 'C', 5, 3);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (12, 'answer12', 'D', 10, 3);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (13, 'answer13', 'A', -10, 4);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (14, 'answer14', 'B', -5, 4);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (15, 'answer15', 'C', 5, 4);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (16, 'answer16', 'D', 10, 4);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (17, 'answer17', 'A', -10, 5);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (18, 'answer18', 'B', -5, 5);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (19, 'answer19', 'C', 5, 5);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (20, 'answer20', 'D', 10, 5);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (21, 'answer21', 'A', -10, 6);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (22, 'answer22', 'B', -5, 6);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (23, 'answer23', 'C', 5, 6);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (24, 'answer24', 'D', 10, 6);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (25, 'answer25', 'A', -10, 7);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (26, 'answer26', 'B', -5, 7);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (27, 'answer27', 'C', 5, 7);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (28, 'answer28', 'D', 10, 7);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (29, 'answer29', 'A', -10, 8);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (30, 'answer30', 'B', -5, 8);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (31, 'answer31', 'C', 5, 8);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (32, 'answer32', 'D', 10, 8);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (33, 'answer33', 'A', -10, 9);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (34, 'answer34', 'B', -5, 9);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (35, 'answer35', 'C', 5, 9);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (36, 'answer36', 'D', 10, 9);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (37, 'answer37', 'A', -10, 10);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (38, 'answer38', 'B', -5, 10);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (39, 'answer39', 'C', 5, 10);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (40, 'answer40', 'D', 10, 10);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (41, 'answer41', 'A', -10, 11);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (42, 'answer42', 'B', -5, 11);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (43, 'answer43', 'C', 5, 11);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (44, 'answer44', 'D', 10, 11);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (45, 'answer45', 'A', -10, 12);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (46, 'answer46', 'B', -5, 12);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (47, 'answer47', 'C', 5, 12);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (48, 'answer48', 'D', 10, 12);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (49, 'answer49', 'A', -10, 13);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (50, 'answer50', 'B', -5, 13);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (51, 'answer51', 'C', 5, 13);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (52, 'answer52', 'D', 10, 13);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (53, 'answer53', 'A', -10, 14);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (54, 'answer54', 'B', -5, 14);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (55, 'answer55', 'C', 5, 14);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (56, 'answer56', 'D', 10, 14);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (57, 'answer57', 'A', -10, 15);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (58, 'answer58', 'B', -5, 15);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (59, 'answer59', 'C', 5, 15);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (60, 'answer60', 'D', 10, 15);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (61, 'answer61', 'A', -10, 16);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (62, 'answer62', 'B', -5, 16);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (63, 'answer63', 'C', 5, 16);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (64, 'answer64', 'D', 10, 16);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (65, 'answer65', 'A', -10, 17);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (66, 'answer66', 'B', -5, 17);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (67, 'answer67', 'C', 5, 17);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (68, 'answer68', 'D', 10, 17);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (69, 'answer69', 'A', -10, 18);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (70, 'answer70', 'B', -5, 18);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (71, 'answer71', 'C', 5, 18);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (72, 'answer72', 'D', 10, 18);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (73, 'answer73', 'A', -10, 19);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (74, 'answer74', 'B', -5, 19);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (75, 'answer75', 'C', 5, 19);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (76, 'answer76', 'D', 10, 19);

INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (77, 'answer77', 'A', -10, 20);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (78, 'answer78', 'B', -5, 20);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (79, 'answer79', 'C', 5, 20);
INSERT INTO Answers (AnswerId, AnswerContent, AnswerLetter, AnswerWeight, QuestionId) VALUES (80, 'answer80', 'D', 10, 20);

            SET IDENTITY_INSERT Answers OFF;
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
