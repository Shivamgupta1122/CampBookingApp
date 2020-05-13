namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameAccount : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.AccountEntity", newName: "UserEntity");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.UserEntity", newName: "AccountEntity");
        }
    }
}
