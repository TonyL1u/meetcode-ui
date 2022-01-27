# Pick

从类型 `T` 中选择出属性 `K`，构造成一个新的类型。

```ts
type Pick<T, K extends keyof T> = {
    [key in K]: T[key];
};
```

# Readonly

`Readonly` 会接收一个 _泛型参数_，并返回一个完全一样的类型，所有属性都会被 `readonly` 所修饰。

```ts
type Readonly<T> = {
    readonly [key in keyof T]: T[key];
};
```
