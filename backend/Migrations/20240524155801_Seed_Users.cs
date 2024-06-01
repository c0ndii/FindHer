using System.Text;
using Find_H_er.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Users : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var passwordHasher = new PasswordHasher<User>();

            var users = new List<User>
            {
                new User
                {
                    UserId = 1,
                    Email = "user1@wp.pl",
                    Name = "Adam",
                    VerificationToken = "randomToken1",
                    Age = 24,
                    Sex = "Man",
                    Description = "I am a 24 year old blue collar worker",
                    VideoChatConnectionId = Guid.NewGuid().ToString(),
                    RoleId = 1 
                },
                new User
                {
                    UserId = 2,
                    Email = "user2@wp.pl",
                    Name = "Andrzej",
                    Sex = "Other",
                    Age = 21,
                    VerificationToken = "randomToken2",
                    Description = string.Empty,
                    VideoChatConnectionId = Guid.NewGuid().ToString(),
                    RoleId = 2
                },
                new User
                {
                    UserId = 3,
                    Email = "user3@wp.pl",
                    Name = "Beata",
                    Sex = "Woman",
                    Age = 24,
                    Description = string.Empty,
                    VerificationToken = "randomToken3",
                    VideoChatConnectionId = Guid.NewGuid().ToString(),
                    RoleId = 1
                },
                new User
                {
                    UserId = 4,
                    Email = "user4@wp.pl",
                    Name = "Cecylia",
                    Sex = "Woman",
                    Age = 18,
                    Description = string.Empty,
                    VerificationToken = "randomToken4",
                    VideoChatConnectionId = Guid.NewGuid().ToString(),
                    RoleId = 1 
                }
            };

            foreach (var user in users)
            {
                user.PasswordHash = passwordHasher.HashPassword(user, "test12345");
            }

            var sb = new StringBuilder();

            sb.AppendLine("SET IDENTITY_INSERT Users ON;");

            foreach (var user in users)
            {
                sb.AppendLine(
                $"""
                    INSERT INTO Users (UserId, Email, PasswordHash, Name, VerificationToken, RoleId, MatchFormScore, VideoChatConnectionId, Sex, Age, Description) 
                    VALUES ({user.UserId}, '{user.Email}', '{user.PasswordHash}', '{user.Name}', '{user.VerificationToken}', 
                            {user.RoleId}, {user.MatchFormScore ?? 50}, '{user.VideoChatConnectionId}', '{user.Sex}', '{user.Age}', '{user.Description}');
                """);
                
                sb.AppendLine(
                $"""
                    INSERT INTO MatchForms 
                    VALUES ({user.UserId}, {user.UserId});
                """);
            }

            sb.AppendLine("SET IDENTITY_INSERT Users OFF;");
                
            sb.AppendLine(
                """
                DECLARE @QuestionIds TABLE (QuestionId INT);
            
                INSERT INTO @QuestionIds (QuestionId)
                SELECT QuestionId FROM Questions;

                DECLARE @MatchFormId INT;

                DECLARE MatchFormCursor CURSOR FOR
                SELECT MatchFormId FROM MatchForms;

                OPEN MatchFormCursor;

                FETCH NEXT FROM MatchFormCursor INTO @MatchFormId;

                WHILE @@FETCH_STATUS = 0
                BEGIN
                INSERT INTO MatchFormQuestion (MatchFormsMatchFormId, QuestionsQuestionId)
                SELECT @MatchFormId, QuestionId FROM @QuestionIds;

                FETCH NEXT FROM MatchFormCursor INTO @MatchFormId;
                END

                CLOSE MatchFormCursor;
                DEALLOCATE MatchFormCursor;
            """);
            
            migrationBuilder.Sql(sb.ToString());
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
