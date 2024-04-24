using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Find_H_er.Migrations
{
    /// <inheritdoc />
    public partial class Seedpreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql
            ("""
            SET IDENTITY_INSERT PreferenceCategories ON;
            INSERT INTO PreferenceCategories (Id, Name)
            VALUES 
            (1, 'Hobbies'),
            (2, 'Music'),
            (3, 'Cuisine'),
            (4, 'Outdoors'),
            (5, 'Movies'),
            (6, 'Books'),
            (7, 'Fitness'),
            (8, 'Travel'),
            (9, 'Languages'),
            (10, 'Pets');
            SET IDENTITY_INSERT PreferenceCategories OFF;
            """);
            migrationBuilder.Sql
            ("""
             SET IDENTITY_INSERT Preferences ON;
             INSERT INTO Preferences (PreferenceId, Name, CategoryId)
             VALUES 
             (1,'Painting', 1), 
             (2,'Guitar', 1), 
             (3,'Cooking', 1), 
             (4,'Dance', 1), 
             (5,'Photography', 1), 
             (6,'Gardening', 1), 
             (7,'Coding', 1), 
             (8,'Gaming', 1), 
             (9,'Traveling', 1), 
             (10,'Knitting', 1),
             
             (11,'Rock', 2), 
             (12,'Jazz', 2), 
             (13,'Pop', 2), 
             (14,'HipHop', 2), 
             (15,'Classical', 2), 
             (16,'Metal', 2), 
             (17,'Country', 2), 
             (18,'Blues', 2), 
             (19,'Electronic', 2), 
             (20,'Reggae', 2),
             
             (21,'Italian', 3), 
             (22,'Mexican', 3), 
             (23,'Japanese', 3), 
             (24,'Chinese', 3), 
             (25,'Indian', 3), 
             (26,'French', 3), 
             (27,'Thai', 3), 
             (28,'Spanish', 3), 
             (29,'Greek', 3), 
             (30,'Lebanese', 3),

             (31, 'Hiking', 4),
             (32, 'Camping', 4),
             (33, 'Fishing', 4),
             (34, 'Cycling', 4),
             (35, 'Kayaking', 4),
             (36, 'RockClimbing', 4),
             (37, 'Surfing', 4),
             (38, 'Skiing', 4),
             (39, 'BirdWatching', 4),
             (40, 'Golfing', 4),
             
             (41, 'Action', 5),
             (42, 'Comedy', 5),
             (43, 'Drama', 5),
             (44, 'Fantasy', 5),
             (45, 'Horror', 5),
             (46, 'Romance', 5),
             (47, 'Thriller', 5),
             
             (48, 'Mystery', 6),
             (49, 'ScienceFiction', 6),
             (50, 'Fantasy', 6),
             (51, 'Romance', 6),
             (52, 'Thriller', 6),
             (53, 'Biography', 6),
             (54, 'History', 6),
             (55, 'SelfHelp', 6),
             (56, 'Classics', 6),
             (57, 'YoungAdult', 6),
             
             (58, 'Yoga', 7),
             (59, 'Running', 7),
             (60, 'Gym', 7),
             (61, 'CrossFit', 7),
             (62, 'Zumba', 7),
             (63, 'Pilates', 7),
             (64, 'Boxing', 7),
             (65, 'MartialArts', 7),
             (66, 'Swimming', 7),
             (67, 'Tennis', 7),
             
             (68, 'Backpacking', 8),
             (69, 'Beach', 8),
             (70, 'Safari', 8),
             (71, 'Cruising', 8),
             (72, 'RoadTripping', 8),
             (73, 'Skiing', 8),
             (74, 'CityBreak', 8),
             (75, 'EcoTourism', 8),
             (76, 'Volunteering', 8),
             (77, 'FestivalGoing', 8),
             (78, 'HistoricalSites', 8),
             (79, 'Luxury', 8),
             (80, 'Adventure', 8),
             (81, 'Rural', 8),
             (82, 'Shopping', 8),
             (83, 'Gastronomy', 8),
             (84, 'Wellness', 8),
             (85, 'Cultural', 8),
             (86, 'Family', 8),
             (87, 'Solo', 8),
             (88, 'Friends', 8),
             
             (89, 'English', 9),
             (90, 'Spanish', 9),
             (91, 'Mandarin', 9),
             (92, 'French', 9),
             (93, 'German', 9),
             (94, 'Russian', 9),
             (95, 'Arabic', 9),
             (96, 'Japanese', 9),
             (97, 'Portuguese', 9),
             (98, 'Italian', 9),
             
             (99, 'Dogs', 10),
             (100, 'Cats', 10),
             (101, 'Fish', 10),
             (102, 'Birds', 10),
             (103, 'Reptiles', 10),
             (104, 'Rodents', 10),
             (105, 'Horses', 10),
             (106, 'ExoticPets', 10),
             (107, 'NoPets', 10),
             (108, 'AllPets', 10);
             SET IDENTITY_INSERT Preferences OFF;
             """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
