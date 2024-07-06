(function () {
  let db;

  document.addEventListener('DOMContentLoaded', () => {
    const AWAIT_DB = 500;
    connectDB();

    form.addEventListener('submit', editClient);

    const URLparams = new URLSearchParams(window.location.search);
    const clientID = URLparams.get('id');
    if (clientID) {
      setTimeout(() => {
        getClient(clientID);
      }, AWAIT_DB);
    }
  });

  function connectDB() {
    const openConnection = window.indexedDB.open('crm', 1);

    openConnection.onsuccess = () => {
      db = openConnection.result;
    };
  }

  function redirectIndex() {
    window.location.href = 'index.html';
  }

  function getClient(id) {
    const transaction = db.transaction(['crm'],'readonly');
    const objectStore = transaction.objectStore('crm');

    const request = objectStore.get(Number(id));

    request.onsuccess = () => {
      const client = request.result;
      if (client) {
        document.querySelector('#nombre').value = client.nombre;
        document.querySelector('#email').value = client.email;
        document.querySelector('#tel').value = client.tel;
        document.querySelector('#empresa').value = client.empresa;
      } else {
        redirectIndex();
      }
    };

    request.onerror = () => {
      window.location.href = 'index.html';
    };
  }

  function editClient(e) {
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
      id: Number(window.location.search.split('=')[1])
    };

    updateClient(client);
  }

  function updateClient(client) {
    const TIME_REDIRECT = 3000;
    const transaction = db.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(client);

    transaction.onerror = () => {
      insertAlert('Hubo un error, intenta de nuevo', 'error');
    };

    transaction.oncomplete = () => {
      insertAlert('Cliente editado correctamente');
      setTimeout(() => {
        redirectIndex();
      }, TIME_REDIRECT);
    };
  }
})();
