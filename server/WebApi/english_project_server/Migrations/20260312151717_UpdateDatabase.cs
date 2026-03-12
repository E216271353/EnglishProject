using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace english_project_server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentUserLevels_Users_UserId",
                table: "CurrentUserLevels");

            migrationBuilder.DropIndex(
                name: "IX_CurrentUserLevels_UserId",
                table: "CurrentUserLevels");

            migrationBuilder.AlterColumn<string>(
                name: "VocabularyLevel",
                table: "CurrentUserLevels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ReadingLevel",
                table: "CurrentUserLevels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "GrammarLevel",
                table: "CurrentUserLevels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "VocabularyLevel",
                table: "CurrentUserLevels",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ReadingLevel",
                table: "CurrentUserLevels",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "GrammarLevel",
                table: "CurrentUserLevels",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentUserLevels_UserId",
                table: "CurrentUserLevels",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentUserLevels_Users_UserId",
                table: "CurrentUserLevels",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
