import { Checkup } from './entities/checkup.entity';
import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { customAlphabet } from 'nanoid';

@Injectable()
export class CheckupService {
  checkup: Nano.DocumentScope<Checkup>;
  db: Promise<Nano.DatabaseCreateResponse>;
  nanoid: any;

  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || 5984;
    const DB_USER = process.env.DB_USER || 'admin';
    const DB_PASS = process.env.DB_PASS || 'admin';
    const DB_URL = `http://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;

    this.db = Nano(DB_URL)
      .db.create('checkup')
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    this.checkup = Nano(DB_URL).use('checkup');
    this.nanoid = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      10,
    );
  }

  async addCheckup(checkup: Checkup) {
    const id = `checkup-${this.nanoid()}`;
    return await this.checkup.insert(checkup, id);
  }

  async getAttachment(id: string, filename: string) {
    const res = await this.checkup.attachment.get(id, filename);
    return res;
  }

  async getCheckup(id: string) {
    const res = await this.checkup.get(id);
    return res;
  }
}
