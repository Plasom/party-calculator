export class SortHelper {
    /**
     * Sorts an array of objects by a single key.
     * @param array The array to sort.
     * @param key The key to sort by.
     * @param order The order of sorting, either 'asc' for ascending or 'desc' for descending. Defaults to 'asc'.
     * @returns The sorted array.
     */
    public static sortByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
        return array.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return order === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }

    /**
     * Sorts an array of objects by multiple keys.
     * @param array The array to sort.
     * @param keys The keys to sort by, in order of priority.
     * @returns The sorted array.
     */
    public static multiLevelSort<T>(array: T[], keys: { key: keyof T; order: 'asc' | 'desc' }[]): T[] {
    return array.sort((a, b) => {
        for (const { key, order } of keys) {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue === bValue) continue; 

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return order === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        }
        return 0; 
    });
}
}