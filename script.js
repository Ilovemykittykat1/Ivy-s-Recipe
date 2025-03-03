document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");
    const clearChatBtn = document.getElementById("clear-chat");

    console.log("✅ Script Loaded!"); 

    sendBtn.addEventListener("click", function () {
        const inputText = userInput.value.toLowerCase().trim();
        chatBox.innerHTML = ""; 

        if (!inputText) {
            chatBox.innerHTML = "<p>Please enter an ingredient or recipe name.</p>";
            return;
        }

        console.log("🔎 Searching for:", inputText); 

        if (typeof recipes === "undefined" || !Array.isArray(recipes)) {
            chatBox.innerHTML = "<p>Error: Recipes data is not loaded.</p>";
            console.error("❌ Recipes array is undefined or not loaded. Check recipes.js.");
            return;
        }

        // Search for recipes by name or ingredients
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(inputText) ||  // Match recipe name
            recipe.ingredients.some(ing => ing.toLowerCase().includes(inputText)) // Match ingredient
        );

        if (filteredRecipes.length === 0) {
            chatBox.innerHTML = "<p>No recipes found. Try a different search.</p>";
        } else {
            filteredRecipes.forEach(recipe => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

                recipeDiv.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <img src="${recipe.image}" alt="${recipe.name}" style="width:200px; height:auto; display:block; margin:10px auto;">
                    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                    <p><strong>Instructions:</strong> ${recipe.instructions || "Instructions not available."}</p>
                `;

                chatBox.appendChild(recipeDiv);
            });
        }
    });

    // Clear chat and input
    clearChatBtn.addEventListener("click", function () {
        chatBox.innerHTML = "";
        userInput.value = "";
    });
});
