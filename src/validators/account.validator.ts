import { ValidatorConstraintInterface } from 'class-validator';

export class AccountValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return new RegExp(/^[A-Za-z0-9_]*$/).test(value);
  }

  defaultMessage({ property }) {
    return `${property} should only contain alphabets, numbers and underscores only`;
  }
}
