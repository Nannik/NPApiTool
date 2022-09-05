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
let selectedWarehouse = "";

// OnInput events
export const updateTowns = async (value) => {
    getTowns(value).then(townsRes => {
        towns = townsRes;
        fillSelect(townSelect, towns);
    });
}

export const updateDepartments = async (warehouseType, town, findBy) => {
    getDepartments(warehouseType, town, findBy).then(departmentsRes => {
        departments = departmentsRes;
        fillSelect(departmentSelect, departments);
    });
}

// Initialize components
const root = $("#np");

const townInput = createInput(updateTowns, {
    placeholder: "Town"
});

const departmentsInput = createInput(findBy => updateDepartments(selectedWarehouse, selectedTown, findBy), {
    placeholder: "Departments"
});

const warehouseTypeSelect = createSelect((value, i) => {
    selectedWarehouse = warehousesTypes[i].ref;
    updateDepartments(selectedWarehouse, townInput.val(), departmentsInput.val());
}, {});

const townSelect = createSelect(value => {
    selectedTown = value;
    townInput.val(value);
    updateDepartments(selectedWarehouse, value, departmentsInput.val());
}, {});

const departmentSelect = createSelect(value => {
    selectedDepartment = value;
    departmentsInput.val(value);
    updateDepartments(selectedWarehouse, selectedTown, value);
}, {});

// Load data
updateTowns("");

getWarehousesTypes().then(data => {
    warehousesTypes = data;
    fillSelect(warehouseTypeSelect, warehousesTypes.map(e => e.name));
});

$(document).ready(() => {
    // Render components
    // root.append(warehouseTypeSelect);
    root.append(townInput);
    root.append(townSelect);
    root.append(departmentsInput);
    root.append(departmentSelect);
})