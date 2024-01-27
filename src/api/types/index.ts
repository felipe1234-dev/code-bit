type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type { RequiredPick, Optional };
