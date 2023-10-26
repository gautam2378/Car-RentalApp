using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Car_Rental_backend.Migrations
{
    public partial class ImagesFieldAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageLink",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageLink",
                table: "Cars");
        }
    }
}
