import {getDepartments, getTowns, getWarehousesTypes} from "./api.js";
import createInput from "./components/input.js";
import createSelect from "./components/select.js";
import { fillSelect } from "./components/select.js";

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
    getTowns(value).then(townsRes => {
        towns = townsRes;
        fillSelect(townSelect, towns.map(e => e.Description));
    });
}

export const updateDepartments = async (warehouseType, town, findBy) => {
    getDepartments(warehouseType, town, findBy).then(departmentsRes => {
        departments = departmentsRes;
        fillSelect(departmentSelect, departments.map(e => e.Description));
    });
}

// Initialize components
const root = $("#np");

const townInput = createInput(updateTowns, {
    placeholder: "Town"
});

const departmentsInput = createInput(findBy => {
    if (townSelect.val()) updateDepartments(selectedWarehouse, selectedTown, findBy)
}, {
    placeholder: "Departments",
    props: {
        disabled: true
    }
});

const warehouseTypeSelect = createSelect((value, i) => {
    selectedWarehouse = warehousesTypes[i];
    if (selectedTown)
        updateDepartments(selectedWarehouse, selectedTown, departmentsInput.val());
}, {});

const townSelect = createSelect((value, i) => {
    selectedTown = towns[i];
    townInput.val(value);
    departmentsInput.prop("disabled", !value);
    departmentSelect.prop("disabled", !value);
    updateDepartments(selectedWarehouse ? selectedWarehouse : warehousesTypes[1], selectedTown, departmentsInput.val());
}, {});

const departmentSelect = createSelect(value => {
    selectedDepartment = value;
    departmentsInput.val(value);
    updateDepartments(selectedWarehouse ? selectedWarehouse : warehousesTypes[1], selectedTown, value);
}, {
    props: {
        disabled: true
    }
});

// Load data
updateTowns("");

getWarehousesTypes().then(data => {
    warehousesTypes = data;
    fillSelect(warehouseTypeSelect, warehousesTypes.map(e => e.Description));
    postOfficeRef = data.find(e => e.Description === "Поштомат").Ref;
});

$(document).ready(() => {
    // Render components
    root.append(warehouseTypeSelect);
    root.append(townInput);
    root.append(townSelect);
    root.append(departmentsInput);
    root.append(departmentSelect);
})