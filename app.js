// Storage Controller
// let StorageController = (function () {
// })();


// Item Controller


let ItemController = (function () {
    // Item Construcror
    function Item(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure
    let data = {
        items: [
            { id: 0, name: 'Pop Corn', calories: 960 },
            { id: 1, name: 'Stew', calories: 1200 },
            { id: 2, name: 'Cerial', calories: 600 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        logData: () => {
            return data;
        }
    }
    
})();


// UI COntroller
let UIController = (function () {
    
    // Public methods
    return {
    
    }
})();


// App Controller
let AppController = (function (ItemController, UIController) {
    

    // Public methods
    return {
        init: function () {
            console.log('Init App...');
        }
    }
})(ItemController, UIController);


// Init App
AppController.init();
