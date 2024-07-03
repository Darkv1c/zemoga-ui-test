export interface SelectOption<T = any> {
  value: T;
  label: string;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
}
