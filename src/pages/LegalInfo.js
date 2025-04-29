import React from 'react';
import { Link } from 'react-router-dom';

function LegalInfo() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Aviso Legal, Derechos de Autor y Políticas</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Responsable del Sitio</h2>
        <p>
          Esta aplicación es desarrollada y mantenida por <strong>Luis César Muñoz Cervantes</strong> . Todos los derechos reservados.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Derechos de Autor</h2>
        <p>
          Todo el contenido textual, código fuente, diseño y funcionalidades presentes en esta aplicación están protegidos por derechos de autor. Se prohíbe la reproducción total o parcial sin autorización expresa del autor.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Uso de Imágenes</h2>
        <p>
          Algunas imágenes utilizadas en esta aplicación son propiedad de Samsung y se presentan únicamente como referencia visual con fines técnicos y educativos. Esta web no mantiene afiliación, patrocinio ni relación comercial directa con Samsung.
        </p>
        <p>
          Si usted es titular de los derechos de alguna imagen y considera que su uso no es adecuado, por favor contáctenos para resolver la situación.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Nota Técnica y Educativa</h2>
        <p>
          Esta aplicación está destinada exclusivamente al aprendizaje y referencia técnica sobre el cierre correcto de las OS de equipos de línea blanca y refrigeración, en apoyo al personal administrativo.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Política de Contacto</h2>
        <p>
          Para cualquier reclamación, solicitud de retiro de contenido o consulta legal, por favor escriba a:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li><strong>Nombre:</strong> Luis César Muñoz Cervantes</li>
          <li><strong>Correo:</strong> luiscesar.munoz.cervantes.upiit@gmail.com</li>
          <li><strong>Teléfono:</strong> 56 26 88 57 26</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link to="/" className="text-blue-600 underline">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default LegalInfo;
