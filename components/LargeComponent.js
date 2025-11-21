// GUERRA PACHECO GEORGE MIKY -5C24B
export default function LargeComponent() {
  return (
    <div style={{ padding: "20px", marginTop: "20px", border: "2px solid #3b82f6", borderRadius: "8px" }}>
      <h2>Componente Cargado con Lazy Loading</h2>
      <p>Este componente se carga de forma diferida usando next/dynamic.</p>
      <p>Beneficios:</p>
      <ul>
        <li>Reduce el tamaño inicial del bundle JavaScript</li>
        <li>Mejora el tiempo de carga inicial de la página</li>
        <li>Carga el código solo cuando es necesario</li>
      </ul>
    </div>
  );
}
