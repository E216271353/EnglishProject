using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace english_project_server.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentUserLevelTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CurrentUserLevels",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GrammarLevel = table.Column<int>(type: "int", nullable: false),
                    VocabularyLevel = table.Column<int>(type: "int", nullable: false),
                    ReadingLevel = table.Column<int>(type: "int", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentUserLevels", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_CurrentUserLevels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentUserLevels");
        }
    }
}
