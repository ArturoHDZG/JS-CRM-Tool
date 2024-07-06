(function () {
  const form = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    connectDB();

    form.addEventListener('submit', validateClient);
  });

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

    const client = {
      nombre,
      email,
      tel,
      empresa,
      id: Date.now()
    };

    newClient(client);
  }

  function newClient(client) {
    const TIME_REDIRECT = 3000;
    const transaction = db.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.add(client);

    transaction.onerror = () => {
      insertAlert('Hubo un error, intenta de nuevo', 'error');
    };

    transaction.oncomplete = () => {
      insertAlert('Cliente agregado correctamente');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, TIME_REDIRECT);
    };
  }
})();
