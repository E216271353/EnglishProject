using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace english_project_server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCurrentUserLevelWithIdPrimaryKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentUserLevels",
                table: "CurrentUserLevels");

            migrationBuilder.RenameColumn(
                name: "LastUpdated",
                table: "CurrentUserLevels",
                newName: "DateUpdated");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CurrentUserLevels",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentUserLevels",
                table: "CurrentUserLevels",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentUserLevels_UserId",
                table: "CurrentUserLevels",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentUserLevels",
                table: "CurrentUserLevels");

            migrationBuilder.DropIndex(
                name: "IX_CurrentUserLevels_UserId",
                table: "CurrentUserLevels");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CurrentUserLevels");

            migrationBuilder.RenameColumn(
                name: "DateUpdated",
                table: "CurrentUserLevels",
                newName: "LastUpdated");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentUserLevels",
                table: "CurrentUserLevels",
                column: "UserId");
        }
    }
}
