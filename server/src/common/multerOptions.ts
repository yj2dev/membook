import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const multerOptions = {
  fileFilter: (request, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      cb(null, true);
    } else {
      cb(null, false);
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = './upload';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, file.originalname + '.jpeg');
    },
  }),
};
