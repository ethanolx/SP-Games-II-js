-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: spgames
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

CREATE DATABASE IF NOT EXISTS `spgames`;

USE `spgames`;

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `catname` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Platformer','Platformer games get their name from the fact that the gameΓÇÖs character interacts with platforms (usually running, jumping, or falling) throughout the gameplay.','2021-02-01 08:09:55'),(6,'Shooter','Shooters let players use weapons to engage in the action, with the goal usually being to take out enemies or opposing players.','2021-02-01 08:15:23'),(7,'Fighting','Fighting games like Mortal Kombat and Street Fighter II focus the action on combat, and in most cases, hand-to-hand combat. Most fighting games feature a stable of playable characters, each one specializing in their own unique abilities or fighting style.','2021-02-01 08:15:48'),(8,'Beat-em Up','Beat-em up games, or brawlers, also focus on combat, but instead of facing a single opponent, players face wave after wave of enemies.','2021-02-01 08:18:09'),(9,'Stealth','Stealth games stress cunning and precision to resolve game challenges, and while other action or combat may help players accomplish the goal, like in Dishonored, stealth games usually encourage players to engage in the action covertly.','2021-02-01 08:18:43'),(10,'Survival','The survival horror game Resident Evil was one of the earliest (though a linear game), while more modern survival games like Fortnite take place in open-world game environments and give players access to resources to craft tools, weapons, and shelter to survive as long as possible.','2021-02-01 08:20:13'),(11,'Rhythm','Rhythm games like Dance Dance Revolution and Guitar Hero are music-based games that challenge players to keep in step with the rhythm of a song or soundtrack in the game by pressing a corresponding button on the controller at a precise time to accumulate points.','2021-02-01 08:20:29'),(12,'Survival Horror','Survival horror games like Resident Evil use mature themes and subject matter to portray grisly and gruesome settings (many of these games use blood and gore and are intended only for mature audiences).','2021-02-01 08:20:57'),(13,'Metroidvania','Metroidvania-type games are like basic action-adventure games, but aren\'t linear, and often require that the player backtrack, or is kept from progressing, until they find a specific item or special tool.','2021-02-01 08:21:25'),(14,'Text Adventure','Early text adventure games were called \"interactive fiction.\" And just as the name implies, the gameplay is text-based, meaning players use their keyboard to input commands in response to the game-programmed story arch or situation.','2021-02-01 08:23:07'),(15,'Graphic Adventures','As computers became more capable of creating graphics to support text, games evolved as well. For instance, early graphic adventure games used simple images to support the still text-based adventure.','2021-02-01 08:23:25'),(16,'Visual Novel','Extremely popular in Japan, most visual novels require players to build up character traits or statistics to advance the gameplay. The games often have multiple endings which are determined by how the player responds to specific points in the plot.','2021-02-01 08:23:46'),(17,'Interactive Movie','Laserdisc and CD-ROM technology allowed for the introduction of the interactive movie. Interactive movies contain pre-filmed live-action or animation sequences. The adventure is played out typically from a third-person perspective and the player controls the action during pivotal points in the story','2021-02-01 08:26:03'),(18,'Real-Time 3D','The latest evolution of adventure games is real-time 3D. Instead of pre-rendered scenes, players interact in a real-time 3D video game world. Shenmue and Heavy Rain are good examples of these types of games.','2021-02-01 08:26:22'),(19,'Action RPG','Action role-playing games take game elements of both action games and action-adventure games. A defining characteristic of action RPGs is that the combat takes place in real-time and depends on a playerΓÇÖs speed and accuracy to best foes, versus depending on high character attributes like charisma and dexterity.','2021-02-01 08:28:09'),(20,'MMORPG','Massive multiplayer online role-playing games (or MMORPGs) evolved as graphical variations of text-based multi-user dungeons (MUDs), which were developed in the late 1970s.  MMORPGs involve hundreds of players actively interacting with each other in the same world, and typically, all players share the same or a similar objective.','2021-02-01 08:28:25'),(21,'Puzzle','Brain \'racking','2021-02-01 08:36:01');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category_asc`
--

DROP TABLE IF EXISTS `game_category_asc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category_asc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameid` int NOT NULL,
  `categoryid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `gameid` (`gameid`),
  KEY `categoryid` (`categoryid`),
  CONSTRAINT `game_category_asc_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `game_category_asc_ibfk_2` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category_asc`
--

