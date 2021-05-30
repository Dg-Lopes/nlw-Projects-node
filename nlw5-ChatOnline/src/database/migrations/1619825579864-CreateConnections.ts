import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConnections1619825579864 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "connections",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
						generationStrategy: "uuid"
					},
					{
						name: "admin_id",
						type: "varchar",
						generationStrategy: "uuid",
						isNullable: true
					},
					{
						name: "user_id",
						type: "varchar",
						generationStrategy: "uuid",
					},
					{
						name: "socket_id",
						type: "varchar"
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					},
					{
						name: "updated_at",
						type: "timestamp",
						default: "now()"
					}
				],
				foreignKeys: [
					{
						name: "FK_ConnectionUser",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_id"],
						onDelete: "CASCADE",
						onUpdate: "CASCADE"
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("connections");
	}

}
