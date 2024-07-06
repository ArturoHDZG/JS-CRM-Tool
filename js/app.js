(function () {
  let db;
  const clientTable = document.querySelector('#listado-clientes');

  document.addEventListener('DOMContentLoaded', () => {
    createDB();

    if (window.indexedDB.open('crm', 1)) {
      getClients();
    }

    clientTable.addEventListener('click', deleteClient);
  });

  function createDB() {
    const newDB = window.indexedDB.open('crm', 1);

    newDB.onsuccess = () => {
      db = newDB.result;
    };

    newDB.onupgradeneeded = e => {
      const createdDB = e.target.result;
      const objectStore = createdDB.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

      objectStore.createIndex('nombre', 'nombre', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('tel', 'tel', { unique: false });
      objectStore.createIndex('empresa', 'empresa', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });
    };
  }

  function getClients() {
    const openDatabase = window.indexedDB.open('crm', 1);

    openDatabase.onsuccess = () => {
      db = openDatabase.result;
      const objectStore = db.transaction('crm').objectStore('crm');

      objectStore.openCursor().onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
          const { nombre, empresa, email, tel, id } = cursor.value;
          clientTable.innerHTML += `
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
              <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
              <p class="text-gray-700">${tel}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
              <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 delete">Eliminar</a>
            </td>
          </tr>`;
          cursor.continue();
        }
      };
    };
  }

  function deleteClient(e) {
    if (e.target.classList.contains('delete')) {
      const id = Number(e.target.dataset.cliente);
      const confirmation = confirm('¿Estás seguro de eliminar el cliente?');

      if (confirmation) {
        const transaction = db.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.delete(id);

        transaction.oncomplete = () => {
          e.target.parentElement.parentElement.remove();
        };
      }
    }
  }
})();
