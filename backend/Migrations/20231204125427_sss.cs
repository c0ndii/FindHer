using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class sss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchForms_Users_UserId",
                table: "MatchForms");

            migrationBuilder.DropIndex(
                name: "IX_MatchForms_UserId",
                table: "MatchForms");

            migrationBuilder.DropColumn(
                name: "MatchFormId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MatchForms");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MatchFormId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MatchForms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MatchForms_UserId",
                table: "MatchForms",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchForms_Users_UserId",
                table: "MatchForms",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
