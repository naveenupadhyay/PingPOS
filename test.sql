-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: walmart
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_control`
--

DROP TABLE IF EXISTS `access_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_control` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_code_csv` varchar(64) NOT NULL,
  `url_prefix` varchar(200) NOT NULL,
  `feature` varchar(100) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code_csv` (`role_code_csv`,`url_prefix`),
  KEY `enabled` (`enabled`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_control`
--

LOCK TABLES `access_control` WRITE;
/*!40000 ALTER TABLE `access_control` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_border_type`
--

DROP TABLE IF EXISTS `cake_border_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_border_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `border_type_name` varchar(64) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_border_type`
--

LOCK TABLES `cake_border_type` WRITE;
/*!40000 ALTER TABLE `cake_border_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `cake_border_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_decorator_type`
--

DROP TABLE IF EXISTS `cake_decorator_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_decorator_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `decorator_type_name` varchar(64) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_decorator_type`
--

LOCK TABLES `cake_decorator_type` WRITE;
/*!40000 ALTER TABLE `cake_decorator_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `cake_decorator_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_flower_type`
--

DROP TABLE IF EXISTS `cake_flower_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_flower_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `flower_type_name` varchar(64) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_flower_type`
--

LOCK TABLES `cake_flower_type` WRITE;
/*!40000 ALTER TABLE `cake_flower_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `cake_flower_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_icing_flavours`
--

DROP TABLE IF EXISTS `cake_icing_flavours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_icing_flavours` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `flavor_name` varchar(64) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_icing_flavours`
--

LOCK TABLES `cake_icing_flavours` WRITE;
/*!40000 ALTER TABLE `cake_icing_flavours` DISABLE KEYS */;
/*!40000 ALTER TABLE `cake_icing_flavours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_order`
--

DROP TABLE IF EXISTS `cake_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image_url` varchar(256) NOT NULL,
  `cake_details` varchar(256) NOT NULL,
  `status` varchar(48) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `delivered_date` varchar(100) DEFAULT NULL,
  `order_total` decimal(9,2) NOT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `cake_type` varchar(50) DEFAULT NULL,
  `feedback_details` varchar(128) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_order`
--

LOCK TABLES `cake_order` WRITE;
/*!40000 ALTER TABLE `cake_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `cake_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake_shape`
--

DROP TABLE IF EXISTS `cake_shape`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cake_shape` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shape` varchar(64) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_shape`
--

LOCK TABLES `cake_shape` WRITE;
/*!40000 ALTER TABLE `cake_shape` DISABLE KEYS */;
INSERT INTO `cake_shape` VALUES (1,'round','urls','2016-03-16 12:02:48','2016-03-16 12:02:48');
/*!40000 ALTER TABLE `cake_shape` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(48) NOT NULL,
  `json` varchar(5120) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL,
  `description` varchar(64) DEFAULT NULL,
  `parent_role_code` varchar(64) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `default_url` varchar(256) NOT NULL DEFAULT '/inbound',
  `created` timestamp NULL DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SUPER','super',NULL,1,'/bulkupload','2016-03-15 15:44:41','2016-03-15 15:44:41','2016-03-15 15:44:41');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signature_cake`
--

DROP TABLE IF EXISTS `signature_cake`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `signature_cake` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(64) DEFAULT NULL,
  `category` varchar(18) DEFAULT NULL,
  `image_url` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signature_cake`
--

LOCK TABLES `signature_cake` WRITE;
/*!40000 ALTER TABLE `signature_cake` DISABLE KEYS */;
/*!40000 ALTER TABLE `signature_cake` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `display_name` varchar(48) DEFAULT NULL,
  `first_name` varchar(48) DEFAULT NULL,
  `middle_name` varchar(48) DEFAULT NULL,
  `last_name` varchar(48) DEFAULT NULL,
  `email_verification_code` varchar(48) DEFAULT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_index` (`email`(255))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nupadhyay@walmartlabs.com','walmart123',1,1,'Naveen','Naveen','','Upadhyay','12123','2016-03-15 15:40:29','2016-03-15 15:40:29','2016-03-15 15:40:29','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `role_code` varchar(64) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created` timestamp NULL DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_role` (`user_id`),
  KEY `FK_role_user_role` (`role_code`),
  KEY `enabled` (`enabled`),
  CONSTRAINT `FK_role_user_role` FOREIGN KEY (`role_code`) REFERENCES `role` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_to_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walmart_pdf_template`
--

DROP TABLE IF EXISTS `walmart_pdf_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walmart_pdf_template` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `template` longtext NOT NULL,
  `created` datetime DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walmart_pdf_template`
--

LOCK TABLES `walmart_pdf_template` WRITE;
/*!40000 ALTER TABLE `walmart_pdf_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `walmart_pdf_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walmart_property`
--

DROP TABLE IF EXISTS `walmart_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walmart_property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) NOT NULL,
  `value` varchar(256) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walmart_property`
--

LOCK TABLES `walmart_property` WRITE;
/*!40000 ALTER TABLE `walmart_property` DISABLE KEYS */;
/*!40000 ALTER TABLE `walmart_property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-03 23:57:51
