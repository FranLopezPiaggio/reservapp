'use client';

export default function HomeWhy() {
    return (
        <section className="py-4 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl m font-bold text-primary mb-4">
                    ¿Por qué necesito una web?
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="card">
                        <h3 className="text-xl font-bold text-black mb-4">
                            Disponibilidad 24/7
                        </h3>
                        <p className="text-gray-500 mb-8">
                            Tu negocio siempre abierto, sin importar la hora ni el día.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-black mb-4">
                            Credibilidad
                        </h3>
                        <p className="text-gray-500 mb-8">
                            Una web profesional genera confianza en tus clientes.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-black mb-4">
                            Marketing
                        </h3>
                        <p className="text-gray-500 mb-8">
                            Atrae nuevos clientes y fideliza a los existentes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}