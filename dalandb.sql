-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2025 at 10:03 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
(1, 'Below ₱10,000', '0.00', '9999.99'),
(2, '₱10,000 – ₱20,000', '10000.00', '20000.00'),
(3, '₱20,000 – ₱30,000', '20001.00', '30000.00'),
(4, 'Above ₱30,000', '30001.00', NULL);

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
(19, 1, 1, 'Licensure Examination for Teachers (LET)', 2023, 'March', 65, 42, 55, 40, 10, 2, 1),
(20, 1, 1, 'Licensure Examination for Teachers (LET)', 2023, 'September', 70, 43, 55, 38, 15, 5, 1),
(21, 1, 1, 'Licensure Examination for Teachers (LET)', 2024, 'March', 75, 48, 60, 45, 15, 3, 1),
(22, 3, 1, 'Civil Engineering Licensure Examination', 2023, 'November', 65, 38, 48, 33, 17, 5, 1),
(23, 3, 1, 'Civil Engineering Licensure Examination', 2024, 'November', 70, 42, 52, 37, 18, 5, 1),
(24, 5, 2, 'Criminologist Licensure Examination (CLE)', 2023, 'February', 80, 48, 65, 45, 15, 3, 0),
(25, 5, 2, 'Criminologist Licensure Examination (CLE)', 2023, 'August', 80, 50, 60, 45, 20, 5, 1),
(26, 5, 2, 'Criminologist Licensure Examination (CLE)', 2024, 'February', 85, 52, 70, 48, 15, 4, 1),
(27, 6, 2, 'Nursing Licensure Examination (NLE)', 2023, 'May', 40, 28, 35, 26, 5, 2, 0),
(28, 6, 2, 'Nursing Licensure Examination (NLE)', 2023, 'November', 45, 32, 40, 30, 5, 2, 1),
(29, 6, 2, 'Nursing Licensure Examination (NLE)', 2024, 'May', 50, 35, 45, 33, 5, 2, 1),
(30, 9, 3, 'Licensure Examination for Teachers (LET)', 2023, 'March', 50, 28, 40, 26, 10, 2, 0),
(31, 9, 3, 'Licensure Examination for Teachers (LET)', 2024, 'March', 55, 32, 45, 30, 10, 2, 1);

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
(4, 'Any', NULL);

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
(1, 1, 'Alaminos'),
(2, 1, 'Bani'),
(3, 1, 'Bolinao'),
(4, 1, 'Anda'),
(5, 1, 'Burgos'),
(6, 1, 'Dasol'),
(7, 1, 'Infanta'),
(8, 1, 'Mabini'),
(9, 2, 'Agno'),
(10, 2, 'Aguilar'),
(11, 2, 'Bugallon'),
(12, 2, 'Burgos'),
(13, 2, 'Dasol'),
(14, 2, 'Infanta'),
(15, 2, 'Labrador'),
(16, 2, 'Mabini'),
(17, 2, 'Mangatarem'),
(18, 2, 'Salasa'),
(19, 2, 'Sual'),
(20, 3, 'Alcala'),
(21, 3, 'Bautista'),
(22, 3, 'Bayambang'),
(23, 3, 'Santa Maria'),
(24, 3, 'Urbiztondo'),
(25, 3, 'Basista'),
(26, 3, 'Malasiqui'),
(27, 5, 'Binalonan'),
(28, 2, 'Lingayen'),
(29, 4, 'Bugallon'),
(30, 4, 'Labrador'),
(31, 4, 'Sual'),
(32, 4, 'Alaminos'),
(33, 4, 'Mabini'),
(34, 4, 'Bani'),
(35, 4, 'Agno'),
(36, 4, 'Anda'),
(37, 4, 'Bolinao'),
(38, 4, 'Burgos'),
(39, 4, 'Dasol'),
(40, 4, 'Infanta'),
(41, 5, 'Manaoag'),
(42, 5, 'Pozorrubio'),
(43, 5, 'San Carlos'),
(44, 5, 'San Fabian'),
(45, 5, 'San Jacinto'),
(46, 5, 'Sison'),
(47, 5, 'Sta. Barbara'),
(48, 5, 'Sto. Tomas'),
(49, 5, 'Tayug'),
(50, 5, 'Umingan'),
(51, 6, 'Dagupan City'),
(52, 6, 'Calasiao'),
(53, 6, 'Mangaldan'),
(54, 6, 'Mapandan'),
(55, 6, 'San Jacinto'),
(56, 6, 'Sta. Barbara'),
(57, 6, 'Binmaley'),
(58, 6, 'Lingayen'),
(59, 6, 'San Fabian'),
(60, 5, 'Urdaneta City');

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
  `logo_url` varchar(500) DEFAULT NULL,
  `is_licensure_based` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `university_id`, `program_name`, `abbreviation`, `description`, `logo_url`, `is_licensure_based`, `created_at`) VALUES
