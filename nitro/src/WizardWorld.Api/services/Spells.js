module.exports = {
  /**
  * 
  * @param options.incantation    * @param options.name    * @param options.type  

  */
  getSpells: async (options) => {

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
        "canBeVerbal": "<boolean>",
        "creator": "<string>",
        "effect": "<string>",
        "id": "<uuid>",
        "incantation": "<string>",
        "light": "<SpellLight>",
        "name": "<string>",
        "type": "<SpellType>",
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
        "canBeVerbal": "<boolean>",
        "creator": "<string>",
        "effect": "<string>",
        "id": "<uuid>",
        "incantation": "<string>",
        "light": "<SpellLight>",
        "name": "<string>",
        "type": "<SpellType>",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },
};
