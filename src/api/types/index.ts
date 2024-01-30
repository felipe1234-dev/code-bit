type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Operator =
    | "<"
    | "<="
    | "=="
    | "!="
    | ">="
    | ">"
    | "array-contains"
    | "in"
    | "not-in"
    | "array-contains-any";

type Direction = "asc" | "desc";

interface FilterParams<T> {
    where?: [field: keyof T, operator: Operator, value: any][];
    startAfter?: string;
    orderBy?: [field: keyof T, direction: Direction];
    limit?: number;
}

export type { RequiredPick, Optional, Operator, Direction, FilterParams };
