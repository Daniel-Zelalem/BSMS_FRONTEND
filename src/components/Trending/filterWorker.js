// filterWorker.js
onmessage = function (e) {
  const Properties = e.data;
  let filteredProperties = [];
  if (Properties) {
    Properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    filteredProperties = Properties.slice(0, 4);
  }
  postMessage(filteredProperties);
};
