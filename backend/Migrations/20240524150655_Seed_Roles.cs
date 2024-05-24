using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Roles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            SET IDENTITY_INSERT Roles ON;

            INSERT INTO Roles (RoleId, Name) VALUES (1, 'User');
            INSERT INTO Roles (RoleId, Name) VALUES (2, 'Admin');
            INSERT INTO Roles (RoleId, Name) VALUES (3, 'Unconfirmed');
            INSERT INTO Roles (RoleId, Name) VALUES (4, 'Banned');
            
            SET IDENTITY_INSERT Roles OFF;
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
