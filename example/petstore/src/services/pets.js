import {
    ServerError
} from '../lib/error.js';
/**
 * @param {Object} options
 * @param {Array} options.tags tags to filter by
 * @param {Integer} options.limit maximum number of results to return
 * @throws {Error}
 * @return {Promise}
 */
export const findPets = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'findPets ok!'
    };
};

/**
 * @param {Object} options
 * @param {Array} options.tags tags to filter by
 * @throws {Error}
 * @return {Promise}
 */
export const countPets = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'countPets ok!'
    };
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const addPet = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'addPet ok!'
    };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of pet to fetch
 * @throws {Error}
 * @return {Promise}
 */
export const findPetById = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'findPetById ok!'
    };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of pet to delete
 * @throws {Error}
 * @return {Promise}
 */
export const deletePet = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'deletePet ok!'
    };
};