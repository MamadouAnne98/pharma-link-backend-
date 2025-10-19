import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { Command } from "./Command.entity";
import { Article } from "./Article.entity";


@Entity({name:"command_details"})
@Check(`"quantity" >= 0`)
export class CommandDetails {
  @PrimaryGeneratedColumn("increment")
  id: number;


  @Column({ nullable: true })
  batchnumber: string;

  @Column()
  quantity: number;

  @Column()
  article_id: string;

  @Column({ name: 'command_id', type: 'bigint' })
  command_id: number; // ⚠️ correspond exactement au nom de la colonne dans la DB

  // Relations
  @ManyToOne(() => Command, command => command.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "command_id" })
  command: Command;


  @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" })
  article: Article;
}
