-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2026 at 04:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dalandb`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget_ranges`
--

CREATE TABLE `budget_ranges` (
  `budget_id` int(11) NOT NULL,
  `label` varchar(50) NOT NULL,
  `min_amount` decimal(10,2) DEFAULT NULL,
  `max_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `budget_ranges`
--

INSERT INTO `budget_ranges` (`budget_id`, `label`, `min_amount`, `max_amount`) VALUES
(1, 'Below ₱10,000', 0.00, 9999.99),
(2, '₱10,000 – ₱20,000', 10000.00, 20000.00),
(3, '₱20,000 – ₱30,000', 20001.00, 30000.00),
(4, 'Above ₱30,000', 30001.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `district_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `district_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`district_id`, `province_id`, `district_name`) VALUES
(1, 1, '1st District'),
(2, 1, '2nd District'),
(3, 1, '3rd District'),
(4, 1, '4th District'),
(5, 1, '5th District'),
(6, 1, '6th District');

-- --------------------------------------------------------

--
-- Table structure for table `exam_results`
--

CREATE TABLE `exam_results` (
  `exam_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `university_id` int(11) NOT NULL,
  `exam_name` varchar(150) NOT NULL,
  `year` year(4) NOT NULL,
  `exam_month` varchar(20) NOT NULL,
  `total_examinees` int(11) DEFAULT NULL,
  `total_passers` int(11) DEFAULT NULL,
  `first_timers_total` int(11) DEFAULT NULL,
  `first_timers_passed` int(11) DEFAULT NULL,
  `repeaters_total` int(11) DEFAULT NULL,
  `repeaters_passed` int(11) DEFAULT NULL,
  `number_of_topnotchers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_results`
--

INSERT INTO `exam_results` (`exam_id`, `program_id`, `university_id`, `exam_name`, `year`, `exam_month`, `total_examinees`, `total_passers`, `first_timers_total`, `first_timers_passed`, `repeaters_total`, `repeaters_passed`, `number_of_topnotchers`) VALUES
(2, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 21, 7, 5, 3, 16, 4, 0),
(3, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2015', 'September', 86, 44, 78, 44, 8, 0, 0),
(4, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 32, 15, 2, 1, 30, 14, 0),
(5, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2016', 'September', 78, 40, 56, 36, 22, 4, 0),
(6, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 33, 8, 4, 1, 29, 7, 0),
(7, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2017', 'September', 93, 59, 77, 56, 16, 3, 0),
(8, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 33, 10, 3, 2, 30, 8, 0),
(9, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2018', 'September', 112, 41, 88, 40, 24, 1, 0),
(10, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 63, 38, 7, 4, 56, 34, 0),
(11, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2019', 'September', 147, 97, 121, 93, 26, 4, 0),
(12, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2021', 'September', 3, 3, 0, 0, 3, 3, 0),
(13, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 11, 10, 0, 0, 11, 10, 0),
(14, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2022', 'October', 28, 12, 10, 5, 18, 7, 0),
(15, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 22, 9, 12, 8, 10, 1, 0),
(16, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2023', 'September', 28, 20, 9, 9, 19, 11, 0),
(17, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 80, 73, 76, 69, 4, 4, 0),
(18, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2024', 'September', 23, 18, 14, 13, 9, 5, 0),
(19, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 100, 89, 97, 88, 3, 1, 0),
(20, 617, 4, 'Licensure Examination for Teachers (Elementary)', '2025', 'September', 23, 20, 13, 13, 10, 7, 0),
(21, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 85, 29, 12, 9, 73, 20, 0),
(22, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2015', 'September', 200, 118, 129, 113, 71, 5, 0),
(23, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 60, 23, 6, 4, 54, 19, 0),
(24, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2016', 'September', 188, 96, 127, 95, 61, 1, 0),
(25, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 98, 11, 9, 4, 89, 7, 0),
(26, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2017', 'September', 178, 109, 125, 102, 53, 7, 0),
(27, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 79, 29, 13, 7, 66, 22, 0),
(28, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2018', 'September', 193, 91, 141, 88, 52, 3, 0),
(29, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 107, 47, 8, 7, 99, 40, 0),
(30, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2019', 'September', 279, 131, 222, 124, 57, 7, 0),
(31, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2021', 'September', 40, 24, 12, 6, 28, 18, 0),
(32, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 39, 13, 1, 0, 38, 13, 0),
(33, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2022', 'October', 235, 111, 130, 79, 105, 32, 0),
(34, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 435, 304, 361, 293, 74, 11, 0),
(35, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2023', 'September', 98, 11, 9, 4, 89, 7, 0),
(36, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 39, 13, 1, 0, 38, 13, 0),
(37, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2024', 'September', 60, 23, 6, 4, 54, 19, 0),
(38, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 11, 6, 1, 1, 10, 5, 0),
(39, 624, 4, 'Licensure Examination for Teachers (Elementary)', '2025', 'September', 183, 149, 141, 121, 42, 28, 0),
(40, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 11, 9, 8, 7, 3, 2, 0),
(41, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'September', 38, 25, 37, 25, 1, 0, 0),
(42, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 11, 6, 1, 1, 10, 5, 0),
(43, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'September', 27, 15, 25, 15, 2, 0, 0),
(44, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 14, 7, 5, 4, 9, 3, 0),
(45, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'September', 47, 31, 34, 29, 13, 2, 0),
(46, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 18, 8, 11, 5, 7, 3, 0),
(47, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'September', 69, 50, 56, 43, 13, 7, 0),
(48, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 20, 3, 5, 1, 15, 2, 0),
(49, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'September', 86, 55, 76, 54, 10, 1, 0),
(50, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2021', 'September', 3, 3, 3, 3, 0, 0, 0),
(51, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 11, 10, 0, 0, 11, 10, 0),
(52, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'October', 28, 12, 10, 5, 18, 7, 0),
(53, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 22, 9, 12, 8, 10, 1, 0),
(54, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'September', 28, 20, 9, 9, 19, 11, 0),
(55, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 80, 73, 76, 69, 4, 4, 0),
(56, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'September', 23, 18, 14, 13, 9, 5, 0),
(57, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 100, 89, 97, 88, 3, 1, 0),
(58, 616, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'September', 23, 20, 13, 13, 10, 7, 0),
(59, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 145, 78, 63, 46, 82, 32, 0),
(60, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'September', 472, 149, 257, 114, 215, 35, 0),
(61, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 118, 80, 54, 37, 64, 43, 0),
(62, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'September', 217, 124, 163, 119, 54, 5, 0),
(63, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 165, 62, 79, 44, 86, 18, 0),
(64, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'September', 268, 179, 183, 160, 85, 19, 0),
(65, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 162, 57, 78, 43, 84, 14, 0),
(66, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'September', 302, 203, 217, 190, 85, 13, 0),
(67, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 148, 39, 66, 31, 82, 8, 0),
(68, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'September', 373, 241, 279, 228, 94, 13, 0),
(69, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2021', 'September', 42, 15, 37, 13, 5, 2, 0),
(70, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 39, 13, 1, 0, 38, 13, 0),
(71, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'October', 235, 111, 130, 79, 105, 32, 0),
(72, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 435, 304, 361, 293, 74, 11, 0),
(73, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'September', 217, 124, 163, 119, 54, 5, 0),
(74, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 26, 11, 14, 5, 12, 6, 0),
(75, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'September', 15, 8, 14, 8, 1, 0, 0),
(76, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 66, 14, 4, 3, 62, 11, 0),
(77, 625, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'September', 183, 149, 141, 121, 42, 28, 0),
(78, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 306, 72, 66, 31, 240, 41, 0),
(79, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2015', 'September', 0, 0, 0, 0, 0, 0, 0),
(80, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 296, 83, 60, 30, 236, 53, 0),
(81, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2016', 'September', 605, 188, 354, 175, 251, 13, 0),
(82, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 445, 90, 83, 31, 362, 59, 0),
(83, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2017', 'September', 688, 293, 399, 228, 289, 65, 0),
(84, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 432, 101, 97, 45, 335, 56, 0),
(85, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2018', 'September', 732, 328, 465, 280, 267, 48, 0),
(86, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 434, 73, 83, 33, 351, 40, 0),
(87, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2019', 'September', 802, 302, 478, 277, 324, 25, 0),
(88, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2021', 'September', 100, 60, 79, 50, 21, 10, 0),
(89, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 122, 34, 1, 1, 121, 33, 0),
(90, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2022', 'October', 624, 256, 241, 144, 383, 112, 0),
(91, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 77, 14, 36, 6, 41, 8, 0),
(92, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2023', 'September', 44, 24, 0, 0, 44, 24, 0),
(93, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 41, 21, 28, 17, 13, 4, 0),
(94, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2024', 'September', 18, 6, 15, 6, 3, 0, 0),
(95, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 65, 10, 2, 0, 63, 10, 0),
(96, 638, 4, 'Licensure Examination for Teachers (Secondary)', '2025', 'September', 243, 185, 189, 155, 54, 30, 0),
(97, 671, 2, 'Civil Engineer Licensure Examination', '2024', 'April', 78, 24, 44, 15, 34, 9, 0),
(98, 671, 2, 'Civil Engineer Licensure Examination', '2025', 'April', 77, 14, 36, 6, 41, 8, 0),
(99, 671, 2, 'Civil Engineer Licensure Examination', '2023', 'April', 92, 13, 66, 8, 26, 5, 0),
(100, 671, 2, 'Civil Engineer Licensure Examination', '2022', 'May', 22, 10, 14, 8, 8, 2, 0),
(101, 671, 2, 'Civil Engineer Licensure Examination', '2019', 'May', 18, 6, 15, 6, 3, 0, 0),
(102, 671, 2, 'Civil Engineer Licensure Examination', '2018', 'May', 26, 11, 14, 5, 12, 6, 0),
(103, 671, 2, 'Civil Engineer Licensure Examination', '2017', 'May', 12, 6, 8, 5, 4, 1, 0),
(104, 671, 2, 'Civil Engineer Licensure Examination', '2016', 'May', 12, 3, 3, 0, 9, 3, 0),
(105, 671, 2, 'Civil Engineer Licensure Examination', '2015', 'May', 9, 1, 7, 0, 2, 1, 0),
(106, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 150, 102, 128, 98, 22, 4, 0),
(107, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 76, 54, 62, 52, 14, 2, 0),
(108, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 108, 70, 81, 66, 27, 4, 0),
(109, 666, 2, ' Special Professional Licensure Examination', '2023', 'April', 1, 1, 0, 0, 1, 1, 0),
(110, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 44, 24, 0, 0, 44, 24, 0),
(111, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 152, 148, 35, 18, 117, 30, 0),
(112, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 128, 41, 28, 11, 100, 30, 0),
(113, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 97, 9, 14, 3, 83, 6, 0),
(114, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 66, 14, 4, 3, 62, 11, 0),
(115, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 65, 10, 2, 0, 63, 10, 0),
(116, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 266, 175, 210, 163, 56, 12, 0),
(117, 669, 2, ' Special Professional Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(118, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 38, 12, 0, 0, 38, 12, 0),
(119, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 162, 60, 71, 39, 91, 21, 162),
(120, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 192, 66, 82, 44, 110, 22, 0),
(121, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 134, 34, 25, 10, 109, 24, 0),
(122, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 80, 26, 16, 8, 64, 18, 0),
(123, 669, 2, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 101, 30, 37, 21, 64, 9, 0),
(124, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2024', 'April', 56, 20, 39, 11, 17, 9, 0),
(125, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2025', 'April', 41, 21, 28, 17, 13, 4, 0),
(126, 672, 2, 'Registered Master Electrician Licensure Examination', '2025', 'April', 1, 1, 1, 1, 0, 0, 0),
(127, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2023', 'April', 56, 22, 49, 19, 7, 3, 0),
(128, 672, 2, 'Registered Master Electrician Licensure Examination', '2023', 'April', 9, 3, 2, 1, 7, 2, 0),
(129, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2022', 'April', 15, 8, 14, 8, 1, 0, 0),
(130, 672, 2, 'Registered Master Electrician Licensure Examination', '2022', 'April', 22, 15, 19, 14, 3, 1, 0),
(131, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2019', 'April', 18, 16, 15, 15, 3, 1, 0),
(132, 672, 2, 'Registered Master Electrician Licensure Examination', '2019', 'April', 20, 11, 17, 11, 3, 0, 0),
(133, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2018', 'April', 19, 15, 18, 15, 1, 0, 0),
(134, 672, 2, 'Registered Master Electrician Licensure Examination', '2018', 'April', 21, 9, 20, 9, 1, 0, 0),
(135, 672, 2, 'Registered Electrical Engineer Licensure Examination', '2015', 'April', 3, 2, 0, 0, 3, 2, 0),
(136, 672, 2, 'Registered Master Electrician Licensure Examination', '2015', 'April', 2, 0, 0, 0, 2, 0, 0),
(137, 672, 2, 'Registered Master Electrician Licensure Examination', '2017', 'April', 1, 0, 0, 0, 1, 0, 0),
(138, 670, 2, 'Nurse Licensure Examination', '2024', 'May', 301, 253, 229, 213, 72, 40, 0),
(139, 670, 2, 'Nurse Licensure Examination', '2023', 'May', 191, 145, 108, 96, 83, 49, 0),
(140, 670, 2, 'Nurse Licensure Examination', '2022', 'May', 65, 39, 0, 0, 65, 39, 0),
(141, 670, 2, 'Nurse Licensure Examination', '2015', 'May', 155, 68, 43, 34, 112, 34, 0),
(142, 670, 2, 'Nurse Licensure Examination', '2025', 'May', 239, 163, 171, 147, 68, 16, 1),
(143, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 89, 59, 60, 57, 29, 2, 0),
(144, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 45, 45, 45, 45, 0, 0, 0),
(145, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 104, 56, 70, 51, 34, 5, 0),
(146, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 40, 29, 0, 0, 40, 29, 0),
(147, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 141, 45, 5, 3, 136, 42, 0),
(148, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 133, 35, 8, 3, 125, 32, 0),
(149, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 108, 15, 11, 4, 97, 11, 0),
(150, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 64, 23, 2, 1, 62, 22, 0),
(151, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 73, 28, 18, 15, 55, 13, 0),
(152, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 298, 229, 228, 197, 70, 32, 0),
(153, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 251, 214, 224, 208, 27, 6, 0),
(154, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 330, 209, 254, 195, 76, 14, 0),
(155, 655, 8, ' Special Professional Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(156, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 62, 24, 2, 1, 60, 23, 0),
(157, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 167, 32, 28, 6, 139, 26, 0),
(158, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 68, 15, 4, 3, 64, 12, 0),
(159, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 146, 19, 24, 4, 122, 15, 0),
(160, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 109, 21, 14, 5, 95, 16, 0),
(161, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 115, 29, 29, 10, 86, 19, 0),
(162, 672, 2, 'Registered Electrical Engineer Licensure Exam (REELE)', '2025', 'August', 35, 6, 15, 4, 20, 2, 0),
(163, 666, 2, 'Licensure Examination for Teachers (Elementary)', '2018', 'November', 190, 48, 99, 46, 91, 2, 0),
(164, 671, 2, 'Civil Engineer Licensure Examination', '2016', 'November', 13, 8, 9, 7, 4, 1, 0),
(165, 670, 2, 'Nurse Licensure Examination', '2022', 'November', 98, 90, 77, 77, 21, 13, 0),
(166, 654, 8, 'Licensure Examination for Teachers (Elementary)', '2018', 'November', 199, 52, 120, 50, 79, 2, 0),
(167, 655, 8, 'Licensure Examination for Teachers (Secondary)', '2025', 'November', 25, 17, 15, 15, 10, 2, 0),
(168, 599, 7, 'Licensure Examination for Teachers', '2018', 'September', 2, 1, 12, 7, 14, 8, 0),
(169, 599, 7, 'Licensure Examination for Teachers', '2019', 'September', 30, 18, 6, 0, 36, 18, 0),
(170, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 40, 33, 40, 33, 0, 0, 0),
(171, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 30, 23, 27, 22, 3, 1, 0),
(172, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 32, 24, 31, 23, 1, 1, 0),
(173, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 4, 3, 0, 0, 4, 3, 0),
(174, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 13, 6, 0, 0, 13, 6, 0),
(175, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 14, 8, 2, 1, 12, 7, 0),
(176, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 6, 2, 1, 1, 5, 1, 0),
(177, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 5, 3, 1, 1, 4, 2, 0),
(178, 599, 7, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 9, 3, 2, 2, 7, 1, 0),
(181, 599, 7, 'Licensure Examination for Teachers', '2018', 'November', 28, 15, 3, 0, 31, 15, 0),
(182, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 34, 27, 26, 24, 8, 3, 0),
(183, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 23, 20, 21, 19, 2, 1, 0),
(184, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 38, 19, 33, 19, 5, 0, 0),
(185, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 3, 1, 0, 0, 3, 1, 0),
(186, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 12, 1, 2, 1, 10, 0, 0),
(187, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 8, 0, 2, 0, 6, 0, 0),
(188, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 16, 5, 4, 3, 12, 2, 0),
(189, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 10, 2, 0, 0, 10, 2, 0),
(190, 600, 7, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 21, 1, 0, 0, 21, 1, 0),
(191, 600, 7, 'Licensure Examination for Professional Teacher', '2025', 'November', 5, 2, 7, 1, 12, 3, 0),
(192, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 46, 40, 39, 38, 7, 2, 0),
(193, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 95, 86, 89, 85, 6, 1, 0),
(194, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 47, 35, 40, 33, 7, 2, 0),
(195, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 11, 9, 1, 1, 10, 8, 0),
(196, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 24, 10, 14, 7, 10, 3, 0),
(197, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 30, 16, 18, 13, 12, 3, 0),
(198, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 26, 11, 13, 7, 13, 4, 0),
(199, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 22, 18, 13, 12, 9, 6, 0),
(200, 604, 10, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 27, 18, 15, 13, 12, 5, 0),
(201, 604, 10, 'Licensure Examination for Teachers', '2015', 'September', 40, 36, 4, 1, 44, 37, 0),
(202, 604, 10, 'Licensure Examination for Teachers', '2016', 'September', 43, 32, 7, 0, 50, 32, 1),
(203, 604, 10, 'Licensure Examination for Teachers', '2017', 'September', 64, 56, 9, 3, 73, 59, 0),
(204, 604, 10, 'Licensure Examination for Teachers', '2018', 'September', 73, 63, 20, 5, 93, 68, 0),
(205, 604, 10, 'Licensure Examination for Teachers', '2019', 'September', 32, 29, 1, 0, 33, 29, 0),
(208, 604, 10, 'Special Professional Licensure Examination', '2023', 'April', 1, 0, 1, 0, 0, 0, 0),
(220, 604, 10, 'Licensure Examination for Professional Teacher', '2025', 'November', 3, 3, 0, 0, 3, 3, 0),
(221, 608, 10, 'Civil Engineer Licensure Examination', '2024', 'April', 59, 45, 43, 41, 16, 4, 0),
(222, 608, 10, 'Civil Engineer Licensure Examination', '2025', 'April', 44, 23, 26, 19, 18, 4, 0),
(223, 608, 10, 'Civil Engineer Licensure Examination', '2023', 'April', 63, 25, 29, 14, 34, 11, 1),
(224, 608, 10, 'Civil Engineer Licensure Examination', '2022', 'May', 91, 67, 84, 67, 7, 0, 1),
(225, 608, 10, 'Civil Engineer Licensure Examination', '2018', 'May', 29, 15, 18, 11, 11, 4, 0),
(226, 608, 10, 'Civil Engineer Licensure Examination', '2019', 'May', 17, 9, 3, 2, 14, 7, 0),
(227, 608, 10, 'Civil Engineer Licensure Examination', '2017', 'May', 12, 3, 1, 0, 11, 3, 0),
(228, 608, 10, 'Civil Engineer Licensure Examination', '2016', 'May', 22, 12, 6, 4, 16, 8, 0),
(229, 608, 10, 'Civil Engineer Licensure Examination', '2015', 'May', 5, 1, 0, 0, 5, 1, 0),
(230, 608, 10, 'Civil Engineer (SPLE)', '2018', 'August', 1, 0, 0, 0, 1, 0, 0),
(231, 608, 10, 'CIVIL ENGINEER LICENSURE EXAMINATION', '2016', 'NOVEMBER', 48, 44, 8, 4, 56, 48, 0),
(232, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2024', 'April', 36, 35, 34, 33, 2, 2, 0),
(233, 609, 10, 'Registered Master Electrician Licensure Examination', '2024', 'April', 1, 1, 1, 1, 0, 0, 0),
(234, 609, 10, 'Registered Master Electrician Licensure Examination', '2025', 'April', 1, 1, 1, 1, 0, 0, 0),
(235, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2025', 'April', 17, 17, 17, 17, 0, 0, 0),
(236, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2023', 'April', 25, 24, 25, 24, 0, 0, 0),
(237, 609, 10, 'Registered Master Electrician Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(238, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2022', 'April', 40, 4, 39, 33, 1, 1, 0),
(239, 609, 10, 'Registered Master Electrician Licensure Examination', '2022', 'April', 7, 5, 7, 5, 0, 0, 0),
(240, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2019', 'April', 13, 13, 13, 13, 0, 0, 0),
(241, 609, 10, 'Registered Master Electrician Licensure Examination', '2019', 'April', 15, 15, 15, 15, 0, 0, 0),
(242, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2018', 'April', 2, 2, 2, 2, 0, 0, 0),
(243, 609, 10, 'Registered Master Electrician Licensure Examination', '2018', 'April', 3, 3, 3, 3, 0, 0, 0),
(244, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2015', 'April', 1, 0, 0, 0, 1, 0, 0),
(245, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2016', 'April', 11, 10, 10, 10, 1, 0, 0),
(246, 609, 10, 'Registered Master Electrician Licensure Examination', '2016', 'April', 5, 5, 5, 5, 0, 0, 0),
(247, 609, 10, 'Registered Electrical Engineer Licensure Examination', '2017', 'April', 4, 4, 4, 4, 0, 0, 0),
(248, 609, 10, 'Registered Electrical Engineer Licensure Exam (REELE)', '2025', 'August', 16, 10, 0, 0, 16, 10, 0),
(249, 609, 10, 'Electrical Engineering Licensure Exam', '2024', 'August', 3, 3, 2, 1, 5, 4, 0),
(250, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 32, 32, 32, 32, 0, 0, 0),
(251, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 64, 52, 58, 50, 6, 2, 0),
(252, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 5, 5, 0, 0, 5, 5, 0),
(253, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 35, 22, 8, 8, 27, 14, 0),
(254, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 8, 4, 0, 0, 8, 4, 0),
(255, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 6, 2, 0, 0, 6, 2, 0),
(256, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 6, 4, 0, 0, 6, 4, 0),
(257, 603, 10, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 12, 11, 9, 9, 3, 2, 0),
(266, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 149, 130, 133, 126, 16, 4, 0),
(267, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 464, 382, 395, 360, 69, 22, 2),
(268, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 133, 118, 125, 117, 8, 1, 0),
(269, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 436, 374, 393, 367, 43, 7, 1),
(270, 629, 6, 'Nurse Licensure Examination', '2024', 'May', 16, 14, 10, 10, 6, 4, 0),
(271, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 156, 105, 126, 98, 30, 7, 2),
(272, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 435, 304, 361, 293, 74, 11, 2),
(273, 624, 6, ' Special Professional Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(274, 625, 6, ' Special Professional Licensure Examination', '2023', 'April', 2, 0, 1, 0, 1, 0, 0),
(275, 629, 6, 'Nurse Licensure Examination', '2023', 'May', 66, 60, 66, 60, 0, 0, 0),
(276, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 32, 21, 0, 0, 32, 21, 0),
(277, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 39, 13, 1, 0, 38, 25, 0),
(278, 629, 6, 'Nurse Licensure Examination', '2022', 'May', 3, 3, 2, 2, 1, 1, 0),
(279, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 107, 47, 8, 7, 99, 40, 0),
(280, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 148, 39, 66, 31, 82, 8, 0),
(281, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 79, 29, 13, 7, 66, 22, 0),
(282, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 162, 57, 78, 43, 84, 14, 0),
(283, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 98, 11, 9, 4, 89, 7, 0),
(284, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 165, 62, 79, 44, 86, 18, 0),
(285, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 60, 23, 6, 4, 54, 19, 0),
(286, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 118, 58, 5, 37, 64, 21, 0),
(287, 624, 6, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 85, 29, 12, 9, 73, 20, 0),
(288, 625, 6, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 145, 78, 63, 46, 82, 32, 0),
(289, 625, 6, 'Nursing Licensure Exam (NLE)', '2023', 'May', 66, 60, 0, 0, 66, 60, 0),
(290, 625, 6, 'Licensure Examination for Teachers (Elementary)', '2018', 'August', 0, 0, 1, 0, 1, 0, 0),
(291, 624, 6, 'Licensure Examination for Teachers', '2015', 'September', 129, 113, 0, 0, 129, 113, 1),
(292, 624, 6, 'Licensure Examination for Teachers', '2016', 'September', 127, 95, 0, 0, 127, 95, 0),
(293, 624, 6, 'Licensure Examination for Teachers', '2017', 'September', 125, 102, 0, 0, 125, 102, 0),
(294, 624, 6, 'Licensure Examination for Teachers', '2018', 'September', 141, 88, 0, 0, 141, 88, 0),
(295, 624, 6, 'Licensure Examination for Teachers', '2019', 'September', 222, 124, 0, 0, 222, 124, 1),
(296, 625, 6, 'Licensure Examination for Teachers', '2015', 'September', 158, 129, 0, 0, 158, 129, 2),
(297, 625, 6, 'Licensure Examination for Teachers', '2016', 'September', 163, 119, 0, 0, 163, 119, 0),
(298, 625, 6, 'Licensure Examination for Teachers', '2017', 'September', 183, 160, 0, 0, 183, 160, 0),
(299, 625, 6, 'Licensure Examination for Teachers', '2018', 'September', 217, 190, 0, 0, 217, 190, 0),
(300, 625, 6, 'Licensure Examination for Teachers', '2019', 'September', 279, 228, 0, 0, 279, 228, 0),
(301, 629, 6, 'NURSE LICENSURE EXAMINATION', '2018', 'November', 14, 10, 2, 1, 16, 11, 0),
(302, 624, 6, 'Licensure Examination for Teachers', '2018', 'November', 141, 88, 52, 3, 193, 91, 0),
(303, 625, 6, 'Licensure Examination for Professional Teacher', '2025', 'November', 25, 17, 20, 7, 45, 24, 0),
(304, 629, 6, 'Nurse Licensure Examination', '2022', 'November', 3, 3, 0, 0, 3, 3, 0),
(305, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 6, 5, 5, 5, 1, 0, 0),
(306, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 29, 18, 16, 14, 13, 4, 0),
(308, 674, 20, 'Civil Engineer Licensure Examination', '2024', 'April', 16, 5, 3, 3, 13, 2, 0),
(309, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2024', 'April', 7, 2, 1, 1, 6, 1, 0),
(310, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 9, 6, 6, 6, 3, 0, 0),
(311, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 29, 19, 21, 18, 8, 1, 0),
(312, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2025', 'April', 10, 5, 4, 4, 6, 1, 1),
(313, 676, 20, 'Registered Master Electrician Licensure Examination', '2025', 'April', 2, 2, 0, 0, 2, 2, 0),
(314, 674, 20, 'Civil Engineer Licensure Examination', '2025', 'April', 14, 3, 4, 1, 10, 2, 0),
(315, 629, 20, 'Nurse Licensure Examination', '2024', 'May', 19, 15, 14, 12, 5, 3, 0),
(316, 674, 20, 'Civil Engineer Licensure Examination', '2023', 'April', 32, 6, 15, 4, 17, 2, 0),
(317, 679, 20, ' Special Professional Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(318, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2023', 'April', 32, 12, 15, 9, 17, 3, 0),
(319, 676, 20, 'Registered Master Electrician Licensure Examination', '2023', 'April', 9, 3, 2, 1, 7, 2, 0),
(320, 629, 20, 'Nurse Licensure Examination', '2023', 'May', 41, 30, 30, 24, 11, 6, 0),
(321, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 6, 5, 0, 0, 6, 5, 0),
(322, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 11, 3, 0, 0, 11, 3, 0),
(323, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2022', 'April', 15, 6, 12, 6, 3, 0, 0),
(324, 676, 20, 'Registered Master Electrician Licensure Examination', '2022', 'April', 9, 3, 5, 1, 4, 2, 0),
(325, 674, 20, 'Civil Engineer Licensure Examination', '2022', 'May', 22, 3, 18, 3, 4, 0, 0),
(326, 629, 20, 'Nurse Licensure Examination', '2022', 'May', 19, 13, 13, 11, 6, 2, 0),
(327, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 63, 22, 30, 19, 33, 3, 0),
(328, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2019', 'April', 12, 3, 0, 0, 12, 3, 0),
(329, 676, 20, 'Registered Master Electrician Licensure Examination', '2019', 'April', 22, 15, 12, 11, 10, 4, 0),
(330, 674, 20, 'Civil Engineer Licensure Examination', '2019', 'May', 7, 0, 0, 0, 7, 0, 0),
(331, 674, 20, 'Civil Engineer Licensure Examination', '2018', 'May', 9, 1, 5, 0, 4, 1, 0),
(332, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2018', 'April', 16, 2, 6, 1, 10, 1, 0),
(333, 676, 20, 'Registered Master Electrician Licensure Examination', '2018', 'April', 11, 2, 4, 1, 7, 1, 0),
(334, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 20, 10, 8, 7, 12, 3, 0),
(335, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 61, 17, 27, 13, 34, 4, 0),
(336, 629, 20, 'Nurse Licensure Examination', '2015', 'May', 54, 33, 31, 20, 23, 13, 0),
(337, 674, 20, 'Civil Engineer Licensure Examination', '2015', 'May', 1, 0, 0, 0, 1, 0, 0),
(338, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2015', 'April', 13, 4, 8, 4, 5, 0, 0),
(339, 676, 20, 'Registered Master Electrician Licensure Examination', '2015', 'April', 4, 2, 2, 1, 2, 1, 0),
(340, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2016', 'April', 9, 1, 4, 1, 5, 0, 0),
(341, 676, 20, 'Registered Master Electrician Licensure Examination', '2016', 'April', 14, 6, 12, 6, 2, 0, 0),
(342, 676, 20, 'Registered Electrical Engineer Licensure Examination', '2017', 'April', 10, 1, 4, 1, 6, 0, 0),
(343, 676, 20, 'Registered Master Electrician Licensure Examination', '2017', 'April', 5, 4, 3, 2, 2, 2, 0),
(344, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 28, 12, 15, 9, 13, 3, 0),
(345, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 83, 42, 55, 36, 28, 6, 0),
(346, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 10, 7, 7, 5, 3, 2, 0),
(347, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 38, 19, 18, 12, 20, 7, 0),
(348, 679, 20, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 4, 2, 0, 0, 4, 2, 0),
(349, 625, 20, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 43, 22, 21, 16, 22, 6, 0),
(350, 629, 20, 'Nurse Licensure Examination', '2025', 'May', 29, 22, 26, 21, 3, 1, 0),
(351, 629, 20, 'Nursing Licensure Exam (NLE)', '2023', 'May', 30, 24, 11, 6, 41, 30, 0),
(352, 676, 20, 'Electrical Engineer Licensure Exam', '2025', 'August', 0, 0, 1, 1, 1, 1, 0),
(353, 676, 20, 'Electrical Engineering Licensure Exam', '2024', 'August', 0, 0, 4, 0, 4, 0, 0),
(354, 679, 20, 'Licensure Examination for Teachers', '2018', 'November', 26, 12, 9, 0, 35, 12, 0),
(604, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 32, 32, 32, 32, 0, 0, 0),
(605, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 64, 52, 58, 50, 6, 2, 0),
(606, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 5, 5, 0, 0, 5, 5, 0),
(607, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 35, 22, 8, 8, 27, 14, 0),
(608, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 8, 4, 0, 0, 8, 4, 0),
(609, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 6, 2, 0, 0, 6, 2, 0),
(610, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 6, 4, 0, 0, 6, 4, 0),
(611, 633, 10, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 12, 11, 9, 9, 3, 2, 0),
(1123, 629, 6, 'Nurse Licensure Examination', '2015', 'May', 4, 2, 0, 0, 4, 2, 0),
(1124, 629, 6, 'Nurse Licensure Examination', '2015', 'November', 18, 14, 17, 13, 1, 1, 0),
(1125, 629, 6, 'Nurse Licensure Examination', '2016', 'June', 5, 2, 0, 0, 5, 2, 0),
(1126, 629, 6, 'Nurse Licensure Examination', '2016', 'November', 15, 15, 14, 14, 1, 1, 0),
(1127, 629, 6, 'Nurse Licensure Examination', '2017', 'June', 1, 0, 1, 0, 0, 0, 0),
(1128, 629, 6, 'Nurse Licensure Examination', '2017', 'November', 15, 13, 14, 13, 1, 0, 0),
(1129, 629, 6, 'Nurse Licensure Examination', '2018', 'June', 1, 1, 0, 0, 1, 1, 0),
(1130, 629, 6, 'Nurse Licensure Examination', '2019', 'June', 4, 4, 1, 1, 3, 3, 0),
(1131, 629, 6, 'Nurse Licensure Examination', '2019', 'November', 29, 20, 29, 20, 0, 0, 0),
(1132, 629, 6, 'Nurse Licensure Examination', '2021', 'July', 6, 4, 1, 1, 5, 3, 0),
(1133, 629, 6, 'Nurse Licensure Examination', '2021', 'November', 3, 2, 0, 0, 3, 2, 0),
(1134, 629, 6, 'Nurse Licensure Examination', '2023', 'November', 108, 100, 100, 96, 8, 4, 0),
(1135, 629, 6, 'Nurse Licensure Examination', '2024', 'November', 53, 51, 51, 50, 2, 1, 0),
(1136, 629, 6, 'Nurse Licensure Examination', '2025', 'May', 0, 0, 0, 0, 0, 0, 0),
(1137, 629, 6, 'Nurse Licensure Examination', '2025', 'November', 84, 83, 83, 82, 1, 1, 0),
(1138, 678, 20, 'Nurse Licensure Examination', '2024', 'May', 19, 15, 14, 12, 5, 3, 0),
(1139, 678, 20, 'Nurse Licensure Examination', '2023', 'May', 41, 30, 30, 24, 11, 6, 0),
(1140, 678, 20, 'Nurse Licensure Examination', '2022', 'May', 19, 13, 13, 11, 6, 2, 0),
(1141, 678, 20, 'Nurse Licensure Examination', '2015', 'May', 54, 33, 31, 20, 23, 13, 0),
(1142, 678, 20, 'Nurse Licensure Examination', '2025', 'May', 29, 22, 26, 21, 3, 1, 0),
(1143, 678, 20, 'Nursing Licensure Exam (NLE)', '2023', 'May', 30, 24, 11, 6, 41, 30, 0),
(1215, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 18, 12, 12, 12, 6, 0, 0),
(1216, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 83, 61, 65, 57, 18, 4, 0),
(1217, 690, 22, 'Civil Engineer Licensure Examination', '2024', 'April', 119, 83, 87, 71, 32, 12, 0),
(1218, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2024', 'April', 21, 19, 16, 15, 5, 4, 0),
(1219, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2025', 'April', 26, 25, 25, 24, 1, 1, 0),
(1220, 691, 22, 'Registered Master Electrician Licensure Examination', '2025', 'April', 3, 2, 1, 1, 2, 1, 0),
(1221, 690, 22, 'Civil Engineer Licensure Examination', '2025', 'April', 114, 76, 93, 74, 21, 2, 0),
(1222, 694, 22, 'Nurse Licensure Examination', '2024', 'May', 172, 169, 157, 157, 15, 12, 3),
(1223, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 96, 71, 71, 62, 25, 9, 0),
(1224, 690, 22, 'Civil Engineer Licensure Examination', '2023', 'April', 101, 57, 68, 48, 33, 9, 0),
(1225, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2023', 'April', 23, 21, 21, 21, 2, 0, 0),
(1226, 691, 22, 'Registered Master Electrician Licensure Examination', '2023', 'April', 2, 1, 0, 0, 2, 1, 0),
(1227, 694, 22, 'Nurse Licensure Examination', '2023', 'May', 21, 15, 154, 154, 18, 12, 1),
(1228, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 14, 3, 1, 1, 13, 2, 0),
(1229, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 18, 7, 1, 1, 17, 6, 0),
(1230, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2022', 'April', 22, 21, 22, 21, 0, 0, 0),
(1231, 691, 22, 'Registered Master Electrician Licensure Examination', '2022', 'April', 3, 1, 2, 1, 1, 0, 0),
(1232, 690, 22, 'Civil Engineer Licensure Examination', '2022', 'May', 101, 59, 82, 54, 19, 5, 0),
(1233, 694, 22, 'Nurse Licensure Examination', '2022', 'May', 67, 62, 44, 43, 23, 19, 5),
(1234, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 27, 9, 7, 7, 20, 2, 0),
(1235, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2019', 'April', 5, 4, 4, 4, 1, 0, 0),
(1236, 691, 22, 'Registered Master Electrician Licensure Examination', '2019', 'April', 6, 2, 6, 2, 0, 0, 0),
(1237, 690, 22, 'Civil Engineer Licensure Examination', '2019', 'May', 29, 16, 15, 12, 14, 4, 0),
(1238, 690, 22, 'Civil Engineer Licensure Examination', '2018', 'May', 17, 12, 12, 12, 5, 0, 0),
(1239, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2018', 'April', 6, 2, 2, 2, 4, 0, 0),
(1240, 691, 22, 'Registered Master Electrician Licensure Examination', '2018', 'April', 1, 0, 1, 0, 0, 0, 0),
(1241, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 27, 11, 11, 11, 16, 0, 0),
(1242, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 102, 55, 65, 49, 37, 6, 0),
(1243, 690, 22, 'Civil Engineer Licensure Examination', '2017', 'May', 24, 10, 7, 7, 17, 3, 0),
(1244, 690, 22, 'Civil Engineer Licensure Examination', '2016', 'May', 9, 5, 2, 2, 7, 3, 0),
(1245, 694, 22, 'Nurse Licensure Examination', '2015', 'May', 115, 96, 80, 79, 35, 17, 1),
(1246, 690, 22, 'Civil Engineer Licensure Examination', '2015', 'May', 21, 5, 8, 4, 13, 1, 0),
(1247, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2015', 'April', 9, 3, 4, 1, 5, 2, 0),
(1248, 691, 22, 'Registered Master Electrician Licensure Examination', '2015', 'April', 1, 1, 0, 0, 1, 1, 0),
(1249, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2016', 'April', 6, 1, 0, 0, 6, 1, 0),
(1250, 691, 22, 'Registered Master Electrician Licensure Examination', '2016', 'April', 3, 1, 3, 1, 0, 0, 0),
(1251, 691, 22, 'Registered Electrical Engineer Licensure Examination', '2017', 'April', 8, 4, 5, 3, 3, 1, 0),
(1252, 691, 22, 'Registered Master Electrician Licensure Examination', '2017', 'April', 3, 3, 3, 3, 0, 0, 0),
(1253, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 30, 9, 10, 9, 20, 0, 0),
(1254, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 112, 51, 60, 45, 52, 6, 0),
(1255, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 26, 10, 9, 9, 17, 1, 0),
(1256, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 79, 40, 39, 33, 40, 7, 0),
(1257, 692, 22, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 42, 19, 13, 13, 29, 6, 0),
(1258, 693, 22, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 99, 45, 48, 36, 51, 9, 0),
(1259, 694, 22, 'Nurse Licensure Examination', '2025', 'May', 357, 354, 350, 349, 7, 5, 6),
(1260, 694, 22, 'Nurse Licensure Examination', '2018', 'June', 18, 2, 0, 0, 18, 2, 0),
(1261, 691, 22, 'Electrical Engineering Licensure Exam', '2024', 'August', 16, 15, 2, 2, 14, 13, 0),
(1262, 692, 22, 'Licensure Examination for Teachers', '2018', 'November', 31, 29, 27, 0, 4, 2, 0),
(1263, 690, 22, 'CIVIL ENGINEER LICENSURE EXAMINATION', '2016', 'NOVEMBER', 47, 42, 13, 4, 34, 38, 0),
(1264, 619, 5, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 26, 12, 19, 12, 7, 0, 0),
(1265, 618, 5, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 74, 54, 52, 45, 22, 9, 0),
(1266, 619, 5, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 25, 14, 15, 13, 10, 1, 0),
(1267, 618, 5, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 62, 47, 53, 44, 9, 3, 0),
(1268, 619, 5, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 33, 25, 19, 18, 14, 7, 0),
(1269, 618, 5, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 76, 46, 51, 39, 25, 7, 0),
(1270, 619, 5, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 11, 3, 0, 0, 11, 3, 0),
(1271, 618, 5, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 25, 4, 1, 0, 24, 4, 0),
(1272, 619, 5, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 34, 7, 6, 2, 28, 5, 0),
(1273, 618, 5, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 64, 16, 10, 5, 54, 11, 0),
(1274, 681, 28, 'Civil Engineer Licensure Examination', '2024', 'April', 57, 11, 47, 10, 10, 1, 0),
(1275, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2024', 'April', 11, 4, 7, 3, 4, 1, 0),
(1276, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 3, 0, 1, 0, 2, 0, 0),
(1277, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 15, 6, 6, 3, 2, 3, 0),
(1278, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2025', 'April', 28, 2, 28, 17, 13, 0, 0),
(1279, 682, 28, 'Registered Master Electrician Licensure Examination', '2025', 'April', 1, 1, 0, 0, 1, 1, 0),
(1280, 681, 28, 'Civil Engineer Licensure Examination', '2025', 'April', 34, 6, 10, 3, 24, 3, 0),
(1281, 685, 28, 'Nurse Licensure Examination', '2024', 'May', 66, 34, 6, 2, 60, 32, 0),
(1282, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 10, 3, 3, 3, 7, 0, 0),
(1283, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 53, 17, 27, 15, 26, 2, 0),
(1284, 681, 28, 'Civil Engineer Licensure Examination', '2023', 'April', 27, 1, 17, 0, 10, 1, 0),
(1285, 689, 28, 'Special Professional Licensure Examination', '2023', 'April', 1, 1, 1, 1, 0, 0, 0),
(1286, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2023', 'April', 13, 3, 10, 2, 3, 1, 0),
(1287, 682, 28, 'Registered Master Electrician Licensure Examination', '2023', 'April', 3, 2, 1, 1, 2, 1, 0),
(1288, 685, 28, 'Nurse Licensure Examination', '2023', 'May', 67, 40, 4, 3, 63, 37, 0),
(1289, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 6, 3, 0, 0, 6, 3, 0),
(1290, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 20, 9, 0, 0, 20, 9, 0),
(1291, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2022', 'April', 6, 0, 3, 0, 3, 0, 0),
(1292, 682, 28, 'Registered Master Electrician Licensure Examination', '2022', 'April', 7, 3, 2, 1, 5, 2, 0),
(1293, 681, 28, 'Civil Engineer Licensure Examination', '2022', 'May', 14, 1, 7, 0, 7, 1, 0),
(1294, 685, 28, 'Nurse Licensure Examination', '2022', 'May', 53, 35, 10, 7, 43, 28, 0),
(1295, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2019', 'March', 29, 5, 3, 0, 26, 5, 0),
(1296, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 88, 40, 48, 33, 40, 7, 0),
(1297, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2019', 'April', 11, 6, 3, 3, 8, 3, 0),
(1298, 682, 28, 'Registered Master Electrician Licensure Examination', '2019', 'April', 11, 3, 4, 2, 7, 1, 0),
(1299, 681, 28, 'Civil Engineer Licensure Examination', '2019', 'May', 15, 6, 4, 2, 11, 4, 0),
(1300, 681, 28, 'Civil Engineer Licensure Examination', '2018', 'May', 7, 1, 1, 0, 6, 1, 0),
(1301, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2018', 'April', 7, 1, 4, 0, 3, 1, 0),
(1302, 682, 28, 'Registered Master Electrician Licensure Examination', '2018', 'April', 11, 3, 6, 1, 5, 2, 0),
(1303, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 18, 4, 2, 0, 16, 4, 0),
(1304, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2018', 'March', 72, 26, 36, 21, 36, 5, 0),
(1305, 681, 28, 'Civil Engineer Licensure Examination', '2017', 'May', 10, 1, 3, 0, 7, 1, 0),
(1306, 681, 28, 'Civil Engineer Licensure Examination', '2016', 'May', 10, 2, 1, 0, 9, 2, 0),
(1307, 685, 28, 'Nurse Licensure Examination', '2015', 'May', 122, 62, 26, 20, 96, 42, 0),
(1308, 681, 28, 'Civil Engineer Licensure Examination', '2015', 'May', 9, 1, 0, 0, 9, 1, 0),
(1309, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2015', 'April', 13, 7, 4, 4, 9, 3, 0),
(1310, 682, 28, 'Registered Master Electrician Licensure Examination', '2015', 'April', 4, 1, 1, 0, 3, 1, 0),
(1311, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2016', 'April', 8, 1, 4, 0, 4, 1, 0),
(1312, 682, 28, 'Registered Master Electrician Licensure Examination', '2016', 'April', 8, 1, 4, 0, 4, 1, 0),
(1313, 682, 28, 'Registered Electrical Engineer Licensure Examination', '2017', 'April', 4, 0, 0, 0, 4, 0, 0),
(1314, 682, 28, 'Registered Master Electrician Licensure Examination', '2017', 'April', 12, 7, 9, 7, 3, 0, 0),
(1315, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 12, 0, 1, 0, 11, 0, 0),
(1316, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 13, 1, 1, 0, 12, 1, 0),
(1317, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 18, 9, 2, 2, 16, 7, 0),
(1318, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 52, 21, 26, 18, 26, 3, 0),
(1319, 686, 28, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 14, 2, 1, 1, 13, 1, 0),
(1320, 689, 28, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 72, 30, 36, 23, 36, 7, 0),
(1321, 685, 28, 'Nurse Licensure Examination', '2025', 'May', 66, 26, 4, 3, 62, 23, 0),
(1322, 682, 28, 'Registered Electrical Engineer Licensure Exam (REELE)', '2025', 'August', 1, 0, 7, 2, 8, 2, 0),
(1323, 685, 28, 'Nursing Licensure Exam (NLE)', '2023', 'May', 4, 3, 63, 37, 67, 40, 0),
(1324, 685, 28, 'Nurse Licensure Examination (SPLE)', '2018', 'August', 0, 0, 5, 3, 5, 3, 0),
(1325, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2024', 'March', 68, 58, 57, 52, 11, 6, 0),
(1326, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2024', 'March', 105, 69, 80, 62, 25, 7, 0),
(1327, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2025', 'March', 86, 67, 72, 65, 14, 2, 0),
(1328, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2025', 'March', 122, 98, 104, 94, 18, 4, 0),
(1329, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2023', 'March', 52, 36, 34, 32, 18, 4, 0),
(1330, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2023', 'March', 91, 47, 56, 44, 35, 3, 0),
(1331, 661, 9, 'Special Professional Licensure Examination', '2023', 'April', 1, 0, 0, 0, 1, 0, 0),
(1332, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2022', 'March', 24, 19, 0, 0, 24, 19, 0),
(1333, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2022', 'March', 27, 9, 0, 0, 27, 9, 0),
(1334, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2019', 'March', 68, 6, 10, 3, 58, 3, 0),
(1335, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2018', 'March', 40, 17, 6, 4, 34, 13, 0),
(1336, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2017', 'March', 34, 4, 6, 2, 28, 2, 0),
(1337, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2017', 'March', 70, 24, 28, 16, 42, 8, 0);
INSERT INTO `exam_results` (`exam_id`, `program_id`, `university_id`, `exam_name`, `year`, `exam_month`, `total_examinees`, `total_passers`, `first_timers_total`, `first_timers_passed`, `repeaters_total`, `repeaters_passed`, `number_of_topnotchers`) VALUES
(1338, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2016', 'March', 22, 11, 0, 0, 22, 11, 0),
(1339, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2016', 'March', 42, 10, 17, 8, 25, 2, 0),
(1340, 662, 9, 'Licensure Examination for Teachers (Elementary)', '2015', 'March', 37, 14, 17, 10, 20, 4, 0),
(1341, 661, 9, 'Licensure Examination for Teachers (Secondary)', '2015', 'March', 54, 20, 27, 15, 27, 5, 0),
(1342, 662, 9, 'Licensure Examination for Teachers', '2018', 'November', 121, 49, 26, 24, 95, 25, 0);

-- --------------------------------------------------------

--
-- Table structure for table `institution_type`
--

CREATE TABLE `institution_type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institution_type`
--

INSERT INTO `institution_type` (`type_id`, `type_name`, `description`) VALUES
(1, 'Public', NULL),
(2, 'Private', NULL),
(3, 'Vocational', NULL),
(4, 'Any', NULL),
(5, 'SUC', NULL),
(6, 'LUC', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `interest_programs`
--

CREATE TABLE `interest_programs` (
  `interest_program_id` int(11) NOT NULL,
  `program_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interest_programs`
--

INSERT INTO `interest_programs` (`interest_program_id`, `program_name`) VALUES
(1, 'BS Nursing'),
(2, 'BS Civil Engineering'),
(3, 'BS Accountancy'),
(4, 'BS Psychology'),
(5, 'BS Information Technology'),
(6, 'BS Architecture'),
(7, 'BS Education'),
(8, 'BS Criminology'),
(9, 'BS Electrical Engineering'),
(10, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `municipalities`
--

CREATE TABLE `municipalities` (
  `municipality_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `municipality_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `municipalities`
--

INSERT INTO `municipalities` (`municipality_id`, `district_id`, `municipality_name`) VALUES
(1, 1, 'Alaminos City'),
(2, 1, 'Bani'),
(3, 1, 'Bolinao'),
(4, 1, 'Anda'),
(5, 1, 'Burgos'),
(6, 1, 'Dasol'),
(7, 1, 'Infanta'),
(8, 1, 'Mabini'),
(10, 2, 'Aguilar'),
(11, 2, 'Bugallon'),
(15, 2, 'Labrador'),
(17, 2, 'Mangatarem'),
(18, 2, 'Salasa'),
(19, 1, 'Sual'),
(20, 5, 'Alcala'),
(21, 5, 'Bautista'),
(22, 3, 'Bayambang'),
(23, 6, 'Santa Maria'),
(24, 2, 'Urbiztondo'),
(25, 2, 'Basista'),
(26, 3, 'Malasiqui'),
(27, 5, 'Binalonan'),
(28, 2, 'Lingayen'),
(33, 1, 'Mabini'),
(35, 1, 'Agno'),
(41, 4, 'Manaoag'),
(42, 5, 'Pozorrubio'),
(43, 3, 'San Carlos City'),
(44, 4, 'San Fabian'),
(45, 4, 'San Jacinto'),
(46, 5, 'Sison'),
(47, 3, 'Santa Barbara'),
(48, 5, 'Santo Tomas'),
(49, 6, 'Tayug'),
(50, 6, 'Umingan'),
(51, 4, 'Dagupan City'),
(52, 3, 'Calasiao'),
(53, 4, 'Mangaldan'),
(54, 3, 'Mapandan'),
(57, 2, 'Binmaley'),
(60, 5, 'Urdaneta City'),
(61, 6, 'Asingan'),
(62, 5, 'Laoac'),
(63, 5, 'Villasis'),
(64, 6, 'Balungao'),
(65, 6, 'Natividad'),
(66, 6, 'Rosales'),
(67, 6, 'San Manuel'),
(68, 6, 'San Nicolas'),
(69, 6, 'San Quintin');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL,
  `university_id` int(11) NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `abbreviation` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `performance_summary` text DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `is_licensure_based` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `university_id`, `program_name`, `abbreviation`, `description`, `long_description`, `performance_summary`, `logo_url`, `is_licensure_based`, `created_at`) VALUES
(599, 7, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'This program equips future educators with pedagogical knowledge, classroom management skills, and subject mastery required for elementary education.', 'Graduates are expected to perform well in the Licensure Examination for Teachers (LET) at the elementary level.', NULL, 1, '2026-01-07 20:04:41'),
(600, 7, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'This program focuses on subject specialization, teaching strategies, and assessment methods for secondary education.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET) for secondary education.', NULL, 1, '2026-01-07 20:04:41'),
(601, 7, 'Bachelor of Science in Agribusiness Management', 'BSABM', 'A program focused on agricultural business, management, and entrepreneurship.', 'This program integrates agriculture, economics, and business management to prepare students for agribusiness enterprises.', 'The program emphasizes business sustainability and agricultural innovation.', NULL, 1, '2026-01-07 20:04:41'),
(602, 7, 'Bachelor of Science in Business Administration – Financial Management', 'BSBA-FM', 'A business program specializing in financial planning, analysis, and management.', 'This program develops competencies in financial analysis, investments, banking, and corporate finance.', 'Graduates are trained for careers in finance-related industries and institutions.', NULL, 0, '2026-01-07 20:04:41'),
(603, 10, 'Bachelor of Early Childhood Education', 'BECEd', 'A program that prepares students to teach and care for young children.', 'This program focuses on early childhood development, learning theories, and classroom strategies for preschool and early grades.', 'Graduates are prepared to take the Licensure Examination for Teachers (Early Childhood).', NULL, 1, '2026-01-07 20:14:27'),
(604, 10, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'This program emphasizes subject mastery, teaching strategies, and assessment methods for secondary education.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:14:27'),
(605, 10, 'Bachelor of Arts in English Language', 'BA English', 'A liberal arts program focused on English language studies.', 'This program develops proficiency in linguistics, literature, communication, and language education.', 'Graduates may pursue teaching or communication-related careers.', NULL, 0, '2026-01-07 20:14:27'),
(606, 10, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing, networking, and information systems.', 'This program prepares students for careers in software development, systems administration, and IT services.', 'Graduates are trained for various IT industry roles.', NULL, 0, '2026-01-07 20:14:27'),
(607, 10, 'Bachelor of Science in Mathematics', 'BS Math', 'A program centered on mathematical theory and applications.', 'This program strengthens analytical, problem-solving, and quantitative skills.', 'Graduates may pursue teaching, research, or analytics-related careers.', NULL, 0, '2026-01-07 20:14:27'),
(608, 10, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction.', 'This program covers structural, geotechnical, and transportation engineering.', 'Graduates are expected to take the Civil Engineering Licensure Examination.', NULL, 1, '2026-01-07 20:14:27'),
(609, 10, 'Bachelor of Science in Electrical Engineering', 'BSEE', 'An engineering program specializing in electrical systems and power engineering.', 'This program focuses on power systems, electronics, and electrical design.', 'Graduates are expected to take the Electrical Engineering Licensure Examination.', NULL, 1, '2026-01-07 20:14:27'),
(610, 10, 'Bachelor of Science in Architecture', 'BS Arch', 'A program focused on architectural design and planning.', 'This program develops skills in architectural design, drafting, and building technology.', 'Graduates are expected to take the Architecture Licensure Examination.', NULL, 1, '2026-01-07 20:14:27'),
(611, 10, 'Bachelor of Science in Computer Engineering', 'BSCpE', 'An engineering program combining hardware and software systems.', 'This program focuses on computer systems, embedded systems, and network design.', 'Graduates are expected to take the Computer Engineering Licensure Examination.', NULL, 1, '2026-01-07 20:14:27'),
(612, 10, 'Bachelor of Science in Mechanical Engineering', 'BSME', 'An engineering program focused on mechanical systems and design.', 'This program covers thermodynamics, machine design, and manufacturing processes.', 'Graduates are expected to take the Mechanical Engineering Licensure Examination.', NULL, 1, '2026-01-07 20:14:27'),
(613, 4, 'Bachelor of Science in Hospitality Management', 'BSHM', 'A program focused on hospitality operations, tourism, and service management.', 'This program prepares students for careers in hotels, restaurants, tourism, and event management.', 'Graduates are trained for professional roles in the hospitality and tourism industry.', NULL, 0, '2026-01-07 20:22:39'),
(614, 4, 'Bachelor of Science in Business Administration', 'BSBA', 'A program centered on business management, marketing, and entrepreneurship.', 'This program develops competencies in business operations, leadership, and strategic planning.', 'Graduates are prepared for various careers in business and management.', NULL, 0, '2026-01-07 20:22:39'),
(615, 4, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing, software development, and information systems.', 'This program equips students with skills in programming, networking, and system administration.', 'Graduates are trained for IT-related careers in various industries.', NULL, 0, '2026-01-07 20:22:39'),
(616, 4, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'This program emphasizes subject mastery, teaching strategies, and assessment methods for secondary education.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:22:39'),
(617, 4, 'Bachelor in Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'This program focuses on pedagogy, child development, and classroom management.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:22:39'),
(618, 5, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'This program emphasizes subject specialization, teaching strategies, and assessment methods for secondary education.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:26:52'),
(619, 5, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'This program focuses on pedagogy, child development, and classroom management.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:26:52'),
(620, 5, 'Bachelor of Technology and Livelihood Education', 'BTLEd', 'A program that prepares students to teach technology and livelihood subjects.', 'This program emphasizes technical skills, entrepreneurship, and teaching strategies.', 'Graduates are prepared to take the Licensure Examination for Teachers (TLE specialization).', NULL, 1, '2026-01-07 20:26:52'),
(621, 5, 'Bachelor of Science in Business Administration', 'BSBA', 'A program focused on business management, marketing, and entrepreneurship.', 'This program develops competencies in leadership, operations, and strategic planning.', 'Graduates are prepared for various careers in business and management.', NULL, 0, '2026-01-07 20:26:52'),
(622, 5, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing, software development, and information systems.', 'This program equips students with skills in programming, networking, and systems administration.', 'Graduates are trained for IT-related careers across industries.', NULL, 0, '2026-01-07 20:26:52'),
(623, 5, 'Bachelor of Industrial Technology', 'BIT', 'A program focused on industrial processes, manufacturing, and applied technology.', 'This program prepares students for technical and supervisory roles in industrial settings.', 'Graduates are trained for careers in manufacturing, production, and technical services.', NULL, 0, '2026-01-07 20:26:52'),
(624, 6, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program is designed to equip future educators with a strong foundation in teaching methodologies, child development, curriculum design, and classroom management. Students are trained to handle diverse learning needs, develop inclusive teaching strategies, and apply assessment techniques appropriate for elementary learners. The program also emphasizes professional ethics, community engagement, and continuous professional growth in the field of basic education.', 'Graduates are expected to perform in the Licensure Examination for Teachers (LET) and demonstrate competence in elementary-level instruction.', NULL, 1, '2026-01-07 20:33:30'),
(625, 6, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program focuses on developing subject-area expertise alongside effective teaching strategies for adolescent learners. Students gain in-depth knowledge in their chosen specialization, instructional planning, classroom assessment, and educational technology. The program prepares future educators to foster critical thinking, academic excellence, and responsible citizenship among secondary-level students.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET) for secondary education.', NULL, 1, '2026-01-07 20:33:30'),
(626, 6, 'Bachelor of Technology and Livelihood Education', 'BTLEd', 'A program that prepares students to teach technology and livelihood subjects.', 'The Bachelor of Technology and Livelihood Education program integrates technical skills training with educational theory and teaching practice. Students are trained in areas such as entrepreneurship, home economics, industrial arts, and information technology, while also learning effective teaching methodologies. The program aims to produce competent educators who can deliver practical, skills-based instruction aligned with community and industry needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET) with TLE specialization.', NULL, 1, '2026-01-07 20:33:30'),
(627, 6, 'Bachelor of Physical Education', 'BPEd', 'A program focused on physical education, sports, and wellness.', 'The Bachelor of Physical Education program develops professionals who promote physical fitness, sports excellence, and healthy lifestyles. Students study human movement, sports science, coaching, physical activity programming, and health education. The program also emphasizes leadership, teamwork, and ethical practices in sports and physical education instruction.', 'Graduates are prepared for careers in teaching, coaching, and sports-related professions.', NULL, 1, '2026-01-07 20:33:30'),
(628, 6, 'Bachelor of Science in Business Administration', 'BSBA', 'A program centered on business management and organizational leadership.', 'The Bachelor of Science in Business Administration program equips students with essential knowledge in management, marketing, finance, and entrepreneurship. The curriculum focuses on developing analytical thinking, leadership skills, and ethical decision-making. Graduates are prepared to adapt to dynamic business environments and contribute effectively to organizational success.', 'Graduates are trained for managerial and administrative roles in various industries.', NULL, 0, '2026-01-07 20:33:30'),
(629, 6, 'Bachelor of Science in Nursing', 'BSN', 'A professional health sciences program focused on patient care.', 'The Bachelor of Science in Nursing program prepares students for professional nursing practice through comprehensive training in health assessment, nursing care, research, and clinical skills. Students gain hands-on experience in hospitals and community settings, emphasizing compassionate care, ethical practice, and evidence-based decision-making. The program aims to produce competent nurses who can respond to diverse healthcare needs.', 'Graduates are expected to take the Nurse Licensure Examination (NLE).', NULL, 1, '2026-01-07 20:33:30'),
(630, 6, 'Bachelor of Public Administration', 'BPA', 'A program focused on public service, governance, and policy implementation.', 'The Bachelor of Public Administration program prepares students for careers in government and public sector organizations. The curriculum emphasizes public policy analysis, administrative systems, public finance, and ethical governance. Students are trained to understand the complexities of public service and contribute to effective and transparent administration.', 'Graduates are prepared for roles in government agencies and public institutions.', NULL, 0, '2026-01-07 20:33:30'),
(631, 6, 'Bachelor of Arts in English Language', 'AB English', 'A liberal arts program focused on English language and communication.', 'The Bachelor of Arts in English Language program develops advanced proficiency in English communication, linguistics, literature, and critical analysis. Students enhance their skills in writing, speaking, and language research while gaining cultural and literary perspectives. The program prepares graduates for careers in education, communication, media, and related fields.', 'Graduates may pursue teaching, writing, or communication-related professions.', NULL, 0, '2026-01-07 20:33:30'),
(632, 6, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing and information systems.', 'The Bachelor of Science in Information Technology program provides students with strong foundations in programming, database management, networking, and systems development. Emphasis is placed on problem-solving, system analysis, and the application of technology in real-world scenarios. Graduates are prepared to meet the demands of the rapidly evolving IT industry.', 'Graduates are trained for various IT and technology-driven careers.', NULL, 0, '2026-01-07 20:33:30'),
(633, 6, 'Bachelor of Early Childhood Education', 'BECEd', 'A program focused on the education and development of young children.', 'The Bachelor of Early Childhood Education program specializes in the holistic development of children from birth to early grades. Students study child psychology, curriculum design for early learners, play-based learning, and inclusive education. The program aims to prepare compassionate and skilled educators who can support early childhood development and learning readiness.', 'Graduates are prepared to take the Licensure Examination for Teachers (Early Childhood Education).', NULL, 1, '2026-01-07 20:33:30'),
(634, 71, 'Bachelor of Science in Fisheries and Aquatic Sciences', 'BSFAS', 'A program focused on fisheries management and aquatic resources.', 'The Bachelor of Science in Fisheries and Aquatic Sciences program provides students with comprehensive knowledge of aquatic ecosystems, fisheries biology, aquaculture practices, and coastal resource management. The curriculum emphasizes sustainable utilization of marine and freshwater resources, environmental conservation, and applied research. Graduates are trained to support food security, biodiversity protection, and responsible fisheries development.', 'Graduates are prepared for professional roles in fisheries management, aquaculture, and environmental conservation.', NULL, 1, '2026-01-07 20:39:29'),
(635, 71, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program equips students with subject-area expertise and effective teaching strategies for secondary-level learners. The program emphasizes instructional planning, classroom assessment, educational technology, and professional ethics. Graduates are trained to promote critical thinking, academic achievement, and positive learner development.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:39:29'),
(636, 71, 'Bachelor of Science in Environmental Science', 'BSES', 'A program focused on environmental protection and sustainability.', 'The Bachelor of Science in Environmental Science program integrates natural sciences, environmental policy, and resource management to address environmental challenges. Students study ecology, environmental monitoring, impact assessment, and sustainability practices. The program aims to develop environmentally responsible professionals capable of supporting conservation and sustainable development initiatives.', 'Graduates are trained for careers in environmental management, research, and sustainability programs.', NULL, 0, '2026-01-07 20:39:29'),
(637, 71, 'Bachelor of Science in Criminology', 'BSCrim', 'A program focused on crime prevention, law enforcement, and public safety.', 'The Bachelor of Science in Criminology program prepares students for careers in law enforcement, criminal justice, and public safety. The curriculum covers criminal law, forensic science, correctional administration, and crime prevention strategies. Emphasis is placed on ethical conduct, discipline, and community-oriented policing.', 'Graduates are expected to take the Criminologist Licensure Examination.', NULL, 1, '2026-01-07 20:39:29'),
(638, 1, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area expertise and effective instructional strategies for adolescent learners. Students are trained in lesson planning, classroom assessment, educational technology, and professional ethics. The program prepares graduates to foster critical thinking, academic achievement, and holistic development among secondary school students.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:49:00'),
(639, 1, 'Bachelor of Technical-Vocational Teacher Education', 'BTVTEd', 'A program focused on technical and vocational teacher preparation.', 'The Bachelor of Technical-Vocational Teacher Education program combines technical skills training with pedagogical foundations to prepare competent TVET educators. Students acquire industry-relevant competencies alongside teaching methodologies, assessment strategies, and curriculum development tailored to technical-vocational education.', 'Graduates are prepared to take the Licensure Examination for Teachers (Technical-Vocational specialization).', NULL, 1, '2026-01-07 20:49:00'),
(640, 1, 'Bachelor of Technology and Livelihood Education', 'BTLEd', 'A program that prepares students to teach technology and livelihood subjects.', 'The Bachelor of Technology and Livelihood Education program integrates livelihood skills, entrepreneurship, and instructional strategies. Students are trained in various TLE areas such as industrial arts, home economics, and information technology while developing effective teaching practices aligned with community and industry needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:49:00'),
(641, 1, 'Bachelor of Industrial Technology', 'BIT', 'A program focused on applied industrial and technical skills.', 'The Bachelor of Industrial Technology program emphasizes practical training in industrial processes, manufacturing systems, and technical operations. The curriculum prepares students for supervisory, technical, and production roles in industrial and manufacturing environments through hands-on and industry-oriented instruction.', 'Graduates are trained for careers in industrial and technical fields.', NULL, 0, '2026-01-07 20:49:00'),
(642, 1, 'Bachelor of Arts in English Language', 'AB English', 'A liberal arts program focused on English language and communication.', 'The Bachelor of Arts in English Language program develops advanced competencies in language use, linguistics, literature, and communication. Students enhance their analytical, writing, and speaking skills while gaining cultural and literary awareness. The program prepares graduates for careers in education, communication, media, and related professions.', 'Graduates may pursue careers in teaching, communication, and writing.', NULL, 0, '2026-01-07 20:49:00'),
(643, 1, 'Bachelor of Arts in Economics', 'AB Econ', 'A program focused on economic theory and analysis.', 'The Bachelor of Arts in Economics program provides students with a strong foundation in microeconomics, macroeconomics, and quantitative analysis. The curriculum emphasizes critical thinking, data interpretation, and policy evaluation to prepare graduates for roles in government, research, finance, and development sectors.', 'Graduates are prepared for analytical and research-oriented careers.', NULL, 0, '2026-01-07 20:49:00'),
(644, 1, 'Bachelor of Science in Biology', 'BS Bio', 'A program centered on the study of living organisms.', 'The Bachelor of Science in Biology program offers comprehensive training in biological sciences, including genetics, ecology, microbiology, and biotechnology. Students engage in laboratory and field research to develop scientific inquiry and analytical skills applicable to research, healthcare, and environmental fields.', 'Graduates are trained for scientific research and allied science careers.', NULL, 0, '2026-01-07 20:49:00'),
(645, 1, 'Bachelor of Science in Nutrition and Dietetics', 'BSND', 'A program focused on nutrition, food science, and dietetics.', 'The Bachelor of Science in Nutrition and Dietetics program prepares students to apply scientific principles of nutrition and food science to promote health and wellness. The curriculum includes diet planning, community nutrition, food service management, and clinical nutrition practice. Graduates are trained to support public health initiatives and nutrition-related services.', 'Graduates are expected to take the Nutritionist-Dietitian Licensure Examination.', NULL, 1, '2026-01-07 20:49:00'),
(646, 1, 'Bachelor of Science in Social Work', 'BSSW', 'A program focused on social welfare, community development, and social services.', 'The Bachelor of Science in Social Work program prepares students for professional practice in social welfare and community development. The curriculum emphasizes human behavior, social policy, case management, and fieldwork training. Students are trained to advocate for social justice, empower vulnerable populations, and contribute to community-based interventions and social development initiatives.', 'Graduates are expected to take the Social Worker Licensure Examination.', NULL, 1, '2026-01-07 20:53:36'),
(647, 1, 'Bachelor of Public Administration', 'BPA', 'A program focused on governance, public service, and policy implementation.', 'The Bachelor of Public Administration program equips students with knowledge of public sector management, policy analysis, public finance, and administrative systems. The curriculum emphasizes ethical governance, accountability, and effective service delivery in government and public institutions.', 'Graduates are prepared for careers in government agencies and public service organizations.', NULL, 0, '2026-01-07 20:53:36'),
(648, 1, 'Bachelor of Science in Business Administration', 'BSBA', 'A program centered on business management and organizational leadership.', 'The Bachelor of Science in Business Administration program develops competencies in management, marketing, finance, and entrepreneurship. Students are trained in strategic decision-making, leadership, and ethical business practices to succeed in dynamic business environments.', 'Graduates are prepared for managerial and administrative roles in various industries.', NULL, 0, '2026-01-07 20:53:36'),
(649, 1, 'Bachelor of Science in Computer Science', 'BSCS', 'A program focused on computing theory, software development, and algorithms.', 'The Bachelor of Science in Computer Science program provides students with a strong foundation in programming, data structures, algorithms, and software engineering. The curriculum emphasizes problem-solving, system design, and innovation, preparing graduates for careers in software development, research, and advanced computing fields.', 'Graduates are trained for software engineering and computing-related careers.', NULL, 0, '2026-01-07 20:53:36'),
(650, 1, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing systems, networks, and information management.', 'The Bachelor of Science in Information Technology program emphasizes the application of technology in organizational and business settings. Students gain skills in programming, database systems, networking, and systems administration, preparing them to support and manage information systems across industries.', 'Graduates are trained for IT and technology-driven careers.', NULL, 0, '2026-01-07 20:53:36'),
(651, 1, 'Bachelor of Science in Mathematics', 'BS Math', 'A program centered on mathematical theory and quantitative analysis.', 'The Bachelor of Science in Mathematics program develops advanced analytical, logical, and quantitative skills. The curriculum covers pure and applied mathematics, statistics, and mathematical modeling, preparing graduates for careers in education, research, analytics, and finance.', 'Graduates are prepared for analytical and quantitative career paths.', NULL, 0, '2026-01-07 20:53:36'),
(652, 1, 'Bachelor of Science in Hospitality Management', 'BSHM', 'A program focused on hospitality operations and service management.', 'The Bachelor of Science in Hospitality Management program prepares students for professional careers in hotels, restaurants, tourism, and event management. The curriculum emphasizes customer service excellence, operations management, and hospitality entrepreneurship to meet global industry standards.', 'Graduates are trained for careers in the hospitality and tourism industry.', NULL, 0, '2026-01-07 20:53:36'),
(653, 8, 'Bachelor of Science in Hospitality Management', 'BSHM', 'A program focused on hospitality operations and service excellence.', 'The Bachelor of Science in Hospitality Management program prepares students for professional roles in hotels, restaurants, tourism, and event management. The curriculum emphasizes customer service, hospitality operations, food and beverage management, and industry best practices. Graduates are trained to meet global standards in hospitality and tourism services.', 'Graduates are trained for careers in the hospitality and tourism industry.', NULL, 0, '2026-01-07 20:57:13'),
(654, 8, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program equips future educators with foundational knowledge in teaching methodologies, child development, classroom management, and assessment techniques. The curriculum emphasizes inclusive education, learner-centered teaching, and professional ethics.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:57:13'),
(655, 8, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program focuses on subject-area mastery and effective teaching strategies for adolescent learners. Students are trained in lesson planning, classroom assessment, educational technology, and instructional innovation to promote academic excellence at the secondary level.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 20:57:13'),
(656, 8, 'Bachelor of Technology and Livelihood Education', 'BTLEd', 'A program that prepares students to teach technology and livelihood subjects.', 'The Bachelor of Technology and Livelihood Education program integrates technical skills development with pedagogical foundations. Students are trained in livelihood, entrepreneurship, and applied technology areas while mastering effective teaching methodologies aligned with industry and community needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET) with TLE specialization.', NULL, 1, '2026-01-07 20:57:13'),
(657, 8, 'Bachelor of Science in Business Administration', 'BSBA', 'A program focused on business management and organizational leadership.', 'The Bachelor of Science in Business Administration program provides students with a strong foundation in management, marketing, finance, and entrepreneurship. The curriculum emphasizes leadership, ethical decision-making, and strategic planning to prepare graduates for dynamic business environments.', 'Graduates are trained for managerial and administrative careers.', NULL, 0, '2026-01-07 20:57:13'),
(658, 8, 'Bachelor of Science in Information Technology', 'BSIT', 'A program focused on computing systems and information management.', 'The Bachelor of Science in Information Technology program equips students with practical skills in programming, networking, database systems, and systems administration. Emphasis is placed on problem-solving and applying technology to support organizational needs across industries.', 'Graduates are trained for IT and technology-driven careers.', NULL, 0, '2026-01-07 20:57:13'),
(659, 8, 'Bachelor of Science in Office Administration', 'BSOA', 'A program focused on office management and administrative support.', 'The Bachelor of Science in Office Administration program prepares students for professional administrative roles in modern organizations. The curriculum emphasizes office systems, records management, business communication, and administrative technology, equipping graduates with skills essential for efficient organizational operations.', 'Graduates are trained for administrative and office management careers.', NULL, 0, '2026-01-07 20:57:13'),
(660, 9, 'Bachelor of Science in Agriculture', 'BS Agri', 'A program focused on agricultural science and farm management.', 'The Bachelor of Science in Agriculture program provides comprehensive training in crop science, animal science, soil management, and sustainable farming practices. Students gain practical and theoretical knowledge to improve agricultural productivity, food security, and environmental sustainability. The curriculum emphasizes research, innovation, and modern agricultural technologies.', 'Graduates are trained for careers in agriculture, research, and farm management.', NULL, 1, '2026-01-07 21:02:26'),
(661, 9, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area expertise and effective teaching strategies for adolescent learners. Students are trained in lesson planning, classroom assessment, educational technology, and professional ethics to promote academic excellence and learner development.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:02:26'),
(662, 9, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program equips future educators with foundational knowledge in pedagogy, child development, curriculum design, and classroom management. The curriculum emphasizes inclusive and learner-centered teaching approaches for elementary education.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:02:26'),
(663, 9, 'Bachelor of Technology and Livelihood Education', 'BTLEd', 'A program that prepares students to teach technology and livelihood subjects.', 'The Bachelor of Technology and Livelihood Education program integrates technical skills, entrepreneurship, and teaching methodologies. Students are trained in livelihood education, applied technology, and instructional strategies aligned with industry and community needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET) with TLE specialization.', NULL, 1, '2026-01-07 21:02:26'),
(664, 9, 'Bachelor of Science in Agricultural and Biosystems Engineering', 'BSABE', 'An engineering program focused on agricultural and biosystems technologies.', 'The Bachelor of Science in Agricultural and Biosystems Engineering program applies engineering principles to agricultural production and biological systems. The curriculum covers farm machinery, irrigation systems, post-harvest technology, and environmental management to support efficient and sustainable agricultural practices.', 'Graduates are prepared to take the Agricultural and Biosystems Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:02:26'),
(665, 9, 'Bachelor of Science in Agribusiness Management', 'BSABM', 'A program focused on agricultural business and entrepreneurship.', 'The Bachelor of Science in Agribusiness Management program integrates agriculture, economics, and business management. Students develop competencies in agribusiness operations, marketing, finance, and supply chain management to support agricultural enterprises and rural development.', 'Graduates are trained for managerial roles in agribusiness and related industries.', NULL, 1, '2026-01-07 21:02:26'),
(666, 2, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program equips future educators with comprehensive training in child development, teaching methodologies, classroom management, and curriculum planning. The program emphasizes inclusive education, learner-centered instruction, and professional ethics to support effective teaching in elementary schools.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:09:13'),
(667, 2, 'Bachelor of Early Childhood Education', 'BECEd', 'A program focused on the education and development of young children.', 'The Bachelor of Early Childhood Education program specializes in the holistic development of children from birth to early grades. Students study child psychology, play-based learning, early literacy, and inclusive teaching practices, preparing them to support early learning and developmental needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (Early Childhood Education).', NULL, 1, '2026-01-07 21:09:13'),
(668, 2, 'Bachelor of Special Needs Education', 'BSNEd', 'A program focused on educating learners with special needs.', 'The Bachelor of Special Needs Education program prepares educators to work with learners who have disabilities and exceptionalities. The curriculum emphasizes inclusive education, individualized instruction, assessment techniques, and collaboration with families and specialists to support diverse learning needs.', 'Graduates are prepared to take the Licensure Examination for Teachers (Special Needs Education).', NULL, 1, '2026-01-07 21:09:13'),
(669, 2, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area expertise and effective teaching strategies for adolescent learners. Students are trained in instructional planning, assessment, educational technology, and professional practice to promote academic achievement at the secondary level.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:09:13'),
(670, 2, 'Bachelor of Science in Nursing', 'BSN', 'A professional health sciences program focused on patient care.', 'The Bachelor of Science in Nursing program prepares students for professional nursing practice through comprehensive instruction in health assessment, nursing care, research, and clinical training. Students gain hands-on experience in hospitals and community settings, emphasizing ethical practice, compassion, and evidence-based care.', 'Graduates are expected to take the Nurse Licensure Examination (NLE).', NULL, 1, '2026-01-07 21:09:13'),
(671, 2, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction.', 'The Bachelor of Science in Civil Engineering program covers structural, geotechnical, transportation, and construction engineering. Students develop technical and analytical skills necessary for designing, building, and maintaining infrastructure projects that support sustainable development.', 'Graduates are expected to take the Civil Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:09:13'),
(672, 2, 'Bachelor of Science in Electrical Engineering', 'BSEE', 'An engineering program specializing in electrical systems and power engineering.', 'The Bachelor of Science in Electrical Engineering program focuses on power systems, electronics, control systems, and electrical design. Students are trained to apply engineering principles to develop efficient and safe electrical solutions for various industries.', 'Graduates are expected to take the Electrical Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:09:13'),
(673, 2, 'Bachelor of Science in Computer Engineering', 'BSCpE', 'An engineering program combining hardware and software systems.', 'The Bachelor of Science in Computer Engineering program integrates computer hardware, software development, and embedded systems. Students gain expertise in digital systems, programming, and network design, preparing them for engineering roles in technology-driven industries.', 'Graduates are expected to take the Computer Engineering Licensure Examination.', NULL, 0, '2026-01-07 21:09:13'),
(674, 20, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction.', 'The Bachelor of Science in Civil Engineering program provides students with a strong foundation in structural, geotechnical, transportation, and construction engineering. The curriculum emphasizes problem-solving, technical design, and sustainable infrastructure development to prepare graduates for professional engineering practice.', 'Graduates are expected to take the Civil Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:12:28'),
(675, 20, 'Bachelor of Science in Computer Engineering', 'BSCpE', 'An engineering program combining computer hardware and software systems.', 'The Bachelor of Science in Computer Engineering program integrates digital systems, embedded technologies, and software development. Students are trained to design, implement, and maintain computer-based systems used in modern industries.', 'Graduates are expected to take the Computer Engineering Licensure Examination.', NULL, 0, '2026-01-07 21:12:28'),
(676, 20, 'Bachelor of Science in Electrical Engineering', 'BSEE', 'An engineering program focused on electrical systems and power engineering.', 'The Bachelor of Science in Electrical Engineering program covers power generation, electrical machines, control systems, and electronics. The curriculum prepares students to design and manage efficient electrical systems in industrial and commercial environments.', 'Graduates are expected to take the Electrical Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:12:28'),
(677, 20, 'Bachelor of Science in Electronics Engineering', 'BSECE', 'An engineering program specializing in electronics and communications.', 'The Bachelor of Science in Electronics Engineering program focuses on electronics, telecommunications, signal processing, and control systems. Students are trained to develop and maintain electronic and communication technologies essential to modern society.', 'Graduates are expected to take the Electronics Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:12:28'),
(678, 20, 'Bachelor of Science in Nursing', 'BSN', 'A professional health sciences program focused on patient care.', 'The Bachelor of Science in Nursing program prepares students for professional nursing practice through intensive theoretical instruction and clinical training. Emphasis is placed on patient-centered care, ethical practice, and evidence-based nursing interventions.', 'Graduates are expected to take the Nurse Licensure Examination (NLE).', NULL, 1, '2026-01-07 21:12:28'),
(679, 20, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program equips future educators with foundational teaching competencies, child development knowledge, and classroom management skills. The curriculum emphasizes inclusive education and learner-centered instruction.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:12:28'),
(680, 20, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area mastery and effective instructional strategies for secondary-level learners. Students are trained in lesson planning, assessment, and educational technology to support academic achievement.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:12:28'),
(681, 28, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction.', 'The Bachelor of Science in Civil Engineering program provides students with a strong foundation in structural, geotechnical, transportation, and construction engineering. The curriculum emphasizes analytical thinking, technical design, and sustainable infrastructure development to prepare graduates for professional engineering practice.', 'Graduates are expected to take the Civil Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:16:50'),
(682, 28, 'Bachelor of Science in Electrical Engineering', 'BSEE', 'An engineering program focused on electrical systems and power engineering.', 'The Bachelor of Science in Electrical Engineering program covers power generation, electrical machines, control systems, and electronics. Students are trained to design, implement, and manage efficient electrical systems in industrial and commercial settings.', 'Graduates are expected to take the Electrical Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:16:50'),
(683, 28, 'Bachelor of Science in Electronics Engineering', 'BSECE', 'An engineering program specializing in electronics and communications.', 'The Bachelor of Science in Electronics Engineering program focuses on telecommunications, signal processing, control systems, and electronics design. The curriculum prepares students to develop, maintain, and improve electronic and communication technologies.', 'Graduates are expected to take the Electronics Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:16:50'),
(684, 28, 'Bachelor of Science in Mechanical Engineering', 'BSME', 'An engineering program focused on mechanical systems and design.', 'The Bachelor of Science in Mechanical Engineering program covers thermodynamics, fluid mechanics, machine design, and manufacturing processes. Students are trained to design and optimize mechanical systems for industrial and technological applications.', 'Graduates are expected to take the Mechanical Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:16:50'),
(685, 28, 'Bachelor of Science in Nursing', 'BSN', 'A professional health sciences program focused on patient care.', 'The Bachelor of Science in Nursing program prepares students for professional nursing practice through extensive theoretical instruction and clinical training. Emphasis is placed on patient-centered care, ethical decision-making, and evidence-based nursing practice.', 'Graduates are expected to take the Nurse Licensure Examination (NLE).', NULL, 1, '2026-01-07 21:16:50'),
(686, 28, 'Bachelor of Elementary Education', 'BEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Elementary Education program equips future educators with foundational knowledge in teaching methodologies, child development, curriculum planning, and classroom management. The program emphasizes inclusive education and learner-centered instruction.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:16:50'),
(687, 28, 'Bachelor of Physical Education', 'BPEd', 'A program focused on physical education, sports, and wellness.', 'The Bachelor of Physical Education program develops professionals who promote physical fitness, sports development, and healthy lifestyles. Students study human movement, sports science, coaching, and physical education instruction to support holistic wellness.', 'Graduates are prepared for teaching and sports-related professions.', NULL, 1, '2026-01-07 21:16:50'),
(688, 28, 'Bachelor of Special Needs Education – Generalist', 'BSNEd-G', 'A program focused on inclusive education for learners with special needs.', 'The Bachelor of Special Needs Education – Generalist program prepares educators to teach learners with diverse exceptionalities. The curriculum emphasizes inclusive education strategies, individualized instruction, assessment techniques, and collaboration with families and specialists.', 'Graduates are prepared to take the Licensure Examination for Teachers (Special Needs Education).', NULL, 1, '2026-01-07 21:16:50'),
(689, 28, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area mastery and effective teaching strategies for secondary-level learners. Students are trained in lesson planning, assessment, educational technology, and professional practice to support academic achievement.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:16:50'),
(690, 22, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction.', 'The Bachelor of Science in Civil Engineering program provides students with comprehensive training in structural, geotechnical, transportation, and construction engineering. The curriculum emphasizes analytical problem-solving, technical design, and sustainable infrastructure development to prepare graduates for professional engineering practice.', 'Graduates are expected to take the Civil Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:18:55'),
(691, 22, 'Bachelor of Science in Electrical Engineering', 'BSEE', 'An engineering program focused on electrical systems and power engineering.', 'The Bachelor of Science in Electrical Engineering program covers power generation, electrical machines, control systems, and electronics. Students are trained to design, implement, and manage efficient electrical systems for industrial and commercial applications.', 'Graduates are expected to take the Electrical Engineering Licensure Examination.', NULL, 1, '2026-01-07 21:18:55'),
(692, 22, 'Bachelor of Science in Elementary Education', 'BSEEd', 'A program that prepares students for teaching at the elementary level.', 'The Bachelor of Science in Elementary Education program equips future educators with strong foundations in pedagogy, child development, curriculum planning, and classroom management. The curriculum emphasizes inclusive and learner-centered teaching strategies for elementary learners.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:18:55'),
(693, 22, 'Bachelor of Secondary Education', 'BSEd', 'A program designed to prepare future secondary school teachers.', 'The Bachelor of Secondary Education program develops subject-area mastery and effective instructional strategies for secondary-level learners. Students are trained in lesson planning, assessment, and educational technology to support academic achievement and learner development.', 'Graduates are prepared to take the Licensure Examination for Teachers (LET).', NULL, 1, '2026-01-07 21:18:55'),
(694, 22, 'Bachelor of Science in Nursing', 'BSN', 'A professional health sciences program focused on patient care.', 'The Bachelor of Science in Nursing program prepares students for professional nursing practice through comprehensive theoretical instruction and clinical training. Emphasis is placed on ethical practice, patient-centered care, and evidence-based nursing interventions.', 'Graduates are expected to take the Nurse Licensure Examination (NLE).', NULL, 1, '2026-01-07 21:18:55');
INSERT INTO `programs` (`program_id`, `university_id`, `program_name`, `abbreviation`, `description`, `long_description`, `performance_summary`, `logo_url`, `is_licensure_based`, `created_at`) VALUES
(695, 22, 'Bachelor of Science in Pharmacy', 'BSP', 'A program focused on pharmaceutical sciences and patient care.', 'The Bachelor of Science in Pharmacy program provides students with in-depth knowledge of pharmacology, pharmaceutical chemistry, drug formulation, and patient counseling. The curriculum prepares graduates for professional pharmacy practice in healthcare institutions, community pharmacies, and the pharmaceutical industry.', 'Graduates are expected to take the Pharmacist Licensure Examination.', NULL, 1, '2026-01-07 21:18:55');

-- --------------------------------------------------------

--
-- Table structure for table `prog_req`
--

CREATE TABLE `prog_req` (
  `req_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `requirement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prog_scholarship`
--

CREATE TABLE `prog_scholarship` (
  `scholarship_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `scholarship_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `requirements` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prog_tuition`
--

CREATE TABLE `prog_tuition` (
  `tuition_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `amount_per_year` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`province_id`, `province_name`) VALUES
(1, 'Pangasinan');

-- --------------------------------------------------------

--
-- Table structure for table `shs_strands`
--

CREATE TABLE `shs_strands` (
  `strand_id` int(11) NOT NULL,
  `strand_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shs_strands`
--

INSERT INTO `shs_strands` (`strand_id`, `strand_name`) VALUES
(1, 'STEM (Science, Technology, Engineering, and Mathematics)'),
(2, 'ABM (Accountancy, Business, and Management)'),
(3, 'HUMSS (Humanities and Social Sciences)'),
(4, 'GAS (General Academic Strand)'),
(5, 'TVL (Technical-Vocational-Livelihood Strand)'),
(6, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `universities`
--

CREATE TABLE `universities` (
  `university_id` int(11) NOT NULL,
  `university_name` varchar(255) NOT NULL,
  `abbreviation` varchar(50) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `municipality_id` int(11) NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `cover_photo_url` varchar(500) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `acceptance_rate` decimal(5,2) DEFAULT NULL,
  `tuition_range` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `universities`
--

INSERT INTO `universities` (`university_id`, `university_name`, `abbreviation`, `type_id`, `municipality_id`, `latitude`, `longitude`, `short_description`, `long_description`, `logo_url`, `cover_photo_url`, `website`, `phone`, `email`, `acceptance_rate`, `tuition_range`, `created_at`) VALUES
(1, 'Pangasinan State University - Lingayen Campus', 'PSU-LC', 5, 28, 16.0322137, 120.2296754, 'A leading state university campus in Pangasinan offering quality and affordable higher education.', 'Pangasinan State University – Lingayen Campus is the main and oldest campus of PSU. It offers a wide range of undergraduate and graduate programs, including several licensure-based degrees such as Education, Engineering, and Accountancy. The campus is recognized for its strong performance in licensure examinations and its commitment to accessible, quality public education.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', 'https://example.com/covers/psu-lingayen.jpg', 'https://www.psu.edu.ph', '(075) 632-2001', 'info@psu.edu.ph', 75.00, 'Below ₱10,000', '2025-12-17 15:35:07'),
(2, 'Urdaneta City University', 'UCU', 1, 60, 15.9757000, 120.5713000, 'A private university in Urdaneta City known for criminology, nursing, and teacher education programs.', 'Urdaneta City University is a private higher education institution offering diverse academic programs, with strong emphasis on licensure-based courses such as Criminology, Nursing, and Education. UCU aims to produce competent professionals through industry-aligned curricula and practical training.', 'https://ucu.edu.ph/application/files/6316/2572/3225/ucu_logo_2020_500pxb.png', 'https://example.com/covers/ucu.jpg', 'https://www.ucu.edu.ph', '(075) 568-3333', 'info@ucu.edu.ph', 65.00, '₱10,000 – ₱20,000', '2025-12-17 15:35:07'),
(3, 'University of Eastern Pangasinan', 'UEP', 2, 8, 15.9792000, 120.5697000, 'A private university offering business, education, and engineering-related programs.', 'The University of Eastern Pangasinan is a private institution committed to providing accessible higher education in Pangasinan. It offers both licensure and non-licensure programs, including Education and Engineering-related degrees, aimed at preparing students for professional practice and employment.', 'https://example.com/logos/uep.png', 'https://example.com/covers/uep.jpg', 'https://www.uep.edu.ph', '(075) 529-1020', 'info@uep.edu.ph', 60.00, '₱10,000 – ₱20,000', '2025-12-17 15:35:07'),
(4, 'Pangasinan State University - Alaminos City Campus', 'PSU-AL', 5, 1, 16.1154789, 119.9673807, 'A PSU campus offering teacher education and licensure-based programs.', 'Pangasinan State University – Alaminos City Campus offers undergraduate programs with a strong focus on teacher education and public service, supporting local and regional educational needs.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, 80.00, 'Below ₱10,000', '2026-01-01 14:52:01'),
(5, 'Pangasinan State University - Asingan Campus', 'PSU-AS', 5, 61, 15.9835823, 120.6333838, 'A PSU campus known for education-related degree programs.', 'The Asingan Campus of Pangasinan State University provides accessible public higher education, particularly in licensure-based education programs.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, 80.00, 'Below ₱10,000', '2026-01-01 14:52:01'),
(6, 'Pangasinan State University - Bayambang Campus', 'PSU-BC', 5, 22, 15.8132747, 120.4522978, 'A major PSU campus offering education and allied programs.', 'Pangasinan State University – Bayambang Campus delivers quality undergraduate programs with strong licensure examination participation, particularly in teacher education.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, 80.00, 'Below ₱10,000', '2026-01-01 14:52:01'),
(7, 'Pangasinan State University - Infanta Campus', 'PSU-INF', 5, 7, 15.8264000, 119.9072000, 'A PSU campus serving northern Pangasinan with teacher education programs.', 'The Infanta Campus of Pangasinan State University focuses on developing competent educators and professionals through licensure-aligned academic programs.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, 80.00, 'Below ₱10,000', '2026-01-01 14:52:01'),
(8, 'Pangasinan State University - San Carlos City Campus', 'PSU-SC', 5, 43, 15.9289000, 120.3489000, 'One of the largest PSU campuses offering multiple licensure-based programs.', 'PSU San Carlos City Campus is a key academic hub in Pangasinan, known for strong participation and performance in licensure examinations.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, 80.00, 'Below ₱10,000', '2026-01-01 14:52:01'),
(9, 'Pangasinan State University - Sta. Maria Campus', 'PSU-SM', 5, 23, 15.9589000, 120.4397000, 'A PSU campus offering teacher education programs.', 'Pangasinan State University – Sta. Maria Campus provides public higher education with emphasis on licensure-based teacher education programs.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, NULL, 'Below ₱10,000', '2026-01-01 15:09:04'),
(10, 'Pangasinan State University - Urdaneta City Campus', 'PSU-URD', 5, 60, 15.9757000, 120.5713000, 'A PSU campus serving central Pangasinan.', 'PSU Urdaneta City Campus offers licensure-based programs aligned with national standards, particularly in education.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', NULL, 'https://www.psu.edu.ph', NULL, NULL, NULL, 'Below ₱10,000', '2026-01-01 15:09:04'),
(11, 'Panpacific University Inc. - Urdaneta', 'PUI-U', 2, 2, 15.9757000, 120.5713000, 'A private university offering education and allied programs.', 'Panpacific University Inc. – Urdaneta offers teacher education programs preparing students for licensure examinations.', NULL, NULL, 'https://www.panpacificu.edu.ph', NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:09:04'),
(12, 'Panpacific University - North Philippines (Tayug)', 'PUNP-T', 2, 8, 16.0281000, 120.7436000, 'A private university campus in Tayug offering education programs.', 'Panpacific University – North Philippines in Tayug provides licensure-based teacher education programs.', NULL, NULL, 'https://punp.edu.ph', NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:09:04'),
(13, 'Perpetual Help College of Pangasinan', 'PHCP', 2, 2, 15.9206000, 120.4144000, 'A private college offering teacher education programs.', 'Perpetual Help College of Pangasinan offers licensure-based education programs aimed at developing competent professional teachers.', NULL, NULL, 'https://www.uphsl.edu.ph', NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(14, 'Asbury College, Inc.', 'ACI', 2, 2, 16.2897000, 119.9506000, 'A private institution offering education programs.', 'Asbury College, Inc. provides teacher education programs preparing students for the Licensure Examination for Teachers.', NULL, NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(15, 'Colegio San Jose de Alaminos', 'CSJA', 2, 10, 16.1550000, 119.9819000, 'A private college in Alaminos offering education programs.', 'Colegio San Jose de Alaminos offers teacher education programs with emphasis on licensure examination readiness.', NULL, NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(16, 'Palaris College', 'PC', 2, 28, 15.9289000, 120.3489000, 'A private college in Lingayen offering education programs.', 'Palaris College provides licensure-based teacher education programs for elementary education.', NULL, NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(17, 'PASS College (Philippine Accountancy & Science School)', 'PASS', 2, 2, NULL, NULL, 'A private college offering education and allied programs.', 'PASS College offers teacher education programs aligned with national licensure standards.', NULL, NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(18, 'Saint Columban\'s College – Lingayen', 'SCC-L', 2, 28, 16.0218000, 120.2319000, 'A private Catholic college offering education programs.', 'Saint Columban\'s College – Lingayen offers teacher education programs rooted in academic excellence and values formation.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhNKCEN1bz4Bn-PcWYewKMy26bOS7mBiu2w&s', NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(19, 'Señor Tesoro College, Inc. – Calasiao', 'STC-C', 2, 18, 16.0133000, 120.3608000, 'A private college offering secondary education programs.', 'Señor Tesoro College, Inc. – Calasiao provides licensure-based secondary education programs.', NULL, NULL, NULL, NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(20, 'Universidad de Dagupan', 'UDD', 2, 51, 16.0431000, 120.3333000, 'A private university offering diverse academic programs.', 'Universidad de Dagupan offers licensure-based teacher education programs for aspiring educators.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/UDD_LOGO.png/250px-UDD_LOGO.png', NULL, 'http://www.cdd.edu.ph', NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(21, 'University of Luzon', 'UL', 2, 2, 16.0431000, 120.3333000, 'A private university offering education programs.', 'University of Luzon provides teacher education programs aligned with LET requirements.', NULL, NULL, 'http://www.ul.edu.ph', NULL, NULL, NULL, '₱10,000 – ₱20,000', '2026-01-01 15:11:15'),
(22, 'University of Pangasinan', 'UPANG', 2, 51, 16.0431000, 120.3333000, 'A private university offering education programs.', 'University of Pangasinan offers licensure-based teacher education programs with consistent LET participation.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfeKq39W8a0yYsd3mQCAAf-ibJTF-7oMWyw&s', NULL, 'https://up.phinma.edu.ph', NULL, NULL, NULL, '₱40,000 - ₱50,000', '2026-01-01 15:11:15'),
(23, 'AMA Computer College - Pangasinan', 'AMA-PANG', 2, 52, 16.0133000, 120.3608000, 'A private college offering IT and computer-related programs.', NULL, NULL, NULL, 'http://www.ama.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:21:43'),
(24, 'Bayambang Polytechnic College', 'BPC', 6, 22, 15.8110000, 120.4550000, 'A local university college serving Bayambang.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:21:43'),
(25, 'Pangasinan Polytechnic College', 'PPC', 6, 28, 16.0218000, 120.2319000, 'A local college offering technical and professional programs.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:21:43'),
(26, 'Pangasinan State University - Open University', 'PSU-OU', 5, 28, 16.0218000, 120.2319000, 'The open and distance learning arm of Pangasinan State University.', NULL, NULL, NULL, 'https://www.psu.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:21:43'),
(27, 'Lyceum Northwestern University', 'LNU', 2, 51, 16.0431000, 120.3333000, 'A private university in Dagupan offering diverse academic programs.', NULL, NULL, NULL, 'http://www.lyceum.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:21:43'),
(28, 'Virgen Milagrosa University Foundation', 'VMUF', 2, 43, 15.9289000, 120.3489000, 'Virgen Milagros University Foundation is a private higher education institution in Pangasinan committed to providing quality, values-oriented education through diverse academic programs and professional training.', 'Virgen Milagros University Foundation (VMUF) is a private higher education institution in Pangasinan committed to providing accessible, quality, and values-oriented education. The university offers diverse undergraduate programs in education, business, health sciences, engineering, and technology to address the academic and professional needs of society.\r\n\r\nVMUF emphasizes competence, ethical responsibility, and practical skills through student-centered instruction, qualified faculty, and industry-aligned curricula. Through its academic programs, the university prepares graduates for professional practice, licensure examinations, and meaningful contributions to community and regional development.', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/VMUFlogonew.jpg/250px-VMUFlogonew.jpg', NULL, 'https://vmuf.edu.ph', NULL, NULL, NULL, 'Above ₱30,000', '2026-01-02 22:21:43'),
(29, 'ABE International College of Business and Accountancy - Urdaneta City', 'ABE-U', 2, 60, 15.9757000, 120.5713000, 'A private college specializing in business and accountancy programs.', NULL, NULL, NULL, 'https://abe.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(31, 'Asiacareer College Foundation', 'ACF', 2, 51, NULL, NULL, 'A private college offering career-oriented academic programs.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(33, 'Binalatongan Community College', 'BCC', 6, 43, NULL, NULL, 'A local college serving San Carlos City.', NULL, NULL, NULL, 'https://binalatongan.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(34, 'Colegio de San Juan de Letran - Manaoag', 'Letran-Manaoag', 2, 41, NULL, NULL, 'A private Catholic institution offering higher education programs.', NULL, NULL, NULL, 'http://www.letran-manaoag.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(35, 'Dagupan Colleges Foundation', 'DCF', 2, 51, NULL, NULL, 'A private college in Dagupan City offering diverse programs.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(36, 'Divine Word College of Urdaneta', 'DWCU', 2, 60, NULL, NULL, 'A private Catholic college in Urdaneta City.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(37, 'Golden West Colleges', 'GWC', 2, 1, NULL, NULL, 'A private college in Alaminos City.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(38, 'International College for Excellence', 'ICE', 2, 60, NULL, NULL, 'A private college offering education and allied programs.', NULL, NULL, NULL, 'http://www.ice.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(39, 'Kingfisher School of Business & Finance', 'KSBF', 2, 51, NULL, NULL, 'A private business-focused college in Dagupan City.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(40, 'Kingsville Advanced School', 'KAS', 2, 49, NULL, NULL, 'A private institution offering business and management programs.', NULL, NULL, NULL, 'http://www.kingsville.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(41, 'Luna Colleges', 'LC', 2, 49, NULL, NULL, 'A private college in Tayug.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(42, 'Lyceum Northern Luzon', 'LNL', 2, 60, NULL, NULL, 'A private institution offering tertiary education programs.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(45, 'Malasiqui Agno Valley College', 'MAVC', 2, 26, NULL, NULL, 'A private college serving Malasiqui.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(46, 'Mary Help of Christians College Seminary', 'MHCCS', 2, 51, NULL, NULL, 'A private religious seminary in Dagupan City.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(47, 'Mary Help of Christians Theology Seminary', 'MHCTS', 2, 44, NULL, NULL, 'A private theology seminary in San Fabian.', NULL, NULL, NULL, 'http://www.mhcts.org', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(48, 'Metro-Dagupan Colleges', 'MDC', 2, 53, NULL, NULL, 'A private college serving Mangaldan.', NULL, NULL, NULL, 'https://metrodagupancolleges.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(49, 'Mystical Rose College of Science and Technology', 'MRCST', 2, 17, NULL, NULL, 'A private college offering science and technology programs.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(50, 'NJ Valdez Colleges Foundation', 'NJVCF', 2, 63, NULL, NULL, 'A private college in Villasis.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(51, 'Northern Luzon Adventist College', 'NLAC', 2, 46, NULL, NULL, 'A private Adventist college in Sison.', NULL, NULL, NULL, 'http://www.nlac.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(52, 'Pangasinan Merchant Marine Academy', 'PMMA', 2, 51, NULL, NULL, 'A private maritime institution in Dagupan City.', NULL, NULL, NULL, 'http://www.pamma.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(55, 'Philippine College of Science and Technology', 'PhilCST', 2, 52, NULL, NULL, 'A private institution focused on science and technology.', NULL, NULL, NULL, 'http://www.philcst.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(56, 'Philippine Darakbang Theological College', 'PDTC', 2, 27, NULL, NULL, 'A private theological college.', NULL, NULL, NULL, 'http://www.wedarak.net', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(58, 'PIMSAT Colleges - Dagupan', 'PIMSAT-D', 2, 51, NULL, NULL, 'A private maritime and technical college.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(59, 'PIMSAT Colleges - San Carlos City', 'PIMSAT-SC', 2, 43, NULL, NULL, 'A private maritime and technical college.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(60, 'Rosales-Wesleyan Bible College', 'RWBC', 2, 66, NULL, NULL, 'A private Bible college in Rosales.', NULL, NULL, NULL, 'http://www.rwbc.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(61, 'San Carlos College', 'SCC', 2, 43, 15.9289000, 120.3489000, 'A private college in San Carlos City.', NULL, NULL, NULL, 'https://www.sancarloscollege.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(62, 'St. Camillus College of Manaoag Foundation', 'SCCMF', 2, 41, NULL, NULL, 'A private Catholic college in Manaoag.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(63, 'St. Therese College Foundation - San Carlos', 'STCF-SC', 2, 43, NULL, NULL, 'A private college foundation in San Carlos City.', NULL, NULL, NULL, 'http://www.facebook.com/STCFSanCarlosOfficial', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(64, 'Sta. Catalina\'s College of Science and Technology', 'SCCST', 2, 50, NULL, NULL, 'A private college in Umingan.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(65, 'STI College - Dagupan', 'STI-D', 2, 51, 16.0431000, 120.3333000, 'A private IT-focused college in Dagupan City.', NULL, NULL, NULL, 'http://www.sti.edu.ph', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(66, 'The Adelphi College', 'TAC', 2, 28, NULL, NULL, 'A private college in Lingayen.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(67, 'The Great Plebeian College', 'TGPC', 2, 1, NULL, NULL, 'A private college in Alaminos City.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(69, 'WCC Aeronautical & Technological College', 'WCC-ATC', 2, 27, 15.9039000, 120.5889000, 'A private aviation and technology college.', NULL, NULL, NULL, 'http://www.wccaviation.com', NULL, NULL, NULL, NULL, '2026-01-02 22:23:46'),
(71, 'Pangasinan State University – Binmaley Campus', 'PSU-BC', 5, 57, 16.0279000, 120.2703000, 'A satellite campus of Pangasinan State University located in Binmaley, offering quality public higher education and community-oriented academic programs.', 'Pangasinan State University – Binmaley Campus is one of the satellite campuses of Pangasinan State University, established to expand access to quality and affordable higher education in the western part of Pangasinan. The campus offers undergraduate programs designed to support regional development, produce competent professionals, and promote research, extension, and community engagement in line with the university’s mandate.', 'https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png', 'https://psu.edu.ph/wp-content/uploads/2021/06/psu-campus.jpg', 'https://psu.edu.ph', NULL, 'info@psu.edu.ph', NULL, 'Free / Minimal fees', '2026-01-04 21:20:11'),
(72, 'PHINMA–UPang College Urdaneta', 'PHINMA-UPang Urdaneta', 2, 60, 15.9753000, 120.5713000, 'A private higher education institution under PHINMA Education Network offering industry-aligned programs in Urdaneta City.', 'PHINMA–UPang College Urdaneta is a satellite campus of the University of Pangasinan under the PHINMA Education Network. The campus provides accessible, quality, and industry-relevant higher education programs designed to improve graduate employability. It supports PHINMA’s mission of making lives better through education by offering student-centered learning, modern facilities, and strong industry linkages in Urdaneta City and nearby municipalities.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfeKq39W8a0yYsd3mQCAAf-ibJTF-7oMWyw&s', 'https://phinma.edu.ph/wp-content/uploads/2021/07/upang-campus.jpg', 'https://up.phinma.edu.ph', NULL, 'admissions.up@phinmaed.com', NULL, '₱30,000 – ₱60,000 per semester', '2026-01-04 21:42:37'),
(73, 'Lyceum–Northwestern University – Urdaneta Campus', 'LNU-URD', 2, 60, 15.9769000, 120.5719000, 'A private higher education institution offering diverse undergraduate programs in Urdaneta City under Lyceum–Northwestern University.', 'Lyceum–Northwestern University – Urdaneta Campus is a satellite campus of Lyceum–Northwestern University, established to extend quality private higher education to students in Urdaneta City and nearby areas. The campus offers undergraduate programs focused on academic excellence, skills development, and employability, supporting the university’s mission of producing competent and socially responsible graduates.', 'https://lnu.edu.ph/wp-content/uploads/2020/08/lnu-logo.png', 'https://lnu.edu.ph/wp-content/uploads/2021/05/lnu-campus.jpg', 'https://lnu.edu.ph', NULL, 'info@lnu.edu.ph', NULL, '₱25,000 – ₱55,000 per semester', '2026-01-04 21:45:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_picture_url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `profile_picture_url`, `created_at`) VALUES
(1, 'maria', 'santos', 'ms@gmail.com', '123456', NULL, '2025-12-04 00:38:57'),
(2, 'da', 'DE VERA', 'newuser@gmail.com', 'scrypt:32768:8:1$1XtVShTiAuthWZ3v$394c457c92d2d348b61b5f57735b14c961dd7f47cae4ec969c8a0d60239c82392e0e528f76648ccc75c97810649696bad8f843c6d894876d235e946840f73e8e', NULL, '2025-12-14 14:30:05'),
(3, 'ju', 'dy', 'judy@gmail.com', 'scrypt:32768:8:1$hhZZUrSMRvVfVIu4$3632e633828c9926bbd531e41536b78c111be8a093dfabbe00bee769dc51e3a3c357422b7dc2e4be8eb60ac306f052a85bfc03d6d8284e9a575a773f0de4a78e', NULL, '2025-12-14 14:48:32'),
(4, 'je', 'jen', 'je@gmail.com', 'scrypt:32768:8:1$NbsBIuBC9w94WH9u$3d85eb0493e4b585347840facb3fb16f2b8c7f531259b26ca436eb96ac92d9a7ffbb6e0e5b9f7f06dd7a9ff64d0fd983260b3d84c561592932bba1859fbf3041', NULL, '2025-12-14 15:07:34'),
(5, 'b', 'asd', 'asd@gmail.com', 'scrypt:32768:8:1$bzn5jKzRZYpiGlU1$c93e0b575f413b0060a4a433786e79d30af52ce0fcdb516a76ea7439cff602d4234b3eff075e622cba1ffdbb092ef67b619053b8cbe648b241ee904cfb0c5093', NULL, '2025-12-14 15:10:30'),
(6, 'graceee', 'ganda', 'ganda@gmail.com', 'scrypt:32768:8:1$DF8JoSKOhePmt7kY$b262c4ce749fb84f852cc4e1edcc8f44595526035f48e598d2d996bad356110a3a286b27bb7c1b8b50201d6a83dc1707770b7bd9219089a40a1f0fa77e9b29db', '/static/uploads/profile_pictures/user_6.png', '2025-12-18 03:34:46'),
(7, 'tester', 'last', 'last@gmail.com', 'scrypt:32768:8:1$Pby5IH6BVTXpsAjt$6dc1fe203f477a19a28b30386783979dfd54b849d7192901e0d49fe4cb61884081df61bec79b05326de2d03709f08b1b774ea546db696c1c6d7835646b661a8f', NULL, '2025-12-18 03:39:39'),
(8, 'tester', 'two', 'two@gmail.com', 'scrypt:32768:8:1$VCqyJrur5sveWJmG$2f6b2c321e0abe4f872f100370101ef3afb56e7117830f7b6ed09a772297f4055f68a546e6434b74d0b51e590b98b9bf6ee685193c9a1f1da10afb50af5f44a5', NULL, '2025-12-18 03:46:03'),
(9, 'tester', 'three', 'three@gmail.com', 'scrypt:32768:8:1$TuKRIvq7fwexCMLa$e05e54557e4b789926d234ad58761b69d03259eaa673a2772b278d77a33a3be742a1541f82a8f228f0a2e8a429022990c64e9de1bca486bf2dad59ecd9c21a8a', NULL, '2025-12-18 03:54:54'),
(10, 'tester', 'four', 'four@gmail.com', 'scrypt:32768:8:1$ZyZJ4aAv1l9tBBUu$7d49e35eee5df86dddf1343b147a07e132413c8a3c69653eb177cbb58315e9dd94ac7a6fb997eab85783f48e03728b26a32aeae1c294dca52ef0ee6261453490', NULL, '2025-12-18 04:00:18'),
(11, 'JUDY', 'DE VERA', 'dev@gmail.com', 'scrypt:32768:8:1$FiIWVt9kRleiNR9f$7860c3b8dbbcb466f4c45f17ef95fce59ca229ef6e36fc12f338f2a3b03fc729f4d2df225916fa2f87396b51a8fe9607be1f4c81f12bcf352ba769455e9eb9d8', NULL, '2025-12-29 10:11:58'),
(12, 'kanata', 'amane', 'knt@gmai.com', 'scrypt:32768:8:1$o7JDGRbeYfalplOG$9cdd8b004abe94ce37aaad456c1d3e1bf5c1651dc269cd4e040b894cd50c716c561210a814e568350db92452d62ebf44c1847c0506296c679c291f6a6c58beb5', NULL, '2026-01-04 15:59:43'),
(13, 'sheira', 'laron', 'sheira@gmail.com', 'scrypt:32768:8:1$dGoKcr5dmR4l56Yl$d68b595fee27c3f8afc0d94f7167a6d56d99da4fde7da904a5ea34ee7ee34ecb4f714d5825b594304a379324ce384cfd777f585ec1387d9ed4a2a3bd5a047a28', NULL, '2026-01-04 22:23:08'),
(14, 'ako', 'si', 'ako@gmail.com', 'scrypt:32768:8:1$3FrbPmObs0QGXo9E$6ef91686bf5729124e1e0493362512c48cf3d566c0b511297ce758fb1ae97a65498870c5962369bd4a1ebdc170b1bba730bae3d765d68c1c8fd773d4009d6c19', NULL, '2026-01-04 22:37:02'),
(15, 'nat', 'bel', 'nat@gmail.com', 'scrypt:32768:8:1$1BlI8pVogUjoVtTa$1f6e1bd69007b760e6565ce83305a9b58d1ec51e77c2c97982ba95dd584feccb7c72952ee5ed662bf3771dd57c579af0112d56dbad98ae1dce48961e86fdc325', NULL, '2026-01-05 09:23:22'),
(16, 'anya', 'forger', 'anya@gmail.com', 'scrypt:32768:8:1$8Nn0G733gFzsmhSB$0b402d7959abec040f13827de68d1622c8f7f9401343d5dab60162b413dd7f6db57c460310f2e1dfe8230bf49b13e8e172e829d0f2549998866546605f36a050', NULL, '2026-01-05 09:27:50'),
(17, 'mud', 'pie', 'mudpie@gmail.com', 'scrypt:32768:8:1$4uNl9elc6o5yzspn$62042890f231a473346a2e18f216b2b73134829f733659235b7043de5812b2a53c44fa7b05b0cdf6005ebc307fac47c045406a317ee7bb1dd3f7bafdbc0b0b27', NULL, '2026-01-05 09:57:43'),
(18, 'bagong', 'user', 'bagonguser@email.com', 'scrypt:32768:8:1$CS9wgYVeUhcKov1O$8d561d0a0988d63b38e77e55d049f5040c6b942ee13dd75894428bb0df51ce6a9ac9c50a6501f4700f2ee47b2f266bbac91cd7033d48b60012875c6c97f3d1d4', NULL, '2026-01-05 10:23:46'),
(19, 'james', 'torpe', 'james@gmail.com', 'scrypt:32768:8:1$UJ6Nclp8g8bNsgFX$42f8dd3edf083571bd14eeee814da5e8165134c3bd940eb80de8744f75d097c1067a92ee1d961255ad8440cd32e89760bbafa580571fd600564279e5f2055dba', NULL, '2026-01-05 10:34:07'),
(20, 'hellow', 'underwater', 'hellow@gmail.com', 'scrypt:32768:8:1$PE9R5PVmOrMUmKnR$7b235ad6b3ba04099496267a17815b71314f963ca65d311f33302bce2c6588301518455defcbcd42de4924c74350b1e69961bd2e270eb8cfe049d56ce3ecfef6', NULL, '2026-01-05 11:02:19'),
(21, 'raden', 'juufutei', 'raden@gmail.com', 'scrypt:32768:8:1$PCelFhaEmE4lkrHh$cb988f4f5ce132cd8b5edb9139fedd4ce3c1ec95713e4d381694ecae886de78e6b68a06a20c6d3ebfc9a39ad5b2eab80a1d1fc93d9946e0472ff86b3f32fdcbe', NULL, '2026-01-05 11:37:15'),
(22, 'kanade', 'otonose', 'kanade@gmail.com', 'scrypt:32768:8:1$zCFNcrPOfYfAbwXc$69ce276ad2345f9c8120b520182aad8ecdfb444af749693082ad4d4c968a7f2735b212bf223ff62b6c4e56224eb3725c887cfad06cb26379d5be2ab1b3be7bb1', NULL, '2026-01-05 11:46:06'),
(23, 'bancho', 'todoroki', 'bancho@gmail.com', 'scrypt:32768:8:1$qenyAsUMclR1fCBq$54a98b0170e9a78738784e89a1e3d23c3ca3c4d7c1bb2344a1ebad5d8800965ffdc846e2461e790bb2ce42ded5cec2cdb7a66029a005fa96311f996036504401', '/static/uploads/profile_pictures/user_23.png', '2026-01-05 11:49:45'),
(24, 'mio', 'ookami', 'mio@test.com', 'scrypt:32768:8:1$UUK2jjQvGZ7Gu5UT$e2824aeceacee540b9541ea5cc338c89e1d4f3fd1f9aea9c82fda330a6199e0065c7a746565144e26153f007f1562c066d9ce40782d945308075937967bd25fd', NULL, '2026-01-05 12:18:19'),
(25, '564', 'inugami', '564@gmail.com', 'scrypt:32768:8:1$PCMmHWDg6XgaSrm1$4665a26a32823446dd3900638d3eb5497be4cb8ffe9f1628dffedbefb9c28b15debab05cb5064e79378e98f4ba667ee844dac06d6a3867a3c5d9924e9307abfa', '/static/uploads/profile_pictures/user_25.png', '2026-01-05 12:25:26'),
(26, 'flare', 'shiranui', 'flare@gmail.com', 'scrypt:32768:8:1$Gi0FzG3Tvj6Q5XFw$0235c2183e5ab47f9423cb61595ae5b7ee58feadfd22d737162c166b5b6cdaf97156c04d46b8d4242551d524933b4b6d955b1f2e17f4a322a90f10c2349d671b', NULL, '2026-01-05 21:34:53'),
(27, 'sora', 'tokino', 'sora@gmail.com', 'scrypt:32768:8:1$m5zjEapslHsuGu5G$a9505d9a6e70b7fb53ef1c115eef0b12ae331ddbd5712a8e490486309ec0ee3c556c40807362209dc1c3af20db5b56b3b6d3b9496a4d85ebdbbcd1678fea035a', NULL, '2026-01-05 23:32:53'),
(28, 'jc', 'reyes', 'jc@gmail.com', 'scrypt:32768:8:1$Z1bFffXB9iLYEEso$067624b968c55d44ca7e56b5a06ac23ec0be781fbd1879d7fbfdb469062b6289b4fbe2ad91e5e59be3db0972bafa4906b45352bcea65552b38b279e4b21ab0fb', NULL, '2026-01-06 14:41:02'),
(29, 'JC', 'Reyes', 'jreyes@email.com', 'scrypt:32768:8:1$iFOPNxZBnzozS5mm$f59c54e5362cc7aaac78b5ed94d0760cc1a6618daee2bf86a007fa79b30d85e3a28e54863d5e26a89c848c94d5c74fc01c0fb1bb4b2c4044c228eb42231480c7', NULL, '2026-01-06 14:42:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_bookmarks`
--

CREATE TABLE `user_bookmarks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_bookmarks`
--

INSERT INTO `user_bookmarks` (`id`, `user_id`, `program_id`, `created_at`) VALUES
(62, 6, 624, '2026-01-07 18:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `user_interests`
--

CREATE TABLE `user_interests` (
  `interest_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `interest_program_id` int(11) NOT NULL,
  `interest_level` enum('low','medium','high') DEFAULT 'medium',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_interests`
--

INSERT INTO `user_interests` (`interest_id`, `user_id`, `interest_program_id`, `interest_level`, `created_at`) VALUES
(2, 8, 1, 'medium', '2025-12-18 03:53:54'),
(3, 9, 3, 'medium', '2025-12-18 03:55:22'),
(4, 9, 7, 'medium', '2025-12-18 03:55:22'),
(5, 9, 1, 'medium', '2025-12-18 03:55:22'),
(6, 11, 5, 'medium', '2025-12-29 10:12:46'),
(7, 12, 7, 'medium', '2026-01-04 16:00:15'),
(8, 13, 1, 'medium', '2026-01-04 22:24:30'),
(9, 13, 9, 'medium', '2026-01-04 22:24:30'),
(10, 13, 5, 'medium', '2026-01-04 22:24:30'),
(11, 15, 9, 'medium', '2026-01-05 09:25:55'),
(12, 15, 7, 'medium', '2026-01-05 09:25:55'),
(13, 15, 2, 'medium', '2026-01-05 09:25:55'),
(14, 17, 9, 'medium', '2026-01-05 09:59:54'),
(15, 17, 8, 'medium', '2026-01-05 09:59:54'),
(16, 17, 3, 'medium', '2026-01-05 09:59:54'),
(17, 18, 7, 'medium', '2026-01-05 10:24:20'),
(18, 18, 8, 'medium', '2026-01-05 10:24:20'),
(19, 18, 1, 'medium', '2026-01-05 10:24:20'),
(20, 19, 9, 'medium', '2026-01-05 10:34:26'),
(21, 19, 1, 'medium', '2026-01-05 10:34:26'),
(22, 19, 8, 'medium', '2026-01-05 10:34:26'),
(23, 20, 2, 'medium', '2026-01-05 11:02:37'),
(24, 20, 8, 'medium', '2026-01-05 11:02:37'),
(25, 20, 7, 'medium', '2026-01-05 11:02:37'),
(26, 21, 3, 'medium', '2026-01-05 11:37:36'),
(27, 21, 6, 'medium', '2026-01-05 11:37:36'),
(28, 21, 1, 'medium', '2026-01-05 11:37:36'),
(29, 23, 7, 'medium', '2026-01-05 11:50:08'),
(30, 24, 2, 'medium', '2026-01-05 12:18:41'),
(31, 24, 6, 'medium', '2026-01-05 12:18:41'),
(32, 24, 3, 'medium', '2026-01-05 12:18:41'),
(117, 25, 3, 'medium', '2026-01-05 12:49:54'),
(118, 25, 6, 'medium', '2026-01-05 12:49:54'),
(125, 26, 2, 'medium', '2026-01-05 21:35:59'),
(126, 26, 8, 'medium', '2026-01-05 21:35:59'),
(127, 26, 9, 'medium', '2026-01-05 21:35:59'),
(128, 6, 8, 'medium', '2026-01-05 22:46:54'),
(129, 6, 7, 'medium', '2026-01-05 22:46:54'),
(130, 6, 9, 'medium', '2026-01-05 22:46:54'),
(131, 27, 3, 'medium', '2026-01-05 23:33:42'),
(133, 27, 2, 'medium', '2026-01-05 23:33:42'),
(134, 27, 8, 'medium', '2026-01-05 23:33:42'),
(135, 29, 8, 'medium', '2026-01-06 14:44:31');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shs_strand` varchar(100) DEFAULT NULL,
  `preferred_institution_type` int(11) DEFAULT NULL,
  `municipality_id` int(11) DEFAULT NULL,
  `budget_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `strand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`profile_id`, `user_id`, `shs_strand`, `preferred_institution_type`, `municipality_id`, `budget_id`, `created_at`, `strand_id`) VALUES
(1, 8, NULL, 2, 8, 1, '2025-12-18 03:53:30', 2),
(2, 8, NULL, 2, 8, 1, '2025-12-18 03:53:54', 2),
(3, 9, NULL, 1, 28, 1, '2025-12-18 03:55:22', 2),
(4, 11, NULL, 1, 27, NULL, '2025-12-29 10:12:46', 1),
(5, 12, NULL, 1, 27, 1, '2026-01-04 16:00:15', 1),
(6, 13, NULL, 5, 60, 3, '2026-01-04 22:24:30', 3),
(7, 15, NULL, 6, 46, 2, '2026-01-05 09:25:55', 5),
(8, 17, NULL, 4, 17, 3, '2026-01-05 09:59:54', 4),
(9, 18, NULL, 5, 43, NULL, '2026-01-05 10:24:20', 1),
(10, 19, NULL, 5, 26, 2, '2026-01-05 10:34:26', 1),
(11, 20, NULL, 2, 28, 4, '2026-01-05 11:02:37', 1),
(12, 21, NULL, 2, 22, 2, '2026-01-05 11:37:36', 2),
(13, 23, NULL, 2, 11, 2, '2026-01-05 11:50:08', 4),
(14, 24, NULL, 4, 7, 4, '2026-01-05 12:18:41', 2),
(15, 25, NULL, 3, 26, 1, '2026-01-05 12:25:44', 1),
(16, 25, NULL, 3, 53, 4, '2026-01-05 12:30:57', 2),
(17, 25, NULL, 3, 53, 4, '2026-01-05 12:30:58', 2),
(18, 25, NULL, 3, 53, 4, '2026-01-05 12:31:06', 2),
(19, 25, NULL, 3, 53, 4, '2026-01-05 12:31:06', 2),
(20, 25, NULL, 3, 53, 4, '2026-01-05 12:31:07', 2),
(21, 25, NULL, 3, 53, 4, '2026-01-05 12:31:25', 2),
(22, 25, NULL, 3, 53, 4, '2026-01-05 12:31:25', 2),
(23, 25, NULL, 3, 53, 4, '2026-01-05 12:31:26', 2),
(24, 25, NULL, 3, 53, 4, '2026-01-05 12:31:26', 2),
(25, 25, NULL, 3, 53, 4, '2026-01-05 12:31:26', 2),
(26, 25, NULL, 3, 53, 4, '2026-01-05 12:31:30', 2),
(27, 25, NULL, 3, 53, 4, '2026-01-05 12:31:31', 2),
(28, 25, NULL, 2, 51, 4, '2026-01-05 12:35:50', 2),
(29, 25, NULL, 2, 51, 4, '2026-01-05 12:35:51', 2),
(30, 25, NULL, 2, 51, 4, '2026-01-05 12:35:52', 2),
(31, 25, NULL, 2, 51, 4, '2026-01-05 12:35:53', 2),
(32, 25, NULL, 2, 51, 4, '2026-01-05 12:35:54', 2),
(33, 25, NULL, 2, 51, 4, '2026-01-05 12:35:55', 2),
(34, 25, NULL, 2, 51, 4, '2026-01-05 12:35:56', 2),
(35, 25, NULL, 2, 51, 4, '2026-01-05 12:35:56', 2),
(36, 25, NULL, 2, 51, 4, '2026-01-05 12:35:57', 2),
(37, 25, NULL, 2, 51, 4, '2026-01-05 12:35:57', 2),
(38, 25, NULL, 2, 51, 4, '2026-01-05 12:35:57', 2),
(39, 25, NULL, 5, 54, 4, '2026-01-05 12:38:29', 2),
(40, 25, NULL, 4, 50, 3, '2026-01-05 12:40:14', 3),
(41, 25, NULL, 6, 47, 2, '2026-01-05 12:43:57', 3),
(42, 25, NULL, 2, 48, 4, '2026-01-05 12:44:50', 2),
(43, 25, NULL, 1, 53, 4, '2026-01-05 12:47:26', 4),
(44, 25, NULL, 6, 42, 2, '2026-01-05 12:49:53', 4),
(45, 6, NULL, 3, 17, 4, '2026-01-05 13:41:30', 2),
(46, 6, NULL, NULL, NULL, NULL, '2026-01-05 14:04:55', NULL),
(47, 6, NULL, 2, 26, 4, '2026-01-05 14:05:13', 2),
(48, 26, NULL, NULL, 52, 2, '2026-01-05 21:35:29', 1),
(49, 26, NULL, 1, 6, 3, '2026-01-05 21:35:59', 2),
(50, 6, NULL, 5, 24, 4, '2026-01-05 22:46:54', 2),
(51, 27, NULL, 4, 52, NULL, '2026-01-05 23:33:42', 3),
(53, 29, NULL, 4, 63, 4, '2026-01-06 14:44:31', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budget_ranges`
--
ALTER TABLE `budget_ranges`
  ADD PRIMARY KEY (`budget_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`district_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD PRIMARY KEY (`exam_id`),
  ADD UNIQUE KEY `idx_exam_results_unique` (`program_id`,`university_id`,`exam_name`,`year`,`exam_month`),
  ADD KEY `university_id` (`university_id`),
  ADD KEY `idx_exam_results_program_id` (`program_id`);

--
-- Indexes for table `institution_type`
--
ALTER TABLE `institution_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `interest_programs`
--
ALTER TABLE `interest_programs`
  ADD PRIMARY KEY (`interest_program_id`);

--
-- Indexes for table `municipalities`
--
ALTER TABLE `municipalities`
  ADD PRIMARY KEY (`municipality_id`),
  ADD KEY `district_id` (`district_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`),
  ADD UNIQUE KEY `uq_program_per_university` (`university_id`,`program_name`),
  ADD KEY `university_id` (`university_id`);

--
-- Indexes for table `prog_req`
--
ALTER TABLE `prog_req`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `prog_scholarship`
--
ALTER TABLE `prog_scholarship`
  ADD PRIMARY KEY (`scholarship_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `prog_tuition`
--
ALTER TABLE `prog_tuition`
  ADD PRIMARY KEY (`tuition_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`province_id`);

--
-- Indexes for table `shs_strands`
--
ALTER TABLE `shs_strands`
  ADD PRIMARY KEY (`strand_id`);

--
-- Indexes for table `universities`
--
ALTER TABLE `universities`
  ADD PRIMARY KEY (`university_id`),
  ADD UNIQUE KEY `uq_university_name_location` (`university_name`,`municipality_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `municipality_id` (`municipality_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_program` (`user_id`,`program_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `user_interests`
--
ALTER TABLE `user_interests`
  ADD PRIMARY KEY (`interest_id`),
  ADD UNIQUE KEY `uq_user_interest` (`user_id`,`interest_program_id`),
  ADD KEY `fk_user_interest_program` (`interest_program_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `preferred_institution_type` (`preferred_institution_type`),
  ADD KEY `municipality_id` (`municipality_id`),
  ADD KEY `budget_id` (`budget_id`),
  ADD KEY `strand_id` (`strand_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budget_ranges`
--
ALTER TABLE `budget_ranges`
  MODIFY `budget_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exam_results`
--
ALTER TABLE `exam_results`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1343;

--
-- AUTO_INCREMENT for table `institution_type`
--
ALTER TABLE `institution_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `interest_programs`
--
ALTER TABLE `interest_programs`
  MODIFY `interest_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `municipalities`
--
ALTER TABLE `municipalities`
  MODIFY `municipality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=696;

--
-- AUTO_INCREMENT for table `prog_req`
--
ALTER TABLE `prog_req`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `prog_scholarship`
--
ALTER TABLE `prog_scholarship`
  MODIFY `scholarship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `prog_tuition`
--
ALTER TABLE `prog_tuition`
  MODIFY `tuition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `province_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shs_strands`
--
ALTER TABLE `shs_strands`
  MODIFY `strand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `universities`
--
ALTER TABLE `universities`
  MODIFY `university_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `user_interests`
--
ALTER TABLE `user_interests`
  MODIFY `interest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`province_id`);

--
-- Constraints for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD CONSTRAINT `exam_results_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `exam_results_ibfk_2` FOREIGN KEY (`university_id`) REFERENCES `universities` (`university_id`);

--
-- Constraints for table `municipalities`
--
ALTER TABLE `municipalities`
  ADD CONSTRAINT `municipalities_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`district_id`);

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `universities` (`university_id`) ON UPDATE CASCADE;

--
-- Constraints for table `prog_req`
--
ALTER TABLE `prog_req`
  ADD CONSTRAINT `prog_req_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `prog_scholarship`
--
ALTER TABLE `prog_scholarship`
  ADD CONSTRAINT `prog_scholarship_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `prog_tuition`
--
ALTER TABLE `prog_tuition`
  ADD CONSTRAINT `prog_tuition_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `universities`
--
ALTER TABLE `universities`
  ADD CONSTRAINT `universities_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `institution_type` (`type_id`),
  ADD CONSTRAINT `universities_ibfk_2` FOREIGN KEY (`municipality_id`) REFERENCES `municipalities` (`municipality_id`);

--
-- Constraints for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  ADD CONSTRAINT `user_bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_bookmarks_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_interests`
--
ALTER TABLE `user_interests`
  ADD CONSTRAINT `fk_user_interest_program` FOREIGN KEY (`interest_program_id`) REFERENCES `interest_programs` (`interest_program_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_interest_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`preferred_institution_type`) REFERENCES `institution_type` (`type_id`),
  ADD CONSTRAINT `user_profile_ibfk_3` FOREIGN KEY (`municipality_id`) REFERENCES `municipalities` (`municipality_id`),
  ADD CONSTRAINT `user_profile_ibfk_4` FOREIGN KEY (`budget_id`) REFERENCES `budget_ranges` (`budget_id`),
  ADD CONSTRAINT `user_profile_ibfk_5` FOREIGN KEY (`strand_id`) REFERENCES `shs_strands` (`strand_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
