const loot = [];

const lootNameInput = document.getElementById("loot-name");
const lootValueInput = document.getElementById("loot-value");
const lootAddButton = document.getElementById("add-loot-button");
const lootDisplay = document.getElementById("loot-added");
const lootTotalValue = document.getElementById("total-loot-value");
const splitTotalLootValue = document.getElementById("split-total-loot-value");
const validation = document.getElementById("validation");
const splitLootButton = document.getElementById("split-loot-button");
const lootPerMemberDisplay = document.getElementById("loot-per-member");
const partyMemberNumberInput = document.getElementById("party-member-number");

// update loot list to show loot array on interface.
function renderLoot() {
    lootDisplay.textContent = "";

    // updates loot display interface.
    let totalLootValue = 0;
    for (let i = 0; i < loot.length; i++) 
    {
        const item = document.createElement("li");
        item.textContent = `Name: ${loot[i].name} | Value: ${loot[i].value.toFixed(2)}`;
        lootDisplay.appendChild(item);
    }

    // calculate total loot value
    lootTotalValue.textContent = 0;
    for (let i = 0; i < loot.length; i++)
    {
        totalLootValue += loot[i].value;
    }
        
    lootTotalValue.textContent = totalLootValue.toFixed(2);
    splitTotalLootValue.textContent = totalLootValue.toFixed(2);
}

// adds item to loot array and updates interface.
function addLoot() {

    const lootValue = lootValueInput.value.trim();
    const lootName = lootNameInput.value.trim();

    if (lootName === "")
    {
        validation.textContent = "You need to enter a valid loot name";
        return;
    }

    if (isNaN(lootValue) || lootValue === "")
    {
        validation.textContent = "Loot value has to be a number.";
        return;
    }
    if (lootValue <= 0)
    {
        validation.textContent = "Loot value must be a positive number.";
        return;
    }
    
    loot.push({name: lootName, value: Number(lootValue)});
    
    renderLoot();
        
    validation.textContent = "";
    lootNameInput.value = "";
    lootValueInput.value = "";
}

// checks if inputs valid, calculates total loot value and divides amongst party members.
function splitLoot() {

    const partyMemberCount = partyMemberNumberInput.value.trim();

    if (isNaN(partyMemberCount) || partyMemberCount === "")
    {
        validation.textContent = "Party members count has to be a number.";
        return;
    }

    if (!Number.isInteger(Number(partyMemberCount)))
    {
        validation.textContent = "Party member count must be whole number."
        return;
    }

    if (partyMemberCount < 1)
    {
        validation.textContent = "You must have more than 0 party members";
        return;
    }   

    if (loot.length === 0)
    {
        validation.textContent = "You must have loot before splitting it.";
        return;
    }

    // calculate total loot value
    let totalLootValue = 0;
    for (let i = 0; i < loot.length; i++)
    {
        totalLootValue += loot[i].value;
    }

    lootTotalValue.textContent = totalLootValue.toFixed(2);
    splitTotalLootValue.textContent = totalLootValue.toFixed(2);

    lootPerMemberDisplay.textContent = (totalLootValue / partyMemberCount).toFixed(2);
    validation.textContent = "";

}

lootAddButton.addEventListener("click", addLoot);
splitLootButton.addEventListener("click", splitLoot);