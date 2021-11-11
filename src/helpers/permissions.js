export const permissionCheck = (str = '') => {
    const read = 'R';
    const update = 'U';
    const create = 'C';
    const remove = 'D';
    return {
        read: str.indexOf(read) !== -1,
        update: str.indexOf(update) !== -1,
        create: str.indexOf(create) !== -1,
        delete: str.indexOf(remove) !== -1,
    };
};
