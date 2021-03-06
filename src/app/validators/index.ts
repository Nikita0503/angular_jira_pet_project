import { FormControl } from '@angular/forms';

class CustomFormValidators {
  noWhitespaceValidator(control: FormControl){
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}

export default new CustomFormValidators();
