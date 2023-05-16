import * as Nano from 'nano';

interface IAttachment extends Nano.MaybeDocument {
  name: string;
  sync: boolean;
}

export class Attachment implements IAttachment {
  sync: boolean;
  _id?: string;
  _rev?: string;
  name: string;
}
