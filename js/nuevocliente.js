(function () {
  let db;
  const form = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    connectDB();

    form.addEventListener('submit', validateClient)
  });

  function connectDB() {
    const openConnection = window.indexedDB.open('crm', 1);

    openConnection.onerror = () => {
      console.log('Hubo un error');
    };

    openConnection.onsuccess = () => {
      db = openConnection.result;
    };
  }

  function validateClient(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const tel = document.querySelector('#tel').value;
    const empresa = document.querySelector('#empresa').value;

    if (!nombre ||!email ||!tel ||!empresa) {
      insertAlert('Todos los campos son obligatorios', 'error');
      return;
    }

    // addClientToDB(nombre, email, tel, empresa);
  }

  function insertAlert(message, type) {
    const ALERT_DURATION = 3000;
    const alert = document.createElement('DIV');
    const alertExists = document.querySelector('.alerta');

    if (!alertExists) {
      alert.textContent = message;
      alert.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

      if (type === 'error') {
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
      } else {
        alert.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
      }

      form.appendChild(alert);

      setTimeout(() => {
        alert.remove();
      }, ALERT_DURATION);
    }
  }
})();
