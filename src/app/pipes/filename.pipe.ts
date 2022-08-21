import { Pipe, PipeTransform } from '@angular/core';

enum IconTypes {
  File = 'insert_drive_file',
  Folder = 'folder'
}

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    if (value.includes('.')) {
      return IconTypes.File;
    }

    return IconTypes.Folder;
  }
}
