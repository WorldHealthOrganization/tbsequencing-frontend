export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R;
