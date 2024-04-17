import { convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

export class ActivatedRouteMock {
  snapshot = {
    paramMap: convertToParamMap({ id: 1 }),
  };
}
