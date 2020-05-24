/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`focusDB` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `focusDB`;

/*Table structure for table `focus_data` */

DROP TABLE IF EXISTS `website_usage`;

CREATE TABLE `website_usage` (
  `website` varchar(255) NOT NULL,
  `selected` boolean NOT NULL DEFAULT TRUE, /* if the website is selected, we tally it in the dashboard */
  `usage` int NOT NULL DEFAULT 0, /* could be int too, can change later*/
  
  PRIMARY KEY (`website`)
)
