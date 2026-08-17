import { Link } from 'react-router'
import ErrorBoundary from "@/utils/ErrorBoundary"
import PageWrapper from "@/utils/PageWrapper"

function Home() {
  return (
    <ErrorBoundary>
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-2xl text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome to Public Template
              </h1>
              <p className="text-xl text-base-content/70">
                A professional React 19 + TypeScript template for public-facing applications
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-lg">🏗️ Architecture</h2>
                  <p className="text-sm">Consistent component structure and data flow patterns</p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-lg">🎨 Styling</h2>
                  <p className="text-sm">Tailwind CSS 4 with DaisyUI components</p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-lg">🧪 Testing</h2>
                  <p className="text-sm">Vitest + React Testing Library included</p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-lg">📦 TanStack Query</h2>
                  <p className="text-sm">Server state management & data fetching</p>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="card bg-primary text-primary-content max-w-md mx-auto">
              <div className="card-body">
                <h2 className="card-title">Get Started</h2>
                <p className="text-sm">
                  This template is ready to customize. Check the README and CLAUDE.md for detailed setup instructions.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-ghost">Learn More</button>
                </div>
              </div>
            </div>

            {/* Example Components Notice */}
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>
                Example components are located in <code className="text-sm">src/components/example/</code>. Remove or replace them with your own.
              </span>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Built With</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'DaisyUI', 'React Router', 'TanStack Query'].map((tech) => (
                  <span key={tech} className="badge badge-lg">{tech}</span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 space-y-4 text-sm">
              <p className="text-base-content/60">
                📖 For detailed guidance, see:
              </p>
              <ul className="space-y-2">
                <li><strong>README.md</strong> - Project overview and setup</li>
                <li><strong>CLAUDE.md</strong> - Architecture and coding standards</li>
                <li><strong>src/components/example/</strong> - Reference component patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </PageWrapper>
    </ErrorBoundary>
  )
}

export default Home
