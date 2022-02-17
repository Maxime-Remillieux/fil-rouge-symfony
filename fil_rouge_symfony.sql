-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 17 fév. 2022 à 09:59
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fil_rouge_symfony`
--

-- --------------------------------------------------------

--
-- Structure de la table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `author`
--

INSERT INTO `author` (`id`, `name`, `firstname`) VALUES
(1, 'Hugo', 'Victor'),
(2, 'Camus', 'Albert'),
(3, 'De Saint Exupéry', 'Antoine'),
(4, 'Zola', 'Émile'),
(5, 'De Balzac', 'Honoré'),
(6, 'Baudelaire', 'Charles'),
(7, 'Werber', 'Bernard'),
(8, 'De Maupassant', 'Guy');

-- --------------------------------------------------------

--
-- Structure de la table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `added_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resume` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `book`
--

INSERT INTO `book` (`id`, `author_id`, `publisher_id`, `collection_id`, `code`, `title`, `release_at`, `added_at`, `img`, `resume`) VALUES
(1, 1, 1, 1, 'FLAMCOL865', 'Les Misérables', '2012-01-03 16:27:05', '2022-01-05 16:27:05', '9782253096337-001-T.jpeg', 'Jean Valjean a été condamné au bagne en 1795 pour le vol d\'un pain, jugement qui symbolise l\'oppression qu\'impose une société injuste à une population écrasée ; L\'Inspecteur Javert, policier, incarne l\'intransigeance de la société bourgeoise. Pas de rémission pour un ancien forçat, pas de grâce pour Valjean.'),
(2, 2, 1, 2, 'FLAMCOL451', 'La Peste', '2013-02-08 16:27:05', '2021-12-02 16:27:05', 'La-Peste.jpg', 'L’histoire se déroule dans les années 1940. Elle a pour théâtre Oran durant la période de l’Algérie française.\n\nLe roman raconte sous forme de chronique la vie quotidienne des habitants pendant une épidémie de peste qui frappe la ville et la coupe du monde extérieur. Camus semble s\'être documenté sur une petite épidémie de peste bubonique, survenue à Oran en 1945, succédant à une épidémie plus sérieuse qui avait eu lieu à Alger en 1944, mais son projet est antérieur à l\'apparition de ces épidémies, puisqu\'il y réfléchit depuis avril 1941, comme en témoignent ses Carnets, où il parle de « la peste libératrice » et note quelques idées.'),
(3, 6, 2, 3, 'HACCOL412', 'Les Fleurs du Mal', '2015-04-03 16:45:15', '2021-11-05 16:45:15', 'Les-fleurs-du-mal.jpg', 'C\'est une œuvre majeure de la poésie moderne. Ses 168 pièces rompent avec le \"style convenu\" en usage jusqu\'alors. Elle rajeunit la structure du vers par l\'usage régulier d\'enjambements, de rejets et de contre-rejets. Elle rénove la forme rigide du sonnet.'),
(4, 1, 2, 4, 'HACCOL045', 'Notre Dame de Paris', '2019-05-02 16:45:15', '2021-09-02 16:45:15', '61c5b1c9b79f8.jpg', 'blablabla'),
(5, 3, 3, 5, 'GALCOL512', 'Le Petit Prince', '2016-08-05 16:49:00', '2022-01-05 16:49:00', '719fXxqahzL.jpg', 'Le narrateur est un aviateur qui, à la suite d\'une panne de moteur, a dû se poser en catastrophe dans le désert du Sahara et tente seul de réparer son avion (Antoine de Saint-Exupéry se met en scène lui-même dans son œuvre).\r\n\r\nLe lendemain de son atterrissage forcé, il est réveillé par une petite voix qui lui demande : « S\'il vous plaît… dessine-moi un mouton ! » '),
(6, 5, 3, 6, 'GALCOL064', 'Le père Goriot', '2015-05-07 16:49:00', '2020-06-10 16:49:00', 'pile-de-livres.jpg', 'Résumé blablabla');

-- --------------------------------------------------------

--
-- Structure de la table `book_theme`
--

CREATE TABLE `book_theme` (
  `book_id` int(11) NOT NULL,
  `theme_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `book_theme`
--

INSERT INTO `book_theme` (`book_id`, `theme_id`) VALUES
(1, 4),
(1, 6),
(2, 4),
(2, 10),
(3, 5),
(3, 11),
(4, 14),
(5, 13),
(6, 7),
(6, 8);

-- --------------------------------------------------------

