namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class user : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BookingEntity", "Account_Id", "dbo.UserEntity");
            DropIndex("dbo.BookingEntity", new[] { "Account_Id" });
            DropColumn("dbo.BookingEntity", "UserId");
            RenameColumn(table: "dbo.BookingEntity", name: "Account_Id", newName: "UserId");
            AlterColumn("dbo.BookingEntity", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.BookingEntity", "UserId");
            AddForeignKey("dbo.BookingEntity", "UserId", "dbo.UserEntity", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BookingEntity", "UserId", "dbo.UserEntity");
            DropIndex("dbo.BookingEntity", new[] { "UserId" });
            AlterColumn("dbo.BookingEntity", "UserId", c => c.Int());
            RenameColumn(table: "dbo.BookingEntity", name: "UserId", newName: "Account_Id");
            AddColumn("dbo.BookingEntity", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.BookingEntity", "Account_Id");
            AddForeignKey("dbo.BookingEntity", "Account_Id", "dbo.UserEntity", "Id");
        }
    }
}
