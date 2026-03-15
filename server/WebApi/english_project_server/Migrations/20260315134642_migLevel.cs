using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace english_project_server.Migrations
{
    /// <inheritdoc />
    public partial class migLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "ReadingQuestions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "ReadingQuestions");
        }
    }
}
