import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsPassword(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
