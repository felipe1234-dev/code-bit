/**
 * Junta dois vetores prevenindo que o valor de uma propriedade x seja repetido nas duas listas
 */
function mergeListsByProp<T>(list1: T[], list2: T[], prop: keyof T): T[] {
    return list1.concat(
        list2.filter((item) => !list1.find((i) => i[prop] === item[prop]))
    );
}

export default mergeListsByProp;
export { mergeListsByProp };
