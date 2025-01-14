// Evento que recoge mediante una función el contenido de los campos una vez cargado el contenido HTML y CSS
document.addEventListener("DOMContentLoaded", function() {

    // Creación de constantes seleccionando el contenido de los diferentes campos del formulario
    const nameInput = document.getElementById("nombre");
    const surnameInput = document.getElementById("apellido");
    const phoneInput = document.getElementById("telefono");
    const emailInput = document.getElementById("email");
    const productSelect = document.getElementById("producto");
    const timeframeInput = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const finalBudget = document.getElementById("presupuestoFinal");
    const form = document.getElementById("budgetForm");

    // Validaciones de los campos de contacto
    function validateName() {
        const nameRegex = /^[a-zA-Z]{1,15}$/;
        return nameRegex.test(nameInput.value);
    }

    function validateSurname() {
        const surnameRegex = /^[a-zA-Z ]{1,40}$/;
        return surnameRegex.test(surnameInput.value);
    }

    function validatePhone() {
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(phoneInput.value);
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailInput.value);
    }

    // Función que calcula y actualiza el presupuesto
    function calculaPresupuesto() {
        let productPrice = parseFloat(productSelect.value);
        let discount = parseInt(timeframeInput.value) >= 4 ? 0.1 : 0;
        let extrasCost = Array.from(extras).reduce((total, extra) => {
            return extra.checked ? total + parseFloat(extra.value) : total;
        }, 0);

        let finalAmount = (productPrice * (1 - discount)) + extrasCost;
        finalBudget.textContent = finalAmount.toFixed(2);
    }

    // Eventos para actualizar presupuesto en tiempo real
    productSelect.addEventListener("change", calculaPresupuesto);
    timeframeInput.addEventListener("input", calculaPresupuesto);
    extras.forEach(extra => extra.addEventListener("change", calculaPresupuesto));

    // Validación al enviar el formulario
    form.addEventListener("submit", function(event) {
        if (!validateName() || !validateSurname() || !validatePhone() || !validateEmail() || !document.getElementById("acceptTerms").checked) {
            alert("Por favor, revisa tus datos de contacto y acepta las condiciones de privacidad.");
            event.preventDefault();
        } else {
            alert("Formulario enviado con éxito.");
        }
    });
});
