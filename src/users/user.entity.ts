import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}