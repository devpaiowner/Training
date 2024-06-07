import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
      // Define your password validation logic here
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers or special characters.';
    }
  }
  
  export function IsPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsPasswordConstraint,
      });
    };
  }
  