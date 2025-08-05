export type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export type ToDiscoUnion<
   T extends Record<string, object>,
   U extends string = "type",
> = {
   [K in keyof T]: Prettify<
      {
         [P in U]: K;
      } & T[K]
   >;
}[keyof T];

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
