export const sleep = (time: number) => {
    new Promise((resolve, _) => { 
        setTimeout(() => {
            resolve
        }, time);
    })
}