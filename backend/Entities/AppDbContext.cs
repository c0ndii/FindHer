﻿using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Entities
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ForYou> ForYous { get; set; }
        public DbSet<Pinch> Pinches { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<MatchForm> MatchForms { get; set; }
        public DbSet<UserSetting> UserSettings { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<Preference> Preferences { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(x => x.Name)
                .HasMaxLength(25);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}