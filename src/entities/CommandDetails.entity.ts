import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { Command } from "./Command.entity";
import { Article } from "./Article.entity";


@Entity()
@Check(`"quantity" >= 0`)
export class CommandDetails {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  commandid: number;

  @Column({ nullable: true })
  batchnumber: string;

  @Column()
  quantity: number;

  @Column()
  article_id: string;

  @Column()
  command_id: number;

  // Relations
  @ManyToOne(() => Command, command => command.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commandid" })
  command: Command;

  @ManyToOne(() => Command)
  @JoinColumn({ name: "command_id" })
  commandRef: Command;

  @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" })
  article: Article;
}
