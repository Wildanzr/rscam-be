// multer.config.ts
import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
    },
  }),
};
