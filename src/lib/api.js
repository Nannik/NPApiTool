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

    return data;
}

export const getDepartments = async (warehouseType, town, findBy) => {
    const requestData = {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
            TypeOfWarehouseRef: warehouseType.Ref,
            CityName: town.Description,
            SettlementRef: town.Ref,
            FindByString: findBy
        }
    }

    let data = await sendRequest(requestData);
    console.log(warehouseType);

    return data;
}

export const getWarehousesTypes = async () => {
    const requestData = {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouseTypes",
        methodProperties: {}
    }

    const data = await sendRequest(requestData);

    return data;
}