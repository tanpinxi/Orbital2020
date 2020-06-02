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
  `selected` boolean NOT NULL DEFAULT TRUE, /* if the website is selected, we tally it in the dashboard */
  
  PRIMARY KEY (`site`)
);

CREATE TABLE `usage_data` (
  `site` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `usage` int NOT NULL DEFAULT 0, /* could be int too, can change later*/

  PRIMARY KEY (`site`,`date`)
);



/* Sample data*/
INSERT INTO `websites`(`site`) VALUES ("facebook.com");
INSERT INTO `websites`(`site`) VALUES ("instagram.com");
INSERT INTO `websites`(`site`) VALUES ("youtube.com");
INSERT INTO `websites`(`site`) VALUES ("reddit.com");
INSERT INTO `websites`(`site`) VALUES ("google.com");

INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("facebook.com", "2008-11-11", 1);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("instagram.com", "2008-12-11", 2);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("youtube.com", "2008-12-11",3);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("reddit.com", "2008-12-11", 2);
INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("google.com", "2008-12-11", 2);