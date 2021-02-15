
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPost1611837012011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "post",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "message",
            type: "varchar",
          },
          {
            name: "data",
            type: "date",
            isNullable:true
          },
          {
            name: "autorizacao",
            type: "boolean",
            isNullable:true
          },
         {
            name: "user_id",
            type: "integer",
            unsigned: true,
            isNullable:true
          },
        ],
        
        foreignKeys: [
            {
              name: "user_id_fk",
              
              columnNames: ["user_id"],
              referencedTableName: "user",
              referencedColumnNames: ["id"],
            
            },
          ],
          
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("post");
  }
}
