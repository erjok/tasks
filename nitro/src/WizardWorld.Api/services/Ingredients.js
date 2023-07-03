module.exports = {
  /**
  * 
  * @param options.name  

  */
  getIngredients: async (options) => {

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

    const data = [
      {
        id: "cd84f418-b0d1-4dd6-93eb-69c9bc42e8b1",
        name: "Red spider"
      },
      {
        id: "f8884a69-b332-40d2-9ac8-b38cc3a52aec",
        name: "Snake fangs"
      },
      {
        id: "2ce52cc3-6b48-44ee-8857-d000b6267a8f",
        name: "Frog brains"
      },
    ];

    return {
      status: 200,
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
      "id": "<uuid>",
      "name": "<string>",
    },
      status = '200';

    return {
      status: status,
      data: data
    };
  },
};
