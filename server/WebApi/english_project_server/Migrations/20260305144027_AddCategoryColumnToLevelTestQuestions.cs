using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace english_project_server.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryColumnToLevelTestQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "LevelTestQuestions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "LevelTestQuestions");
        }
    }
}
