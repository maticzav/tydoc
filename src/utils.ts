import * as tsm from 'ts-morph'
import { inspect } from 'util'
import { dumpNode, dumpType } from './lib/extractor/utils'

export type ArrayOrVarg<T> = T[] | [T[]]

export type MaybeArray<T> = T | T[]

export type Index<T> = Record<string, T>

export type Thunk<T> = () => T

/**
 * Use this to make assertion at end of if-else chain that all members of a
 * union have been accounted for.
 */
export function casesHandled(x: never): never {
  throw new Error(`A case was not handled for value: ${x}`)
}

/**
 * Quick and dirty logging. Not for production.
 */
export function dump(...args: any[]) {
  if (args[0] instanceof tsm.Node) return dumpNode(args[0])
  if (args[0] instanceof tsm.Type) return dumpType(args[0])

  const argsInspected = args.map(a => inspect(a, { depth: 20 }))
  console.error(...argsInspected)
}
