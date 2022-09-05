export default function (onInput, inputOptions) {
    const input = $(`<input placeholder="${inputOptions.placeholder}">`);

    let timeout
    $(input).on("input", (e) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            onInput(e.target.value);
        }, 400)
    });

    return input;
}