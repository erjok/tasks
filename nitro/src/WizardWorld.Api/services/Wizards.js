module.exports = {
  /**
  * 
  * @param options.firstName    * @param options.lastName  

  */
  getWizards: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var data = [{
        "elixirs": "<array>",
        "firstName": "<string>",
        "id": "<uuid>",
        "lastName": "<string>",
      }],
      status = '200';

    return {
      status: status,
      data: data
    };  
  },

  /**
  * 
  * @param options.id  

  */
  getId: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var data = {
        "elixirs": "<array>",
        "firstName": "<string>",
        "id": "<uuid>",
        "lastName": "<string>",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },
};