--
-- Structure de la table `collec`
--

CREATE TABLE `collec` (
  `id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `collec`
--

INSERT INTO `collec` (`id`, `publisher_id`, `name`) VALUES
(1, 1, 'Col 1'),
(2, 1, 'Col 2'),
(3, 2, 'Col 3'),
(4, 2, 'Col 4'),
(5, 3, 'Col 5'),
(6, 3, 'Col6'),
(7, 4, 'Col 7'),
(8, 4, 'Col 8');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220209094545', '2022-02-09 10:56:58', 510),
('DoctrineMigrations\\Version20220215171104', '2022-02-15 18:11:13', 320);

-- --------------------------------------------------------

--
-- Structure de la table `loan`
--

CREATE TABLE `loan` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `return_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `current_order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `loan`
--

INSERT INTO `loan` (`id`, `book_id`, `user_id`, `status`, `create_at`, `return_at`, `current_order_id`) VALUES
(86, 1, 1, 'reserved', '2022-02-17 09:38:40', '2022-03-03 09:38:40', 51),
(87, 2, 1, 'reserved', '2022-02-17 09:38:40', '2022-03-03 09:38:40', 51),
(89, 3, 1, 'reserved', '2022-02-17 09:57:57', '2022-03-03 09:57:57', 53),
(90, 4, 1, 'reserved', '2022-02-17 09:57:57', '2022-03-03 09:57:57', 53);

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order`
--

INSERT INTO `order` (`id`, `user_id`, `created_at`, `status`) VALUES
(51, 1, '2022-02-17 09:38:40', 'reserved'),
(53, 1, '2022-02-17 09:57:57', 'reserved');

-- --------------------------------------------------------

--
-- Structure de la table `publisher`
--

CREATE TABLE `publisher` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `publisher`
--

INSERT INTO `publisher` (`id`, `name`) VALUES
(1, 'Flammarion'),
(2, 'Hachette'),
(3, 'Gallimard'),
(4, 'Albin Michel');

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`id`, `name`) VALUES
(4, 'Roman'),
(5, 'Educatif'),
(6, 'Science-Fiction'),
(7, 'Arts'),
(8, 'Cinéma'),
(9, 'Musique'),
(10, 'Histoire'),
(11, 'Géographie'),
(12, 'Nouvelle'),
(13, 'Encyclopédie'),
(14, 'Poésie'),
(21, 'NouveauTheme'),
(22, 'Drame');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `code`, `name`, `firstname`, `adress`, `post_code`, `city`, `phone`, `registered_at`) VALUES
(1, 'admin@gmail.com', '[\"ROLE_ADMIN\"]', '$2y$13$AT8BaZx/XY2Ut4vwDQn0mOGCcQrj.K6ZhI8fw9SVopd5YYx6jv2Km', 'REMMAX001', 'Rem', 'Max', '13 avenue Gambetta', '94600', 'Choisy-le-Roi', '0625559302', '2022-01-20 16:42:39'),
(2, 'client@gmail.com', '[\"ROLE_USER\"]', '$2y$13$rTf0ui4g3cGr0N2iSg2AiuNfUB6pm0O.lnLjrRsFt0MXuya8vniLu', 'BONJEA666', 'Bon', 'Jean', '25 rue du Général de Gaulle', '78000', 'Versailles', '0698574125', '2022-01-21 20:09:06'),
(3, 'drydy@gmail.com', '[\"ROLE_USER\"]', '$2y$10$pcvunOYFw1lDmgs4UrCrtOPR5EdsgjIzevi2cSlxjlCKNeXLc9HUi', 'DHDGJD', 'dhdfgh', 'gjdjgdjg', 'dfgjdf', '45896', 'udyktdk', '0698547852', '2022-01-23 14:36:56'),
(4, 'boby@bob.com', '[\"ROLE_USER\"]', '$2y$10$3M7JonZh9TYpud.4oigizOXmFK7fJi.sHOe7yqIdxVtEZvQeZgUrW', 'BOBBOB', 'testName', 'testFName', '13 avenue Gambetta', '94600', 'Choisy-le-Roi', '0638965425', '2022-01-23 15:08:48'),
(6, 'boby@boby.com', '[\"ROLE_USER\"]', '$2y$10$AiQ77Jq7symSjQDbPE28NOCJigGRsbs7U.VebHUGzVQVeHF5N1euO', 'BOBBOB679', 'testName', 'testFName', '13 avenue Gambetta', '94600', 'Choisy-le-Roi', '0638965425', '2022-01-23 15:19:11'),
(7, 'gdqgsd@gmail.com', '[\"ROLE_USER\"]', '$2y$10$HZgZMR8hss51mz10N0XvTuG50GLbps.wwB4.53K3Xy7vaSgOKfoMW', 'TGZDFB295', 'tgzgdb', 'dfbhdfbsd', 'sdfnsdfnd', '98541', 'dsgsdgq', '0685965412', '2022-01-23 15:22:07'),
(9, 'gdq@gmail.com', '[\"ROLE_USER\"]', '$2y$10$XEgN12.2KZvnI7x4f0AVX.BA3KLUMeZvsT4OS2lWKB9IV7F1VB6Aa', 'TGZDFB191', 'tgzgdb', 'dfbhdfbsd', 'sdfnsdfnd', '98541', 'dsgsdgq', '0685965412', '2022-01-23 15:26:41'),
(12, 'toto@gmail.com', '[\"ROLE_USER\"]', '$2y$10$3QiSvtQAp8Xgm0AHild0FuIyXpy64HR.vvk7XrAisGJfHFaX1Qnuy', 'SDVGQS286', 'sdvqsdvqsd', 'gqsdfgdfg', '23 rue dslsqdblsd', '94600', 'qdsfdfsqdf', '06258474589', '2022-01-24 11:49:59'),
(13, 'kdslkgh@gmail.com', '[\"ROLE_PROF\"]', '$2y$10$yTrfNbZMcNPxQ6lBKx2DeeXZ.I5lbFaNt5D.Ltd33LwBeB6wXK9Qe', 'DFBSDV892', 'dfbvdcbvqsd', 'sdvqsdvqs', 'dsvqsd rue SDVSDV', '78456', 'VSDVSDV', '0632589654', '2022-01-24 11:56:09'),
(14, 'grgrgr@gmail.com', '[\"ROLE_USER\"]', '$2y$10$CCwcPzxvqW5XxvdE7NurPOk9D9mHagu/fksLRAOh6R04D2l3C.9im', 'GRGGRG997', 'grgrg', 'grgrgr', 'grgrgrg', '78000', 'Versailles', '0698574587', '2022-01-31 17:12:42'),
(16, 'grgrgr@gmail.fr', '[\"ROLE_USER\"]', '$2y$10$6lJeNCfqgMLnUSu2Pqh8qenYqIAYOdZOyFdYGJeGINM8jh42NRp2O', 'GRGGRG901', 'grgrg', 'grgrgr', 'grgrgrg', '78000', 'Versailles', '0698574587', '2022-01-31 17:14:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_CBE5A331F675F31B` (`author_id`),
  ADD KEY `IDX_CBE5A33140C86FCE` (`publisher_id`),
  ADD KEY `IDX_CBE5A331514956FD` (`collection_id`);

--
-- Index pour la table `book_theme`
--
ALTER TABLE `book_theme`
  ADD PRIMARY KEY (`book_id`,`theme_id`),
  ADD KEY `IDX_99B7F27116A2B381` (`book_id`),
  ADD KEY `IDX_99B7F27159027487` (`theme_id`);

--
-- Index pour la table `collec`
--
ALTER TABLE `collec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D8CCE93440C86FCE` (`publisher_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_C5D30D0316A2B381` (`book_id`),
  ADD KEY `IDX_C5D30D03A76ED395` (`user_id`),
  ADD KEY `IDX_C5D30D0310E71712` (`current_order_id`);

--
-- Index pour la table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F5299398A76ED395` (`user_id`);

--
-- Index pour la table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `collec`
--
ALTER TABLE `collec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `loan`
--
ALTER TABLE `loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT pour la table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `FK_CBE5A33140C86FCE` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`),
  ADD CONSTRAINT `FK_CBE5A331514956FD` FOREIGN KEY (`collection_id`) REFERENCES `collec` (`id`),
  ADD CONSTRAINT `FK_CBE5A331F675F31B` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`);

--
-- Contraintes pour la table `book_theme`
--
ALTER TABLE `book_theme`
  ADD CONSTRAINT `FK_99B7F27116A2B381` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_99B7F27159027487` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `collec`
--
ALTER TABLE `collec`
  ADD CONSTRAINT `FK_D8CCE93440C86FCE` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`);

--
-- Contraintes pour la table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `FK_C5D30D0310E71712` FOREIGN KEY (`current_order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `FK_C5D30D0316A2B381` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `FK_C5D30D03A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
