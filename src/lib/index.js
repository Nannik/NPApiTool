import {getDepartments, getTowns, getWarehousesTypes} from "./api.js";
import createInput from "./components/input.js";
import { fillSelect, createSelect } from "./components/select.js";
import {createOption} from "./components/selectOption.js";

// Store
export let towns = [];
let selectedTown = "";

export let departments = [];
let selectedDepartment = "";

export let warehousesTypes = [];
export let postOfficeRef;
let selectedWarehouse = "";


// OnInput events
export const updateTowns = async (value) => {
    function createContent(name, settlementType, area, region) {
        const elem = $("<div></div>");

        elem.append($(`<span>${settlementType + " " + name + " "}</span>`))
        elem.append($(`<span class="text-secondary">${area + " " + region}</span>`))

        return elem;
    }

    getTowns(value).then(townsRes => {
        towns = townsRes;
        fillSelect(townSelect, towns.map(e => createOption(onChangeTown, {
            obj: e,
            content: createContent(e.Description, e.SettlementTypeDescription, e.AreaDescription, e.RegionsDescription)
        })));
    });
}

export const updateDepartments = async (warehouseType, town, findBy) => {
    getDepartments(warehouseType, town, findBy).then(departmentsRes => {
        departments = departmentsRes;
        fillSelect(departmentSelect, departments.map(e => createOption(onChangeDepartment, {
            obj: e,
            content: $(`<span>${ e.Description }</span>`)[0]
        })));
    });
}

// Initialize components
const root = $("#np");

const townInput = createInput(val => {
    if (!val) {
        departmentSelect.addClass("hidden");
        return;
    }

    townSelect.removeClass("hidden");
    updateTowns(val);
}, {
    placeholder: "Town"
});

const departmentsInput = createInput(findBy => {
    if (!findBy) {
        departmentSelect.addClass("hidden");
        return;
    }

    departmentSelect.removeClass("hidden");
    if (selectedTown) updateDepartments(selectedWarehouse, selectedTown, findBy)
}, {
    placeholder: "Departments",
    props: {
        disabled: true
    }
});

function onChangeWarehouseType(value) {
    selectedWarehouse = value;
    if (selectedTown)
        updateDepartments(selectedWarehouse, selectedTown, departmentsInput.val());
}

function onChangeTown(value) {
    console.log(value)
    selectedTown = value;
    townInput.val(value.Description);
    departmentsInput.prop("disabled", !value);
    departmentSelect.prop("disabled", !value);
    updateDepartments(selectedWarehouse ? selectedWarehouse : warehousesTypes[1], selectedTown, departmentsInput.val());
}

function onChangeDepartment(value) {
    selectedDepartment = value;
    departmentsInput.val(value.Description);
    updateDepartments(selectedWarehouse ? selectedWarehouse : warehousesTypes[1], selectedTown, value.Description);
}

const warehouseTypeSelect = createSelect({});

const townSelect = createSelect({
    classes: ["hidden"]
});

const departmentSelect = createSelect({
    props: {
        disabled: true
    },
    classes: ["hidden"]
});

// Load data
updateTowns("");

getWarehousesTypes().then(data => {
    warehousesTypes = data;
    fillSelect(warehouseTypeSelect, warehousesTypes.map(e => createOption(onChangeWarehouseType, {
        obj: e,
        content: $(`<span>${ e.Description }</span>`)[0]
    })));
    postOfficeRef = data.find(e => e.Description === "Поштомат").Ref;
});

$(document).ready(() => {
    // Render components
    const warehouseContainer = $("<div></div>");
    warehouseContainer.append(warehouseTypeSelect);

    const townContainer = $("<div></div>");
    townContainer.append(townInput);
    townContainer.append(townSelect);

    const departmentContainer = $("<div></div>");
    departmentContainer.append(departmentsInput);
    departmentContainer.append(departmentSelect);

    root.append(warehouseContainer);
    root.append(townContainer);
    root.append(departmentContainer);
})