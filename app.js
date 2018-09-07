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
            // { id: 0, name: 'Pop Corn', calories: 960 },
            // { id: 1, name: 'Stew', calories: 1200 },
            // { id: 2, name: 'Cerial', calories: 600 }
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

        getTotalCalories: function() {
            let total = 0;
      
            // Loop through items
            data.items.forEach(item => (total += item.calories));
      
            data.totalCalories = total;
      
            return data.totalCalories;
          },

        logData: () => {
            return data;
        }
    }
})();
// Item Controller END


// UI Controller
let UIController = (function () {
    let UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
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
        getItemInput : function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            
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
        },
        hideList : function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(
              UISelectors.totalCalories,
            ).textContent = totalCalories;
        },
        clearEditState: function () {
            UIController.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none'; 
            document.querySelector(UISelectors.addBtn).style.display = 'inline'; 

        },
        getSelectors: function () {
            return UISelectors;
        },
    }
})();
// UI COntroller END


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

                // Get total calories
                let totalCalories = ItemController.getTotalCalories();

                // Add total calorie to UI
                UIController.showTotalCalories(totalCalories);

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

            // Check if any items
            if (items.length === 0) {
                UIController.hideList();
            } else {
                 // Populate list with items
                UIController.populateItemList(items);
            }

            // Get total calories
            let totalCalories = ItemController.getTotalCalories();

            // Add total calorie to UI
            UIController.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        } 
    }
})(ItemController, UIController);
// App Controller END


// Init App
AppController.init();