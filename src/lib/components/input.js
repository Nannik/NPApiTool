export default function (onInput, options) {
    const input = $(`<input placeholder="${options.placeholder}">`);

    if (options.props)
        Object.entries(options.props).forEach(prop => input.prop(prop[0], prop[1]));

    let timeout
    $(input).on("input", (e) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            onInput(e.target.value);
        }, 400)
    });

    return input;
}