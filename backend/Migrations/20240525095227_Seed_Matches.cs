using System.Text;
using Find_H_er.Entities;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Matches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var matches = new List<Match>
            {
                new Match { MatchId = 1, ViewerId = 1, ViewedId = 2, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 2, ViewerId = 1, ViewedId = 3, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 3, ViewerId = 1, ViewedId = 4, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 5, ViewerId = 2, ViewedId = 3, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 6, ViewerId = 2, ViewedId = 4, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 9, ViewerId = 3, ViewedId = 4, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 10, ViewerId = 5, ViewedId = 6, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 11, ViewerId = 7, ViewedId = 1, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 12, ViewerId = 1, ViewedId = 8, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false },
                new Match { MatchId = 13, ViewerId = 1, ViewedId = 9, Cancelled = false, MatchedViewer = false, MatchedViewed = false, Matched = false }
            };
            var sb = new StringBuilder();

            sb.AppendLine("SET IDENTITY_INSERT Matches ON;");

            foreach (var match in matches)
            {
                sb.AppendLine($@"
                    INSERT INTO Matches (MatchId, ViewerId, ViewedId, Cancelled, MatchedViewer, MatchedViewed, Matched) 
                    VALUES ({match.MatchId}, {match.ViewerId}, {match.ViewedId}, {Convert.ToInt32(match.Cancelled)}, 
                            {Convert.ToInt32(match.MatchedViewer)}, {Convert.ToInt32(match.MatchedViewed)}, {Convert.ToInt32(match.Matched)});
                ");
            }

            sb.AppendLine("SET IDENTITY_INSERT Matches OFF;");

            migrationBuilder.Sql(sb.ToString());
    
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
