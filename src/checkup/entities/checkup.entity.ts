import * as Nano from 'nano';

interface IPerson extends Nano.MaybeDocument {
  name: string;
  gender: boolean;
  dob: Date;
  address: string;
  complaint: string;
}

interface ICheckup extends Nano.MaybeDocument {
  result: string;
  conclusion: string;
  advice: string;
  pictures: string[];
  videos: string[];
}

export class Checkup implements IPerson, ICheckup {
  _id?: string;
  _rev?: string;
  name: string;
  gender: boolean;
  dob: Date;
  address: string;
  complaint: string;
  result: string;
  conclusion: string;
  advice: string;
  pictures: string[];
  videos: string[];
  at: Date;
  sync: boolean;
}
