import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1652552266013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'daily_rate', type: 'numeric' },
          { name: 'available', type: 'boolean', default: true },
          { name: 'licence_plate', type: 'varchar' },
          { name: 'fine_amount', type: 'numeric' },
          { name: 'brand', type: 'varchar' },
          { name: 'category_id', type: 'uuid', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        // especificando as foreign keys
        foreignKeys: [
          {
            // nome para descrever a foreignKey no banco de dados
            // o nome tem que ser único
            name: 'FKCategoryCar',
            // a tabela que estamos referenciando
            referencedTableName: 'categories',
            // a coluna
            referencedColumnNames: ['id'],
            // nome da coluna no arquivo (migration) atual
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
