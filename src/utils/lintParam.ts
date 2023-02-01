export const lintParam = (param: string) => {
    let res = param
    if (res.startsWith('@')) {
        res = res.slice(1);
    }

    if (res.includes('.lens')) {
        res = res.split('.lens')[0]
    }

    return res;
}