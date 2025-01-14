// Cargar noticias desde un archivo JSON
document.addEventListener("DOMContentLoaded", function () {
    fetch("js/news.json") // Archivo JSON desde el que se cargan las noticias
        .then((response) => response.json())
        .then((data) => {
            const newsContent = document.getElementById("news-content");
            data.news.forEach((article) => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("article");

                const title = document.createElement("h3");
                title.textContent = article.title;
                articleElement.appendChild(title);

                const description = document.createElement("p");
                description.textContent = article.description;
                articleElement.appendChild(description);

                newsContent.appendChild(articleElement);
            });
        })
        // Mensaje de error que mostrará si no se puede cargar el archivo de noticias
        .catch((error) => console.error("Error al cargar noticias:", error));
});
