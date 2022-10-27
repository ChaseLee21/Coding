//TODO
//add a combat system that rewards loot
//let the player name their own character


/* 
Start of array declarations
These arrays store objects to be referenced to during the game
Any item, room, or enemy is created in these arrays
*/


let itemsArray = [
    new Equipment('None', 0, 0),
    new Equipment('Torn Leather Boots', 3, 2),
    new Equipment('Cloth Robe', 2, 2),
    new Item('Torch', 0, 0),
    new Item('Copper Shortsword', 1, 2),
    new Item('Skeevers Tooth', 1, 4, .5),
    new Equipment('Cracked Mining Helmet', 1, 2, .9)
]; //this array stores all items that can be placed in inventoryArray[] later in the game

let inventoryArray = [
    itemsArray[3]
]; //this array stores items in the players in current inventory

let combatArray = [

]; //this array stores the current enemys from enemiesArray[] on the battlefield both dead and alive

let enemiesArray = [
    new Enemy('Unknown Body', 0, 0, 0, itemsArray[0], false),
    new Enemy('Skeever', 8, 0, 6, itemsArray[5]),
    new Enemy('Skeleton', 16, 0, 10, itemsArray[6])
]; //this array stores enemys to be called in the updateGameBoard()

let roomArray = [
    new Room(`Welcome to Chase's Game`,
    `You woke up in a cave wearing clothes you've never seen before. There is a fire going with a dead body lying next it.
    She doesn't appear to be someone you know but you don't remember much. You loot a Cooper Shortsword from her body and lit
    a torch from the fire. In this room there is a narrow passage with no light coming from it.`,
    [enemiesArray[0]],
    [new Action('Follow Passage', () => { updateGameBoard(roomArray[1]) } )]
    ),
    new Room(`Skeever Den`, 
    `You follow the passage lit by the torch you crafted. A horid stench becomes more profound as you continue down the path.
    As the passage opens up into a wider room you see skeevers scatter as the light from your torch hits their body's. 
    A dead body reveals itself and one brave soldier from the pack stays behind looking for a fight.`,
    [enemiesArray[1], enemiesArray[1]],
    [new Action('Continue Path', () => { updateGameBoard(roomArray[2]) })]
    ),
    new Room(`Miner's Grave`,
    `Whats left of corpse starts to move as you get closer. The walls start to shake and wispering voices pass by you as the
    skeleton takes it shape. Evil is here. It faces you.`,
    [enemiesArray[2]],
    []
    )
]; //this array stores the different room encounters and is called from the action buttons


/* 
Initialize variables and start()
*/


let chase = new Character(100); 
let gameBoard = document.getElementById('gameBoard'); 
start();

/* 
Global function declarations
*/

//start() initializes the game by updating the DOM with the starting elements
function start() {
    updateInventory();
    updateEquipment();
    updateGameBoard(roomArray[0]);
    initializeStatus();
}

/* 
createElement() functions are used to more easily create new elements on the DOM
they are seperated from each other for easier understanding
the only mandatory param is appendingElement as the new element has to append to an existing one 
*/
function createElementDiv(appendingElement, id, classes, style) {
    const createElement = document.createElement('div');
    const appendElement = document.getElementById(appendingElement);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', classes);
    if (style) createElement.setAttribute('style', style);

}

function createElementButton(appendingElement, id, text, classes) {
    const createElement = document.createElement('button');
    const createText = document.createTextNode(text);
    const appendElement = document.getElementById(appendingElement);
    createElement.appendChild(createText);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', 'btn ' + classes);
}

function createElementText(appendingElement, id, type, text, classes) {
    const createElement = document.createElement(type);
    const createText = document.createTextNode(text);
    const appendElement = document.getElementById(appendingElement);
    createElement.appendChild(createText);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', classes);
}

/* 
requires an arry as the param
this array only contains the id's of html elements ex. clear = ['actions', 'status']
removes the elements passed in the param from the DOM
*/
function clearBoard(clear) {
    for (let key in clear) {
        document.getElementById(clear[key]).remove();
    }
}
