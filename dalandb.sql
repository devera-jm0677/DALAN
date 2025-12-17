-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 02:39 PM
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
(27, 4, 'Binalonan'),
(28, 4, 'Lingayen'),
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
(5, 'b', 'asd', 'asd@gmail.com', 'scrypt:32768:8:1$bzn5jKzRZYpiGlU1$c93e0b575f413b0060a4a433786e79d30af52ce0fcdb516a76ea7439cff602d4234b3eff075e622cba1ffdbb092ef67b619053b8cbe648b241ee904cfb0c5093', NULL, '2025-12-14 15:10:30');

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
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `university_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_interests`
--
ALTER TABLE `user_interests`
  MODIFY `interest_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`province_id`);

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
