-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jun 2021 pada 11.41
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech-integrasi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT 'default',
  `image` text NOT NULL DEFAULT 'default.png',
  `purchase_price` varchar(255) NOT NULL DEFAULT '0',
  `selling_price` varchar(255) NOT NULL DEFAULT '0',
  `stock` int(10) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `purchase_price`, `selling_price`, `stock`, `created_at`, `updated_at`) VALUES
(3, 'Xiomi Poco M3', '1623825143312-xiaomi poco m-3.jpg', '1500000', '1900000', 10, '2021-06-15 10:35:59', '2021-06-15 10:35:59'),
(4, 'Xiaomi Redmi 9', '1623825208594-xiaomi redmi 9.jpg', '1300000', '1600000', 7, '2021-06-15 10:36:16', '2021-06-15 10:36:16'),
(27, 'Xiaomi Redmi 9C', '1623825324658-xiaomi redmi 9c.jpg', '1500000', '1700000', 11, '2021-06-16 09:07:12', '2021-06-16 09:07:12'),
(28, 'Xiaomi Redmi 9T', '1623826181159-xiaomi redmi 9t.jpg', '2000000', '2200000', 25, '2021-06-16 13:49:41', '2021-06-16 13:49:41'),
(29, 'Oppo A53F', '1623826442352-Oppo A53.jpg', '2300000', '2600000', 15, '2021-06-16 13:54:02', '2021-06-16 13:54:02'),
(30, 'Oppo Reno 4', '1623826550083-Oppo Reno 4.jpg', '4500000', '4990000', 7, '2021-06-16 13:55:50', '2021-06-16 13:55:50'),
(31, 'Samsung Galaxy A51', '1623826754589-SAMSUNG GALAXY A51.jpg', '4200000', '4690000', 10, '2021-06-16 13:59:14', '2021-06-16 13:59:14'),
(32, 'Samsung Galaxy A115F', '1623826826447-SAMSUNG GALAXY A115F.jpg', '1100000', '1500000', 17, '2021-06-16 14:00:26', '2021-06-16 14:00:26'),
(33, 'Samsung Galaxy S21 ULTRA', '1623826899204-SAMSUNG GALAXY S21 ULTRA.jpg', '18000000', '19000000', 5, '2021-06-16 14:01:39', '2021-06-16 14:01:39'),
(34, 'Vivo Beauty S3', '1623835945186-Oppo A53.jpg', '1700000', '2100000', 19, '2021-06-16 16:32:25', '2021-06-16 16:32:25');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
