var budgetController = (function() {
    var Income = function(id,description,value){
        this.id = id;
        this.description = description
        this.value = value
    };
    var Expence = function(id,description,value){
        this.id = id;
        this.description = description
        this.value = value
    };

    var data = {
        allItems:{
            inc:[],
            exp:[]
        },
        total:{
            inc:0,
            exp:0 
        }
    }
    return {
        addItem: function(type, desc, val){
            var newItem,ID;
            if(data.allItems[type].length > 0){

                ID= data.allItems[type][data.allItems[type].length - 1].id +1;
            }else{
                ID = 0;
            }
            if(type === 'exp'){
                newItem = new Expence(ID,desc,val)
            }else{
                newItem = new Income(ID,desc,val)
            }

            data.allItems[type].push(newItem);

            return newItem; 
        }
    }
})();

var uiController = (function() {
  
  
    uiObject = {
    addType: ".add__type",
    addDesc: ".add__description",
    addValue: ".add__value",
    addBtn: ".add__btn",
    incomeContainer:".income__list",
    expenceContainer:".expenses__list"
  };



  return {
    getInput: function() {
      return {
        type: document.querySelector(uiObject.addType).value,
        description: document.querySelector(uiObject.addDesc).value,
        value: document.querySelector(uiObject.addValue).value
      };
    },
    addListItem: function(obj, type){
        var html, newHtml,element;

        if(type === 'inc'){
            element = uiObject.incomeContainer
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }else{
            element = uiObject.expenceContainer
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value)

        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)
    },
    getuiObject: function() {
      return uiObject;
    }
  };
})();

var controller = (function(budgeCtrl, uiCtrl) {

    var setupEventListerns = function(){
        var DOM = uiCtrl.getuiObject();
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
              ctrlAddItem();
            }
          });
        
          document
            .querySelector(DOM.addBtn)
            .addEventListener("click", ctrlAddItem);
    }

    var ctrlAddItem = function() {
    /* Todo
        --------------------------------
        * Get the field input data.
        * Add the item to the budget control.
        * Add the item to UI.
        * Calculate the budget.
        * Display the budget the on UI.
        */
       //    console.log('it works')
       
       var input = uiCtrl.getInput();
       var newItem = budgeCtrl.addItem(input.type,input.description,input.value)
       uiCtrl.addListItem(newItem,input.type)
       console.log(newItem);

  };

  return {
      init: function(){
          console.log('Application has started')
          setupEventListerns();
      }
  }

})(budgetController, uiController);

controller.init();