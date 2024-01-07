export function IsObjectsEquals(obj1: any, obj2: any) {
  if (!obj1 || !obj2) return false;
  if (!!obj1['id'] && !!obj2['id']) return obj1['id'] == obj2['id'];

  const serialized1 = JSON.stringify(obj1);
  const serialized2 = JSON.stringify(obj2);

  return serialized1 === serialized2;
}

export function CopyObjectIntoObject<T>(source: any, target: T): T {
  const keys = Object.keys(source);
  const newObject = JSON.parse(JSON.stringify(target));

  keys.forEach((key) => {
    const value = source[key];
    if (value !== null && value !== undefined) {
      newObject[key] = value;
    }
  });
  return newObject as T;
}
