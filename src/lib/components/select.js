
export const fillSelect = (select, arr) => {
    $(select).empty();
    arr.forEach((e) => $(select).append(e));
}

export const createSelect = (options) => {
    const select = $(`<ul></ul>`);

    if (options.props)
        Object.entries(options.props).forEach(prop => select.prop(prop[0], prop[1]));

    if (options.classes)
        options.classes.forEach(e => select.addClass(e));

    return select;
}