using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Updatepreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Preferences");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Preferences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PreferenceCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreferenceCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Preferences_CategoryId",
                table: "Preferences",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Preferences_PreferenceCategories_CategoryId",
                table: "Preferences",
                column: "CategoryId",
                principalTable: "PreferenceCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Preferences_PreferenceCategories_CategoryId",
                table: "Preferences");

            migrationBuilder.DropTable(
                name: "PreferenceCategories");

            migrationBuilder.DropIndex(
                name: "IX_Preferences_CategoryId",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Preferences");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Preferences",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