(1, 1, 'Bachelor of Secondary Education', 'BSED', 'A teacher education program preparing students for the Licensure Examination for Teachers (LET).', 'https://example.com/logos/bsed.png', 1, '2025-12-17 19:17:59'),
(2, 1, 'Bachelor of Elementary Education', 'BEED', 'A program designed to train future elementary school teachers and prepare them for the LET.', 'https://example.com/logos/beed.png', 1, '2025-12-17 19:17:59'),
(3, 1, 'Bachelor of Science in Civil Engineering', 'BSCE', 'An engineering program focused on infrastructure design and construction, leading to the Civil Engineering Licensure Exam.', 'https://example.com/logos/bsce.png', 1, '2025-12-17 19:17:59'),
(4, 1, 'Bachelor of Science in Accountancy', 'BSA', 'A professional accounting program preparing students for the CPA Licensure Examination.', 'https://example.com/logos/bsa.png', 1, '2025-12-17 19:17:59'),
(5, 2, 'Bachelor of Science in Criminology', 'BSCrim', 'A program focused on law enforcement, criminal justice, and public safety, leading to the Criminologist Licensure Exam.', 'https://example.com/logos/bscrim.png', 1, '2025-12-17 19:19:34'),
(6, 2, 'Bachelor of Science in Nursing', 'BSN', 'A health science program preparing students for the Philippine Nurse Licensure Examination.', 'https://example.com/logos/bsn.png', 1, '2025-12-17 19:19:34'),
(7, 2, 'Bachelor of Secondary Education', 'BSED', 'A teacher education program that equips students with pedagogical skills and prepares them for the LET.', 'https://example.com/logos/bsed.png', 1, '2025-12-17 19:19:34'),
(8, 3, 'Bachelor of Science in Business Administration', 'BSBA', 'A business program with management and finance tracks. This program is non-licensure based.', 'https://example.com/logos/bsba.png', 0, '2025-12-17 19:20:00'),
(9, 3, 'Bachelor of Secondary Education', 'BSED', 'A degree program aimed at developing competent secondary school teachers for the LET.', 'https://example.com/logos/bsed.png', 1, '2025-12-17 19:20:00'),
(10, 3, 'Bachelor of Science in Computer Engineering', 'BSCpE', 'A computing and engineering program preparing students for the Computer Engineering Licensure Exam.', 'https://example.com/logos/bscpe.png', 1, '2025-12-17 19:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `prog_req`
--

CREATE TABLE `prog_req` (
  `req_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `requirement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prog_req`
--

INSERT INTO `prog_req` (`req_id`, `program_id`, `requirement`) VALUES
(1, 1, 'Senior High School Diploma'),
(2, 1, 'General Weighted Average (GWA) of at least 85%'),
(3, 1, 'Passing score in university entrance examination'),
(4, 1, 'Good moral character certificate'),
(5, 2, 'Senior High School Diploma'),
(6, 2, 'GWA of at least 85%'),
(7, 2, 'Passing score in university entrance examination'),
(8, 2, 'Good moral character certificate'),
(9, 3, 'Senior High School Diploma (STEM Strand preferred)'),
(10, 3, 'GWA of at least 88%'),
(11, 3, 'Passing score in university entrance examination'),
(12, 3, 'Basic proficiency in Mathematics and Physics'),
(13, 4, 'Senior High School Diploma'),
(14, 4, 'GWA of at least 90%'),
(15, 4, 'Passing score in university entrance examination'),
(16, 4, 'Qualifying examination for Accountancy program'),
(17, 5, 'Senior High School Diploma'),
(18, 5, 'Passing score in university entrance examination'),
(19, 5, 'Physical and medical examination clearance'),
(20, 5, 'No derogatory or criminal record'),
(21, 6, 'Senior High School Diploma (STEM or Health-related strand preferred)'),
(22, 6, 'GWA of at least 88%'),
(23, 6, 'Passing score in university entrance examination'),
(24, 6, 'Medical and psychological clearance'),
(25, 7, 'Senior High School Diploma'),
(26, 7, 'GWA of at least 85%'),
(27, 7, 'Passing score in university entrance examination'),
(28, 7, 'Good moral character certificate'),
(29, 8, 'Senior High School Diploma'),
(30, 8, 'Passing score in university entrance examination'),
(31, 9, 'Senior High School Diploma'),
(32, 9, 'GWA of at least 85%'),
(33, 9, 'Passing score in university entrance examination'),
(34, 9, 'Good moral character certificate'),
(35, 10, 'Senior High School Diploma (STEM Strand preferred)'),
(36, 10, 'Passing score in university entrance examination'),
(37, 10, 'Basic knowledge in Mathematics and Computer Concepts');

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

--
-- Dumping data for table `prog_scholarship`
--

INSERT INTO `prog_scholarship` (`scholarship_id`, `program_id`, `scholarship_name`, `description`, `requirements`) VALUES
(1, 1, 'PSU Academic Scholarship', 'Merit-based scholarship granted to high-performing education students.', 'GWA of at least 90%, no failing grades, full-time enrollment'),
(2, 2, 'PSU Education Grant', 'Financial assistance for elementary education students with financial need.', 'GWA of at least 85%, proof of low household income'),
(3, 3, 'PSU Engineering Scholarship', 'Scholarship for engineering students with strong academic standing.', 'GWA of at least 88%, passed qualifying exam'),
(4, 4, 'PSU Accountancy Merit Grant', 'Merit scholarship for top-performing accountancy students.', 'GWA of at least 90%, no grade below 2.5 in major subjects'),
(5, 5, 'UCU Criminology Grant', 'Institutional scholarship supporting criminology students.', 'Passing GWA, good moral character, no disciplinary record'),
(6, 6, 'UCU Nursing Excellence Scholarship', 'Scholarship for academically excellent nursing students.', 'GWA of at least 90%, medical fitness certificate'),
(7, 7, 'UCU Teaching Excellence Grant', 'Financial aid for education students demonstrating teaching potential.', 'GWA of at least 85%, recommendation from faculty'),
(8, 8, 'UEP Business Achievement Scholarship', 'Merit-based scholarship for outstanding business administration students.', 'GWA of at least 88%, leadership involvement'),
(9, 9, 'UEP Education Assistance Program', 'Scholarship assistance for students pursuing a teaching career.', 'GWA of at least 85%, good moral character'),
(10, 10, 'UEP Technology Scholarship', 'Support scholarship for computer engineering students with technical aptitude.', 'Passing GWA, basic programming knowledge');

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

--
-- Dumping data for table `prog_tuition`
--

INSERT INTO `prog_tuition` (`tuition_id`, `program_id`, `amount_per_year`, `created_at`) VALUES
(1, 1, '8500.00', '2025-12-17 19:25:23'),
(2, 2, '8000.00', '2025-12-17 19:25:23'),
(3, 3, '9500.00', '2025-12-17 19:25:23'),
(4, 4, '9000.00', '2025-12-17 19:25:23'),
(5, 5, '18000.00', '2025-12-17 19:25:32'),
(6, 6, '22000.00', '2025-12-17 19:25:32'),
(7, 7, '16000.00', '2025-12-17 19:25:32'),
(8, 8, '15000.00', '2025-12-17 19:25:41'),
(9, 9, '14000.00', '2025-12-17 19:25:41'),
(10, 10, '18000.00', '2025-12-17 19:25:41');

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

INSERT INTO `universities` (`university_id`, `university_name`, `abbreviation`, `type_id`, `municipality_id`, `short_description`, `long_description`, `logo_url`, `cover_photo_url`, `website`, `phone`, `email`, `acceptance_rate`, `tuition_range`, `created_at`) VALUES
(1, 'Pangasinan State University - Lingayen Campus', 'PSU-LC', 1, 1, 'A leading state university campus in Pangasinan offering quality and affordable higher education.', 'Pangasinan State University – Lingayen Campus is the main and oldest campus of PSU. It offers a wide range of undergraduate and graduate programs, including several licensure-based degrees such as Education, Engineering, and Accountancy. The campus is recognized for its strong performance in licensure examinations and its commitment to accessible, quality public education.', 'https://example.com/logos/psu.png', 'https://example.com/covers/psu-lingayen.jpg', 'https://www.psu.edu.ph', '(075) 632-2001', 'info@psu.edu.ph', '75.00', 'Below ₱10,000', '2025-12-17 15:35:07'),
(2, 'Urdaneta City University', 'UCU', 2, 2, 'A private university in Urdaneta City known for criminology, nursing, and teacher education programs.', 'Urdaneta City University is a private higher education institution offering diverse academic programs, with strong emphasis on licensure-based courses such as Criminology, Nursing, and Education. UCU aims to produce competent professionals through industry-aligned curricula and practical training.', 'https://example.com/logos/ucu.png', 'https://example.com/covers/ucu.jpg', 'https://www.ucu.edu.ph', '(075) 568-3333', 'info@ucu.edu.ph', '65.00', '₱10,000 – ₱20,000', '2025-12-17 15:35:07'),
(3, 'University of Eastern Pangasinan', 'UEP', 2, 3, 'A private university offering business, education, and engineering-related programs.', 'The University of Eastern Pangasinan is a private institution committed to providing accessible higher education in Pangasinan. It offers both licensure and non-licensure programs, including Education and Engineering-related degrees, aimed at preparing students for professional practice and employment.', 'https://example.com/logos/uep.png', 'https://example.com/covers/uep.jpg', 'https://www.uep.edu.ph', '(075) 529-1020', 'info@uep.edu.ph', '60.00', '₱10,000 – ₱20,000', '2025-12-17 15:35:07');

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
(6, 'grace', 'ganda', 'ganda@gmail.com', 'scrypt:32768:8:1$tJxFceNxCPNYa42J$31e865a699960635ea10d6672f794983614b9598a5747fff8855ff3f83d7ae47ddeb3f448d9a2ea28383e72afc75580f24f7d4c759a9ddeae77053115e5745ee', NULL, '2025-12-18 03:34:46'),
(7, 'tester', 'last', 'last@gmail.com', 'scrypt:32768:8:1$Pby5IH6BVTXpsAjt$6dc1fe203f477a19a28b30386783979dfd54b849d7192901e0d49fe4cb61884081df61bec79b05326de2d03709f08b1b774ea546db696c1c6d7835646b661a8f', NULL, '2025-12-18 03:39:39'),
(8, 'tester', 'two', 'two@gmail.com', 'scrypt:32768:8:1$VCqyJrur5sveWJmG$2f6b2c321e0abe4f872f100370101ef3afb56e7117830f7b6ed09a772297f4055f68a546e6434b74d0b51e590b98b9bf6ee685193c9a1f1da10afb50af5f44a5', NULL, '2025-12-18 03:46:03'),
(9, 'tester', 'three', 'three@gmail.com', 'scrypt:32768:8:1$TuKRIvq7fwexCMLa$e05e54557e4b789926d234ad58761b69d03259eaa673a2772b278d77a33a3be742a1541f82a8f228f0a2e8a429022990c64e9de1bca486bf2dad59ecd9c21a8a', NULL, '2025-12-18 03:54:54'),
(10, 'tester', 'four', 'four@gmail.com', 'scrypt:32768:8:1$ZyZJ4aAv1l9tBBUu$7d49e35eee5df86dddf1343b147a07e132413c8a3c69653eb177cbb58315e9dd94ac7a6fb997eab85783f48e03728b26a32aeae1c294dca52ef0ee6261453490', NULL, '2025-12-18 04:00:18');

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
(5, 9, 1, 'medium', '2025-12-18 03:55:22');

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
(1, 8, NULL, 2, 16, 1, '2025-12-18 03:53:30', 2),
(2, 8, NULL, 2, 16, 1, '2025-12-18 03:53:54', 2),
(3, 9, NULL, 1, 28, 1, '2025-12-18 03:55:22', 2);

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
  ADD KEY `type_id` (`type_id`),
  ADD KEY `municipality_id` (`municipality_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

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
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `institution_type`
--
ALTER TABLE `institution_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `interest_programs`
--
ALTER TABLE `interest_programs`
  MODIFY `interest_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `municipalities`
--
ALTER TABLE `municipalities`
  MODIFY `municipality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `university_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_interests`
--
ALTER TABLE `user_interests`
  MODIFY `interest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `universities` (`university_id`) ON DELETE CASCADE;

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
