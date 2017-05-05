import { Injectable } from '@angular/core';


// Sample usage for invoking messagebox
// this.messageService.activate('Please use search criteria and select user')
//       .then(res => {
//         console.log(`Confirmed: ${res}`);
//       });
@Injectable()
export class MessageboxService {

  activate: (message?: string, title?: string) => Promise<boolean>;

}