LOCK TABLES `game_category_asc` WRITE;
/*!40000 ALTER TABLE `game_category_asc` DISABLE KEYS */;
INSERT INTO `game_category_asc` VALUES (3,3,8),(4,3,10),(5,3,19),(6,2,21),(7,1,19),(8,1,6);
/*!40000 ALTER TABLE `game_category_asc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_platform_asc`
--

DROP TABLE IF EXISTS `game_platform_asc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_platform_asc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameid` int NOT NULL,
  `platformid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `gameid` (`gameid`),
  KEY `platformid` (`platformid`),
  CONSTRAINT `game_platform_asc_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `game_platform_asc_ibfk_2` FOREIGN KEY (`platformid`) REFERENCES `platforms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_platform_asc`
--

LOCK TABLES `game_platform_asc` WRITE;
/*!40000 ALTER TABLE `game_platform_asc` DISABLE KEYS */;
INSERT INTO `game_platform_asc` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,1),(6,2,2),(7,3,1),(8,3,2),(9,3,5),(10,3,6),(11,3,9),(12,3,10),(13,3,13);
/*!40000 ALTER TABLE `game_platform_asc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `year` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Call of Duty','Call of Duty is a first-person shooter video game based on id Tech 3, and was released on October 29, 2003. The game was developed by Infinity Ward and published by Activision. The game simulates the infantry and combined arms warfare of World War II.',26.99,2003,'2021-02-01 03:13:03'),(2,'Baba is You','Baba Is You is an award-winning puzzle game where you can change the rules by which you play. In every level, the rules themselves are present as blocks you can interact with; by manipulating them, you can change how the level works and cause surprising, unexpected interactions!',5.60,2019,'2021-02-01 03:13:03'),(3,'Diablo III','Diablo III is a genre-defining action-RPG set in Sanctuary, a world ravaged by the eternal conflict between angels and demons.',19.99,2012,'2021-02-01 08:33:25');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(15) NOT NULL,
  `version` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `unique_index` (`platform`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'PC','macOS','2021-02-01 03:13:03'),(2,'PC','Windows','2021-02-01 03:13:03'),(3,'Mobile','Android','2021-02-01 03:13:03'),(4,'Mobile','iOS','2021-02-01 03:13:03'),(5,'Xbox','360','2021-02-01 03:13:03'),(6,'Xbox','One','2021-02-01 03:13:03'),(7,'Playstation','1','2021-02-01 03:13:03'),(8,'Playstation','2','2021-02-01 03:13:03'),(9,'Playstation','3','2021-02-01 03:13:03'),(10,'Playstation','4','2021-02-01 03:13:03'),(11,'Playstation','5','2021-02-01 03:13:03'),(12,'Playstation','Portable','2021-02-01 03:13:03'),(13,'Nintendo','3DS','2021-02-01 03:13:03'),(14,'Nintendo','Game Boy','2021-02-01 03:13:03'),(15,'Nintendo','Switch','2021-02-01 03:13:03'),(16,'Nintendo','Wii','2021-02-01 03:13:03');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `gameid` int NOT NULL,
  `content` text NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `reviewid` (`reviewid`),
  KEY `userid` (`userid`),
  KEY `gameid` (`gameid`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,2,'While the rules are simple, the game is not.',8.6,'2021-02-01 03:13:03'),(2,1,1,'Great game, shame about the politics',7.0,'2021-02-01 03:13:03'),(3,3,1,'Call of Duty (COD) is a shooter that you shouldn\'t miss. The excellent campaign and fun online modes guarantee hundreds of hours of entertainment and fun.',8.0,'2021-02-01 03:13:03'),(4,4,2,'I don\'t really like Puzzle games, because I\'m to dumb for them. But this Game is so awesome and cute and it\'s one of the best Games I\'ve ever played.',7.6,'2021-02-01 03:13:03'),(5,1,2,'I love this game',5.0,'2021-02-01 03:46:53'),(13,1,2,'I hate this game',5.0,'2021-02-01 03:57:11'),(14,1,2,'a',5.0,'2021-02-01 03:57:31');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(25) NOT NULL,
  `type` enum('Customer','Admin') NOT NULL DEFAULT 'Customer',
  `profile_pic_url` varchar(80) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid` (`userid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ethanolx','ethan@gmail.com','12345Abc','Admin','http://localhost:5000/1.jpg','2021-02-01 03:13:03'),(2,'Mary101','m101@yahoo.com.sg','12345Abc','Customer',NULL,'2021-02-01 03:13:03'),(3,'JSmith','johnsmith@x.net','12345Abc','Customer',NULL,'2021-02-01 03:13:03'),(4,'Jane Smithsonian','jsx@abc.mail','12345Abc','Customer',NULL,'2021-02-01 03:13:03'),(5,'F00D4L1F3','joel@git.git','12345Abc','Admin',NULL,'2021-02-01 03:13:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 16:47:21
