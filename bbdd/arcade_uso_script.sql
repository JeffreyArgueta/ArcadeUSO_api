-- -----------------------------------------------------
-- Schema arcade_uso
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `arcade_uso` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `arcade_uso` ;

-- -----------------------------------------------------
-- Table `arcade_uso`.`users`
-- -----------------------------------------------------
CREATE TABLE `users` (
    `id_user` INT UNSIGNED AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NULL DEFAULT NULL,	-- Se usa solo si es autenticación manual
    `google_id` VARCHAR(255) NULL DEFAULT NULL, -- Se usa solo si el usuario inicia con Google
    `authentication_method` ENUM('manual', 'google') NOT NULL,
    `role` ENUM('player', 'admin') NOT NULL DEFAULT 'player',
    `uso_coins` INT UNSIGNED DEFAULT '0',
    `daro_points` INT UNSIGNED DEFAULT '0',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_user`),
    UNIQUE INDEX `username` (`username` ASC) VISIBLE,
	UNIQUE INDEX `email` (`email` ASC) VISIBLE,
	UNIQUE INDEX `google_id` (`google_id` ASC) VISIBLE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`rewards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arcade_uso`.`rewards` (
    `id_reward` INT UNSIGNED AUTO_INCREMENT,
    `rarity` ENUM('common', 'epic', 'legendary') NOT NULL,
    `daro_points_value` INT UNSIGNED NOT NULL,	-- Puntos generados al obtener esta recompensa
    `chance` INT UNSIGNED NOT NULL,				-- Chance de conseguir la recompensa
    `duration` DECIMAL(10,4) NOT NULL,			-- Duracion del gif de la recompensa
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_reward`)
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`gachapon_attempts`
-- -----------------------------------------------------
CREATE TABLE `arcade_uso`.`gachapon_attempts` (
    `id_attempt` INT UNSIGNED AUTO_INCREMENT,
    `id_user` INT UNSIGNED NOT NULL,
    `id_reward` INT UNSIGNED NOT NULL,
    `daro_points_value_earned` INT UNSIGNED NOT NULL, 	-- Se obtiene desde `rewards.points_value`
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_attempt`),
    INDEX `id_user` (`id_user` ASC) VISIBLE,
	INDEX `id_reward` (`id_reward` ASC) VISIBLE,
	CONSTRAINT `gachapon_attempts_ibfk_1` FOREIGN KEY (`id_user`)
		REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE,
	CONSTRAINT `gachapon_attempts_ibfk_2` FOREIGN KEY (`id_reward`)
		REFERENCES `arcade_uso`.`rewards` (`id_reward`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`catbross`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catbross` (
    `id_catbross` INT UNSIGNED AUTO_INCREMENT,
    `id_user` INT UNSIGNED NOT NULL,
    `completed_stages` INT UNSIGNED NOT NULL,
    `time_left` INT UNSIGNED NOT NULL, -- en segundos
    `uso_coins_obtained` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_catbross`),
    CONSTRAINT `catbross_ibfk_1` FOREIGN KEY (`id_user`)
		REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`minesweeper`
-- -----------------------------------------------------
CREATE TABLE `arcade_uso`.`minesweeper` (
  `id_mine` INT UNSIGNED AUTO_INCREMENT,
  `id_user` INT UNSIGNED NOT NULL,
  `uso_coins_earned` INT UNSIGNED NOT NULL,
  `won` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mine`),
  CONSTRAINT `minesweeper_ibfk_1` FOREIGN KEY (`id_user`)
	REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`tic_tac_toe_games`
-- -----------------------------------------------------
CREATE TABLE `arcade_uso`.`tic_tac_toe_games` (
  `id_game` INT UNSIGNED AUTO_INCREMENT,
  `id_user` INT UNSIGNED NOT NULL,
  `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL,
  `symbol` ENUM('X', 'O') NOT NULL,
  `result` ENUM('win', 'lose', 'tie') NOT NULL,
  `uso_coins_earned` INT UNSIGNED NOT NULL,
  `rounds_played` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_game`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`id_user`)
		REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`tic_tac_toe_saves`
-- -----------------------------------------------------
CREATE TABLE `arcade_uso`.`tic_tac_toe_saves` (
  `id_save` INT UNSIGNED AUTO_INCREMENT,
  `id_user` INT UNSIGNED NOT NULL,
  `board_state` VARCHAR(20) NOT NULL,  -- ejemplo: 'X,O,X,null,null,O,X,null,O'
  `rounds` TINYINT UNSIGNED NOT NULL,
  `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL,
  `player_symbol` ENUM('X', 'O') NOT NULL,
  `session_uso_coins` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_save`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`id_user`)
		REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

-- -----------------------------------------------------
-- Table `arcade_uso`.`chat`
-- -----------------------------------------------------
CREATE TABLE `arcade_uso`.`chat` (
    `id_chat` INT UNSIGNED AUTO_INCREMENT,
    `id_user` INT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `message_type` ENUM('player', 'system') NOT NULL DEFAULT 'player',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_chat`),
    CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`id_user`)
		REFERENCES `arcade_uso`.`users` (`id_user`) ON DELETE CASCADE
)
ENGINE InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

INSERT INTO `arcade_uso`.`rewards` (`rarity`, `daro_points_value`, `chance`, `duration`)
VALUES	('common',		10,		1,		5000.0),
		('epic', 		70,		1,		6000.0),
		('legendary',	200,	100,	14000.0);
