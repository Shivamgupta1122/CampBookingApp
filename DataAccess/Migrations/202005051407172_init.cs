namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccountEntity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FullName = c.String(),
                        EmailId = c.String(nullable: false),
                        Password = c.String(),
                        IsAdmin = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BookingEntity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookingReferenceNumber = c.String(),
                        CheckInDate = c.DateTime(nullable: false, storeType: "date"),
                        CheckOutDate = c.DateTime(nullable: false, storeType: "date"),
                        TotalNights = c.Int(nullable: false),
                        BillingAddress = c.String(),
                        State = c.String(nullable: false),
                        Country = c.String(nullable: false),
                        ZipCode = c.Int(nullable: false),
                        FinalAmount = c.Int(nullable: false),
                        CellPhone = c.Long(nullable: false),
                        NumberOfGuests = c.Int(nullable: false),
                        CampId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        Account_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AccountEntity", t => t.Account_Id)
                .ForeignKey("dbo.CampEntity", t => t.CampId, cascadeDelete: true)
                .Index(t => t.CampId)
                .Index(t => t.Account_Id);
            
            CreateTable(
                "dbo.CampEntity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        Capacity = c.Int(nullable: false),
                        PriceforWeekdays = c.Int(nullable: false),
                        PriceforWeekends = c.Int(nullable: false),
                        ImageURL = c.String(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BookingEntity", "CampId", "dbo.CampEntity");
            DropForeignKey("dbo.BookingEntity", "Account_Id", "dbo.AccountEntity");
            DropIndex("dbo.BookingEntity", new[] { "Account_Id" });
            DropIndex("dbo.BookingEntity", new[] { "CampId" });
            DropTable("dbo.CampEntity");
            DropTable("dbo.BookingEntity");
            DropTable("dbo.AccountEntity");
        }
    }
}
