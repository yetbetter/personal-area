-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 06 2018 г., 15:00
-- Версия сервера: 5.7.16
-- Версия PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `don`
--

-- --------------------------------------------------------

--
-- Структура таблицы `guests`
--

CREATE TABLE `guests` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `guests`
--

INSERT INTO `guests` (`id`, `user_id`, `name`, `surname`, `access_code`, `created_at`, `updated_at`) VALUES
(2, 2, 'Vika', 'Baranova', '1122', '2018-05-06 07:43:41', '2018-05-06 07:43:41'),
(3, 1, 'Maria', 'Sharapova', '2233', '2018-05-06 07:45:25', '2018-05-06 07:45:25');

--
-- Триггеры `guests`
--
DELIMITER $$
CREATE TRIGGER `after_create_guest` AFTER INSERT ON `guests` FOR EACH ROW BEGIN
    DECLARE user_surname VARCHAR(255) DEFAULT '';
    DECLARE note VARCHAR(255) DEFAULT '';

    SELECT surname INTO user_surname FROM users WHERE id = NEW.user_id;

    INSERT INTO logs SET overview = CONCAT(user_surname, ' ', 'добавил(a)', ' гостя ', NEW.name, ' ', NEW.surname, '.', 'Код', ' ', NEW.access_code, '.');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `logs`
--

CREATE TABLE `logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `overview` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `logs`
--

INSERT INTO `logs` (`id`, `overview`, `created_at`) VALUES
(1, 'Reym добавил(a) гостя Vika Baranova.Код 1122.', '2018-05-06 11:43:41'),
(2, 'Kaduk добавил(a) гостя Maria Sharapova.Код 2233.', '2018-05-06 11:45:25');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2014_10_12_000000_create_users_table', 1),
(6, '2014_10_12_100000_create_password_resets_table', 1),
(7, '2018_03_29_034838_create_guests_table', 1),
(9, '2018_03_31_112438_create_logs_table', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patronymic` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_num` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `patronymic`, `invoice_num`, `email`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ilya', 'Kaduk', 'Aleksandrovich', 83, 'test@gmail.com', '$2y$10$JV9DpEhsszhdUmVsnF3Tg.usJlOeLA8O65tioDrMkwrK0ZEq/IOH.', 2, 'P6jq041hx1xK7RePcoIhiY9MVuEbr7kknypRHbDI16YylTl2CYO1sgaZyAsP', '2018-04-14 07:51:44', '2018-04-14 07:51:44'),
(2, 'Oleg', 'Reym', 'Valeryevich', 85, 'test2@gmail.com', '$2y$10$JV9DpEhsszhdUmVsnF3Tg.usJlOeLA8O65tioDrMkwrK0ZEq/IOH.', 2, 'SmWz0Q7TVcGlvJkZDShMhDAUhFWBEttKOELO1ply8qGDtQFd89nZcQmT6P60', '2018-04-14 07:51:44', '2018-04-14 07:51:44');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guests_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_invoice_num_unique` (`invoice_num`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `guests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
