export type GetTypes<T, K extends keyof T> = Pick<T, K>

export type OmitProperties<T, K> = Pick<T, Exclude<keyof T, K>>

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
Partial<Pick<T, K>>

export type RequireIfSet<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
(Partial<Record<Keys, undefined>> | Required<Pick<T, Keys>>)

export type MakeOptional<T, K> = OmitProperties<T, K> & Partial<T>
