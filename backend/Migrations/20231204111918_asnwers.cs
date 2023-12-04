using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class asnwers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Answers_AnswerId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_AnswerId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "AnswerLetter",
                table: "Answers");

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "Answers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "Answers");

            migrationBuilder.AddColumn<int>(
                name: "AnswerId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AnswerLetter",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_AnswerId",
                table: "Questions",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Answers_AnswerId",
                table: "Questions",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "AnswerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
