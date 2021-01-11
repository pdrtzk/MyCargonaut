import {AbstractControl, ValidationErrors} from '@angular/forms';

export class WhitespaceValidator {
  static cannotBeWhitespace(control: AbstractControl): ValidationErrors | null {
    if (!(control.value as string).trim()) {
      return {cannotBeWhitespace: true};
    }
    return null;
  }

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return {cannotContainSpace: true};
    }
  }
}

