
export const fillSelect = (select, arr) => {
    $(select).empty();
    arr.forEach((e, i) => $(select).append(`<option value="${e}">${e}</option>`))
}

export default function(onChange, options) {
    const select = $(`<select></select>`);

    if (options.props)
        Object.entries(options.props).forEach(prop => select.prop(prop[0], prop[1]));

    $(select).on("change", (e) => {
        onChange(e.target.value, e.target.selectedIndex);
    })

    return select;
}