using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class matchformss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_MatchForms_MatchFormId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_MatchFormId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "MatchFormId",
                table: "Questions");

            migrationBuilder.CreateTable(
                name: "MatchFormQuestion",
                columns: table => new
                {
                    MatchFormsMatchFormId = table.Column<int>(type: "int", nullable: false),
                    QuestionsQuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchFormQuestion", x => new { x.MatchFormsMatchFormId, x.QuestionsQuestionId });
                    table.ForeignKey(
                        name: "FK_MatchFormQuestion_MatchForms_MatchFormsMatchFormId",
                        column: x => x.MatchFormsMatchFormId,
                        principalTable: "MatchForms",
                        principalColumn: "MatchFormId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchFormQuestion_Questions_QuestionsQuestionId",
                        column: x => x.QuestionsQuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchFormQuestion_QuestionsQuestionId",
                table: "MatchFormQuestion",
                column: "QuestionsQuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchFormQuestion");

            migrationBuilder.AddColumn<int>(
                name: "MatchFormId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_MatchFormId",
                table: "Questions",
                column: "MatchFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_MatchForms_MatchFormId",
                table: "Questions",
                column: "MatchFormId",
                principalTable: "MatchForms",
                principalColumn: "MatchFormId");
        }
    }
}
