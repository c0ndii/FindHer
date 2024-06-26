﻿using Microsoft.EntityFrameworkCore;


namespace Find_H_er.Entities
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<MatchForm> MatchForms { get; set; }
        public DbSet<UserSetting> UserSettings { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<Preference> Preferences { get; set; }
        public DbSet<PreferenceCategory> PreferenceCategories { get; set; }
        public DbSet<InterestCategory> InterestCategories { get; set; }
        public DbSet<Match> Matches {  get; set; }
        public DbSet<Pair> Pairs {  get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Meeting> Meetings {  get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(x => x.Name)
                .HasMaxLength(25);
            modelBuilder.Entity<Message>()
                .HasOne(x => x.Sender)
                .WithMany(x => x.SentMessages)
                .HasForeignKey(x => x.SenderUserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Message>()
                .HasOne(x => x.Receiver)
                .WithMany(x => x.ReceivedMessages)
                .HasForeignKey(x => x.ReceiverUserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>()
                .HasOne(x => x.MatchForm)
                .WithOne(x => x.User)
                .HasForeignKey<MatchForm>(x => x.MatchFormId);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}
