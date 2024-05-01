using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Update_interests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Interests");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Interests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "InterestCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Interests_CategoryId",
                table: "Interests",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interests_InterestCategories_CategoryId",
                table: "Interests",
                column: "CategoryId",
                principalTable: "InterestCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interests_InterestCategories_CategoryId",
                table: "Interests");

            migrationBuilder.DropTable(
                name: "InterestCategories");

            migrationBuilder.DropIndex(
                name: "IX_Interests_CategoryId",
                table: "Interests");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Interests");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Interests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
