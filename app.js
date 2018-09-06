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
        getItems: () => {
            return data.items;
        },

        logData: () => {
            return data;
        }
    }
    
})();


// UI COntroller
let UIController = (function () {
    let UISelectors = {
        itemList: '#item-list'
    };


    // Public methods
    return {
        populateItemList: (items) => {
            let html = '';

            items.forEach(item => {
                html += `
                    <li class="collection-item" data-id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
						<i class="edit-item fa fa-pencil"></i>
					</a>
                    </li>
                    `;
            });
            // Insert li to ul
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    }
})();


// App Controller
let AppController = (function (ItemController, UIController) {
    
    // Public methods
    return {
        init: function () {
            // console.log('Init App...');

            // Fetch items from data structure
            let items = ItemController.getItems();

            // Populate list with items
            UIController.populateItemList(items);
        }
    }
})(ItemController, UIController);


// Init App
AppController.init();
