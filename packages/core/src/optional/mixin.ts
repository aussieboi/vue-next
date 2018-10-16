import { Component } from '../component'

interface ComponentConstructor<This = Component> {
  new (): This
}

interface ComponentConstructorWithMixins<This> {
  new <P = {}, D = {}>(): This & { $data: D } & D & { $props: Readonly<P> } & P
}

// mind = blown
// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never

type ExtractInstance<T> = T extends (infer U)[]
  ? UnionToIntersection<U extends ComponentConstructor<infer V> ? V : never>
  : never

export function mixins<
  T extends ComponentConstructor[] = [],
  V = ExtractInstance<T>
>(...args: T): ComponentConstructorWithMixins<V>
export function mixins(...args: any[]): any {
  // TODO
}

/* Example usage

class Foo extends Component<{ foo: number }> {
  test() {

  }
}

class Bar extends Component<{ bar: string }> {
  ok() {

  }
}

class Baz extends mixins(Foo, Bar)<{ baz: number }> {
  created() {
    this.foo
    this.bar
    this.baz
    this.test()
    this.ok()
  }
}

*/