document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    // Recipe list with corresponding images
    const recipes = [
        { name: "Spaghetti Carbonara", image: "images/spaghetti.png" },
        { name: "Pancakes", image: "images/pancakes.png" },
        { name: "Omelette", image: "images/omelette.png" },
        { name: "Spiderweb Cheesecake", image: "images/spiderweb_cheesecake.jpg" },
        { name: "Spider Cookies (No-Bake)", image: "images/spider_cookies.png" },
        { name: "PB Marshmallow Bars", image: "images/Marshmallow.png" },
        { name: "No-Bake Cherry Cheesecake", image: "images/cheesecake.png" },
        { name: "Vanilla Apple Crisp with Caramel Sauce", image: "images/Apple Crisp.png" },
        { name: "Banana Loaf", image: "images/banana loaf.png" },
        { name: "Caramel Popcorn Balls", image: "images/Caramel Popcorn Balls.png" },
        { name: "Cinnamon Rolls", image: "images/cinnamon rolls.png" },
        { name: "PB Cookies", image: "images/PB Cookies.png" },
        { name: "Easy Cheesecake Fudge Brownies", image: "images/easycheesecake.png" },
        { name: "Chicken Balls", image: "images/Chicken Balls.png" },
        { name: "Roseanne's Meatballs", image: "images/Meatballs.png" },
        { name: "Nana's Chicken", image: "images/Nanas chicken.png" },
        { name: "Chocolate Chunk Cookies", image: "images/Chocolate Chunk Cookies.png" },
        { name: "Bubbly Bake", image: "images/Bubbly Bake.png" },
        { name: "Chicken Balls (Deep-Fried)", image: "images/Chicken Balls (Deep-Fried).png" },
        { name: "Michelle's Meatballs", image: "images/Michelle's Meatballs.png" }
    ];

    sendBtn.addEventListener("click", function () {
        const inputText = userInput.value.toLowerCase().trim();
        chatBox.innerHTML = ""; // Clear previous results

        if (inputText === "") {
            chatBox.innerHTML = "<p>Please enter an ingredient.</p>";
            return;
        }

        // Filter recipes that match the ingredient input
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(inputText)
        );

        if (filteredRecipes.length === 0) {
            chatBox.innerHTML = "<p>No recipes found. Try a different ingredient.</p>";
        } else {
            filteredRecipes.forEach(recipe => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

                recipeDiv.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <img src="${recipe.image}" alt="${recipe.name}" style="width:200px; height:auto; display:block; margin:10px auto;">
                `;

                chatBox.appendChild(recipeDiv);
            });
        }
    });

    // Clear search button functionality
    document.getElementById("clear-chat").addEventListener("click", function () {
        chatBox.innerHTML = "";
        userInput.value = "";
    });
});
