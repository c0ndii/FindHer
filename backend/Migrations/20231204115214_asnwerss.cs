using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class asnwerss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AnswerLetter",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnswerLetter",
                table: "Answers");
        }
    }
}
