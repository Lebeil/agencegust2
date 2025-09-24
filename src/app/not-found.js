export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
        <p className="text-gray-300 mb-6">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  )
}
