export const Rules = {
  requiredValue: "REQUIRED_VALUE",
  minValue: "MIN_VALUE",
  maxValue: "MAX_VALUE",
  emailValue: "EMAIL_VALUE",
  nameValue: "NAME_VALUE",
  usernameValue: "USERNAME_VALUE",
  passwordValue: "PASSWORD_VALUE",
  passwordConfirmationValue: "PASSWORDCONFIRMATION_VALUE",
} as const;

export type ValidationRule = 
  | { value: typeof Rules.requiredValue }
  | { value: typeof Rules.minValue; min: number }
  | { value: typeof Rules.maxValue; max: number }
  | { value: typeof Rules.emailValue }
  | { value: typeof Rules.nameValue }
  | { value: typeof Rules.usernameValue }
  | { value: typeof Rules.passwordValue }
  | { value: typeof Rules.passwordConfirmationValue };

export const requiredValidator = (): ValidationRule => ({ value: Rules.requiredValue });
export const minValidator = (min: number): ValidationRule => ({ value: Rules.minValue, min });
export const maxValidator = (max: number): ValidationRule => ({ value: Rules.maxValue, max });
export const emailValidator = (): ValidationRule => ({ value: Rules.emailValue });
export const usernameValidator = (): ValidationRule => ({ value: Rules.usernameValue });
export const passwordValidator = (): ValidationRule => ({ value: Rules.passwordValue });
export const passwordConfirmationValidator = (): ValidationRule => ({ 
  value: Rules.passwordConfirmationValue 
});