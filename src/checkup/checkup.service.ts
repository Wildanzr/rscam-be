import { Checkup } from './entities/checkup.entity';
import { Attachment } from './entities/attachment.entity';
import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { customAlphabet } from 'nanoid';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class CheckupService {
  checkup: Nano.DocumentScope<Checkup>;
  db: Promise<Nano.DatabaseCreateResponse>;
  nanoid: any;
  attachment: Nano.DocumentScope<Attachment>;

  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || 5984;
    const DB_USER = process.env.DB_USER || 'admin';
    const DB_PASS = process.env.DB_PASS || 'admin';
    const DB_URL = `http://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;

    // this.db = Nano(DB_URL)
    //   .db.create('attachment')
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });

    this.checkup = Nano(DB_URL).use('checkup');
    this.attachment = Nano(DB_URL).use('attachment');
    this.nanoid = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      10,
    );
  }

  async addCheckup(checkup: Checkup) {
    const id = `checkup-${this.nanoid()}-${this.nanoid()}`;
    return await this.checkup.insert(checkup, id);
  }

  async getAttachment(id: string, filename: string) {
    const res = await this.checkup.attachment.get(id, filename);
    return res;
  }

  async getCheckup(id: string) {
    const res = await this.checkup.find({
      selector: {
        _id: id,
        sync: true,
      },
      limit: 1,
    });
    return res.docs[0];
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncAttachment() {
    // Get all attachment with sync is false with limit 5 docs
    const res = await this.attachment.find({
      selector: {
        sync: false,
      },
      limit: 5,
    });

    if (res.docs.length === 0) {
      return;
    }

    // Loop through the docs
    res.docs.forEach(async (doc) => {
      const { name } = doc;
      const attachment = await this.attachment.attachment.get(name, name);

      try {
        // Convert the attachment blob to file and save it to uploads folder
        await fs.promises.writeFile(
          `${__dirname}/../../uploads/${name}`,
          attachment,
        );

        // Update the sync to true
        await this.attachment.insert({ ...doc, sync: true }, doc._id);

        console.log(`File ${name} has been synced`);
      } catch (error) {
        console.log(error);
      }
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async syncCheckup() {
    // get all checkup with sync is false with limit 5 docs
    const res = await this.checkup.find({
      selector: {
        sync: false,
      },
      limit: 5,
    });

    if (res.docs.length === 0) {
      return;
    }

    // Destructure pictures and videos
    const { pictures, videos } = res.docs[0];

    // Check if all pictures and videos are synced
    const isPicturesSynced = await this.checkAttachmentsIsSynced(pictures);
    const isVideosSynced = await this.checkAttachmentsIsSynced(videos);

    console.log('result check', isPicturesSynced, isVideosSynced);

    // If all pictures and videos are synced, update the sync to true
    if (isPicturesSynced && isVideosSynced) {
      await this.checkup.insert(
        { ...res.docs[0], sync: true },
        res.docs[0]._id,
      );
      console.log(`Checkup ${res.docs[0]._id} has been synced`);
    }
  }

  async checkAttachmentsIsSynced(atts: string[]): Promise<boolean> {
    let result = true;

    // Loop through the attachments
    atts.forEach(async (att) => {
      // Check if the attachment is synced
      const isSynced = await this.checkAttachmentIsSynced(att);
      console.log(`${att} is synced: ${isSynced}`);

      // If the attachment is not synced, set result to false and break the loop
      if (!isSynced) {
        result = false;
        return;
      }
    });
    console.log('Done checking attachments', result);

    return result;
  }

  async checkAttachmentIsSynced(name: string): Promise<boolean> {
    const res = await this.attachment.find({
      selector: {
        name: name,
        sync: true,
      },
    });

    if (res.docs.length === 0) {
      return false;
    }

    return true;
  }
}
