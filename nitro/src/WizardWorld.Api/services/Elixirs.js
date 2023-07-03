module.exports = {
  /**
  * 
  * @param options.difficulty    * @param options.ingredient    * @param options.inventorFullName    * @param options.manufacturer    * @param options.name  

  */
  getElixirs: async (options) => {

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

    var data = [
      {
        "id": "024f56cc-ccd2-4d71-adbd-3cb383c2fe87",
        "name": "Null Potion",
        "effect": null,
        "sideEffects": null,
        "characteristics": null,
        "time": null,
        "difficulty": "Unknown",
        "ingredients": [],
        "inventors": [],
        "manufacturer": null
      },
      {
        "id": "afe48e27-d5de-4a14-9975-65a5b45aadaa",
        "name": "Frog Potion",
        "effect": "Allegedly increases one's brain power",
        "sideEffects": "Possibly harmful mental side effects if brewed incorrectly",
        "characteristics": "Green in colour",
        "time": "Twelve hours",
        "difficulty": "Unknown",
        "ingredients": [
          {
            "id": "2ce52cc3-6b48-44ee-8857-d000b6267a8f",
            "name": "Frog brains"
          }
        ],
        "inventors": [
          {
            "id": "d986fd0c-daa7-4d6c-bb93-83034ec32193",
            "firstName": null,
            "lastName": "Baruffio"
          }
        ],
        "manufacturer": null
      },
      {
        "id": "8f1eeccf-e5db-4549-95d9-a7548649bf9c",
        "name": "Snake Potion",
        "effect": "Awakened victim; Prevented sleeping",
        "sideEffects": null,
        "characteristics": "Blue/green in colour",
        "time": null,
        "difficulty": "Beginner",
        "ingredients": [
          {
            "id": "f8884a69-b332-40d2-9ac8-b38cc3a52aec",
            "name": "Snake fangs"
          }
        ],
        "inventors": [],
        "manufacturer": null
      },
      {
        "id": "0e7228e4-3050-411f-aaa7-6a175737e975",
        "name": "Spider Potion",
        "effect": "Restores bones",
        "sideEffects": null,
        "characteristics": "Smokes when poured; Vile taste; Burns on the way down; Yellow in colour",
        "time": null,
        "difficulty": "Moderate",
        "ingredients": [
          {
            "id": "cd84f418-b0d1-4dd6-93eb-69c9bc42e8b1",
            "name": "Red spider"
          }
        ],
        "inventors": [
          {
            "id": "9b528a63-0a01-4b91-992d-9afed9b841e7",
            "firstName": "Linfred",
            "lastName": "of Stinchcombe"
          }
        ],
        "manufacturer": "Rubens Winikus and Company Inc."
      },
      {
        "id": "f35300dc-0a42-45f9-8b7a-5fc459e3d11a",
        "name": "All at Once Potion",
        "effect": "Volatile mixture",
        "sideEffects": null,
        "characteristics": "Acid-green or blue in colour",
        "time": null,
        "difficulty": "Unknown",
        "ingredients": [
          {
            "id": "f8884a69-b332-40d2-9ac8-b38cc3a52aec",
            "name": "Snake fangs"
          },
          {
            "id": "2ce52cc3-6b48-44ee-8857-d000b6267a8f",
            "name": "Frog brains"
          },
          {
            "id": "cd84f418-b0d1-4dd6-93eb-69c9bc42e8b1",
            "name": "Red spider"
          }
        ],
        "inventors": [],
        "manufacturer": null
      },
      {
        "id": "021b40b3-68ba-4fde-a595-dbb07500674d",
        "name": "Frog & Snake Potion",
        "effect": "Rapid hair growth",
        "sideEffects": null,
        "characteristics": null,
        "time": null,
        "difficulty": "Unknown",
        "ingredients": [
          {
            "id": "f8884a69-b332-40d2-9ac8-b38cc3a52aec",
            "name": "Snake fangs"
          },
          {
            "id": "2ce52cc3-6b48-44ee-8857-d000b6267a8f",
            "name": "Frog brains"
          }
        ],
        "inventors": [],
        "manufacturer": null
      },
      {
        "id": "078b5307-d44e-4af2-a697-4a79037fea53",
        "name": "Frog & Spider Potion",
        "effect": "Most likely cures the taker of lung infections",
        "sideEffects": null,
        "characteristics": null,
        "time": null,
        "difficulty": "Unknown",
        "ingredients": [
          {
            "id": "2ce52cc3-6b48-44ee-8857-d000b6267a8f",
            "name": "Frog brains"
          },
          {
            "id": "cd84f418-b0d1-4dd6-93eb-69c9bc42e8b1",
            "name": "Red spider"
          }
        ],
        "inventors": [],
        "manufacturer": null
      },
    ];

    return {
      status: 200,
      data
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
      "characteristics": "<string>",
      "difficulty": "<ElixirDifficulty>",
      "effect": "<string>",
      "id": "<uuid>",
      "ingredients": "<array>",
      "inventors": "<array>",
      "manufacturer": "<string>",
      "name": "<string>",
      "sideEffects": "<string>",
      "time": "<string>",
    },
      status = '200';

    return {
      status: status,
      data: data
    };
  },
};
