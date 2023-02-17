export type File = Pick<
  Express.Multer.File,
  'encoding' | 'originalname' | 'fieldname' | 'mimetype' | 'destination'
>
