
const form = document.querySelector('#formulario');

function connectDB() {
  const openConnection = window.indexedDB.open('crm', 1);

  openConnection.onerror = () => {
    insertAlert('Hubo un error, intenta de nuevo', 'error');
  };

  openConnection.onsuccess = () => {
    db = openConnection.result;
  };
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
