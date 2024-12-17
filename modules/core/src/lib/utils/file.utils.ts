import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { CommonsStrings } from './commons.strings';

export function getBase64(
  file: File,
  callback: (result: string) => void
): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    callback(reader.result as string);
  };

  reader.onerror = () => {
    callback('');
  };
}

export function createFileUploadImageControlDefault(): FileUploadControl {
  return new FileUploadControl(
    {
      listVisible: true,
      accept: [CommonsStrings.MIME_TYPE_JPG, CommonsStrings.MIME_TYPE_PNG],
      discardInvalid: true,
      multiple: false,
    },
    [
      FileUploadValidators.accept([
        CommonsStrings.MIME_TYPE_JPG,
        CommonsStrings.MIME_TYPE_PNG,
      ]),
      FileUploadValidators.filesLimit(1),
    ]
  );
}
