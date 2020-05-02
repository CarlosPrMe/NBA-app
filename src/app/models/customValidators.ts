import { AbstractControl } from '@angular/forms';

export function customValidatorEmail(control: AbstractControl): { [key: string]: any } {
    let regEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (regEmail.test(control.value)) {
        return null;
    } else {
        return {
            emailCustom: true,
        }
    }
}

export function customValidatorUrl(control: AbstractControl): { [key: string]: any } {
    let regUrl: any = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (regUrl.test(control.value) || control.value === '' || control.value === undefined) {
      return null;
    } else {
      return {
        urlCustom: true,
      }
    }
}