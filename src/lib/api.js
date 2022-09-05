import { API_KEY, API_URL } from "./config.js"

const sendRequest = async (requestData) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        })

        const stream = await res.json();

        return stream.data;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export const getTowns = async (findBy) => {

    const requestData = {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getSettlements",
        methodProperties: {
            FindByString: findBy
        }
    }

    const data = await sendRequest(requestData);

    return [...new Set(data.map(obj => obj.Description))];
}

export const getDepartments = async (warehouseType, town, findBy) => {
    const requestData = {
        apiKey: API_KEY,
        TypeOfWarehouseRef: "9a68df70-0267-42a8-bb5c-37f427e36ee4",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
            CityName: town,
            FindByString: findBy
        }
    }

    const data = await sendRequest(requestData);

    return data.map(obj => obj.Description);
}

export const getWarehousesTypes = async () => {
    const requestData = {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouseTypes",
        methodProperties: {}
    }

    const data = await sendRequest(requestData);

    return data.map(obj => { return { name: obj.Description, ref: obj.Ref } });
}