
export const fillSelect = (select, arr) => {
    $(select).empty();
    arr.forEach((e, i) => $(select).append(`<option value="${e}">${e}</option>`))
}

export default function(onChange, selectOptions) {
    const select = $(`<select></select>`);

    $(select).on("change", (e) => {
        onChange(e.target.value, e.target.selectedIndex);
    })

    return select;
}