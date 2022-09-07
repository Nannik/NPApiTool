
export const createOption = (onClick, options) => {
    if (!options.content) {
        console.error("options.content not specified");
        return;
    }

    if (options.obj === undefined || options.obj === null) {
        console.error("options.obj not specified");
        return;
    }

    const elem = $(`<li></li>`);

    elem.append(options.content)
    elem.click(() => {
        onClick(options.obj)
    });

    return elem;
}