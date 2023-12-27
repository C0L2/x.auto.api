interface MyObject {
    price: number;
    count?: number;
}

export function sumPrices(list1: MyObject[], list2: MyObject[]): number {
    const sumList1 = list1.reduce((acc, obj) => acc + (obj.count ? obj.price * obj.count : obj.price), 0);
    const sumList2 = list2.reduce((acc, obj) => acc + (obj.count ? obj.price * obj.count : obj.price), 0);

    return sumList1 + sumList2;
}
