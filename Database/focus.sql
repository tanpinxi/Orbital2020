/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`focusDB` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `focusDB`;

/*Table structure for table `focus_data` */

DROP TABLE IF EXISTS `websites`;
DROP TABLE IF EXISTS `usage_data`;

CREATE TABLE `websites` (
  `site` varchar(255) NOT NULL,
  `limit` int NOT NULL DEFAULT 0,
  `selected` boolean NOT NULL DEFAULT TRUE,
  
  PRIMARY KEY (`site`)
);

CREATE TABLE `usage_data` (
  `site` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `usage` int NOT NULL DEFAULT 0,

  PRIMARY KEY (`site`,`date`),
  FOREIGN KEY (`site`) REFERENCES `websites` (`site`) ON DELETE CASCADE
);



/* Sample data*/
INSERT INTO `websites`(`site`, `limit`) VALUES ("facebook.com", 30);
INSERT INTO `websites`(`site`, `limit`) VALUES ("instagram.com", 60);
INSERT INTO `websites`(`site`, `limit`) VALUES ("youtube.com", 120);
INSERT INTO `websites`(`site`, `limit`) VALUES ("reddit.com", 30);
INSERT INTO `websites`(`site`, `limit`) VALUES ("google.com", 60);

INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("facebook.com", "2020-06-13", 10);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("facebook.com", "2020-06-17", 11);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("facebook.com", "2020-06-18", 8);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("instagram.com", "2020-06-16", 4);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("instagram.com", "2020-06-18", 8);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("instagram.com", "2020-06-20", 12);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("youtube.com", "2020-06-16", 20);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("youtube.com", "2020-06-18", 10);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("youtube.com", "2020-06-20", 12);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("reddit.com", "2020-06-12", 10);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("reddit.com", "2020-06-14", 5);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("reddit.com", "2020-06-16", 10);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("google.com", "2020-06-19", 5);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("google.com", "2020-06-18", 10);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("google.com", "2020-06-21", 20);