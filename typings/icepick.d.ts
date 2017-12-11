declare module "icepick" {
  type ICollection = any;
  export function assign(...coll: ICollection[]): ICollection;
  export function updateIn(
    coll: ICollection,
    path: string[],
    callback: (value: any) => any,
  ): ICollection;
  export function setIn(coll: ICollection, path: string[], val: any): ICollection;
  export function getIn(coll: ICollection, path: string[]): any;
}
