(function () {
  let db;

  document.addEventListener('DOMContentLoaded', () => {
    createDB();
  });

  function createDB() {
    const newDB = window.indexedDB.open('crm', 1);

    newDB.onerror = () => {
      console.log('Hubo un error');
    };

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
})();
