export namespace StackErrorPage {
   export type Props = {
      error?: Error;
   };
}

export const StackErrorPage = ({ error }: StackErrorPage.Props) => {
   console.error(error);

   return (
      <main className="p-8 font-sans">
         <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
         {error ? (
            <section>
               <h2 className="text-xl font-semibold">{error.name}</h2>
               <p className="mb-4">{error.message}</p>
               {error.stack && (
                  <pre className="bg-gray-100 p-4 overflow-x-auto rounded mb-4">
                     {error.stack}
                  </pre>
               )}
            </section>
         ) : (
            <p>An unknown error occurred.</p>
         )}
         <button
            onClick={() => window.location.reload()}
            className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
         >
            Reload Page
         </button>
      </main>
   );
};
