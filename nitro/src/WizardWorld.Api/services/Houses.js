module.exports = {
  /**
  * 
  * @param options.query  

  */
  getHouses: async (options) => {

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
        "animal": "<string>",
        "commonRoom": "<string>",
        "element": "<string>",
        "founder": "<string>",
        "ghost": "<string>",
        "heads": "<array>",
        "houseColours": "<string>",
        "id": "<uuid>",
        "name": "<string>",
        "traits": "<array>",
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
        "animal": "<string>",
        "commonRoom": "<string>",
        "element": "<string>",
        "founder": "<string>",
        "ghost": "<string>",
        "heads": "<array>",
        "houseColours": "<string>",
        "id": "<uuid>",
        "name": "<string>",
        "traits": "<array>",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },
};
