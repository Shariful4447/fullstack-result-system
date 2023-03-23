-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2021 at 01:11 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gs_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigned_class_models`
--

CREATE TABLE `assigned_class_models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `MyClass_id` int(11) NOT NULL,
  `pupil_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assigned_class_models`
--

INSERT INTO `assigned_class_models` (`id`, `MyClass_id`, `pupil_id`, `created_at`, `updated_at`) VALUES
(23, 14, 29, '2021-07-04 15:42:55', '2021-07-04 15:42:55'),
(24, 14, 30, '2021-07-04 15:43:08', '2021-07-04 15:43:08'),
(25, 14, 31, '2021-07-04 15:43:15', '2021-07-04 15:43:15'),
(26, 14, 32, '2021-07-04 15:43:24', '2021-07-04 15:43:24'),
(27, 13, 33, '2021-07-04 15:43:33', '2021-07-04 15:43:33'),
(28, 13, 34, '2021-07-04 15:43:39', '2021-07-04 15:43:39'),
(29, 13, 35, '2021-07-04 15:43:46', '2021-07-04 15:43:46'),
(30, 13, 36, '2021-07-04 15:43:53', '2021-07-04 15:43:53');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_06_07_154202_create_my_classes_table', 1),
(5, '2021_06_07_154353_create_tests_table', 1),
(6, '2021_06_07_154423_create_subjects_table', 1),
(7, '2021_06_10_045437_create_assigned_class_models_table', 1),
(8, '2021_06_12_175201_create_results_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `my_classes`
--

CREATE TABLE `my_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_classes`
--

INSERT INTO `my_classes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(13, 'Class 1', '2021-07-04 15:37:37', '2021-07-04 15:37:37'),
(14, 'Class 2', '2021-07-04 15:37:46', '2021-07-04 15:37:46');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `userid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `test_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `pupil_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `grade` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `test_id`, `teacher_id`, `pupil_id`, `subject_id`, `grade`, `created_at`, `updated_at`) VALUES
(30, 11, 27, 29, 26, 3.50, '2021-07-04 16:00:06', '2021-07-04 16:00:06'),
(31, 11, 27, 30, 26, 3.20, '2021-07-04 16:00:14', '2021-07-04 16:00:14'),
(32, 11, 27, 31, 26, 3.80, '2021-07-04 16:00:22', '2021-07-04 16:00:22'),
(33, 11, 27, 32, 26, 4.00, '2021-07-04 16:00:39', '2021-07-04 16:00:39'),
(34, 14, 27, 33, 27, 3.50, '2021-07-04 16:02:53', '2021-07-04 16:02:53'),
(35, 14, 27, 34, 27, 3.60, '2021-07-04 16:02:58', '2021-07-04 16:02:58'),
(36, 14, 27, 35, 27, 3.70, '2021-07-04 16:03:04', '2021-07-04 16:03:04'),
(37, 14, 27, 36, 27, 3.80, '2021-07-04 16:03:10', '2021-07-04 16:03:10');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_class` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `class_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `subject_class`, `teacher_id`, `status`, `class_name`, `created_at`, `updated_at`) VALUES
(22, 'Subject 1', 'Subject 1-Class 1', 26, 1, 'Class 1', '2021-07-04 15:45:26', '2021-07-04 15:45:26'),
(23, 'Subject 2', 'Subject 2-Class 2', 26, 1, 'Class 2', '2021-07-04 15:48:49', '2021-07-04 15:48:49'),
(25, 'Subject 3', 'Subject 3-Class 2', 27, 1, 'Class 2', '2021-07-04 15:51:42', '2021-07-04 15:51:42'),
(26, 'Subject 4', 'Subject 4-Class 2', 27, 1, 'Class 2', '2021-07-04 15:51:57', '2021-07-04 15:51:57'),
(27, 'Subject 5', 'Subject 5-Class 1', 27, 1, 'Class 1', '2021-07-04 15:54:30', '2021-07-04 15:54:30'),
(28, 'Subject 6', 'Subject 6-Class 1', 26, 1, 'Class 1', '2021-07-04 15:55:27', '2021-07-04 15:55:27');

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `test_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `name`, `teacher_id`, `subject_id`, `test_date`, `created_at`, `updated_at`) VALUES
(9, 'Test 1', 27, 26, '2021-07-05', '2021-07-04 15:59:24', '2021-07-04 15:59:24'),
(10, 'Test 2', 27, 26, '2021-07-05', '2021-07-04 15:59:38', '2021-07-04 15:59:38'),
(11, 'Test 3', 27, 26, '2021-07-05', '2021-07-04 15:59:48', '2021-07-04 15:59:48'),
(12, 'Test 4', 27, 27, '2021-07-05', '2021-07-04 16:01:44', '2021-07-04 16:01:44'),
(13, 'Test 5', 27, 27, '2021-07-05', '2021-07-04 16:02:01', '2021-07-04 16:02:01'),
(14, 'Test 6', 27, 27, '2021-07-05', '2021-07-04 16:02:38', '2021-07-04 16:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `userid`, `fname`, `lname`, `remember_token`, `password`, `role`, `created_at`, `updated_at`) VALUES
(21, 'super_admin', 'A-394855', 'Super', 'Admin', NULL, '$2y$10$D27W0wATgSBQ80At33FJNubeaG3azlPnsLX4VOijNK2e4cOiUqa02', 'admin', '2021-06-29 07:50:50', '2021-06-29 07:50:50'),
(26, 'teacher_1', 'T-572397', 'Teacher', '1', NULL, '$2y$10$MUKnsaiiP/32DhKD1I2rjOkMvchiMr2UrfA717C8lxRdiJgEjAZOK', 'teacher', '2021-07-04 15:35:38', '2021-07-04 15:35:38'),
(27, 'teacher_2', 'T-127594', 'Teacher', '2', NULL, '$2y$10$21rql.y9liXjddJcfFUZgOfME4WukMd2nMdMWbR16l3ActFY/tRaG', 'teacher', '2021-07-04 15:36:27', '2021-07-04 15:36:27'),
(28, 'teacher_3', 'T-378382', 'Teacher', '3', NULL, '$2y$10$z98K4cGXGPRQ4Eb9lrf15OG1zCBQH95g4uS7S4L.SebwAGLHdp11m', 'teacher', '2021-07-04 15:37:19', '2021-07-04 15:37:19'),
(29, 'pupil_1', 'P-753430', 'Pupil', '1', NULL, '$2y$10$lg.BThTAa1.LD0otB1hseu9F07MQ0.TwaEun8WaA./cJ0Wudqj89G', 'pupil', '2021-07-04 15:38:45', '2021-07-04 15:38:45'),
(30, 'pupil_2', 'P-289414', 'Pupil', '2', NULL, '$2y$10$UyW5fDjisxVjB4bwAAOvf.GW7fpoqdbqNBk8AMzBw2TAeKd9p02Mu', 'pupil', '2021-07-04 15:39:13', '2021-07-04 15:39:13'),
(31, 'pupil_3', 'P-673594', 'Pupil', '3', NULL, '$2y$10$k7O/4SI4HLoPnHtzXWaF3.CrOjVHsfPROt2u6coRL10lQdmVD0P.2', 'pupil', '2021-07-04 15:39:45', '2021-07-04 15:39:45'),
(32, 'pupil_4', 'P-873520', 'Pupil', '4', NULL, '$2y$10$T6OTAkp.B.UQcIyPu7rAT.9TVWx87h3uGFtx00adDkAP3MpLohxH6', 'pupil', '2021-07-04 15:40:19', '2021-07-04 15:40:19'),
(33, 'pupil_5', 'P-518552', 'Pupil', '5', NULL, '$2y$10$Xb6k2BaV/UJ8eiWI8fR/OeoqZMAxjNNUpc1hf0zV9WCvL89Zn3cIq', 'pupil', '2021-07-04 15:40:46', '2021-07-04 15:40:46'),
(34, 'pupil_6', 'P-893631', 'Pupil', '6', NULL, '$2y$10$/n0.8ceZVbZTvV7SHbIclugnW3aaobqYgPDVU0h5gQC3brEpZmAqC', 'pupil', '2021-07-04 15:41:12', '2021-07-04 15:41:12'),
(35, 'pupil_7', 'P-833676', 'Pupil', '7', NULL, '$2y$10$FCXTb46QYvyCpc.BkCyFLeZT64smI.4MRAYvucZgcObbOx6kiYUIS', 'pupil', '2021-07-04 15:42:09', '2021-07-04 15:42:09'),
(36, 'pupil_8', 'P-438759', 'Pupil', '8', NULL, '$2y$10$TPM0Lb93wRQkfxJmFjjC9.Yza/6nVYjm980.KycnqL8y19YgZCUZu', 'pupil', '2021-07-04 15:42:25', '2021-07-04 15:42:25'),
(37, 'pupil_9', 'P-829038', 'Pupil', '9', NULL, '$2y$10$RGgs1P2DWIbuGTEPBrkM5.RNn/MpNqYRPg13bVOlxo3KKMOKH6sku', 'pupil', '2021-07-04 15:47:33', '2021-07-04 15:47:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_class_models`
--
ALTER TABLE `assigned_class_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_classes`
--
ALTER TABLE `my_classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `my_classes_name_unique` (`name`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_userid_index` (`userid`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subjects_subject_class_unique` (`subject_class`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `users_userid_unique` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigned_class_models`
--
ALTER TABLE `assigned_class_models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `my_classes`
--
ALTER TABLE `my_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
