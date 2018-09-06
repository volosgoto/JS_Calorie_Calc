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
        getItems: function () {
            return data.items;
        },

        addItem : function (name, calories) {
            // console.log(name, calories);
            // Create id
            let id;

            if (data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            };

            // Calories to number
            calories = parseInt(calories);

            // Create new Item
           let newItem = new Item(id, name, calories);

           // Add to items Array
           data.items.push(newItem);

           return newItem;
        },

        logData: () => {
            return data;
        }
    }
})();


// UI COntroller
let UIController = (function () {
    let UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        }, 
        getSelectors: function () {
            return UISelectors;
        },
        getItemInput : function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Create li element
            let li = document.createElement('li');
            
            // Add class to li
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        }
    }
})();


// App Controller
let AppController = (function (ItemController, UIController) {
    // Load event listeners
    let loadEventListeners = ()=>{
        // Get IU selectors
        let UISelectors = UIController.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // Add item sumbit
        function itemAddSubmit(e) {
            // console.log('Add Meal');
            // Get form input from IU controller
            let input = UIController.getItemInput();
            // Check for name and calories input
            if (input.name !== '' && input.calories !== '') {
                // console.log(input.name, input.calories); 
                
                // Add item
                let newItem = ItemController.addItem(input.name, input.calories);
                
                // Add item to UI list
                UIController.addListItem(newItem);

                // Clear input fields
                UIController.clearInput();

            }
            
            e.preventDefault();
        }
    };

    // Public methods
    return {
        init: function () {
            // console.log('Init App...');

            // Fetch items from data structure
            let items = ItemController.getItems();

            // Populate list with items
            UIController.populateItemList(items);

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemController, UIController);


// Init App
AppController.init();
