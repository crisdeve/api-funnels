export class Master {
  findId(array: any[], id: number): any[] {
    const item = array.find((item) => item.id === id);
    return [item, array.indexOf(item)];
  }

  ids(array: Array<any>) {
    return array.reduce((prev, item) => [...prev, item.id], []);
  }

  createId(ids: number[]) {
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  delete(array: any[], id: number): any {
    if (!array.some((el) => el.id === id)) return;
    return array.filter((item) => item.id !== id);
  }
}
