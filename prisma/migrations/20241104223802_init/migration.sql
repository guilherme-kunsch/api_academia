-- CreateTable
CREATE TABLE `Planos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `quantidadeDias` INTEGER NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CadastroAlunos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `sobrenome` VARCHAR(50) NOT NULL,
    `idade` INTEGER NOT NULL,
    `endereco` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `peso` DECIMAL(5, 2) NULL,
    `altura` DECIMAL(4, 2) NULL,
    `planoEscolhidoId` INTEGER NULL,
    `planoAtivo` INTEGER NULL,
    `dataPagamento` DATETIME(3) NULL,

    UNIQUE INDEX `CadastroAlunos_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CadastroAlunos` ADD CONSTRAINT `CadastroAlunos_planoEscolhidoId_fkey` FOREIGN KEY (`planoEscolhidoId`) REFERENCES `Planos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
