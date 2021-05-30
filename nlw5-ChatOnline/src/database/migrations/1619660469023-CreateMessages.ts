import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619660469023 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await  queryRunner.createTable(
			new Table({
				name: "messages",
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
						generationStrategy: "uuid"
					},
					{
						name: "text",
						type: "varchar"
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					}
				],
				foreignKeys: [
					{
						name: "FK_User",
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
		await queryRunner.dropTable("messages");
	}

}
